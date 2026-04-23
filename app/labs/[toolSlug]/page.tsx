import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { ToolRuntime } from "@/components/tools/ToolRuntime";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  getAllConcepts,
  getAllCourses,
  getAllMajors,
  getAllToolDefs,
  getToolDef,
} from "@/lib/data";
import { getCourseRoute, getMajorRoute } from "@/lib/utils/routes";
import type { ToolSlug } from "@/types";

type ToolPageProps = {
  params: Promise<{
    toolSlug: ToolSlug;
  }>;
};

export async function generateStaticParams() {
  return getAllToolDefs().map((tool) => ({ toolSlug: tool.id }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { toolSlug } = await params;
  const tool = getToolDef(toolSlug);
  const majors = getAllMajors();
  const courses = getAllCourses()
    .filter((course) => tool.courseIds.includes(course.id))
    .map((course) => ({
      href: getCourseRoute(course.majorId, course.id),
      label: course.title,
      description: course.whyItMatters,
    }));
  const majorLinks = majors
    .filter((major) => tool.majorIds.includes(major.id))
    .map((major) => ({
      href: getMajorRoute(major.id),
      label: major.name,
      description: major.description,
    }));
  const concepts = getAllConcepts()
    .filter((concept) => tool.conceptIds.includes(concept.id))
    .map((concept) => ({
      href: `/concepts/${concept.id}`,
      label: concept.name,
      description: concept.shortDef,
    }));
  const recommendedTools = getAllToolDefs()
    .filter(
      (candidate) =>
        candidate.id !== tool.id &&
        (candidate.clusterIds.some((clusterId) => tool.clusterIds.includes(clusterId)) ||
          candidate.majorIds.some((majorId) => tool.majorIds.includes(majorId))),
    )
    .slice(0, 3);

  return (
    <>
      <BreadcrumbBar
        items={[
          { href: "/", label: "Home" },
          { href: "/labs", label: "Labs" },
          { label: tool.name },
        ]}
      />
      <ToolPageLayout
        tool={tool}
        majorLinks={majorLinks}
        courseLinks={courses}
        conceptLinks={concepts}
        recommendations={recommendedTools}
      >
        {tool.status === "live" ? (
          <ToolRuntime toolSlug={tool.id} />
        ) : (
          <>
            <EmptyState
              title="Planned for a later Labs pass"
              description={`${tool.whyMvp} This page is intentionally present now so the atlas can still show where the tool belongs in the curriculum and concept system.`}
            />
            <ToolRuntime toolSlug={tool.id} />
          </>
        )}
      </ToolPageLayout>
    </>
  );
}
