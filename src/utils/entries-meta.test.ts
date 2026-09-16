import { expect, test } from "bun:test";
import { fileURLToPath } from "node:url";
import { entryIdFromPath, lastmodFor, unlistedPaths } from "./entries-meta";

test("嵌套 index 的 id 不含 /index", () => {
  const file = fileURLToPath(new URL("../content/entries/taichi-ray-tracing/index.mdx", import.meta.url));
  expect(entryIdFromPath(file)).toBe("taichi-ray-tracing");
});

test("sitemap lastmod 能命中嵌套条目", () => {
  const date = lastmodFor("https://shao.fun/blog/taichi-ray-tracing/");
  expect(date?.toISOString().startsWith("2023-04-02")).toBe(true);
});

test("独立页 lastmod 用文件名而不是 blog 前缀", () => {
  const date = lastmodFor("https://shao.fun/about/");
  expect(date?.toISOString().startsWith("2026-09-15")).toBe(true);
});

test("unlisted 路径带正确前缀", () => {
  const paths = unlistedPaths();
  expect(paths).toContain("/blog/static-blog-architecture/");
  expect(paths).not.toContain("/works/static-blog-architecture/");
});
