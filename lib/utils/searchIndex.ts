import Fuse from "fuse.js";

type SearchableRecord = {
  id: string;
  name?: string;
  title?: string;
  term?: string;
  shortDef?: string;
  description?: string;
};

export function buildSearchIndex<T extends SearchableRecord>(
  items: T[],
  keys: Array<keyof T>,
) {
  return new Fuse(items, {
    includeScore: true,
    threshold: 0.35,
    keys: keys.map((key) => String(key)),
  });
}
