import { readFile } from "node:fs/promises";
import type { AstroIntegration } from "astro";
import { site } from "../site.config";

export const theme = (): AstroIntegration => ({
  name: "theme",
  hooks: {
    "astro:config:setup": async () => {
      const css = await readFile(new URL("../styles/tokens.css", import.meta.url), "utf8");
      const paper = /--paper:\s*light-dark\(\s*([^,\s]+)\s*,\s*([^)\s]+)\s*\)/.exec(css);
      if (!paper) throw new Error("--paper 须为 light-dark(浅, 深)");
      const [, light, dark] = paper;
      if (site.themeColor.light !== light || site.themeColor.dark !== dark) {
        throw new Error(`themeColor 须与 --paper 一致（${light} / ${dark}）`);
      }
    },
  },
});
