import { Badge } from "@/components/ui/Badge";
import { humanizeToken } from "@/lib/utils/format";
import { PageHeader } from "@/components/ui/PageHeader";
import type { ToolDefinition } from "@/types";

type ToolHeaderProps = {
  tool: ToolDefinition;
  majorLabels?: string[];
};

export function ToolHeader({ tool, majorLabels = [] }: ToolHeaderProps) {
  return (
    <PageHeader
      eyebrow="Interactive Lab"
      title={tool.name}
      description={tool.purpose}
      meta={
        <>
          <Badge tone="accent">{humanizeToken(tool.category)}</Badge>
          <Badge tone="muted">{humanizeToken(tool.complexityEstimate)}</Badge>
          <Badge tone={tool.status === "planned" ? "warning" : "default"}>
            {humanizeToken(tool.status)}
          </Badge>
          {majorLabels.map((majorLabel) => (
            <Badge key={majorLabel}>{majorLabel}</Badge>
          ))}
        </>
      }
    />
  );
}
