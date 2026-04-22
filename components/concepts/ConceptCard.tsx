import { Badge } from "@/components/ui/Badge";
import type { Concept } from "@/types";

type ConceptCardProps = {
  concept: Concept;
};

export function ConceptCard({ concept }: ConceptCardProps) {
  return (
    <div className="surface-panel flex h-full flex-col gap-4 p-5">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{concept.name}</h3>
        <p className="text-sm leading-7 text-muted-foreground">
          {concept.shortDef}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {concept.topicClusters.map((cluster) => (
          <Badge key={cluster}>{cluster}</Badge>
        ))}
      </div>
    </div>
  );
}
