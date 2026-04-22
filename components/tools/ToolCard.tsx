import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { cleanText } from "@/lib/utils/format";
import type { ToolDefinition } from "@/types";

type ToolCardProps = {
  tool: ToolDefinition;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.routePath}
      className="surface-panel flex h-full flex-col gap-4 p-5 transition-transform hover:-translate-y-1"
    >
      <div className="flex flex-wrap gap-2">
        <Badge tone="accent">{tool.category}</Badge>
        <Badge tone={tool.status === "planned" ? "warning" : "muted"}>
          {tool.status}
        </Badge>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{tool.name}</h3>
        <p className="text-sm leading-7 text-muted-foreground">
          {cleanText(tool.description)}
        </p>
      </div>
      <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
        <p>{tool.courseIds.length} linked courses</p>
        <p>{tool.conceptIds.length} linked concepts</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tool.majorIds.slice(0, 3).map((majorId) => (
          <Badge key={majorId}>{majorId}</Badge>
        ))}
      </div>
    </Link>
  );
}
