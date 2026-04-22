import Link from "next/link";

import { ConceptChip } from "@/components/concepts/ConceptChip";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getAllConcepts,
  getAllCourses,
  getAllToolDefs,
  getConcept,
} from "@/lib/data";
import { getCourseRoute } from "@/lib/utils/routes";

type ConceptPageProps = {
  params: Promise<{
    conceptSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllConcepts().map((concept) => ({
    conceptSlug: concept.id,
  }));
}

export default async function ConceptPage({ params }: ConceptPageProps) {
  const { conceptSlug } = await params;
  const concept = getConcept(conceptSlug);
  const relatedCourses = getAllCourses().filter((course) =>
    concept.taughtIn.includes(course.id),
  );
  const relatedTools = getAllToolDefs().filter((tool) =>
    concept.toolLinks.includes(tool.id),
  );
  const conceptMap = new Map(
    getAllConcepts().map((relatedConcept) => [
      relatedConcept.id,
      relatedConcept.name,
    ]),
  );

  return (
    <div className="container space-y-8 py-10 md:py-14">
      <BreadcrumbBar
        items={[
          { href: "/", label: "Home" },
          { href: "/concepts", label: "Concepts" },
          { label: concept.name },
        ]}
      />
      <PageHeader
        eyebrow="Concept detail"
        title={concept.name}
        description={concept.extendedDef}
      />
      <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="surface-panel space-y-5 p-6">
          <h2 className="text-2xl font-semibold">Connected courses</h2>
          <div className="flex flex-wrap gap-2">
            {relatedCourses.map((course) => (
              <Link
                key={course.id}
                href={getCourseRoute(course.majorId, course.id)}
                className="inline-flex rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {course.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="surface-panel space-y-5 p-6">
          <h2 className="text-2xl font-semibold">Related concepts</h2>
          <div className="flex flex-wrap gap-2">
            {concept.relatedConcepts.map((related) => (
              <ConceptChip
                key={related}
                slug={related}
                name={conceptMap.get(related) ?? related}
              />
            ))}
          </div>
        </div>
      </section>
      {relatedTools.length ? (
        <ToolGrid tools={relatedTools} />
      ) : (
        <EmptyState
          title="Tool links coming next"
          description="This concept route is live, but its interactive lab links have not been fully authored yet."
        />
      )}
    </div>
  );
}
