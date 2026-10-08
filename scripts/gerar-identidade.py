"""
Gera a identidade grafica para navegadores e redes sociais.

A assinatura e desenhada a partir do mesmo vetor utilizado pelo componente
React Marca.jsx. Nao publica o simbolo de dente provisório.
Requer apenas Pillow; o GitHub Actions instala antes da compilacao.
"""
from pathlib import Path
import re

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ICONS = PUBLIC / "icons"
COLORS = {
    "marrom": "#301710",
    "tinta": "#241a16",
    "areia": "#eee4d8",
    "creme": "#f8f2ea",
    "linha": "#c9b6a0",
    "suave": "#695347",
}
LOGO_JSX = (ROOT / "src" / "components" / "Marca.jsx").read_text(encoding="utf-8")
match = re.search(r"const assinatura\s*=\s*\[([\s\S]*?)\];", LOGO_JSX)
if not match:
    raise RuntimeError("Nao foi possivel extrair a assinatura Bucalis de Marca.jsx")
PATHS = re.findall(r"'([^']+)'", match.group(1))
if len(PATHS) < 7:
    raise RuntimeError("Assinatura Bucalis incompleta")

def polygons(data):
    for subpath in re.findall(r"M\s*([^MZ]+?)\s*Z", data):
        nums = [float(n) for n in re.findall(r"-?\d+(?:\.\d+)?", subpath)]
        if len(nums) >= 6 and len(nums) % 2 == 0:
            yield list(zip(nums[0::2], nums[1::2]))

def paint_logo(draw, paths, scale, x, y, fill):
    for path in paths:
        for points in polygons(path):
            draw.polygon([(round(px * scale + x), round(py * scale + y)) for px, py in points], fill=fill)

def font(size):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
        "DejaVuSans.ttf",
    ]
    for name in candidates:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()

def centered_tracked(draw, text, y, font_obj, color, width, space):
    glyph_widths = [draw.textlength(char, font=font_obj) for char in text]
    full_width = sum(glyph_widths) + max(0, len(text) - 1) * space
    at = (width - full_width) / 2
    for char, glyph_width in zip(text, glyph_widths):
        draw.text((round(at), y), char, font=font_obj, fill=color)
        at += glyph_width + space

def bounds(paths):
    points = [pair for path in paths for poly in polygons(path) for pair in poly]
    xx = [p[0] for p in points]
    yy = [p[1] for p in points]
    return min(xx), min(yy), max(xx), max(yy)

def icon(size=512, safe=0.73):
    aa = 2
    length = size * aa
    picture = Image.new("RGB", (length, length), COLORS["marrom"])
    d = ImageDraw.Draw(picture)
    d.rounded_rectangle((0, 0, length - 1, length - 1), radius=round(length * .21), fill=COLORS["marrom"])
    b = PATHS[:2]
    x1, y1, x2, y2 = bounds(b)
    factor = min(length * safe / (x2 - x1), length * safe / (y2 - y1))
    offset_x = (length - (x2 - x1) * factor) / 2 - x1 * factor
    offset_y = (length - (y2 - y1) * factor) / 2 - y1 * factor
    paint_logo(d, b, factor, offset_x, offset_y, COLORS["areia"])
    return picture.resize((size, size), Image.Resampling.LANCZOS)

def favicon_svg():
    b = PATHS[:2]
    x1, y1, x2, y2 = bounds(b)
    size = 64
    factor = min(size * .73 / (x2 - x1), size * .73 / (y2 - y1))
    ox = (size - (x2 - x1) * factor) / 2 - x1 * factor
    oy = (size - (y2 - y1) * factor) / 2 - y1 * factor
    drawing = "".join('<path d="' + p + '"/>' for p in b)
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
        '<title>Bucalis Odontologia Especializada</title>'
        '<rect width="64" height="64" rx="14" fill="' + COLORS["marrom"] + '"/>'
        '<g fill="' + COLORS["areia"] + '" transform="translate('
        + f'{ox:.5f} {oy:.5f}) scale({factor:.7f})">' + drawing
        + '</g></svg>'
    )

def open_graph():
    aa = 2
    width, height = 1200 * aa, 630 * aa
    image = Image.new("RGB", (width, height), COLORS["areia"])
    d = ImageDraw.Draw(image)
    d.rectangle((0, 0, width, 20 * aa), fill=COLORS["marrom"])
    d.rectangle((0, height - 12 * aa, width, height), fill=COLORS["marrom"])
    d.line((110 * aa, 97 * aa, 1090 * aa, 97 * aa), fill=COLORS["linha"], width=2 * aa)
    d.line((110 * aa, 462 * aa, 1090 * aa, 462 * aa), fill=COLORS["linha"], width=2 * aa)
    # Assinatura manuscrita completa, identica ao componente React.
    factor = 0.63 * aa
    x = (width - 1550 * factor) / 2
    paint_logo(d, PATHS, factor, x, 112 * aa, COLORS["tinta"])
    centered_tracked(d, "ODONTOLOGIA ESPECIALIZADA", 494 * aa, font(31 * aa), COLORS["marrom"], width, 4 * aa)
    centered_tracked(d, "BRASÍLIA  ·  DF", 566 * aa, font(18 * aa), COLORS["suave"], width, 3 * aa)
    return image.resize((1200, 630), Image.Resampling.LANCZOS)

def main():
    ICONS.mkdir(exist_ok=True, parents=True)
    mark = favicon_svg()
    (PUBLIC / "favicon.svg").write_text(mark, encoding="utf-8")
    (PUBLIC / "favicon-bucalis.svg").write_text(mark, encoding="utf-8")
    exports = (
        ("favicon-32.png", 32, .73),
        ("favicon-bucalis-32.png", 32, .73),
        ("apple-touch-icon.png", 180, .73),
        ("apple-bucalis-touch-icon.png", 180, .73),
        ("icon-192.png", 192, .73),
        ("icon-bucalis-192.png", 192, .73),
        ("icon-512.png", 512, .73),
        ("icon-bucalis-512.png", 512, .73),
        ("icon-maskable-512.png", 512, .62),
        ("icon-bucalis-maskable-512.png", 512, .62),
    )
    for filename, px, safe in exports:
        icon(px, safe).save(ICONS / filename, format="PNG", optimize=True)
    og = open_graph()
    og.save(PUBLIC / "og-bucalis-2026.png", format="PNG", optimize=True)
    # Atualiza tambem a URL de imagem antiga, caso alguma rede a utilize.
    og.save(PUBLIC / "og-image.jpg", format="JPEG", quality=87, subsampling=0, optimize=True)
    for required in ("og-bucalis-2026.png", "favicon-bucalis.svg", "icons/favicon-bucalis-32.png"):
        path = PUBLIC / required
        if not path.is_file() or path.stat().st_size == 0:
            raise RuntimeError(f"Falha ao criar recurso: {required}")
    print("Bucalis: og-bucalis-2026.png 1200x630, favicon SVG e 10 icones PNG prontos.")

if __name__ == "__main__":
    main()
