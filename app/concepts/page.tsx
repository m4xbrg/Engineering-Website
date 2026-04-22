import { ConceptCard } from "@/components/concepts/ConceptCard";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
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
        title="An engineering concept layer that can connect majors, courses, and tools."
        description="This scaffold already includes searchable-ready concept records, route support, and cross-link structure. Full editorial depth and richer filtering come next."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {concepts.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>
    </div>
  );
}
