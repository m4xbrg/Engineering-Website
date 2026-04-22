type ClusteredRecord = {
  clusterIds?: string[];
  topicClusters?: string[];
};

export function filterByCluster<T extends ClusteredRecord>(
  records: T[],
  clusterId: string,
) {
  return records.filter((record) => {
    const clusters = record.clusterIds ?? record.topicClusters ?? [];
    return clusters.includes(clusterId);
  });
}
