import { notFound } from "next/navigation";

import { StageBlock } from "@/components/curriculum/StageBlock";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getAllMajors,
  getAllToolDefs,
  getCourseBySlug,
  getCoursesForMajor,
  getMajorOrThrow,
} from "@/lib/data";

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
        description={major.description}
        meta={
          <>
            <Badge tone={major.depthV1 === "full" ? "accent" : "warning"}>
              {major.depthV1 === "full"
                ? "Deep build in V1"
                : "Map-level in V1"}
            </Badge>
            {major.mainSubfields.map((field) => (
              <Badge key={field}>{field}</Badge>
            ))}
          </>
        }
      />
      <section className="surface-panel space-y-4 p-6">
        <h2 className="text-2xl font-semibold">How this major builds</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          {major.summaryChain}
        </p>
      </section>
      {major.coreFoundationIds.length ? (
        <section className="surface-panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">Shared Core Foundation</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {major.coreFoundationIds.map((courseId) => {
              const course = getCourseBySlug(courseId);
              return (
                <div key={course.id} className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-semibold">{course.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {course.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
      <div className="space-y-8">
        {major.stages.map((stage) => (
          <StageBlock
            key={stage.id}
            title={stage.label}
            description={stage.description}
            courses={getCoursesForMajor(major.id).filter((course) =>
              stage.courseIds.includes(course.id),
            )}
          />
        ))}
      </div>
      {major.recommendedTools.length ? (
        <ToolGrid
          tools={getAllToolDefs().filter((tool) =>
            major.recommendedTools.includes(tool.id),
          )}
        />
      ) : null}
    </>
  );
}
