import type { ShikiTransformer } from "shiki";

/** 支持 ```python {4-6} / {2,7-9} 形式的行强调，还原 VuePress 的 meta 语法。 */
export function metaLineHighlight(): ShikiTransformer {
  const parse = (raw: unknown): Set<number> => {
    const lines = new Set<number>();
    const rawText = typeof raw === "string" ? raw : (raw as { __raw?: string } | null | undefined)?.__raw;
    const match = typeof rawText === "string" ? rawText.match(/\{([^}]*)\}/) : undefined;
    const list = match?.[1] ?? "";
    for (const part of list.split(",")) {
      const range = part.trim().match(/^(\d+)-(\d+)$/);
      if (range) {
        for (let i = Number(range[1]); i <= Number(range[2]); i++) lines.add(i);
      } else if (/^\d+$/.test(part.trim())) {
        lines.add(Number(part.trim()));
      }
    }
    return lines;
  };

  return {
    name: "meta-line-highlight",
    line(node, line) {
      const wanted = parse(this.options.meta);
      if (wanted.has(line)) this.addClassToHast(node, "highlighted");
    },
  };
}
