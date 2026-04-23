"use client";

import { useDeferredValue, useState } from "react";

import { ToolGrid } from "@/components/tools/ToolGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { cleanText } from "@/lib/utils/format";
import { MAJOR_LABELS } from "@/lib/utils/routes";
import type { ToolDefinition } from "@/types";

type ToolDirectoryEntry = ToolDefinition & {
  majorLabels: string[];
  courseLabels: string[];
  clusterLabels: string[];
};

type ToolExplorerProps = {
  tools: ToolDirectoryEntry[];
};

export function ToolExplorer({ tools }: ToolExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [major, setMajor] = useState("all");
  const [cluster, setCluster] = useState("all");
  const deferredSearch = useDeferredValue(search);
  const query = deferredSearch.trim().toLowerCase();

  const categories = Array.from(new Set(tools.map((tool) => tool.category)));
  const clusters = Array.from(
    new Set(tools.flatMap((tool) => tool.clusterLabels).sort()),
  );
  const liveTools = tools.filter((tool) => tool.status === "live").length;

  const filteredTools = tools.filter((tool) => {
    const haystack = [
      tool.name,
      tool.description,
      tool.purpose,
      tool.whyMvp,
      ...tool.majorLabels,
      ...tool.courseLabels,
      ...tool.clusterLabels,
      ...tool.clusterIds,
    ]
      .map((value) => cleanText(value).toLowerCase())
      .join(" ");
    const matchesSearch = !query || haystack.includes(query);
    const matchesCategory = category === "all" || tool.category === category;
    const matchesMajor = major === "all" || tool.majorIds.includes(major);
    const matchesCluster = cluster === "all" || tool.clusterLabels.includes(cluster);

    return matchesSearch && matchesCategory && matchesMajor && matchesCluster;
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Live tools in this layer</p>
          <p className="mt-2 text-3xl font-semibold">{liveTools}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Working calculators, visualizers, and simulators you can use now.
          </p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Still planned</p>
          <p className="mt-2 text-3xl font-semibold">{tools.length - liveTools}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Deferred to later passes so the first MVP layer stays polished and reliable.
          </p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Coverage</p>
          <p className="mt-2 text-3xl font-semibold">{categories.length} categories</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Filter by category, major, or topic cluster to find the right lab surface.
          </p>
        </div>
      </div>

      <div className="surface-panel grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr),repeat(3,minmax(0,0.35fr))]">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Search labs
          </span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by tool, concept, or course area"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Category
          </span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
          >
            <option value="all">All categories</option>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Major
          </span>
          <select
            value={major}
            onChange={(event) => setMajor(event.target.value)}
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
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Topic
          </span>
          <select
            value={cluster}
            onChange={(event) => setCluster(event.target.value)}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
          >
            <option value="all">All topics</option>
            {clusters.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredTools.length} of {tools.length} tools.
      </p>

      {filteredTools.length ? (
        <ToolGrid tools={filteredTools} />
      ) : (
        <EmptyState
          title="No tools matched this view"
          description="Try clearing a filter to see the full MVP tool catalog again."
        />
      )}
    </div>
  );
}
