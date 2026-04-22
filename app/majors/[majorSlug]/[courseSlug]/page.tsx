import { notFound } from "next/navigation";

import { ConceptChip } from "@/components/concepts/ConceptChip";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getAllConcepts,
  getAllCourses,
  getCourse,
  getMajorOrThrow,
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
  const concepts = getAllConcepts().filter((concept) =>
    course.concepts.includes(concept.id),
  );

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
      {course.status !== "live" ? (
        <EmptyState
          title="Stub course detail"
          description="This page exists to prove the route architecture and data model. Rich curriculum content, prerequisite graphs, and deeper concept writing are intentionally deferred."
        />
      ) : null}
      <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="surface-panel space-y-5 p-6">
          <h2 className="text-2xl font-semibold">What is already modeled</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {course.shortDesc}
          </p>
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
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-xl font-semibold">V1 depth note</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Electrical Engineering is the first specialization targeted for
            deeper build-out. Other majors still receive stable URLs, page
            shells, and placeholder records so the product can expand without
            architectural rework.
          </p>
        </div>
      </section>
      {relatedTools.length ? (
        <ToolGrid tools={relatedTools} />
      ) : (
        <EmptyState
          title="No linked tools yet"
          description="Tool-to-course relationships for this route will grow as more curriculum content is normalized."
        />
      )}
    </>
  );
}
