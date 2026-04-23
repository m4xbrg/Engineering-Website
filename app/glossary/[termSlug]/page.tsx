import Link from "next/link";

import { ConceptChip } from "@/components/concepts/ConceptChip";
import { CourseLinkList } from "@/components/curriculum/CourseLinkList";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getAllConcepts,
  getAllCourses,
  getAllGlossaryTerms,
  getConcept,
  getGlossaryTerm,
  getRelatedTools,
} from "@/lib/data";
import { cleanText } from "@/lib/utils/format";
import { getMajorRoute, MAJOR_LABELS } from "@/lib/utils/routes";

type GlossaryTermPageProps = {
  params: Promise<{
    termSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllGlossaryTerms().map((term) => ({
    termSlug: term.id,
  }));
}

export default async function GlossaryTermPage({
  params,
}: GlossaryTermPageProps) {
  const { termSlug } = await params;
  const term = getGlossaryTerm(termSlug);
  const conceptMap = new Map(
    getAllConcepts().map((concept) => [concept.id, concept.name]),
  );
  const relatedTerms = term.relatedTerms.map((relatedId) => getGlossaryTerm(relatedId));
  const concept = term.conceptId ? getConcept(term.conceptId) : null;
  const relatedCourses = concept
    ? getAllCourses().filter((course) => concept.taughtIn.includes(course.id))
    : [];
  const relatedTools = concept ? getRelatedTools({ conceptId: concept.id }) : [];

  return (
    <div className="container space-y-8 py-10 md:py-14">
      <BreadcrumbBar
        items={[
          { href: "/", label: "Home" },
          { href: "/glossary", label: "Glossary" },
          { label: term.term },
        ]}
      />
      <PageHeader
        eyebrow="Glossary term"
        title={term.term}
        description={cleanText(term.shortDef)}
        meta={
          <>
            {term.domain.map((domain) => (
              <Badge key={domain}>
                {MAJOR_LABELS[domain as keyof typeof MAJOR_LABELS] ?? domain}
              </Badge>
            ))}
          </>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">Definition</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {cleanText(term.extendedDef)}
          </p>
        </div>
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">Concept bridge</h2>
          {concept ? (
            <>
              <p className="text-sm leading-7 text-muted-foreground">
                This glossary entry routes directly into the concept graph.
              </p>
              <ConceptChip slug={concept.id} name={concept.name} />
              <div className="flex flex-wrap gap-2">
                {concept.majorTags.map((majorId) => (
                  <Link
                    key={majorId}
                    href={getMajorRoute(majorId)}
                    className="atlas-chip-link"
                  >
                    {MAJOR_LABELS[majorId as keyof typeof MAJOR_LABELS] ?? majorId}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm leading-7 text-muted-foreground">
              No direct concept record is attached to this glossary term yet.
            </p>
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-xl font-semibold">Related concepts</h2>
          <div className="flex flex-wrap gap-2">
            {term.relatedConcepts.map((conceptId) => (
              <ConceptChip
                key={conceptId}
                slug={conceptId}
                name={conceptMap.get(conceptId) ?? conceptId}
              />
            ))}
          </div>
        </div>
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-xl font-semibold">Related terms</h2>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.length ? (
              relatedTerms.map((relatedTerm) => (
                <Link
                  key={relatedTerm.id}
                  href={`/glossary/${relatedTerm.id}`}
                  className="atlas-chip-link"
                >
                  {relatedTerm.term}
                </Link>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No related glossary terms are linked yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {concept ? (
        <>
          <section className="surface-panel space-y-4 p-6">
            <h2 className="text-xl font-semibold">Related courses</h2>
            {relatedCourses.length ? (
              <CourseLinkList courses={relatedCourses} />
            ) : (
              <p className="text-sm text-muted-foreground">
                No atlas courses are linked to this term concept yet.
              </p>
            )}
          </section>
          <section className="space-y-6">
            <SectionHeader
              eyebrow="Lab integration"
              title="Related labs"
              description="When a glossary term resolves into a concept, its tool links follow with it."
            />
            {relatedTools.length ? (
              <ToolGrid tools={relatedTools.slice(0, 4)} />
            ) : (
              <div className="surface-panel p-6 text-sm leading-7 text-muted-foreground">
                No tool metadata is linked to this glossary term yet.
              </div>
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}
