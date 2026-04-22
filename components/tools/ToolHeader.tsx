import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import type { ToolDefinition } from "@/types";

type ToolHeaderProps = {
  tool: ToolDefinition;
};

export function ToolHeader({ tool }: ToolHeaderProps) {
  return (
    <PageHeader
      eyebrow="Interactive Lab"
      title={tool.name}
      description={tool.whyMvp}
      meta={
        <>
          <Badge tone="accent">{tool.category}</Badge>
          <Badge tone="muted">{tool.complexityEstimate}</Badge>
          <Badge tone={tool.status === "planned" ? "warning" : "default"}>
            {tool.status}
          </Badge>
          {tool.majorIds.map((majorId) => (
            <Badge key={majorId}>{majorId}</Badge>
          ))}
        </>
      }
    />
  );
}
