import Link from "next/link";

import { cleanText } from "@/lib/utils/format";
import { getCourseRoute } from "@/lib/utils/routes";
import type { Course } from "@/types";

type CourseLinkListProps = {
  courses: Course[];
};

export function CourseLinkList({ courses }: CourseLinkListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {courses.map((course) => (
        <Link
          key={`${course.majorId}-${course.id}`}
          href={getCourseRoute(course.majorId, course.id)}
          className="atlas-chip-link"
        >
          {cleanText(course.title)}
        </Link>
      ))}
    </div>
  );
}
