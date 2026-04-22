import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { getCourseRoute } from "@/lib/utils/routes";
import type { Course } from "@/types";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={getCourseRoute(course.majorId, course.id)}
      className="surface-panel flex h-full flex-col gap-4 p-5 transition-transform hover:-translate-y-1"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="muted">Year {course.year}</Badge>
        <Badge tone={course.status === "live" ? "accent" : "warning"}>
          {course.status}
        </Badge>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <p className="text-sm leading-7 text-muted-foreground">
          {course.shortDesc}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {course.topicClusters.map((cluster) => (
          <Badge key={cluster}>{cluster}</Badge>
        ))}
      </div>
    </Link>
  );
}
