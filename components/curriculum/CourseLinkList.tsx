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
          className="inline-flex rounded-full border border-border bg-white/80 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {cleanText(course.title)}
        </Link>
      ))}
    </div>
  );
}
