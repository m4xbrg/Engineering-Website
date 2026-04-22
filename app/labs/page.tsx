import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { ToolGrid } from "@/components/tools/ToolGrid";
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
        title="A shared entry point for engineering tools, calculators, visualizers, and simulators."
        description="Each MVP tool already has route metadata, a page shell, and a reserved implementation component. The interactive logic itself is intentionally held for the next pass."
      />
      <ToolGrid tools={tools} />
    </>
  );
}
