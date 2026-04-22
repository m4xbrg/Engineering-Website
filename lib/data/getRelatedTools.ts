import { getAllConcepts } from "@/lib/data/getConcept";
import { getAllToolDefs } from "@/lib/data/getToolDef";

export function getRelatedTools(input: {
  courseId?: string;
  conceptId?: string;
  clusterId?: string;
}) {
  const concepts = input.conceptId ? getAllConcepts() : [];
  const relatedCourseIds = input.conceptId
    ? concepts.find((concept) => concept.id === input.conceptId)?.taughtIn ?? []
    : [];
  const relatedClusters = input.conceptId
    ? concepts.find((concept) => concept.id === input.conceptId)?.topicClusters ?? []
    : [];

  return getAllToolDefs().filter((tool) => {
    if (input.courseId && tool.courseIds.includes(input.courseId)) {
      return true;
    }

    if (input.conceptId && tool.conceptIds.includes(input.conceptId)) {
      return true;
    }

    if (
      relatedCourseIds.length &&
      tool.courseIds.some((courseId) => relatedCourseIds.includes(courseId))
    ) {
      return true;
    }

    if (
      input.clusterId &&
      tool.clusterIds.includes(input.clusterId)
    ) {
      return true;
    }

    if (
      relatedClusters.length &&
      tool.clusterIds.some((clusterId) => relatedClusters.includes(clusterId))
    ) {
      return true;
    }

    return false;
  });
}
