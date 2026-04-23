import Link from "next/link";

import { ConceptChip } from "@/components/concepts/ConceptChip";
import { CourseLinkList } from "@/components/curriculum/CourseLinkList";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getAllMajors,
  getAllToolDefs,
  getConceptsForCourse,
  getCoursesForMajor,
  getCourse,
  getResolvedLeadsIntoForCourse,
  getResolvedPrereqsForCourse,
  getRelatedTools,
} from "@/lib/data";
import { cleanText } from "@/lib/utils/format";
import { getMajorRoute } from "@/lib/utils/routes";

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
  const concepts = getConceptsForCourse(course.id);
  const prereqs = getResolvedPrereqsForCourse(course.id);
  const leadsInto = getResolvedLeadsIntoForCourse(course.id);
  const usedByMajors = getAllMajors().filter((major) =>
    major.coreFoundationIds.includes(course.id),
  );
  const directTools = getRelatedTools({ courseId: course.id });
  const relatedTools = directTools.length
    ? directTools
    : getAllToolDefs().filter((tool) =>
        tool.clusterIds.some((cluster) => course.topicClusters.includes(cluster)),
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
        description={cleanText(course.whyItMatters)}
        meta={
          <>
            <Badge tone="accent">{cleanText(course.stageLabel)}</Badge>
            <Badge>{course.status}</Badge>
            <Badge>{course.topicClusters.length} topic clusters</Badge>
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
              Skills
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
              Concepts
            </h3>
            <div className="flex flex-wrap gap-2">
              {concepts.length ? (
                concepts.map((concept) => (
                  <ConceptChip key={concept.id} slug={concept.id} name={concept.name} />
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  No concepts have been authored for this course yet.
                </span>
              )}
            </div>
          </div>
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
                This course starts a visible branch of the shared core.
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
                No direct downstream core course is currently linked.
              </p>
            )}
            {course.externalLeadsInto.length ? (
              <p className="text-sm text-muted-foreground">
                Additional pathways: {course.externalLeadsInto.join(", ")}
              </p>
            ) : null}
          </section>
          {usedByMajors.length ? (
            <section className="surface-panel space-y-4 p-6">
              <h2 className="text-xl font-semibold">Used across majors</h2>
              <div className="flex flex-wrap gap-2">
                {usedByMajors.map((major) => (
                  <Link
                    key={major.id}
                    href={getMajorRoute(major.id)}
                    className="atlas-chip-link"
                  >
                    {major.name}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <section className="surface-panel space-y-4 p-6">
        <h2 className="text-xl font-semibold">Topic clusters</h2>
        <div className="flex flex-wrap gap-2">
          {course.topicClusters.map((cluster) => (
            <Badge key={cluster}>{cluster}</Badge>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Lab integration"
          title="Related labs"
          description="These tools are the clearest applied extensions of this shared-core course inside the current MVP."
        />
        {relatedTools.length ? (
          <ToolGrid tools={relatedTools.slice(0, 4)} />
        ) : (
          <div className="surface-panel p-6 text-sm leading-7 text-muted-foreground">
            Tool coverage for this core course has not been linked yet.
          </div>
        )}
      </section>
    </>
  );
}
