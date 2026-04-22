import { getCatalog } from "@/lib/data/catalog";

export function getAllCourses() {
  return getCatalog().courses;
}
