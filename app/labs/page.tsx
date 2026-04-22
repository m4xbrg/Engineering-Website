import { ToolExplorer } from "@/components/tools/ToolExplorer";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAllToolDefs } from "@/lib/data";

export default function LabsPage() {
  const tools = getAllToolDefs();

  return (
    <>
      <BreadcrumbBar
        items={[{ href: "/", label: "Home" }, { label: "Labs" }]}
      />
      <PageHeader
        eyebrow="Labs hub"
        title="Metadata-driven labs discovery for the Engineering Atlas MVP."
        description="The tool interfaces are still intentionally deferred, but the hub now works as a real product surface for browsing what tools are planned, which majors they support, and which courses and concepts they connect back into."
        meta={
          <>
            <Badge tone="accent">{tools.length} planned tools</Badge>
            <Badge>Calculator, visualizer, simulator, and reference categories</Badge>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Tool status</p>
          <p className="mt-2 text-2xl font-semibold">Metadata live</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Routes, descriptions, cross-links, and placement in the atlas are already defined.
          </p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">What is not built yet</p>
          <p className="mt-2 text-2xl font-semibold">Interactive UIs</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Simulations and calculators will come in the next tool-focused implementation pass.
          </p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Why this still matters</p>
          <p className="mt-2 text-2xl font-semibold">Curriculum bridge</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Courses and concepts can already point to the right future labs, keeping the product coherent now.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Tool catalog"
          title="Filter by category, major, or topic"
          description="Use the hub as the labs-side index for the current MVP."
        />
        <ToolExplorer tools={tools} />
      </section>
    </>
  );
}
