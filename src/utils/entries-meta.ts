import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { WORK_TAG } from "./tags";

const ROOT = fileURLToPath(new URL("../content/entries", import.meta.url));

export type EntryMeta = {
  id: string;
  visibility: "public" | "unlisted" | "excluded";
  isWork: boolean;
  modifiedAt?: Date;
};

const field = (frontmatter: string, name: string) =>
  new RegExp(`^${name}:\\s*(.+)$`, "m").exec(frontmatter)?.[1]?.trim();

const parseDate = (raw?: string) => {
  if (!raw) return undefined;
  const date = new Date(raw.replace(/^["']|["']$/g, ""));
  return Number.isNaN(date.valueOf()) ? undefined : date;
};

const parseTags = (frontmatter: string) => {
  const list = /^tags:\s*\[([^\]]*)\]/m.exec(frontmatter)?.[1] ?? "";
  return list.split(",").map((tag) => tag.trim().replace(/^["']|["']$/g, ""));
};

export const entryIdFromPath = (file: string) =>
  relative(ROOT, file).split(sep).join("/").replace(/\.mdx?$/, "").replace(/\/index$/, "");

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    return /\.mdx?$/.test(entry.name) ? [path] : [];
  });

const parseEntry = (file: string): EntryMeta => {
  const text = readFileSync(file, "utf8");
  const end = text.indexOf("\n---", 3);
  const frontmatter = text.startsWith("---") && end > 0 ? text.slice(3, end) : "";
  const visibilityRaw = field(frontmatter, "visibility");
  const visibility = visibilityRaw === "unlisted" || visibilityRaw === "excluded" ? visibilityRaw : "public";
  const tags = parseTags(frontmatter);
  const modifiedAt = parseDate(field(frontmatter, "updatedAt")) ?? parseDate(field(frontmatter, "publishedAt"));

  return {
    id: entryIdFromPath(file),
    visibility,
    isWork: tags.some((tag) => tag.toLowerCase() === WORK_TAG.toLowerCase()),
    ...(modifiedAt ? { modifiedAt } : {}),
  };
};

const load = () => walk(ROOT).map(parseEntry);

let cache: EntryMeta[] | undefined;
const entries = () => (cache ??= load());

export const unlistedPaths = () =>
  entries()
    .filter(({ visibility }) => visibility === "unlisted")
    .map(({ id, isWork }) => `${isWork ? "/works/" : "/blog/"}${id}/`);

export const lastmodFor = (url: string) => {
  const pathname = new URL(url).pathname.replace(/\/+$/, "") || "/";
  const id = pathname.startsWith("/blog/")
    ? pathname.slice("/blog/".length)
    : pathname.startsWith("/works/")
      ? pathname.slice("/works/".length)
      : pathname.slice(1);
  if (!id) return undefined;
  return entries().find((entry) => entry.id === id)?.modifiedAt;
};
