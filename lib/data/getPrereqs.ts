import { getCatalog } from "@/lib/data/catalog";
import { getAllCourses } from "@/lib/data/getAllCourses";
import { getCourseBySlug } from "@/lib/data/getCourse";

export function getAllDependencies() {
  return getCatalog().dependencies;
}

export function getPrereqsForCourse(courseId: string) {
  return getCatalog().dependencies.filter((edge) => edge.to === courseId);
}

export function getResolvedPrereqsForCourse(courseId: string) {
  const prereqIds = getCourseBySlug(courseId).prereqs;
  return getAllCourses().filter((course) => prereqIds.includes(course.id));
}

export function getResolvedLeadsIntoForCourse(courseId: string) {
  const leadIds = getCourseBySlug(courseId).leadsInto;
  return getAllCourses().filter((course) => leadIds.includes(course.id));
}
