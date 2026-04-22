import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { RelatedContent } from "@/components/tools/RelatedContent";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolRecommendations } from "@/components/tools/ToolRecommendations";
import { ToolRuntime } from "@/components/tools/ToolRuntime";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  getAllConcepts,
  getAllCourses,
  getAllToolDefs,
  getToolDef,
} from "@/lib/data";
import { getCourseRoute } from "@/lib/utils/routes";
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
  const courses = getAllCourses()
    .filter((course) => tool.courseIds.includes(course.id))
    .map((course) => ({
      href: getCourseRoute(course.majorId, course.id),
      label: course.title,
    }));
  const concepts = getAllConcepts()
    .filter((concept) => tool.conceptIds.includes(concept.id))
    .map((concept) => ({
      href: `/concepts/${concept.id}`,
      label: concept.name,
    }));
  const recommendedTools = getAllToolDefs()
    .filter((candidate) => candidate.id !== tool.id)
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
      <ToolHeader tool={tool} />
      <EmptyState
        title="Tool implementation intentionally deferred"
        description="This route, metadata model, and client-side mounting pattern are live. The actual engineering logic and visualizations will be added in the next tool-focused pass."
      />
      <ToolRuntime toolSlug={tool.id} />
      <section className="grid gap-6 xl:grid-cols-2">
        <RelatedContent title="Related courses" items={courses} />
        <RelatedContent title="Related concepts" items={concepts} />
      </section>
      <ToolRecommendations tools={recommendedTools} />
    </>
  );
}
