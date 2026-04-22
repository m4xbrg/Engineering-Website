import type { ReactNode } from "react";

import { CourseCard } from "@/components/curriculum/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cleanText } from "@/lib/utils/format";
import type { Course } from "@/types";

type StageBlockProps = {
  title: string;
  courses: Course[];
  description?: string;
  variant?: "default" | "compact";
  emptyState?: ReactNode;
};

export function StageBlock({
  title,
  courses,
  description,
  variant = "default",
  emptyState,
}: StageBlockProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description ? (
          <p className="text-sm leading-7 text-muted-foreground">
            {cleanText(description)}
          </p>
        ) : null}
      </div>
      {courses.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} variant={variant} />
          ))}
        </div>
      ) : emptyState ? (
        <div>{emptyState}</div>
      ) : (
        <EmptyState
          title="Shared foundation stage"
          description="This stage is modeled directly on the major record, but its linked courses are shared from Core Engineering rather than duplicated here."
        />
      )}
    </section>
  );
}
