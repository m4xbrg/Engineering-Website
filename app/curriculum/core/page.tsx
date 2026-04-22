import { StageBlock } from "@/components/curriculum/StageBlock";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCourse, getMajor } from "@/lib/data";

export default function CoreEngineeringPage() {
  const major = getMajor("core");

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
          </>
        }
      />
      <div className="space-y-8">
        {major.stages.map((stage) => (
          <StageBlock
            key={stage.id}
            title={stage.label}
            courses={stage.courseIds.map((courseId) =>
              getCourse("core", courseId),
            )}
          />
        ))}
      </div>
    </>
  );
}
