"use client";

import { useDeferredValue, useState } from "react";

import { MajorGrid } from "@/components/curriculum/MajorGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { cleanText } from "@/lib/utils/format";
import type { Major, MajorIndexItem } from "@/types";

type MajorExplorerItem = MajorIndexItem &
  Partial<Pick<Major, "mainSubfields" | "recommendedTools" | "coreFoundationIds">>;

type CurriculumMajorExplorerProps = {
  majors: MajorExplorerItem[];
};

export function CurriculumMajorExplorer({
  majors,
}: CurriculumMajorExplorerProps) {
  const [search, setSearch] = useState("");
  const [depth, setDepth] = useState<"all" | "full" | "map">("all");
  const deferredSearch = useDeferredValue(search);
  const query = deferredSearch.trim().toLowerCase();

  const filteredMajors = majors.filter((major) => {
    const matchesDepth = depth === "all" || major.depthV1 === depth;
    const haystack = [
      major.name,
      major.shortName,
      major.description,
      ...(major.mainSubfields ?? []),
    ]
      .map((value) => cleanText(value).toLowerCase())
      .join(" ");
    const matchesSearch = !query || haystack.includes(query);

    return matchesDepth && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="atlas-filter-panel grid gap-4 lg:grid-cols-[minmax(0,1fr),auto] lg:items-end">
        <label className="space-y-2">
          <span className="atlas-kicker">
            Search majors
          </span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by major, track, or subfield"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All majors" },
            { id: "full", label: "Deep in V1" },
            { id: "map", label: "Curriculum map" },
          ].map((option) => {
            const active = depth === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setDepth(option.id as "all" | "full" | "map")}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-foreground text-white"
                    : "border border-border bg-white text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredMajors.length} of {majors.length} majors.
      </p>

      {filteredMajors.length ? (
        <MajorGrid majors={filteredMajors} />
      ) : (
        <EmptyState
          title="No majors matched this filter"
          description="Try a broader search or switch the depth filter back to all majors."
        />
      )}
    </div>
  );
}
