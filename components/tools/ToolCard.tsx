import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
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
        <Badge tone={tool.status === "stub" ? "warning" : "muted"}>
          {tool.status}
        </Badge>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{tool.name}</h3>
        <p className="text-sm leading-7 text-muted-foreground">
          {tool.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tool.majorIds.slice(0, 3).map((majorId) => (
          <Badge key={majorId}>{majorId}</Badge>
        ))}
      </div>
    </Link>
  );
}
