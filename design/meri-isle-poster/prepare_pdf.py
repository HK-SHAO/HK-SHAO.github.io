from argparse import ArgumentParser
from hashlib import sha256
import json
from pathlib import Path
import sys
from tempfile import TemporaryDirectory

from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, DictionaryObject, NameObject, RectangleObject

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "voxpool-poster"))
from prepare_pdf import (
    RGB_PAINT,
    color_separator,
    embed_output_intent,
    ink,
    load_profile,
    numbers,
    require,
    scene_stream,
)
from press import PROFILE_HASH

CAPTION = "上岛，用英语开启崭新的生活"
LINK_LABEL = "shao.fun/isle"
LINK_TARGET = "https://shao.fun/isle"
WIDTH, HEIGHT, BLEED = (mm * 72 / 25.4 for mm in (216, 303, 3))
BOX = (0, 0, WIDTH, HEIGHT)
TRIM = (BLEED, BLEED, WIDTH - BLEED, HEIGHT - BLEED)
SAFE_INSET = 3 * 72 / 25.4
PAGE_BOXES = {
    "/MediaBox": BOX,
    "/CropBox": BOX,
    "/BleedBox": BOX,
    "/TrimBox": TRIM,
}
OTHER_PAINT = {b"cs", b"CS", b"sc", b"SC", b"scn", b"SCN", b"Do", b"sh", b"INLINE IMAGE"}


def release_profile(path):
    if path is not None:
        return load_profile(path)
    reference = Path(__file__).resolve().parent.parent / "business-card" / "business-card.pdf"
    intent = PdfReader(reference, strict=True).root_object["/OutputIntents"][0]
    profile = intent["/DestOutputProfile"].get_data()
    require(sha256(profile).hexdigest() == PROFILE_HASH, "The embedded profile must match the official PSOcoated_v3.icc.")
    return profile


def scene_placement(layout, scene_size):
    x, top, width, height = (value * 72 / 96 for value in layout["rect"])
    require(x >= 0 and top >= 0 and width > 0 and height > 0
            and x + width <= WIDTH + 0.25 and top + height <= HEIGHT + 0.25,
            "The scene rectangle must stay within the print sheet.")
    if abs(x + width - WIDTH) < 0.25:
        width = WIDTH - x
    if abs(top + height - HEIGHT) < 0.25:
        height = HEIGHT - top
    fit = layout["fit"]
    require(fit in ("cover", "contain", "fill"), "Use cover, contain or fill for the scene.")
    pixel_w, pixel_h = scene_size
    sx, sy = width / pixel_w, height / pixel_h
    if fit != "fill":
        sx = sy = (max if fit == "cover" else min)(sx, sy)
    image_w, image_h = pixel_w * sx, pixel_h * sy
    position_x, position_y = layout["position"]
    y = HEIGHT - top - height
    matrix = (image_w, 0, 0, image_h, x + (width - image_w) * position_x,
              y + (height - image_h) * (1 - position_y))
    ppi = 72 / max(sx, sy)
    require(ppi >= 150, f"The placed scene provides only {ppi:.1f} ppi; it needs at least 150 ppi.")
    return (x, y, width, height), matrix, ppi


def vector_operations(operations, separate):
    require(sum(op in (b"m", b"l", b"c") for _, op in operations) >= 20,
            "Expected vector wordmark paths.")
    for values, op in operations:
        if op in RGB_PAINT:
            yield ink(values, separate), RGB_PAINT[op]
        elif op in (b"g", b"G"):
            yield ink(values * 3, separate), b"k" if op == b"g" else b"K"
        else:
            require(op not in OTHER_PAINT, f"Unsupported overlay paint operator {op!r}.")
            yield values, op


def landing_link(page):
    annotations = page.get("/Annots", ArrayObject()).get_object()
    require(len(annotations) == 1, "Expected exactly one poster link.")
    link = annotations[0].get_object()
    action = link.get("/A", DictionaryObject()).get_object()
    require(link.get("/Subtype") == "/Link" and action.get("/S") == "/URI"
            and action.get("/URI") == LINK_TARGET, "Unexpected poster link target.")
    return link


def verify(path, profile):
    pdf = PdfReader(path, strict=True)
    require(len(pdf.pages) == 1 and not pdf.is_encrypted, "Expected one unencrypted print page.")
    page = pdf.pages[0]
    for key, expected in PAGE_BOXES.items():
        require(key in page and all(abs(float(a) - b) < 0.0001
                                    for a, b in zip(page[key], expected, strict=True)), f"Invalid {key}.")
    require(page.rotation == 0 and page.user_unit == 1, "Unexpected rotation or units.")
    x1, y1, x2, y2 = map(float, landing_link(page)["/Rect"])
    left, bottom, right, top = TRIM
    require(left + SAFE_INSET <= x1 < x2 <= right - SAFE_INSET
            and bottom + SAFE_INSET <= y1 < y2 <= top - SAFE_INSET,
            "The poster link lies outside the trim safe area.")
    resources = page["/Resources"]
    images = resources["/XObject"]
    require(set(images) == {"/Scene"} and images["/Scene"]["/ColorSpace"] == "/DeviceCMYK",
            "Expected exactly one CMYK scene bitmap.")
    require(not {"/Pattern", "/Shading", "/ColorSpace"} & resources.keys(),
            "Unexpected vector colors or gradients.")
    operators = [op for _, op in page.get_contents().operations]
    require(operators.count(b"Do") == 1 and b"BT" in operators
            and not (set(RGB_PAINT) | OTHER_PAINT - {b"Do"} | {b"g", b"G"}).intersection(operators),
            "Expected CMYK vectors, live type and one raster draw.")
    fonts = resources.get("/Font", DictionaryObject()).get_object()
    faces = set()
    for reference in fonts.values():
        font = reference.get_object()["/DescendantFonts"][0].get_object()
        require("/FontFile2" in font["/FontDescriptor"], "Expected an embedded TrueType font.")
        faces.add(str(font["/BaseFont"]).split("+")[-1])
    require(faces == {"Sarasa-UI-SC-Regular", "Sarasa-UI-SC-SemiBold"},
            "The caption and URL require embedded Sarasa UI SC Regular and SemiBold.")
    text_lines = ["".join(line.split()) for line in page.extract_text().splitlines() if line.strip()]
    require(sorted(text_lines) == sorted((CAPTION, LINK_LABEL)), "Expected the caption and link as separate text.")
    intent = pdf.root_object["/OutputIntents"][0]
    icc = intent["/DestOutputProfile"]
    require(intent["/OutputConditionIdentifier"] == "FOGRA51" and icc["/N"] == 4
            and icc.get_data() == profile, "Incorrect FOGRA51 output intent.")


def finalize(layout, overlay, destination, profile):
    source = PdfReader(overlay, strict=True)
    require(len(source.pages) == 1, "Expected one browser PDF page.")
    writer = PdfWriter()
    writer.pdf_header = source.pdf_header
    page = writer.add_page(source.pages[0])
    link = landing_link(page)
    resources = page["/Resources"]
    require(not {"/XObject", "/ColorSpace", "/Shading", "/Pattern"} & resources.keys(),
            "Expected a transparent overlay containing only vectors and text.")
    for reference in resources.get("/ExtGState", DictionaryObject()).get_object().values():
        state = reference.get_object()
        require(float(state.get("/ca", 1)) == float(state.get("/CA", 1)) == 1
                and state.get("/BM", "/Normal") == "/Normal" and state.get("/SMask", "/None") == "/None",
                "The print overlay requires opaque shapes.")
    old_width, old_height = map(float, (page.mediabox.width, page.mediabox.height))
    require(abs(old_width - WIDTH) < 1 and abs(old_height - HEIGHT) < 1, "Incorrect browser PDF sheet.")
    dx, dy = (WIDTH - old_width) / 2, (HEIGHT - old_height) / 2
    x1, y1, x2, y2 = map(float, link["/Rect"])
    link[NameObject("/Rect")] = RectangleObject(numbers((x1 + dx, y1 + dy, x2 + dx, y2 + dy)))

    separate = color_separator(profile)
    scene, size = scene_stream(Path(layout["scene"]), profile)
    clip, matrix, ppi = scene_placement(layout, size)
    resources[NameObject("/XObject")] = DictionaryObject({NameObject("/Scene"): writer._add_object(scene)})
    content = page.get_contents()
    content.operations = [
        ([], b"q"),
        (numbers(separate(tuple(layout["paper"]))), b"k"),
        (numbers(BOX), b"re"),
        ([], b"f"),
        ([], b"Q"),
        ([], b"q"),
        (numbers(clip), b"re"),
        ([], b"W"),
        ([], b"n"),
        (numbers(matrix), b"cm"),
        ([NameObject("/Scene")], b"Do"),
        ([], b"Q"),
        ([], b"q"),
        (numbers((0, 0, 0, 1)), b"k"),
        (numbers((0, 0, 0, 1)), b"K"),
        (numbers((1, 0, 0, 1, dx, dy)), b"cm"),
        *vector_operations(content.operations, separate),
        ([], b"Q"),
    ]
    page.replace_contents(content)
    for key, expected in PAGE_BOXES.items():
        page[NameObject(key)] = RectangleObject(numbers(expected))
    embed_output_intent(writer, profile)
    writer.metadata = {
        "/Title": "美丽岛™ Meri Isle™",
        "/Subject": "210 x 297 mm trim, 3 mm bleed, PSO Coated v3 (FOGRA51)",
    }
    writer.compress_identical_objects()
    with TemporaryDirectory(prefix=".meri-isle-poster-", dir=destination.parent) as temporary:
        candidate = Path(temporary) / destination.name
        writer.write(candidate)
        verify(candidate, profile)
        candidate.replace(destination)
    print(f"Verified 210 × 297 mm trim, 3 mm bleed, FOGRA51, vectors, embedded type and link. Scene: {ppi:.1f} ppi.")


if __name__ == "__main__":
    parser = ArgumentParser(description="Finish the Meri Isle poster for print.")
    parser.add_argument("composition", type=Path)
    parser.add_argument("overlay", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("icc", type=Path, nargs="?")
    args = parser.parse_args()
    finalize(json.loads(args.composition.read_text(encoding="utf-8")), args.overlay, args.output, release_profile(args.icc))
