import { prereqEdgeSchema } from "@/lib/schemas";
import { prerequisiteSource } from "@/lib/data/sources";

export function getAllPrereqs() {
  return prereqEdgeSchema.array().parse(prerequisiteSource);
}

export function getPrereqsForCourse(courseId: string) {
  return getAllPrereqs().filter((edge) => edge.to === courseId);
}
