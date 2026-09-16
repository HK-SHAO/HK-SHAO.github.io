export const WORK_TAG = "Work";
export const PAGE_TAG = "Page";
export const RESERVED_TAGS = new Set([WORK_TAG, PAGE_TAG]);

const CANONICAL = new Map([...RESERVED_TAGS].map((tag) => [tag.toLowerCase(), tag]));

export function normalizeTags(tags: string[]) {
  const seen = new Set<string>();
  const kept: string[] = [];

  for (const raw of tags) {
    const tag = raw.trim();
    const key = tag.toLowerCase();
    if (!tag || seen.has(key)) continue;
    seen.add(key);
    kept.push(CANONICAL.get(key) ?? tag);
  }

  return kept;
}
