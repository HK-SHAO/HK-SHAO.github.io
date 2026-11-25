from argparse import ArgumentParser
from io import BytesIO
from pathlib import Path
import sys
from tempfile import TemporaryDirectory
import zlib

from PIL import Image, ImageChops, ImageCms
from pypdf import PdfReader, PdfWriter
from pypdf.generic import (
    ArrayObject,
    BooleanObject,
    DictionaryObject,
    EncodedStreamObject,
    NameObject,
    NumberObject,
    RectangleObject,
)

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "business-card"))
from press import color_separator, embed_output_intent, load_profile, numbers, require

WIDTH, HEIGHT, BLEED = (mm * 72 / 25.4 for mm in (306, 456, 3))
BOX = (0, 0, WIDTH, HEIGHT)
TRIM = (BLEED, BLEED, WIDTH - BLEED, HEIGHT - BLEED)
LINK = "https://shao.fun/voxpool/"
SCENE_JPEG_QUALITY = 94
CMYK_JPEG_DECODE = (1, 0) * 4
NAME = NameObject
RGB_PAINT = {b"rg": b"k", b"RG": b"K"}
UNSUPPORTED_PAINT = {b"g", b"G", b"sc", b"SC", b"Do", b"sh", b"INLINE IMAGE"}


def ink(values, separate):
    channels = tuple(map(float, values))
    require(len(channels) == 3 and all(0 <= channel <= 1 for channel in channels),
            "Invalid RGB value in vector overlay.")
    return numbers(separate(tuple(round(channel * 255) for channel in channels)))


def scene_stream(path, profile, *, jpeg_quality=None):
    with Image.open(path) as image:
        require(image.format == "PNG" and image.mode in ("RGB", "RGBA"), "Expected an RGB PNG scene.")
        require(image.mode == "RGB" or image.getextrema()[3] == (255, 255), "Expected an opaque scene.")
        source_icc = image.info.get("icc_profile")
        source_profile = ImageCms.getOpenProfile(BytesIO(source_icc)) if source_icc else ImageCms.createProfile("sRGB")
        transform = ImageCms.buildTransform(
            source_profile, ImageCms.getOpenProfile(BytesIO(profile)), "RGB", "CMYK",
            renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC,
            flags=ImageCms.Flags.BLACKPOINTCOMPENSATION,
        )
        cmyk = ImageCms.applyTransform(image.convert("RGB"), transform)

    stream = EncodedStreamObject()
    stream.update({
        NAME("/Type"): NAME("/XObject"),
        NAME("/Subtype"): NAME("/Image"),
        NAME("/Width"): NumberObject(cmyk.width),
        NAME("/Height"): NumberObject(cmyk.height),
        NAME("/ColorSpace"): NAME("/DeviceCMYK"),
        NAME("/BitsPerComponent"): NumberObject(8),
        NAME("/Interpolate"): BooleanObject(False),
    })
    if jpeg_quality is None:
        pixels = ImageChops.subtract_modulo(cmyk, ImageChops.offset(cmyk, 1, 0))
        pixels.paste(cmyk.crop((0, 0, 1, cmyk.height)), (0, 0))
        stream._data = zlib.compress(pixels.tobytes(), level=7)
        stream[NAME("/Filter")] = NAME("/FlateDecode")
        stream[NAME("/DecodeParms")] = DictionaryObject({
            NAME("/Predictor"): NumberObject(2),
            NAME("/Colors"): NumberObject(4),
            NAME("/BitsPerComponent"): NumberObject(8),
            NAME("/Columns"): NumberObject(cmyk.width),
        })
    else:
        jpeg = BytesIO()
        cmyk.save(jpeg, format="JPEG", quality=jpeg_quality, subsampling=0, optimize=True)
        stream._data = jpeg.getvalue()
        stream[NAME("/Filter")] = NAME("/DCTDecode")
        stream[NAME("/Decode")] = ArrayObject(NumberObject(value) for value in CMYK_JPEG_DECODE)
        stream[NAME("/DecodeParms")] = DictionaryObject({NAME("/ColorTransform"): NumberObject(0)})
    return stream, cmyk.size


def page_link(page):
    links = [item.get_object() for item in page.get("/Annots", [])]
    require(len(links) == 1, "Expected one link annotation.")
    link = links[0]
    require(link["/Subtype"] == "/Link" and link["/A"]["/S"] == "/URI" and link["/A"]["/URI"] == LINK,
            "The poster link must point to the Voxpool page.")
    return link


def convert_patterns(resources, separate):
    patterns = resources["/Pattern"].get_object()
    require(len(patterns) == 4, "Expected the four vector gradients in the Voxpool icon.")
    for ref in patterns.values():
        pattern = ref.get_object()
        shading = pattern["/Shading"].get_object()
        require(pattern["/PatternType"] == 2 and shading["/ShadingType"] == 2
                and shading["/ColorSpace"] == "/DeviceRGB", "Unexpected logo pattern or color space.")
        gradient = shading["/Function"].get_object()
        require(gradient["/FunctionType"] == 2, "Unexpected logo gradient function.")
        shading[NAME("/ColorSpace")] = NAME("/DeviceCMYK")
        for stop in ("/C0", "/C1"):
            gradient[NAME(stop)] = ArrayObject(ink(gradient[stop], separate))


def verify(path, profile):
    pdf = PdfReader(path, strict=True)
    require(len(pdf.pages) == 1 and not pdf.is_encrypted, "Expected an unencrypted, one-page poster.")
    page = pdf.pages[0]
    require(page.rotation == 0 and page.user_unit == 1, "Unexpected page rotation or user unit.")
    for key, bounds in (("/MediaBox", BOX), ("/CropBox", BOX), ("/BleedBox", BOX), ("/TrimBox", TRIM)):
        require(key in page and all(abs(float(value) - expected) < 0.0001
                                    for value, expected in zip(page[key], bounds, strict=True)), f"Invalid {key}.")

    resources = page["/Resources"]
    images = resources["/XObject"]
    require(set(images) == {"/Scene"} and images["/Scene"]["/ColorSpace"] == "/DeviceCMYK",
            "Expected only the full-bleed CMYK scene as a raster image.")
    scene = images["/Scene"]
    require(scene["/Filter"] == "/DCTDecode" and tuple(scene["/Decode"]) == CMYK_JPEG_DECODE
            and scene["/DecodeParms"]["/ColorTransform"] == 0, "Unexpected CMYK JPEG encoding.")
    require(all(pattern.get_object()["/Shading"]["/ColorSpace"] == "/DeviceCMYK"
                for pattern in resources["/Pattern"].values()), "Logo gradients must use CMYK.")
    intent = pdf.root_object["/OutputIntents"][0]
    require(intent["/OutputConditionIdentifier"] == "FOGRA51"
            and intent["/DestOutputProfile"]["/N"] == 4
            and intent["/DestOutputProfile"].get_data() == profile, "Incorrect FOGRA51 profile.")

    faces = set()
    for ref in resources["/Font"].values():
        font = ref.get_object()["/DescendantFonts"][0].get_object()
        require("/FontFile2" in font["/FontDescriptor"], "Expected embedded TrueType fonts.")
        faces.add(str(font["/BaseFont"]).split("+")[-1])
    require(faces == {"Sarasa-UI-SC-SemiBold"}, "Unexpected poster fonts.")

    operators = [op for _, op in page.get_contents().operations]
    require(operators.count(b"Do") == 1 and not RGB_PAINT.keys() & set(operators)
            and b"S" in operators, "Expected CMYK vector outlines and one scene.")
    x1, y1, x2, y2 = map(float, page_link(page)["/Rect"])
    require(BLEED < x1 < x2 < WIDTH - BLEED and BLEED < y1 < y2 < HEIGHT - BLEED,
            "The link lies outside the trim area.")
    copy = "".join(page.extract_text().split())
    require(copy == "shao.fun/voxpool池核探索·自由建造·实时光追", "Unexpected poster copy or reading order.")


def finalize(overlay, scene, destination, profile):
    source = PdfReader(overlay, strict=True)
    require(len(source.pages) == 1, "Expected one browser PDF page.")
    writer = PdfWriter()
    writer.pdf_header = source.pdf_header
    page = writer.add_page(source.pages[0])
    resources = page["/Resources"]
    require(not {"/XObject", "/ColorSpace", "/Shading"} & resources.keys(),
            "Expected an overlay containing only direct vectors, gradients and text.")
    old_width = float(page.mediabox.width)
    old_height = float(page.mediabox.height)
    require(abs(old_width - WIDTH) < 1 and abs(old_height - HEIGHT) < 1, "Incorrect browser PDF page size.")
    dx, dy = (WIDTH - old_width) / 2, (HEIGHT - old_height) / 2
    link = page_link(page)
    x1, y1, x2, y2 = map(float, link["/Rect"])
    link[NAME("/Rect")] = RectangleObject(numbers((x1 + dx, y1 + dy, x2 + dx, y2 + dy)))

    separate = color_separator(profile)
    convert_patterns(resources, separate)
    scene_image, (scene_width, scene_height) = scene_stream(scene, profile, jpeg_quality=SCENE_JPEG_QUALITY)
    resources[NAME("/XObject")] = DictionaryObject({NAME("/Scene"): writer._add_object(scene_image)})
    scale = max(WIDTH / scene_width, HEIGHT / scene_height)
    require(72 / scale >= 300, "The full-bleed image must provide at least 300 ppi.")
    rendered_w, rendered_h = scene_width * scale, scene_height * scale
    matrix = (rendered_w, 0, 0, rendered_h, (WIDTH - rendered_w) / 2, (HEIGHT - rendered_h) / 2)

    content = page.get_contents()
    vector_ops = content.operations
    require(sum(op in (b"m", b"l", b"c") for _, op in vector_ops) > 100, "Expected vector wordmarks.")
    operations = [
        ([], b"q"),
        (numbers(BOX), b"re"),
        ([], b"W"),
        ([], b"n"),
        (numbers(matrix), b"cm"),
        ([NAME("/Scene")], b"Do"),
        ([], b"Q"),
        ([], b"q"),
        (numbers((1, 0, 0, 1, dx, dy)), b"cm"),
    ]
    for values, operator in vector_ops:
        if operator in RGB_PAINT:
            operations.append((ink(values, separate), RGB_PAINT[operator]))
        else:
            if operator in (b"cs", b"CS"):
                require(values == ["/Pattern"], "Unexpected vector color space.")
            elif operator in (b"scn", b"SCN"):
                require(len(values) == 1 and values[0] in resources["/Pattern"], "Unexpected vector pattern.")
            else:
                require(operator not in UNSUPPORTED_PAINT, f"Unexpected paint operator {operator!r}.")
            operations.append((values, operator))
    operations.append(([], b"Q"))
    content.operations = operations
    page.replace_contents(content)
    for key, bounds in (("mediabox", BOX), ("cropbox", BOX), ("bleedbox", BOX), ("trimbox", TRIM)):
        setattr(page, key, RectangleObject(numbers(bounds)))
    embed_output_intent(writer, profile)
    writer.metadata = {
        "/Title": "体素池核 · VOXPOOL",
        "/Subject": "Portrait poster, 300 x 450 mm trim, 3 mm bleed, PSO Coated v3 (FOGRA51)",
    }
    with TemporaryDirectory(prefix=".voxpool-poster-", dir=destination.parent) as temporary:
        candidate = Path(temporary) / destination.name
        writer.write(candidate)
        verify(candidate, profile)
        candidate.replace(destination)
    print(f"Verified 300 × 450 mm trim, 3 mm bleed, FOGRA51, vectors, fonts and link. Scene: {72 / scale:.1f} ppi.")


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("scene", type=Path)
    parser.add_argument("overlay", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("icc", type=Path, nargs="?")
    args = parser.parse_args()
    finalize(args.overlay, args.scene, args.output, load_profile(args.icc))
