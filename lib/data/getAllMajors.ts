import { getCatalog } from "@/lib/data/catalog";

export function getAllMajors() {
  return getCatalog().majors;
}

export function getMajorIndexItems() {
  return getCatalog().majorsIndex;
}
