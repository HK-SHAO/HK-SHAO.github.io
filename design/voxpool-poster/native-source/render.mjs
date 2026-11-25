import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? "playwright");
const url = process.env.POSTER_URL ?? "http://127.0.0.1:40619/.local/tests/voxpool-poster/";
const output = resolve(process.argv[2] ?? ".local/tests/voxpool-poster/output");
const defaults = {
  name: "voxpool-native",
  width: 4096,
  height: 6144,
  samples: 64,
  causticGrid: 128,
  reflections: 128,
  exposure: -4,
  shadows: 1.85,
  animation: 4.2,
  latitude: -28,
  utc: 1773973200000,
  yaw: -0.43,
  position: [14.55, 6.65, 40.25],
};
const configs = process.argv[3] ? JSON.parse(process.argv[3]) : [defaults];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-webgpu", "--disable-background-timer-throttling"],
});
try {
  for (const [index, patch] of configs.entries()) {
    const page = await browser.newPage({ viewport: { width: 720, height: 1080 } });
    page.on("console", (message) => {
      if (message.type() === "error" || message.type() === "warning") console.error(message.text());
    });
    page.on("pageerror", (error) => console.error(error));
    await page.goto(url, { timeout: 120_000 });
    await page.waitForFunction(() => typeof window.capturePoster === "function", null, { timeout: 120_000 });
    const { png, map, settings } = await page.evaluate((options) => window.capturePoster(options), {
      ...defaults,
      ...patch,
    });
    const name = patch.name ?? (configs.length === 1 ? defaults.name : String(index + 1));
    await Promise.all([
      writeFile(resolve(output, name + ".png"), Buffer.from(png.split(",")[1], "base64")),
      writeFile(resolve(output, name + ".vpool"), Buffer.from(map.split(",")[1], "base64")),
      writeFile(resolve(output, name + ".json"), JSON.stringify(settings, null, 2) + "\n"),
    ]);
    console.log(name, settings.width, settings.height, JSON.stringify(settings.sunDirection));
    await page.close();
  }
} finally {
  await browser.close();
}
