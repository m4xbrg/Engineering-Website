import { ToolCard } from "@/components/tools/ToolCard";
import type { ToolDefinition } from "@/types";

type ToolGridProps = {
  tools: ToolDefinition[];
  className?: string;
};

export function ToolGrid({ tools, className }: ToolGridProps) {
  return (
    <div className={className ?? "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
