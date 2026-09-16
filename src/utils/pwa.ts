import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

const TEMPLATE = fileURLToPath(new URL("./pwa-sw.js", import.meta.url));
const CACHEABLE = /\.(?:html|css|js|webmanifest)$/;
const EXCLUDED = /^(?:sw\.js|404\.html|apple-touch-icon\.png|icon-\d+\.png)$/;

const listFiles = async (dir: string, prefix = ""): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? listFiles(join(dir, entry.name), `${prefix}${entry.name}/`)
        : Promise.resolve([`${prefix}${entry.name}`]),
    ),
  );
  return nested.flat();
};

const toRoute = (file: string) =>
  file === "index.html"
    ? "/"
    : file.endsWith("/index.html")
      ? `/${file.slice(0, -"index.html".length)}`
      : `/${file}`;

const sha256 = (input: string | Uint8Array) => createHash("sha256").update(input).digest("hex");

export const pwa = (): AstroIntegration => ({
  name: "pwa",
  hooks: {
    "astro:build:done": async ({ dir, logger }) => {
      const root = fileURLToPath(dir);
      const files = (await listFiles(root)).filter((file) => {
        const name = file.slice(file.lastIndexOf("/") + 1);
        return CACHEABLE.test(name) && !EXCLUDED.test(name);
      });
      const routes = [...new Set(files.map(toRoute))].sort();
      const version = sha256(
        (await Promise.all(files.map(async (file) => sha256(await readFile(join(root, file)))))).join("\n"),
      ).slice(0, 12);
      const template = await readFile(TEMPLATE, "utf8");
      const worker = template
        .replace("__VERSION__", version)
        .replace('["__PRECACHE__"]', JSON.stringify(routes));
      if (worker.includes("__VERSION__") || worker.includes("__PRECACHE__")) {
        throw new Error("service worker 模板占位符没被完整替换，拒绝产出");
      }
      await writeFile(join(root, "sw.js"), worker);
      logger.info(`service worker: 预缓存 ${routes.length} 项，版本 ${version}`);
    },
  },
});
