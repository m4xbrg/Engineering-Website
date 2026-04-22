import { notFound } from "next/navigation";

import { StageBlock } from "@/components/curriculum/StageBlock";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCourse, getAllMajors, getMajorOrThrow } from "@/lib/data";

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
      {major.depthV1 === "map" ? (
        <EmptyState
          title="Map-level specialization content"
          description="This major already has a real route shell, overview layout, and course-detail pattern. Full editorial depth is intentionally deferred beyond this scaffold pass."
        />
      ) : null}
      <div className="space-y-8">
        {major.stages.map((stage) => (
          <StageBlock
            key={stage.id}
            title={stage.label}
            courses={stage.courseIds.map((courseId) =>
              getCourse(major.id, courseId),
            )}
          />
        ))}
      </div>
    </>
  );
}
