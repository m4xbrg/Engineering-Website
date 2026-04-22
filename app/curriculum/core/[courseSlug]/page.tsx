import { ConceptChip } from "@/components/concepts/ConceptChip";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getAllConcepts,
  getCoursesForMajor,
  getCourse,
  getPrereqsForCourse,
  getRelatedTools,
} from "@/lib/data";

type CoreCoursePageProps = {
  params: Promise<{
    courseSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getCoursesForMajor("core").map((course) => ({
    courseSlug: course.id,
  }));
}

export default async function CoreCoursePage({ params }: CoreCoursePageProps) {
  const { courseSlug } = await params;
  const course = getCourse("core", courseSlug);
  const conceptMap = getAllConcepts().filter((concept) =>
    course.concepts.includes(concept.id),
  );
  const relatedTools = getRelatedTools({ courseId: course.id });
  const prereqs = getPrereqsForCourse(course.id);

  return (
    <>
      <BreadcrumbBar
        items={[
          { href: "/", label: "Home" },
          { href: "/curriculum", label: "Curriculum" },
          { href: "/curriculum/core", label: "Core Engineering" },
          { label: course.title },
        ]}
      />
      <PageHeader
        eyebrow="Core course"
        title={course.title}
        description={course.whyItMatters}
        meta={
          <>
            <Badge tone="accent">{course.stageId}</Badge>
            <Badge>{course.status}</Badge>
          </>
        }
      />
      <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="surface-panel space-y-5 p-6">
          <h2 className="text-2xl font-semibold">Course skeleton</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {course.shortDesc}
          </p>
          <div className="grid gap-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Skills placeholder
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
                {course.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Concepts
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {conceptMap.length ? (
                  conceptMap.map((concept) => (
                    <ConceptChip
                      key={concept.id}
                      slug={concept.id}
                      name={concept.name}
                    />
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No concepts authored yet.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <section className="surface-panel p-6">
            <h2 className="text-xl font-semibold">Prerequisite chain</h2>
            {prereqs.length ? (
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                {prereqs.map((edge) => (
                  <li key={`${edge.from}-${edge.to}`}>{edge.from}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                No prerequisite edges authored for this placeholder record yet.
              </p>
            )}
          </section>
          {!relatedTools.length ? (
            <EmptyState
              title="Tool links reserved"
              description="Related tool cards will appear here as the curriculum graph fills in."
            />
          ) : null}
        </div>
      </section>
      {relatedTools.length ? <ToolGrid tools={relatedTools} /> : null}
    </>
  );
}
