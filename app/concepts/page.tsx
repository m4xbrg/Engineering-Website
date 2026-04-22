import { ConceptExplorer } from "@/components/concepts/ConceptExplorer";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllConcepts } from "@/lib/data";

export default function ConceptsPage() {
  const concepts = getAllConcepts();

  return (
    <div className="container space-y-8 py-10 md:py-14">
      <BreadcrumbBar
        items={[{ href: "/", label: "Home" }, { label: "Concepts" }]}
      />
      <PageHeader
        eyebrow="Concept index"
        title="Browse the concept layer that ties the atlas together."
        description="The concepts index now works as a clean discovery surface for the reusable ideas behind courses, majors, and future labs. Search by name or filter by cluster and major to move across the atlas quickly."
        meta={
          <>
            <Badge tone="accent">{concepts.length} concepts</Badge>
            <Badge>Cross-linked to majors and courses</Badge>
          </>
        }
      />
      <ConceptExplorer concepts={concepts} />
    </div>
  );
}
