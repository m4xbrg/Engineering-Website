import Link from "next/link";
import { notFound } from "next/navigation";

import { StageBlock } from "@/components/curriculum/StageBlock";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getAllMajors,
  getAllToolDefs,
  getCourseBySlug,
  getCoursesForMajor,
  getMajorOrThrow,
} from "@/lib/data";
import { cleanText, readableDepth } from "@/lib/utils/format";
import { getCourseRoute } from "@/lib/utils/routes";

type MajorOverviewPageProps = {
  params: Promise<{
    majorSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllMajors()
    .filter((major) => major.id !== "core")
    .map((major) => ({
      majorSlug: major.id,
    }));
}

export default async function MajorOverviewPage({
  params,
}: MajorOverviewPageProps) {
  const { majorSlug } = await params;

  if (majorSlug === "core") {
    notFound();
  }

  const major = getMajorOrThrow(majorSlug);
  const courses = getCoursesForMajor(major.id);
  const relatedTools = getAllToolDefs().filter((tool) =>
    major.recommendedTools.includes(tool.id),
  );
  const depthVariant = major.depthV1 === "full" ? "default" : "compact";

  return (
    <>
      <BreadcrumbBar
        items={[
          { href: "/", label: "Home" },
          { href: "/curriculum", label: "Curriculum" },
          { label: major.name },
        ]}
      />
      <PageHeader
        eyebrow="Major overview"
        title={major.name}
        description={cleanText(major.description)}
        meta={
          <>
            <Badge tone={major.depthV1 === "full" ? "accent" : "warning"}>
              {readableDepth(major.depthV1)}
            </Badge>
            <Badge>{courses.length} courses</Badge>
            <Badge>{major.stages.length} stages</Badge>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Atlas depth</p>
          <p className="mt-2 text-2xl font-semibold">{readableDepth(major.depthV1)}</p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Course map</p>
          <p className="mt-2 text-2xl font-semibold">{courses.length} courses</p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Core dependencies</p>
          <p className="mt-2 text-2xl font-semibold">{major.coreFoundationIds.length}</p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Recommended labs</p>
          <p className="mt-2 text-2xl font-semibold">{relatedTools.length}</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">How this major builds</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {cleanText(major.summaryChain)}
          </p>
          <div className="flex flex-wrap gap-2">
            {major.mainSubfields.map((field) => (
              <Badge key={field}>{field}</Badge>
            ))}
          </div>
        </div>
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">V1 coverage</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {major.depthV1 === "full"
              ? "This major has the richest editorial coverage in the current MVP. Course pages include fuller concept and tool relationships, so it already feels like the reference implementation for the rest of the atlas."
              : "This major is currently delivered as a strong curriculum map. The stage structure, courses, dependencies, and concept links are usable now, while deeper editorial and interactive treatment will be added in later passes."}
          </p>
          <Link
            href="/curriculum/core"
            className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Review the shared core foundation
          </Link>
        </div>
      </section>

      {major.coreFoundationIds.length ? (
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Foundation zone"
            title="Shared Core Engineering courses this major relies on"
            description="These courses are linked directly into the core overview and core course pages so the foundation remains visible while browsing a specialization."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {major.coreFoundationIds.map((courseId) => {
              const course = getCourseBySlug(courseId);

              return (
                <Link
                  key={course.id}
                  href={getCourseRoute(course.majorId, course.id)}
                  className="surface-panel h-full space-y-3 p-5 transition-transform hover:-translate-y-1"
                >
                  <Badge tone="muted">{course.stageLabel}</Badge>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {cleanText(course.shortDesc)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="space-y-8">
        <SectionHeader
          eyebrow="Curriculum stages"
          title="Year-by-year course structure"
          description="Each stage below links into course detail pages. Electrical Engineering is more complete, while the other majors stay intentionally compact but still navigable."
        />
        {major.stages.map((stage) => (
          <StageBlock
            key={stage.id}
            title={cleanText(stage.label)}
            description={stage.description}
            variant={depthVariant}
            courses={courses.filter((course) => stage.courseIds.includes(course.id))}
            emptyState={
              stage.id === "foundation" ? (
                <div className="surface-panel space-y-4 p-6">
                  <h3 className="text-xl font-semibold">Foundation courses live in Core Engineering</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    This stage is shared rather than duplicated. Use the linked core courses above, or open the Core Engineering overview for the full foundation map.
                  </p>
                </div>
              ) : undefined
            }
          />
        ))}
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Topic clusters"
          title="Main knowledge areas in this major"
          description="These cluster tags help tie the major into concepts and the future labs system."
        />
        <div className="surface-panel flex flex-wrap gap-2 p-6">
          {major.conceptClusters.map((cluster) => (
            <Badge key={cluster}>{cluster}</Badge>
          ))}
        </div>
      </section>

      {relatedTools.length ? (
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Labs bridge"
            title={
              major.depthV1 === "full"
                ? "Tool metadata already linked into this specialization"
                : "Future tools already mapped to this specialization"
            }
            description="The tool UIs are still pending, but these cards already act as forward links from the curriculum into the labs layer."
          />
          <ToolGrid
            tools={major.depthV1 === "full" ? relatedTools : relatedTools.slice(0, 4)}
          />
        </section>
      ) : null}
    </>
  );
}
