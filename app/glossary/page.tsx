import { GlossaryExplorer } from "@/components/concepts/GlossaryExplorer";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
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
        title="A searchable terminology layer for the atlas."
        description="The glossary is now usable as a real reference surface: search terms, filter by major domain, jump by letter, and route into related concepts where they exist."
        meta={
          <>
            <Badge tone="accent">{terms.length} glossary terms</Badge>
            <Badge>Linked back into concept pages</Badge>
          </>
        }
      />
      <GlossaryExplorer terms={terms} />
    </div>
  );
}
