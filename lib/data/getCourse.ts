import { notFound } from "next/navigation";

import { getCatalog } from "@/lib/data/catalog";

export function getCourse(majorSlug: string, courseSlug: string) {
  const course = getCatalog().courses.find(
    (item) => item.majorId === majorSlug && item.id === courseSlug,
  );

  if (!course) {
    notFound();
  }

  return course;
}

export function getCourseBySlug(courseSlug: string) {
  const course = getCatalog().courses.find((item) => item.id === courseSlug);

  if (!course) {
    notFound();
  }

  return course;
}

export function getCoursesForMajor(majorSlug: string) {
  return getCatalog().courses.filter((course) => course.majorId === majorSlug);
}
