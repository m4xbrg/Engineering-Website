"use client";

import { useDeferredValue, useState } from "react";

import { ConceptCard } from "@/components/concepts/ConceptCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cleanText } from "@/lib/utils/format";
import { MAJOR_LABELS } from "@/lib/utils/routes";
import type { Concept, MajorSlug } from "@/types";

type ConceptExplorerProps = {
  concepts: Concept[];
};

export function ConceptExplorer({ concepts }: ConceptExplorerProps) {
  const [search, setSearch] = useState("");
  const [cluster, setCluster] = useState("all");
  const [major, setMajor] = useState<"all" | MajorSlug>("all");
  const deferredSearch = useDeferredValue(search);
  const query = deferredSearch.trim().toLowerCase();

  const clusterOptions = Array.from(
    new Set(concepts.flatMap((concept) => concept.topicClusters)),
  ).sort((left, right) => left.localeCompare(right));

  const filteredConcepts = concepts.filter((concept) => {
    const haystack = [
      concept.name,
      concept.shortDef,
      concept.extendedDef,
      ...concept.aliases,
    ]
      .map((value) => cleanText(value).toLowerCase())
      .join(" ");
    const matchesSearch = !query || haystack.includes(query);
    const matchesCluster =
      cluster === "all" || concept.topicClusters.includes(cluster);
    const matchesMajor = major === "all" || concept.majorTags.includes(major);

    return matchesSearch && matchesCluster && matchesMajor;
  });

  return (
    <div className="space-y-6">
      <div className="atlas-filter-panel grid gap-4 xl:grid-cols-[minmax(0,1.2fr),repeat(2,minmax(0,0.4fr))]">
        <label className="space-y-2">
          <span className="atlas-kicker">
            Search concepts
          </span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by concept, alias, or description"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
          />
        </label>
        <label className="space-y-2">
          <span className="atlas-kicker">
            Topic cluster
          </span>
          <select
            value={cluster}
            onChange={(event) => setCluster(event.target.value)}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
          >
            <option value="all">All clusters</option>
            {clusterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="atlas-kicker">
            Major
          </span>
          <select
            value={major}
            onChange={(event) => setMajor(event.target.value as "all" | MajorSlug)}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
          >
            <option value="all">All majors</option>
            {Object.entries(MAJOR_LABELS).map(([majorId, label]) => (
              <option key={majorId} value={majorId}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredConcepts.length} of {concepts.length} concepts.
      </p>

      {filteredConcepts.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredConcepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No concepts matched this search"
          description="Try clearing one of the filters to explore more of the atlas concept graph."
        />
      )}
    </div>
  );
}
