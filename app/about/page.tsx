import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { PageHeader } from "@/components/ui/PageHeader";

export default function AboutPage() {
  return (
    <div className="container space-y-8 py-10 md:py-14">
      <BreadcrumbBar
        items={[{ href: "/", label: "Home" }, { label: "About" }]}
      />
      <PageHeader
        eyebrow="About"
        title="Engineering Atlas is being built as a curriculum-first engineering platform."
        description="The planning documents define a layered product: a shared core engineering map, specialization tracks, interactive labs, and a cross-linked concepts and glossary system. This run implements the architectural base for that vision."
      />
      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Curriculum Atlas",
            body: "Core engineering and every specialization now have route support and placeholder data contracts.",
          },
          {
            title: "Interactive Labs",
            body: "Tool metadata, page shells, and implementation folders are ready for the first ten MVP tools.",
          },
          {
            title: "Knowledge Layers",
            body: "Concept and glossary pages share a data model intended for future cross-linking and search.",
          },
        ].map((item) => (
          <div key={item.title} className="surface-panel p-6">
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {item.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
