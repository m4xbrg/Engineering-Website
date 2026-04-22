import { MajorGrid } from "@/components/curriculum/MajorGrid";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getMajorIndexItems } from "@/lib/data";

export default function CurriculumPage() {
  const majors = getMajorIndexItems();

  return (
    <>
      <BreadcrumbBar
        items={[{ href: "/", label: "Home" }, { label: "Curriculum" }]}
      />
      <PageHeader
        eyebrow="Curriculum overview"
        title="A single map across core engineering and major-specific pathways."
        description="Core Engineering lives as the shared layer. Every major also has its own overview page and course-detail route structure, even where V1 content remains intentionally shallow."
      />
      <section className="space-y-5">
        <SectionHeader
          eyebrow="Core layer"
          title="Start with the shared engineering foundation"
          description="Core Engineering has its own dedicated overview and course-detail routing because it feeds nearly every other section in the product."
        />
        <MajorGrid majors={majors.filter((major) => major.id === "core")} />
      </section>
      <section className="space-y-5">
        <SectionHeader
          eyebrow="Specializations"
          title="Major overview pages"
          description="Electrical Engineering is flagged for deeper V1 treatment, while the remaining majors are scaffolded structurally."
        />
        <MajorGrid majors={majors.filter((major) => major.id !== "core")} />
      </section>
    </>
  );
}
