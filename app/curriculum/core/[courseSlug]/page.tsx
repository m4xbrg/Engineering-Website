import { ConceptChip } from "@/components/concepts/ConceptChip";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getAllMajors,
  getConceptsForCourse,
  getCoursesForMajor,
  getCourse,
  getResolvedLeadsIntoForCourse,
  getResolvedPrereqsForCourse,
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
  const conceptMap = getConceptsForCourse(course.id);
  const relatedTools = getRelatedTools({ courseId: course.id });
  const prereqs = getResolvedPrereqsForCourse(course.id);
  const leadsInto = getResolvedLeadsIntoForCourse(course.id);
  const usedByMajors = getAllMajors().filter((major) =>
    major.coreFoundationIds.includes(course.id),
  );

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
          <h2 className="text-2xl font-semibold">Course overview</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {course.shortDesc}
          </p>
          <div className="grid gap-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Skills
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
                {course.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            {course.referenceNote ? (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Shared note
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {course.referenceNote}
                </p>
              </div>
            ) : null}
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
                {prereqs.map((prereq) => (
                  <li key={prereq.id}>{prereq.title}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                No internal prerequisite courses are modeled for this course.
              </p>
            )}
            {course.externalPrereqs.length ? (
              <p className="mt-4 text-sm text-muted-foreground">
                External prerequisites: {course.externalPrereqs.join(", ")}
              </p>
            ) : null}
          </section>
          <section className="surface-panel p-6">
            <h2 className="text-xl font-semibold">Leads into</h2>
            {leadsInto.length ? (
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                {leadsInto.map((nextCourse) => (
                  <li key={nextCourse.id}>{nextCourse.title}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                No internal downstream courses are currently linked.
              </p>
            )}
            {course.externalLeadsInto.length ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Additional paths: {course.externalLeadsInto.join(", ")}
              </p>
            ) : null}
          </section>
          {usedByMajors.length ? (
            <section className="surface-panel p-6">
              <h2 className="text-xl font-semibold">Used by majors</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {usedByMajors.map((major) => (
                  <Badge key={major.id}>{major.shortName}</Badge>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
      {relatedTools.length ? <ToolGrid tools={relatedTools} /> : null}
    </>
  );
}
