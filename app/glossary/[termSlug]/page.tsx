import Link from "next/link";

import { ConceptChip } from "@/components/concepts/ConceptChip";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getAllConcepts,
  getAllGlossaryTerms,
  getGlossaryTerm,
} from "@/lib/data";

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
        description={term.extendedDef}
        meta={
          <>
            {term.domain.map((domain) => (
              <Badge key={domain}>{domain}</Badge>
            ))}
          </>
        }
      />
      <section className="surface-panel space-y-5 p-6">
        <h2 className="text-2xl font-semibold">Related concepts</h2>
        <div className="flex flex-wrap gap-2">
          {term.relatedConcepts.map((conceptId) => (
            <ConceptChip
              key={conceptId}
              slug={conceptId}
              name={conceptMap.get(conceptId) ?? conceptId}
            />
          ))}
        </div>
        {term.relatedTerms.length ? (
          <>
            <h2 className="text-2xl font-semibold">Related terms</h2>
            <div className="flex flex-wrap gap-2">
              {term.relatedTerms.map((relatedTermId) => (
                <Link key={relatedTermId} href={`/glossary/${relatedTermId}`}>
                  <Badge>{relatedTermId}</Badge>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
