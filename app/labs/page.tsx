import { ToolExplorer } from "@/components/tools/ToolExplorer";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAllConcepts, getAllCourses, getAllMajors, getAllToolDefs, getAllTopicClusters } from "@/lib/data";

export default function LabsPage() {
  const tools = getAllToolDefs();
  const courses = getAllCourses();
  const majors = getAllMajors();
  const clusters = getAllTopicClusters();
  const liveTools = tools.filter((tool) => tool.status === "live").length;
  const toolDirectory = tools.map((tool) => ({
    ...tool,
    majorLabels: tool.majorIds
      .map((majorId) => majors.find((major) => major.id === majorId)?.name)
      .filter((value): value is string => Boolean(value)),
    courseLabels: tool.courseIds
      .map((courseId) => courses.find((course) => course.id === courseId)?.title)
      .filter((value): value is string => Boolean(value)),
    clusterLabels: tool.clusterIds
      .map((clusterId) => clusters.find((cluster) => cluster.id === clusterId)?.name)
      .filter((value): value is string => Boolean(value)),
  }));
  const conceptCount = getAllConcepts().filter((concept) => concept.toolLinks.length > 0).length;

  return (
    <>
      <BreadcrumbBar
        items={[{ href: "/", label: "Home" }, { label: "Labs" }]}
      />
      <PageHeader
        eyebrow="Labs hub"
        title="Tool discovery for the first serious Engineering Atlas MVP layer."
        description="Browse the current Labs system by category, major, and topic cluster. Each tool page now shares a common learning layout and ties its controls back into the curriculum, concepts, and neighboring lab surfaces."
        meta={
          <>
            <Badge tone="accent">{liveTools} live tools</Badge>
            <Badge tone="warning">{tools.length - liveTools} planned later</Badge>
            <Badge>{conceptCount} concept links already connected into labs</Badge>
          </>
        }
      />

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Tool catalog"
          title="Filter by category, major, or topic cluster"
          description="Use the hub as the applied-tools index for the current MVP, with each card pointing back to the courses and majors it serves."
        />
        <ToolExplorer tools={toolDirectory} />
      </section>
    </>
  );
}
