"use client";

import { useDeferredValue, useState } from "react";

import { ToolGrid } from "@/components/tools/ToolGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { cleanText } from "@/lib/utils/format";
import { MAJOR_LABELS } from "@/lib/utils/routes";
import type { ToolDefinition } from "@/types";

type ToolExplorerProps = {
  tools: ToolDefinition[];
};

export function ToolExplorer({ tools }: ToolExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [major, setMajor] = useState("all");
  const deferredSearch = useDeferredValue(search);
  const query = deferredSearch.trim().toLowerCase();

  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  const filteredTools = tools.filter((tool) => {
    const haystack = [
      tool.name,
      tool.description,
      tool.purpose,
      tool.whyMvp,
      ...tool.clusterIds,
    ]
      .map((value) => cleanText(value).toLowerCase())
      .join(" ");
    const matchesSearch = !query || haystack.includes(query);
    const matchesCategory = category === "all" || tool.category === category;
    const matchesMajor = major === "all" || tool.majorIds.includes(major);

    return matchesSearch && matchesCategory && matchesMajor;
  });

  return (
    <div className="space-y-6">
      <div className="surface-panel grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr),repeat(2,minmax(0,0.35fr))]">
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
