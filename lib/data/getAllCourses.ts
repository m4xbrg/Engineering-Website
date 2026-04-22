import { courseSchema } from "@/lib/schemas";
import { courseSources } from "@/lib/data/sources";

export function getAllCourses() {
  return courseSchema.array().parse(courseSources);
}
