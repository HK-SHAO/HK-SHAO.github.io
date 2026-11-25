import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { chromium } from "playwright";

const directory = dirname(fileURLToPath(import.meta.url));
const origin = "http://business-card.test";
const files = new Map([
  ["/", "index.html"],
  ["/fonts/regular.woff2", "fonts/regular.woff2"],
  ["/fonts/semibold.woff2", "fonts/semibold.woff2"],
  ["/fonts/bold.woff2", "fonts/bold.woff2"],
]);

const output = process.argv[2] ? resolve(process.argv[2]) : join(directory, "business-card.pdf");
const scratch = await mkdtemp(join(tmpdir(), "business-card-"));
const rgb = join(scratch, "browser.pdf");

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
    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts].filter((font) => font.status === "loaded").map((font) => font.weight);
    });
    if (fonts.sort().join(",") !== "400,600,700") {
      throw new Error("All three bundled Sarasa UI SC faces must load before export.");
    }
    await page.pdf({ path: rgb, printBackground: true, preferCSSPageSize: true });
  } finally {
    await browser.close();
  }

  const args = ["run", "--locked", "--project", directory, "python", join(directory, "press.py"), rgb, output];
  if (process.env.BUSINESS_CARD_ICC) args.push(resolve(process.env.BUSINESS_CARD_ICC));
  const { stdout } = await promisify(execFile)("uv", args);
  process.stdout.write(stdout);
} catch (error) {
  console.error(error.stderr || error.message);
  process.exitCode = 1;
} finally {
  await rm(scratch, { recursive: true, force: true });
}
