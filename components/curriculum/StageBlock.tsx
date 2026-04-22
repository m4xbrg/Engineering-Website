import { CourseCard } from "@/components/curriculum/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Course } from "@/types";

type StageBlockProps = {
  title: string;
  courses: Course[];
  description?: string;
};

export function StageBlock({ title, courses, description }: StageBlockProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {courses.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Shared foundation stage"
          description="This stage is modeled directly on the major record, but its linked courses are shared from Core Engineering rather than duplicated here."
        />
      )}
    </section>
  );
}
