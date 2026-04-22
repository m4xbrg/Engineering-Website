import Link from "next/link";

import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllGlossaryTerms } from "@/lib/data";

export default function GlossaryPage() {
  const terms = getAllGlossaryTerms().sort((left, right) =>
    left.term.localeCompare(right.term),
  );

  return (
    <div className="container space-y-8 py-10 md:py-14">
      <BreadcrumbBar
        items={[{ href: "/", label: "Home" }, { label: "Glossary" }]}
      />
      <PageHeader
        eyebrow="Glossary"
        title="A reusable terminology layer for Engineering Atlas."
        description="Glossary entries are generated from the same concept graph as the curriculum pages, so terms can route into concept detail and related topics."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {terms.map((term) => (
          <Link
            key={term.id}
            href={`/glossary/${term.id}`}
            className="surface-panel p-5"
          >
            <h2 className="text-xl font-semibold">{term.term}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {term.shortDef}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
