import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { cleanText } from "@/lib/utils/format";
import { MAJOR_LABELS } from "@/lib/utils/routes";
import type { Concept } from "@/types";

type ConceptCardProps = {
  concept: Concept;
};

export function ConceptCard({ concept }: ConceptCardProps) {
  return (
    <Link
      href={`/concepts/${concept.id}`}
      className="surface-panel flex h-full flex-col gap-4 p-5 transition-transform hover:-translate-y-1"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{concept.name}</h3>
        <p className="text-sm leading-7 text-muted-foreground">
          {cleanText(concept.shortDef)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {concept.topicClusters.map((cluster) => (
          <Badge key={cluster}>{cluster}</Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 rounded-[1.4rem] border border-border bg-white/70 p-4">
        {concept.isFoundational ? <Badge tone="accent">Foundation concept</Badge> : null}
        {concept.majorTags.slice(0, 3).map((majorId) => (
          <Badge key={majorId} tone="muted">
            {MAJOR_LABELS[majorId as keyof typeof MAJOR_LABELS] ?? majorId}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
