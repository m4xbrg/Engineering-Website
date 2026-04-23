import Link from "next/link";
import { notFound } from "next/navigation";

import { ConceptChip } from "@/components/concepts/ConceptChip";
import { CourseLinkList } from "@/components/curriculum/CourseLinkList";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getAllCourses,
  getAllMajors,
  getAllToolDefs,
  getConceptsForCourse,
  getCourse,
  getMajorOrThrow,
  getResolvedLeadsIntoForCourse,
  getResolvedPrereqsForCourse,
  getRelatedTools,
} from "@/lib/data";
import { cleanText, readableDepth } from "@/lib/utils/format";
import { getMajorRoute } from "@/lib/utils/routes";

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
  const concepts = getConceptsForCourse(course.id);
  const prereqs = getResolvedPrereqsForCourse(course.id);
  const leadsInto = getResolvedLeadsIntoForCourse(course.id);
  const directTools = getRelatedTools({ courseId: course.id });
  const relatedTools = directTools.length
    ? directTools
    : getAllToolDefs().filter(
        (tool) =>
          tool.majorIds.includes(major.id) &&
          (tool.clusterIds.some((cluster) => course.topicClusters.includes(cluster)) ||
            tool.conceptIds.some((conceptId) => course.concepts.includes(conceptId))),
      );
  const adjacentMajors = getAllMajors().filter(
    (candidate) =>
      candidate.id !== major.id &&
      candidate.id !== "core" &&
      candidate.conceptClusters.some((cluster) => course.topicClusters.includes(cluster)),
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
        description={cleanText(course.whyItMatters)}
        meta={
          <>
            <Badge tone={major.depthV1 === "full" ? "accent" : "warning"}>
              {readableDepth(major.depthV1)}
            </Badge>
            <Badge>{cleanText(course.stageLabel)}</Badge>
            <Badge>{course.status}</Badge>
          </>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="surface-panel space-y-5 p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Course overview</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {cleanText(course.shortDesc)}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Why it matters
            </h3>
            <p className="text-sm leading-7 text-muted-foreground">
              {cleanText(course.whyItMatters)}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Skill tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <Badge key={skill} tone="muted">
                  {cleanText(skill)}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Topic clusters
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.topicClusters.map((cluster) => (
                <Badge key={cluster}>{cluster}</Badge>
              ))}
            </div>
          </div>
          {major.depthV1 === "map" ? (
            <div className="rounded-2xl border border-dashed border-border bg-white/70 p-4">
              <p className="text-sm leading-7 text-muted-foreground">
                This page is intentionally lighter than the Electrical Engineering and Core Engineering detail pages. The structure is real and navigable, but fuller editorial treatment is still coming.
              </p>
            </div>
          ) : null}
          {course.referenceNote ? (
            <div className="rounded-2xl border border-border bg-white/70 p-4">
              <p className="text-sm leading-7 text-muted-foreground">
                {cleanText(course.referenceNote)}
              </p>
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <section className="surface-panel space-y-4 p-6">
            <h2 className="text-xl font-semibold">Prerequisites</h2>
            {prereqs.length ? (
              <CourseLinkList courses={prereqs} />
            ) : (
              <p className="text-sm text-muted-foreground">
                No internal prerequisite links are currently modeled.
              </p>
            )}
            {course.externalPrereqs.length ? (
              <p className="text-sm text-muted-foreground">
                External prerequisites: {course.externalPrereqs.join(", ")}
              </p>
            ) : null}
          </section>

          <section className="surface-panel space-y-4 p-6">
            <h2 className="text-xl font-semibold">Leads into</h2>
            {leadsInto.length ? (
              <CourseLinkList courses={leadsInto} />
            ) : (
              <p className="text-sm text-muted-foreground">
                No direct downstream atlas course is currently linked.
              </p>
            )}
            {course.externalLeadsInto.length ? (
              <p className="text-sm text-muted-foreground">
                Additional paths: {course.externalLeadsInto.join(", ")}
              </p>
            ) : null}
          </section>

          {adjacentMajors.length ? (
            <section className="surface-panel space-y-4 p-6">
              <h2 className="text-xl font-semibold">Related majors</h2>
              <div className="flex flex-wrap gap-2">
                {adjacentMajors.slice(0, 4).map((candidate) => (
                  <Link
                    key={candidate.id}
                    href={getMajorRoute(candidate.id)}
                    className="atlas-chip-link"
                  >
                    {candidate.name}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-xl font-semibold">Concepts</h2>
          {concepts.length ? (
            <div className="flex flex-wrap gap-2">
              {concepts.map((concept) => (
                <ConceptChip key={concept.id} slug={concept.id} name={concept.name} />
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-muted-foreground">
              Concept authoring for this course is still pending.
            </p>
          )}
        </div>

        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-xl font-semibold">Foundation relationship</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            This course sits inside the {major.name} pathway and depends on the shared foundation through its prerequisite chain and topic clusters.
          </p>
          <Link
            href="/curriculum/core"
            className="atlas-button-secondary"
          >
            Revisit Core Engineering
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Lab integration"
          title="Related labs"
          description="These tools are the applied surfaces most closely aligned with this course's concepts, clusters, and downstream skills."
        />
        {relatedTools.length ? (
          <ToolGrid tools={relatedTools.slice(0, major.depthV1 === "full" ? 4 : 2)} />
        ) : (
          <div className="surface-panel p-6 text-sm leading-7 text-muted-foreground">
            No tool metadata is linked to this course yet, but the route structure is ready for future labs coverage.
          </div>
        )}
      </section>
    </>
  );
}
