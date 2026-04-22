import { notFound } from "next/navigation";

import { ConceptChip } from "@/components/concepts/ConceptChip";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getAllCourses,
  getConceptsForCourse,
  getCourse,
  getMajorOrThrow,
  getResolvedLeadsIntoForCourse,
  getResolvedPrereqsForCourse,
  getRelatedTools,
} from "@/lib/data";

type MajorCoursePageProps = {
  params: Promise<{
    majorSlug: string;
    courseSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllCourses()
    .filter((course) => course.majorId !== "core")
    .map((course) => ({
      majorSlug: course.majorId,
      courseSlug: course.id,
    }));
}

export default async function MajorCoursePage({
  params,
}: MajorCoursePageProps) {
  const { majorSlug, courseSlug } = await params;

  if (majorSlug === "core") {
    notFound();
  }

  const major = getMajorOrThrow(majorSlug);
  const course = getCourse(majorSlug, courseSlug);
  const relatedTools = getRelatedTools({ courseId: course.id });
  const concepts = getConceptsForCourse(course.id);
  const prereqs = getResolvedPrereqsForCourse(course.id);
  const leadsInto = getResolvedLeadsIntoForCourse(course.id);

  return (
    <>
      <BreadcrumbBar
        items={[
          { href: "/", label: "Home" },
          { href: "/curriculum", label: "Curriculum" },
          { href: `/majors/${major.id}`, label: major.name },
          { label: course.title },
        ]}
      />
      <PageHeader
        eyebrow={major.shortName}
        title={course.title}
        description={course.whyItMatters}
        meta={
          <>
            <Badge tone={course.status === "live" ? "accent" : "warning"}>
              {course.status}
            </Badge>
            <Badge>{course.stageId}</Badge>
          </>
        }
      />
      <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="surface-panel space-y-5 p-6">
          <h2 className="text-2xl font-semibold">Course overview</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {course.shortDesc}
          </p>
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
              {concepts.length ? (
                concepts.map((concept) => (
                  <ConceptChip
                    key={concept.id}
                    slug={concept.id}
                    name={concept.name}
                  />
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  Concept authoring for this course is still pending.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <section className="surface-panel p-6">
            <h2 className="text-xl font-semibold">Prerequisites</h2>
            {prereqs.length ? (
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
                {prereqs.map((prereq) => (
                  <li key={prereq.id}>{prereq.title}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                No internal prerequisite courses are currently linked.
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
          <section className="surface-panel space-y-4 p-6">
            <h2 className="text-xl font-semibold">V1 depth note</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {major.depthV1 === "full"
                ? "This specialization is part of the fully detailed V1 track, so its course relationships and tool links are populated more deeply."
                : "This specialization is currently mapped structurally: the curriculum data is real, but the editorial and interactive depth is intentionally lighter than Core Engineering and Electrical Engineering."}
            </p>
          </section>
        </div>
      </section>
      {relatedTools.length ? <ToolGrid tools={relatedTools} /> : null}
    </>
  );
}
