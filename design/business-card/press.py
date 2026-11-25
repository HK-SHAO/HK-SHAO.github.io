from argparse import ArgumentParser
from contextlib import closing
from functools import cache
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.request import urlopen
from zipfile import BadZipFile, ZipFile

from PIL import Image, ImageCms
from pypdfium2 import PdfDocument, PdfiumError
from pypdf import PdfReader, PdfWriter
from pypdf.errors import PyPdfError
from pypdf.generic import (
    ArrayObject,
    DecodedStreamObject,
    DictionaryObject,
    FloatObject,
    NameObject,
    NumberObject,
    RectangleObject,
    TextStringObject,
)
from zxingcpp import BarcodeFormat, read_barcodes

PROFILE_URL = "https://eci.org/lib/exe/pso-coated_v3.zip"
PROFILE_FILE = "PSOcoated_v3.icc"
PROFILE_SIZE = 2_195_228
PROFILE_HASH = "c30ad2c01e8f93135ec7682c535e0a81bc2d177c301e196376c5f5838b5c8e86"
PROFILE_NAME = "PSO Coated v3 (FOGRA51)"
MAX_ARCHIVE_SIZE = 4 * 1024 * 1024

WIDTH, HEIGHT, BLEED = (mm * 72 / 25.4 for mm in (96, 60, 3))
FULL_BOX = (0, 0, WIDTH, HEIGHT)
TRIM_BOX = (BLEED, BLEED, WIDTH - BLEED, HEIGHT - BLEED)
BACKGROUNDS = ((245, 239, 227), (24, 35, 51))
SINGLE_BLACK = {(0, 0, 0), (25, 26, 29)}
BLACK = (0, 0, 0, 1)
SOURCE_COLORS = {b"rg": b"k", b"RG": b"K", b"g": b"k", b"G": b"K"}
OTHER_COLORS = {b"cs", b"CS", b"sc", b"SC", b"scn", b"SCN"}
EXTERNAL_PAINT = {b"Do", b"sh", b"INLINE IMAGE"}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def load_profile(path):
    if path is not None:
        with path.open("rb") as profile:
            data = profile.read(PROFILE_SIZE + 1)
    else:
        with urlopen(PROFILE_URL, timeout=15) as response:
            archive = response.read(MAX_ARCHIVE_SIZE + 1)
        require(len(archive) <= MAX_ARCHIVE_SIZE, "ECI profile archive is too large")
        with ZipFile(BytesIO(archive)) as files:
            require(PROFILE_FILE in files.namelist(), f"ECI archive is missing {PROFILE_FILE}")
            require(files.getinfo(PROFILE_FILE).file_size == PROFILE_SIZE, "Unexpected ICC profile size")
            data = files.read(PROFILE_FILE)
    require(len(data) == PROFILE_SIZE and sha256(data).hexdigest() == PROFILE_HASH,
            f"ICC profile must match the official {PROFILE_FILE}")
    return data


def color_separator(profile):
    transform = ImageCms.buildTransform(
        ImageCms.createProfile("sRGB"),
        ImageCms.getOpenProfile(BytesIO(profile)),
        "RGB",
        "CMYK",
        renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC,
        flags=ImageCms.Flags.BLACKPOINTCOMPENSATION,
    )

    @cache
    def separate(rgb):
        if rgb in SINGLE_BLACK:
            return BLACK
        pixel = Image.new("RGB", (1, 1), rgb)
        cmyk = ImageCms.applyTransform(pixel, transform).getpixel((0, 0))
        return tuple(channel / 255 for channel in cmyk)

    return separate


def embed_output_intent(writer, profile):
    stream = DecodedStreamObject()
    stream.set_data(profile)
    stream = stream.flate_encode()
    stream[NameObject("/N")] = NumberObject(4)
    stream[NameObject("/Alternate")] = NameObject("/DeviceCMYK")
    intent = DictionaryObject({
        NameObject("/Type"): NameObject("/OutputIntent"),
        NameObject("/S"): NameObject("/GTS_PDFX"),
        NameObject("/OutputConditionIdentifier"): TextStringObject("FOGRA51"),
        NameObject("/OutputCondition"): TextStringObject(PROFILE_NAME),
        NameObject("/Info"): TextStringObject(PROFILE_NAME),
        NameObject("/RegistryName"): TextStringObject("http://www.color.org"),
        NameObject("/DestOutputProfile"): writer._add_object(stream),
    })
    writer.root_object[NameObject("/OutputIntents")] = ArrayObject([intent])


def numbers(values):
    return [FloatObject(f"{value:.8f}") for value in values]


def separate_page(page, background, separate, label):
    require(page.rotation == 0 and page.user_unit == 1, f"{label}: unexpected rotation or units")
    origin_x, origin_y, width, height = map(float, page.mediabox)
    require(origin_x == origin_y == 0 and abs(WIDTH - width) < 1 and abs(HEIGHT - height) < 1,
            f"{label}: browser PDF must be 96 × 60 mm")

    contents = page.get_contents()
    require(contents is not None, f"{label}: missing page content")
    first_fill = next((tuple(round(float(value) * 255) for value in args)
                       for args, op in contents.operations if op == b"rg"), None)
    require(first_fill == background, f"{label}: expected the approved full-page background")

    operations = [
        (numbers(separate(background)), b"k"),
        (numbers(FULL_BOX), b"re"),
        ([], b"f"),
        (numbers(BLACK), b"k"),
        (numbers(BLACK), b"K"),
        (numbers((1, 0, 0, 1, (WIDTH - width) / 2, (HEIGHT - height) / 2)), b"cm"),
    ]
    for args, op in contents.operations:
        if op in SOURCE_COLORS:
            components = tuple(float(value) for value in args)
            channels = 1 if op in (b"g", b"G") else 3
            require(len(components) == channels and all(0 <= value <= 1 for value in components),
                    f"{label}: invalid browser color")
            rgb = tuple(round(value * 255) for value in components)
            rgb = rgb * 3 if channels == 1 else rgb
            operations.append((numbers(separate(rgb)), SOURCE_COLORS[op]))
        else:
            require(op not in OTHER_COLORS | EXTERNAL_PAINT | {b"k", b"K"},
                    f"{label}: unsupported browser PDF operation {op!r}")
            operations.append((args, op))
    contents.operations = operations
    page.replace_contents(contents)
    page.mediabox = RectangleObject(numbers(FULL_BOX))
    page.cropbox = RectangleObject(numbers(FULL_BOX))
    page.bleedbox = RectangleObject(numbers(FULL_BOX))
    page.trimbox = RectangleObject(numbers(TRIM_BOX))


def check_page(page, label):
    for key, box in (("/MediaBox", FULL_BOX), ("/CropBox", FULL_BOX),
                     ("/BleedBox", FULL_BOX), ("/TrimBox", TRIM_BOX)):
        require(key in page and all(abs(float(actual) - expected) < 0.0001
                                    for actual, expected in zip(page[key], box, strict=True)),
                f"{label}: incorrect {key}")
    require(page.rotation == 0 and page.user_unit == 1 and "/Annots" not in page,
            f"{label}: unexpected rotation, units, or annotations")

    resources = page["/Resources"]
    require(not {"/XObject", "/ColorSpace", "/Pattern", "/Shading"}.intersection(resources),
            f"{label}: expected direct vector and process-color resources")
    fonts = resources.get("/Font", DictionaryObject()).get_object()
    require(bool(fonts), f"{label}: missing font resources")
    for name, reference in fonts.items():
        font = reference.get_object()
        faces = font.get("/DescendantFonts", [font])
        for face in faces:
            descriptor = face.get_object().get("/FontDescriptor")
            require(descriptor is not None and any(key in descriptor.get_object()
                                                   for key in ("/FontFile", "/FontFile2", "/FontFile3")),
                    f"{label}: font {name} is not embedded")

    operations = page.get_contents().operations
    operators = {op for _, op in operations}
    require(not operators.intersection(SOURCE_COLORS.keys() | OTHER_COLORS | EXTERNAL_PAINT),
            f"{label}: unexpected non-CMYK paint operator")
    require(b"BT" in operators and bool(page.extract_text().strip()) and b"f" in operators,
            f"{label}: expected live text and vector fills")
    for args, op in operations:
        if op in (b"k", b"K"):
            channels = tuple(map(float, args))
            require(len(channels) == 4 and all(0 <= value <= 1 for value in channels)
                    and sum(channels) <= 3, f"{label}: CMYK ink exceeds the 300% limit")


def front_link(page):
    urls = set()
    for reference in page.get("/Annots", ArrayObject()).get_object():
        annotation = reference.get_object()
        action = annotation.get("/A", DictionaryObject()).get_object()
        if annotation.get("/Subtype") == "/Link" and action.get("/S") == "/URI" and action.get("/URI"):
            urls.add(str(action["/URI"]))
    require(len(urls) == 1, "The browser PDF front must link to one destination for QR verification")
    return urls.pop()


def check_qr(path, expected_url):
    with PdfDocument(path) as document, closing(document[0]) as page:
        for dpi in (150, 300):
            with closing(page.render(scale=dpi / 72)) as bitmap, bitmap.to_pil() as image:
                codes = read_barcodes(image, formats=BarcodeFormat.QRCode)
            require([code.bytes for code in codes] == [expected_url.encode("utf-8")],
                    f"Page 1: QR at {dpi} dpi must decode to {expected_url}")


def finish(source_path, output_path, profile):
    require(source_path.resolve() != output_path.resolve(), "Use a different path for the print PDF")
    source = PdfReader(source_path, strict=True)
    require(not source.is_encrypted and len(source.pages) == 2, "Expected an unencrypted two-page browser PDF")
    expected_url = front_link(source.pages[0])
    writer = PdfWriter()
    writer.pdf_header = source.pdf_header
    writer.metadata = {
        "/Title": source.metadata.title if source.metadata and source.metadata.title else "Business Card",
        "/Subject": f"Two-sided, 90 x 54 mm trim, 3 mm bleed, {PROFILE_NAME}",
        "/Producer": "Business card press workflow",
    }
    embed_output_intent(writer, profile)

    separate = color_separator(profile)
    for number, (original, background) in enumerate(zip(source.pages, BACKGROUNDS, strict=True), start=1):
        page = writer.add_page(original, excluded_keys=("/Annots",))
        separate_page(page, background, separate, f"Page {number}")
    writer.compress_identical_objects()

    with TemporaryDirectory(prefix=f".{output_path.name}-", dir=output_path.parent) as directory:
        candidate = Path(directory) / output_path.name
        writer.write(candidate)
        final = PdfReader(candidate, strict=True)
        require(not final.is_encrypted and len(final.pages) == 2, "Expected a two-page print PDF")
        intent = final.root_object["/OutputIntents"][0].get_object()
        embedded = intent["/DestOutputProfile"]
        require(intent["/OutputConditionIdentifier"] == "FOGRA51"
                and embedded["/N"] == 4 and embedded.get_data() == profile, "Invalid FOGRA51 output intent")
        for number, page in enumerate(final.pages, start=1):
            check_page(page, f"Page {number}")
        check_qr(candidate, expected_url)
        candidate.replace(output_path)


def main():
    parser = ArgumentParser(description="Prepare and validate the two-sided CMYK card PDF.")
    parser.add_argument("input_rgb_pdf", type=Path)
    parser.add_argument("output_print_pdf", type=Path)
    parser.add_argument("icc_path", nargs="?", type=Path, help="Use a local copy of the official ECI ICC profile.")
    args = parser.parse_args()
    try:
        finish(args.input_rgb_pdf, args.output_print_pdf, load_profile(args.icc_path))
    except (BadZipFile, OSError, ValueError, PyPdfError, PdfiumError, ImageCms.PyCMSError) as error:
        parser.exit(1, f"Print PDF: {error}\n")
    print("Verified CMYK vectors, embedded fonts, 90 × 54 mm trim, 3 mm bleed, and the QR at 150 and 300 dpi.")


if __name__ == "__main__":
    main()
