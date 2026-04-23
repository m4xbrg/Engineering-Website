import type { ReactNode } from "react";

import { RelatedContent } from "@/components/tools/RelatedContent";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolRecommendations } from "@/components/tools/ToolRecommendations";
import { ToolRelationshipPanel } from "@/components/tools/ToolRelationshipPanel";
import type { ToolDefinition } from "@/types";

type LinkItem = {
  href: string;
  label: string;
  description?: string;
};

type ToolPageLayoutProps = {
  tool: ToolDefinition;
  majorLinks: LinkItem[];
  courseLinks: LinkItem[];
  conceptLinks: LinkItem[];
  recommendations: ToolDefinition[];
  children: ReactNode;
};

export function ToolPageLayout({
  tool,
  majorLinks,
  courseLinks,
  conceptLinks,
  recommendations,
  children,
}: ToolPageLayoutProps) {
  return (
    <>
      <ToolHeader tool={tool} majorLabels={majorLinks.map((item) => item.label)} />
      <section className="grid gap-6 xl:grid-cols-3">
        <ToolRelationshipPanel title="Related majors" items={majorLinks} />
        <ToolRelationshipPanel title="Related courses" items={courseLinks} />
        <ToolRelationshipPanel title="Related concepts" items={conceptLinks} />
      </section>
      {children}
      <section className="grid gap-6 xl:grid-cols-2">
        <RelatedContent title="Related courses" items={courseLinks} />
        <RelatedContent title="Related concepts" items={conceptLinks} />
      </section>
      <ToolRecommendations tools={recommendations} />
    </>
  );
}

