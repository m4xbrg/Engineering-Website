import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { cleanText } from "@/lib/utils/format";
import { getCourseRoute } from "@/lib/utils/routes";
import type { Course } from "@/types";

type CourseCardProps = {
  course: Course;
  variant?: "default" | "compact";
};

export function CourseCard({
  course,
  variant = "default",
}: CourseCardProps) {
  const compact = variant === "compact";

  return (
    <Link
      href={getCourseRoute(course.majorId, course.id)}
      className={[
        "surface-panel flex h-full flex-col gap-5 p-5 transition-transform hover:-translate-y-1",
        course.isElective ? "border-dashed" : "",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="muted">Year {course.year}</Badge>
        <Badge tone={course.status === "live" ? "accent" : "warning"}>
          {course.isElective ? "Elective slot" : course.status}
        </Badge>
        {course.topicClusters[0] ? <Badge>{course.topicClusters[0]}</Badge> : null}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <p className="text-sm leading-7 text-muted-foreground">
          {cleanText(course.shortDesc)}
        </p>
      </div>
      {compact ? (
        <div className="grid gap-2 rounded-[1.4rem] border border-border bg-white/70 p-4 text-sm text-muted-foreground sm:grid-cols-2">
          <p>{course.prereqs.length} prerequisite links</p>
          <p>{course.concepts.length} concept links</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {course.topicClusters.map((cluster) => (
              <Badge key={cluster}>{cluster}</Badge>
            ))}
          </div>
          {(course.skills.length || course.externalLeadsInto.length) && (
            <div className="grid gap-2 rounded-[1.4rem] border border-border bg-white/70 p-4 text-sm text-muted-foreground sm:grid-cols-2">
              <p>{course.skills.length} skill markers</p>
              <p>{course.leadsInto.length + course.externalLeadsInto.length} next-step links</p>
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
