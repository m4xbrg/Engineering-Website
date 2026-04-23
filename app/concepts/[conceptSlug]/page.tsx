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
  getAllMajors,
  getConcept,
  getRelatedTools,
} from "@/lib/data";
import { cleanText } from "@/lib/utils/format";
import { getMajorRoute } from "@/lib/utils/routes";

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
  const relatedTools = getRelatedTools({ conceptId: concept.id });
  const relatedMajors = getAllMajors().filter((major) =>
    concept.majorTags.includes(major.id),
  );
  const conceptMap = new Map(
    getAllConcepts().map((relatedConcept) => [relatedConcept.id, relatedConcept.name]),
  );
  const glossaryEntries = getAllGlossaryTerms().filter(
    (term) => term.conceptId === concept.id || term.relatedConcepts.includes(concept.id),
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
        description={cleanText(concept.shortDef)}
        meta={
          <>
            {concept.isFoundational ? <Badge tone="accent">Foundational</Badge> : null}
            {concept.topicClusters.map((cluster) => (
              <Badge key={cluster}>{cluster}</Badge>
            ))}
          </>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="surface-panel space-y-5 p-6">
          <h2 className="text-2xl font-semibold">Definition</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {cleanText(concept.extendedDef)}
          </p>
          {concept.equation ? (
            <div className="rounded-2xl border border-border bg-white/80 p-4 font-mono text-sm text-muted-foreground">
              {cleanText(concept.equation)}
            </div>
          ) : null}
        </div>
        <div className="surface-panel space-y-5 p-6">
          <h2 className="text-2xl font-semibold">Appears in majors</h2>
          <div className="flex flex-wrap gap-2">
            {relatedMajors.map((major) => (
              <Link
                key={major.id}
                href={getMajorRoute(major.id)}
                className="atlas-chip-link"
              >
                {major.name}
              </Link>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white/70 p-4">
              <p className="text-sm text-muted-foreground">Courses</p>
              <p className="mt-1 text-2xl font-semibold">{relatedCourses.length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-white/70 p-4">
              <p className="text-sm text-muted-foreground">Majors</p>
              <p className="mt-1 text-2xl font-semibold">{relatedMajors.length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-white/70 p-4">
              <p className="text-sm text-muted-foreground">Labs</p>
              <p className="mt-1 text-2xl font-semibold">{relatedTools.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-panel space-y-4 p-6">
        <h2 className="text-2xl font-semibold">Taught in courses</h2>
        {relatedCourses.length ? (
          <CourseLinkList courses={relatedCourses} />
        ) : (
          <p className="text-sm text-muted-foreground">
            No atlas course links are currently attached to this concept.
          </p>
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-xl font-semibold">Related concepts</h2>
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
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-xl font-semibold">Glossary connections</h2>
          <div className="flex flex-wrap gap-2">
            {glossaryEntries.length ? (
              glossaryEntries.map((term) => (
                <Link
                  key={term.id}
                  href={`/glossary/${term.id}`}
                  className="atlas-chip-link"
                >
                  {term.term}
                </Link>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No glossary entries are linked yet.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Lab integration"
          title="Explore with labs"
          description="These tools give this concept an applied foothold inside the current atlas."
        />
        {relatedTools.length ? (
          <ToolGrid tools={relatedTools.slice(0, 4)} />
        ) : (
          <div className="surface-panel p-6 text-sm leading-7 text-muted-foreground">
            No tool metadata is attached to this concept yet.
          </div>
        )}
      </section>
    </div>
  );
}
