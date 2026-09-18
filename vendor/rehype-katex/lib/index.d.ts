import type { Root } from "hast";
import type { KatexOptions } from "katex";
import type { VFile } from "vfile";

export type Options = Omit<KatexOptions, "displayMode" | "throwOnError">;
export default function rehypeKatex(options?: Readonly<Options> | null): (tree: Root, file: VFile) => undefined;
