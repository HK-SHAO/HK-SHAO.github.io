import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const directory = dirname(fileURLToPath(import.meta.url));
const toolchain = resolve(directory, "../business-card");
const { chromium } = createRequire(join(toolchain, "package.json"))("playwright");
const origin = "http://voxpool-poster.test";
const files = new Map([
  ["/", "index.html"],
  ["/title-zh.svg", "title-zh.svg"],
  ["/voxpool-logo.svg", "voxpool-logo.svg"],
  ["/fonts/regular.woff2", "fonts/regular.woff2"],
  ["/fonts/semibold.woff2", "fonts/semibold.woff2"],
]);

const output = process.argv[2] ? resolve(process.argv[2]) : join(directory, "voxpool-poster.pdf");
const scratch = await mkdtemp(join(tmpdir(), "voxpool-poster-"));
const overlay = join(scratch, "overlay.pdf");

try {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ locale: "en-US", timezoneId: "UTC" });
    await page.route("**/*", (route) => {
      const url = new URL(route.request().url());
      const file = url.origin === origin && files.get(url.pathname);
      return file ? route.fulfill({ path: join(directory, file) }) : route.abort();
    });
    await page.goto(origin);
    await page.emulateMedia({ media: "print" });
    await page.addStyleTag({ content: ".scene { display: none }" });
    await page.locator(".wordmarks img").evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts].filter((font) => font.status === "loaded").map((font) => font.weight);
    });
    if (!fonts.includes("600")) {
      throw new Error("The bundled Sarasa UI SC SemiBold must load before export.");
    }
    await page.pdf({ path: overlay, printBackground: true, preferCSSPageSize: true });
  } finally {
    await browser.close();
  }

  const args = [
    "run",
    "--locked",
    "--project",
    toolchain,
    "python",
    "-B",
    join(directory, "prepare_pdf.py"),
    join(directory, "scene.png"),
    overlay,
    output,
  ];
  if (process.env.VOXPOOL_POSTER_ICC) args.push(resolve(process.env.VOXPOOL_POSTER_ICC));
  const { stdout } = await promisify(execFile)("uv", args);
  process.stdout.write(stdout);
} catch (error) {
  console.error(error.stderr || error.message);
  process.exitCode = 1;
} finally {
  await rm(scratch, { recursive: true, force: true });
}
