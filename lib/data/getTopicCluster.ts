import { notFound } from "next/navigation";

import { getCatalog } from "@/lib/data/catalog";

export function getAllTopicClusters() {
  return getCatalog().topicClusters;
}

export function getTopicCluster(clusterId: string) {
  const cluster = getCatalog().topicClusters.find((item) => item.id === clusterId);

  if (!cluster) {
    notFound();
  }

  return cluster;
}
