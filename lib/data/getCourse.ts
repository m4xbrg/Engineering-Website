import { notFound } from "next/navigation";

import { courseSchema } from "@/lib/schemas";
import { getAllCourses } from "@/lib/data/getAllCourses";

export function getCourse(majorSlug: string, courseSlug: string) {
  const course = getAllCourses().find(
    (item) => item.majorId === majorSlug && item.id === courseSlug,
  );

  if (!course) {
    notFound();
  }

  return courseSchema.parse(course);
}

export function getCoursesForMajor(majorSlug: string) {
  return getAllCourses().filter((course) => course.majorId === majorSlug);
}
