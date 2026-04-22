import { getAllToolDefs } from "@/lib/data/getToolDef";

export function getRelatedTools(input: {
  courseId?: string;
  conceptId?: string;
  clusterId?: string;
}) {
  return getAllToolDefs().filter((tool) => {
    if (input.courseId && tool.courseIds.includes(input.courseId)) {
      return true;
    }

    if (input.conceptId && tool.conceptIds.includes(input.conceptId)) {
      return true;
    }

    if (input.clusterId && tool.clusterIds.includes(input.clusterId)) {
      return true;
    }

    return false;
  });
}
