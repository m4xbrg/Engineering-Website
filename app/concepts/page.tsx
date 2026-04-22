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
        title="An engineering concept layer connecting courses, majors, and tools."
        description="Concept records are generated from the curriculum blueprint and linked back to their teaching courses, glossary terms, and planned labs."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {concepts.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>
    </div>
  );
}
