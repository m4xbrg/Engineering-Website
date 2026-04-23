import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { cleanText, humanizeToken } from "@/lib/utils/format";
import { MAJOR_LABELS } from "@/lib/utils/routes";
import type { MajorSlug, ToolDefinition } from "@/types";

type ToolCardView = ToolDefinition & {
  majorLabels?: string[];
  courseLabels?: string[];
  clusterLabels?: string[];
};

type ToolCardProps = {
  tool: ToolCardView;
};

export function ToolCard({ tool }: ToolCardProps) {
  const majorLabels =
    tool.majorLabels ??
    tool.majorIds.map((majorId) => MAJOR_LABELS[majorId as MajorSlug]);
  const courseLabels =
    tool.courseLabels ?? tool.courseIds.map((courseId) => humanizeToken(courseId));
  const clusterLabels =
    tool.clusterLabels ??
    tool.clusterIds.map((clusterId) => humanizeToken(clusterId));

  return (
    <Link
      href={tool.routePath}
      className="surface-panel flex h-full flex-col gap-4 p-5 transition-transform hover:-translate-y-1"
    >
      <div className="flex flex-wrap gap-2">
        <Badge tone="accent">{humanizeToken(tool.category)}</Badge>
        <Badge tone={tool.status === "planned" ? "warning" : "muted"}>
          {humanizeToken(tool.status)}
        </Badge>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{tool.name}</h3>
        <p className="text-sm leading-7 text-muted-foreground">
          {cleanText(tool.description)}
        </p>
      </div>
      <div className="space-y-3 rounded-[1.5rem] border border-border bg-white/80 p-4 text-sm">
        <div>
          <p className="font-medium">Related majors</p>
          <p className="text-muted-foreground">{majorLabels.slice(0, 3).join(" / ")}</p>
        </div>
        <div>
          <p className="font-medium">Related courses</p>
          <p className="text-muted-foreground">
            {courseLabels.slice(0, 2).join(" / ") || "Curriculum links coming next"}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span>{tool.majorIds.length} majors</span>
          <span>{tool.courseIds.length} courses</span>
          <span>{tool.conceptIds.length} concepts</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {clusterLabels.slice(0, 3).map((clusterLabel) => (
          <Badge key={clusterLabel}>{clusterLabel}</Badge>
        ))}
      </div>
    </Link>
  );
}
