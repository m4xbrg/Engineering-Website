import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function AboutPage() {
  return (
    <div className="container space-y-8 py-10 md:py-14">
      <BreadcrumbBar
        items={[{ href: "/", label: "Home" }, { label: "About" }]}
      />
      <PageHeader
        eyebrow="About"
        title="Engineering Atlas is a curriculum atlas, concept explorer, and interactive engineering lab."
        description="The product is designed around three connected layers: a navigable curriculum map, a reusable concept and glossary layer, and tool-driven lab experiences tied back to real coursework. The MVP already makes that structure visible instead of leaving it implied."
        meta={
          <>
            <Badge tone="accent">Curriculum-first product</Badge>
            <Badge>EE is deepest in V1</Badge>
            <Badge>Other majors remain usable map-level views</Badge>
          </>
        }
      />
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Product layers"
          title="Three connected surfaces, one atlas"
          description="Each layer solves a different part of engineering learning, but the routes and data model are shared so the product feels like one coherent system."
        />
        <div className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Curriculum Atlas",
            body: "Core Engineering and every specialization now have route support, stage structure, and course pages that make the curriculum map usable as a product.",
          },
          {
            title: "Concept Explorer",
            body: "Concept and glossary pages provide a reusable knowledge layer that connects majors, courses, and lab surfaces.",
          },
          {
            title: "Interactive Labs",
            body: "The first tools are already live, while the rest of the lab catalog is intentionally staged as connected future depth rather than unfinished clutter.",
          },
        ].map((item) => (
          <div key={item.title} className="surface-panel p-6">
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {item.body}
            </p>
          </div>
        ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="surface-panel p-6">
          <h2 className="text-2xl font-semibold">What the MVP is trying to prove</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            That engineering content works better when curriculum structure,
            conceptual vocabulary, and applied tools are authored as one system
            instead of separate sites or disconnected resource lists.
          </p>
        </div>
        <div className="surface-panel p-6">
          <h2 className="text-2xl font-semibold">How incomplete areas are handled</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Majors that are not deeply authored yet still function as intentional
            map-level atlas views. The goal is graceful scaffolding now, then
            deeper build-out later without changing the navigation model.
          </p>
        </div>
      </section>
    </div>
  );
}
