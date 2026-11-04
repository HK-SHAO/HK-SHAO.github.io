import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { pwa } from "./src/utils/pwa";
import { theme } from "./src/utils/theme";
import { metaLineHighlight } from "./src/utils/meta-line-highlight";
import { lastmodFor, unlistedPaths } from "./src/utils/entries-meta";
import { workRedirects } from "./src/utils/work-routes";

const unlisted = new Set(unlistedPaths());

export default defineConfig({
  site: "https://shao.fun",
  output: "static",
  redirects: workRedirects,
  integrations: [
    mdx(),
    pwa(),
    theme(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== "/offline/" && !unlisted.has(path) && !Object.hasOwn(workRedirects, path);
      },
      namespaces: { news: false, xhtml: false, image: false, video: false },
      serialize: (item) => {
        const lastmod = lastmodFor(item.url);
        return lastmod ? { ...item, lastmod: lastmod.toISOString() } : item;
      },
    }),
  ],
  markdown: {
    syntaxHighlight: { type: "shiki", excludeLangs: ["math"] },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      theme: "github-dark-default",
      transformers: [metaLineHighlight()],
    },
  },
  build: {
    format: "directory",
  },
});
