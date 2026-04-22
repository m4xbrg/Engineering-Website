import { CourseCard } from "@/components/curriculum/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Course } from "@/types";

type StageBlockProps = {
  title: string;
  courses: Course[];
};

export function StageBlock({ title, courses }: StageBlockProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          Placeholder course records are here so the route skeleton can generate
          real detail pages.
        </p>
      </div>
      {courses.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Stage reserved"
          description="This stage exists in the architecture, but its full course inventory has not been authored yet."
        />
      )}
    </section>
  );
}
