import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const directory = dirname(fileURLToPath(import.meta.url));
const toolchain = resolve(directory, "../business-card");
const { chromium } = createRequire(join(toolchain, "package.json"))("playwright");
const origin = "http://meri-poster.test";
const localAsset = /^\/(?:[\w-]+\/)*[\w-]+\.(?:css|png|svg|ttf|woff2)$/;
const output = process.argv[2] ? resolve(process.argv[2]) : join(directory, "meri-isle-poster.pdf");
const scratch = await mkdtemp(join(tmpdir(), "meri-isle-poster-"));
const overlay = join(scratch, "overlay.pdf");
const composition = join(scratch, "composition.json");

async function printOverlay() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ locale: "zh-CN", timezoneId: "UTC", viewport: { width: 817, height: 1146 } });
    await page.route("**/*", (route) => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.abort();
      const path = url.pathname === "/" ? "index.html" : localAsset.test(url.pathname) && url.pathname.slice(1);
      return path ? route.fulfill({ path: join(directory, path) }) : route.abort();
    });
    await page.emulateMedia({ media: "print" });
    await page.goto(origin);
    const layout = await page.evaluate(async () => {
      const artboard = document.querySelector("[data-press-artboard]");
      const image = document.querySelector("[data-press-scene]");
      if (!artboard || !(image instanceof HTMLImageElement)) {
        throw new Error("The print layout requires an artboard and one marked scene image.");
      }
      await document.fonts.ready;
      await Promise.all([...artboard.querySelectorAll("img")].map((element) => element.decode()));
      const page = artboard.getBoundingClientRect();
      if (
        Math.abs(page.x) > 0.05 ||
        Math.abs(page.y) > 0.05 ||
        Math.abs((page.width * 25.4) / 96 - 216) > 0.05 ||
        Math.abs((page.height * 25.4) / 96 - 303) > 0.05
      ) {
        throw new Error("The print artboard must cover a 216 × 303 mm sheet at page origin.");
      }
      const scene = image.getBoundingClientRect();
      const style = getComputedStyle(image);
      if (
        style.transform !== "none" ||
        style.borderRadius !== "0px" ||
        style.opacity !== "1" ||
        style.filter !== "none" ||
        style.borderWidth !== "0px" ||
        style.padding !== "0px"
      ) {
        throw new Error("The scene requires a plain rectangular image box.");
      }
      const positions = style.objectPosition.split(" ");
      if (positions.length !== 2 || positions.some((value) => !/^-?\d+(?:\.\d+)?%$/.test(value))) {
        throw new Error("Use two percentage values for the scene object-position.");
      }
      const paper = document.createElement("canvas").getContext("2d");
      paper.fillStyle = getComputedStyle(artboard).backgroundColor;
      paper.fillRect(0, 0, 1, 1);
      const [red, green, blue, alpha] = paper.getImageData(0, 0, 1, 1).data;
      if (alpha !== 255) throw new Error("The print artboard needs an opaque paper background.");
      return {
        paper: [red, green, blue],
        rect: [scene.left - page.left, scene.top - page.top, scene.width, scene.height],
        fit: style.objectFit,
        position: positions.map((value) => parseFloat(value) / 100),
        scene: image.currentSrc,
      };
    });
    const scene = new URL(layout.scene);
    if (scene.origin !== origin || !localAsset.test(scene.pathname) || !scene.pathname.endsWith(".png")) {
      throw new Error("The scene must be a PNG stored alongside the poster.");
    }
    layout.scene = join(directory, scene.pathname.slice(1));
    await page.addStyleTag({
      content:
        "html, body, main, [data-press-artboard] { background: transparent !important; }" +
        "[data-press-scene] { visibility: hidden !important; }",
    });
    await page.pdf({ path: overlay, printBackground: true, preferCSSPageSize: true });
    await writeFile(composition, JSON.stringify(layout));
  } finally {
    await browser.close();
  }
}

try {
  await printOverlay();
  const args = [
    "run",
    "--locked",
    "--project",
    toolchain,
    "python",
    "-B",
    join(directory, "prepare_pdf.py"),
    composition,
    overlay,
    output,
  ];
  if (process.env.MERI_ISLE_POSTER_ICC) args.push(resolve(process.env.MERI_ISLE_POSTER_ICC));
  const { stdout } = await promisify(execFile)("uv", args);
  process.stdout.write(stdout);
} catch (error) {
  console.error(error.stderr || error.message);
  process.exitCode = 1;
} finally {
  await rm(scratch, { recursive: true, force: true });
}
