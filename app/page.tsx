import Link from "next/link";

import { CourseCard } from "@/components/curriculum/CourseCard";
import { MajorGrid } from "@/components/curriculum/MajorGrid";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolGrid } from "@/components/tools/ToolGrid";
import {
  getAllToolDefs,
  getCoursesForMajor,
  getMajorIndexItems,
} from "@/lib/data";

export default function HomePage() {
  const majors = getMajorIndexItems();
  const featuredTools = getAllToolDefs().slice(0, 3);
  const featuredElectricalCourses = getCoursesForMajor(
    "electrical-engineering",
  ).slice(0, 2);

  return (
    <div className="container space-y-10 py-10 md:py-14">
      <PageHeader
        eyebrow="Engineering Atlas"
        title="A shared engineering foundation with room for every specialization to grow."
        description="This first implementation pass sets up the full app skeleton: curriculum routes, course and concept detail shells, interactive lab page architecture, and the data contracts that connect them."
        actions={
          <>
            <Link
              href="/curriculum"
              className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-foreground/90"
            >
              Explore curriculum
            </Link>
            <Link
              href="/labs"
              className="rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Open labs
            </Link>
          </>
        }
        meta={
          <>
            <Badge tone="accent">Shared core</Badge>
            <Badge>10 majors</Badge>
            <Badge>10 MVP tools scaffolded</Badge>
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Curriculum map",
            body: "Routes and page shells are in place for overviews, major pages, and course details.",
          },
          {
            title: "Interactive labs",
            body: "Tool pages and implementation folders are scaffolded, but real calculator and simulator logic is intentionally deferred.",
          },
          {
            title: "Concept layer",
            body: "Concepts and glossary routes now share common data loading and reusable detail layouts.",
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

      <section className="space-y-5">
        <SectionHeader
          eyebrow="Featured specialization"
          title="Electrical Engineering is the first deep V1 track"
          description="The scaffold already treats EE as the leading full-depth specialization while preserving structural room for the other engineering majors."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {featuredElectricalCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeader
          eyebrow="Featured tools"
          title="The MVP lab system is wired up"
          description="All ten MVP tools now have route shells, metadata, and reserved implementation folders."
        />
        <ToolGrid tools={featuredTools} />
      </section>

      <section className="space-y-5">
        <SectionHeader
          eyebrow="All majors"
          title="Every major exists structurally in the MVP"
          description="The remaining majors are scaffolded with overview pages, route support, and placeholder course coverage so the app can grow without reshaping its architecture."
        />
        <MajorGrid majors={majors} />
      </section>
    </div>
  );
}
