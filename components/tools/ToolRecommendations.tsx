import { ToolGrid } from "@/components/tools/ToolGrid";
import type { ToolDefinition } from "@/types";

type ToolRecommendationsProps = {
  tools: ToolDefinition[];
};

export function ToolRecommendations({ tools }: ToolRecommendationsProps) {
  if (!tools.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Related tools</h2>
      <ToolGrid tools={tools} />
    </section>
  );
}
