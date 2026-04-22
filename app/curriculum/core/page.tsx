import Link from "next/link";

import { CourseLinkList } from "@/components/curriculum/CourseLinkList";
import { StageBlock } from "@/components/curriculum/StageBlock";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { getAllMajors, getAllToolDefs, getCoursesForMajor, getMajor } from "@/lib/data";
import { cleanText } from "@/lib/utils/format";
import { getMajorRoute } from "@/lib/utils/routes";

export default function CoreEngineeringPage() {
  const major = getMajor("core");
  const courses = getCoursesForMajor("core");
  const tools = getAllToolDefs().filter((tool) => major.recommendedTools.includes(tool.id));
  const supportedMajors = getAllMajors().filter((candidate) => candidate.id !== "core");

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
        title="The shared engineering foundation"
        description="Core Engineering now works as the common base layer for the whole atlas: the structure is grouped by stage, the course pages are linked, and the downstream majors are visible instead of implied."
        meta={
          <>
            <Badge tone="accent">Deep in V1</Badge>
            <Badge>{courses.length} shared courses</Badge>
            <Badge>{supportedMajors.length} dependent majors</Badge>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Shared foundation</p>
          <p className="mt-2 text-3xl font-semibold">{major.stages.length} stages</p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Core courses</p>
          <p className="mt-2 text-3xl font-semibold">{courses.length}</p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Linked labs</p>
          <p className="mt-2 text-3xl font-semibold">{tools.length}</p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Supports majors</p>
          <p className="mt-2 text-3xl font-semibold">{supportedMajors.length}</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">Foundation flow</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {cleanText(major.summaryChain)}
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            {cleanText(major.description)}
          </p>
        </div>
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">Feeds into majors</h2>
          <div className="flex flex-wrap gap-2">
            {supportedMajors.map((candidate) => (
              <Link
                key={candidate.id}
                href={getMajorRoute(candidate.id)}
                className="inline-flex rounded-full border border-border bg-white/80 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {candidate.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeader
          eyebrow="Shared foundation map"
          title="Grouped by stage and ready to drill into"
          description="Each stage below links into course detail pages with prerequisites, concepts, and downstream pathways."
        />
        {major.stages.map((stage) => (
          <StageBlock
            key={stage.id}
            title={cleanText(stage.label)}
            description={stage.description}
            courses={courses.filter((course) => stage.courseIds.includes(course.id))}
          />
        ))}
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Curriculum connections"
          title="Core courses that appear most often across the atlas"
          description="The core pages now act as hubs into the majors that depend on them."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            "calculus-i",
            "physics-ii",
            "statics",
            "thermodynamics-i",
          ].map((courseId) => {
            const course = courses.find((entry) => entry.id === courseId);

            if (!course) {
              return null;
            }

            const dependentMajors = supportedMajors.filter((candidate) =>
              candidate.coreFoundationIds.includes(course.id),
            );

            return (
              <div key={course.id} className="surface-panel space-y-4 p-5">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {cleanText(course.shortDesc)}
                  </p>
                </div>
                <CourseLinkList courses={[course]} />
                <div className="flex flex-wrap gap-2">
                  {dependentMajors.map((candidate) => (
                    <Link
                      key={candidate.id}
                      href={getMajorRoute(candidate.id)}
                      className="inline-flex rounded-full border border-border bg-white/80 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {candidate.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {tools.length ? (
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Labs bridge"
            title="Core-friendly tools already defined"
            description="The labs UI is still pending, but the curriculum already knows which shared tools belong here."
          />
          <ToolGrid tools={tools} />
        </section>
      ) : null}
    </>
  );
}
