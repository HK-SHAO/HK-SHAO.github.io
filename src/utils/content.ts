import { getCollection, type CollectionEntry } from "astro:content";
import { PAGE_TAG, WORK_TAG } from "./tags";

type Entry = CollectionEntry<"entries">;

const byDate = (left: Entry, right: Entry) =>
  (right.data.publishedAt?.valueOf() ?? 0) - (left.data.publishedAt?.valueOf() ?? 0);

const byWorkDate = (left: Entry, right: Entry) =>
  ((right.data.updatedAt ?? right.data.publishedAt)?.valueOf() ?? 0) -
  ((left.data.updatedAt ?? left.data.publishedAt)?.valueOf() ?? 0);

const isPost = ({ data }: Entry) => !data.tags.includes(WORK_TAG) && !data.tags.includes(PAGE_TAG);
const isWork = ({ data }: Entry) => data.tags.includes(WORK_TAG);

async function getEntries() {
  return (await getCollection("entries", ({ data }) => data.visibility !== "excluded")).sort(byDate);
}

async function getListedEntries() {
  return (await getEntries()).filter(({ data }) => data.visibility === "public");
}

export async function getPostRoutes() {
  return (await getEntries()).filter(isPost);
}

export async function getWorkRoutes() {
  return (await getEntries()).filter(isWork);
}

export async function getPosts() {
  return (await getListedEntries()).filter(isPost);
}

export async function getWorks() {
  return (await getListedEntries()).filter(isWork).sort(byWorkDate);
}
