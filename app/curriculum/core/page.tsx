import { StageBlock } from "@/components/curriculum/StageBlock";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { getCoursesForMajor, getMajor, getAllToolDefs } from "@/lib/data";

export default function CoreEngineeringPage() {
  const major = getMajor("core");
  const tools = getAllToolDefs().filter((tool) => major.recommendedTools.includes(tool.id));

  return (
    <>
      <BreadcrumbBar
        items={[
          { href: "/", label: "Home" },
          { href: "/curriculum", label: "Curriculum" },
          { label: "Core Engineering" },
        ]}
      />
      <PageHeader
        eyebrow="Core Engineering"
        title={major.name}
        description={major.description}
        meta={
          <>
            <Badge tone="accent">Shared layer</Badge>
            <Badge>{major.depthV1}</Badge>
            {major.mainSubfields.map((field) => (
              <Badge key={field}>{field}</Badge>
            ))}
          </>
        }
      />
      <section className="surface-panel space-y-4 p-6">
        <h2 className="text-2xl font-semibold">Foundation dependency chain</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          {major.summaryChain}
        </p>
      </section>
      <div className="space-y-8">
        {major.stages.map((stage) => (
          <StageBlock
            key={stage.id}
            title={stage.label}
            description={stage.description}
            courses={getCoursesForMajor("core").filter((course) =>
              stage.courseIds.includes(course.id),
            )}
          />
        ))}
      </div>
      {tools.length ? <ToolGrid tools={tools} /> : null}
    </>
  );
}
