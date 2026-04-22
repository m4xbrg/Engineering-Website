import Link from "next/link";
import { ArrowRight, BookOpen, CircuitBoard, FlaskConical, GraduationCap, Layers, Wrench } from "lucide-react";

import { CourseCard } from "@/components/curriculum/CourseCard";
import { MajorGrid } from "@/components/curriculum/MajorGrid";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolGrid } from "@/components/tools/ToolGrid";
import {
  getAllConcepts,
  getAllGlossaryTerms,
  getAllMajors,
  getAllToolDefs,
  getCoursesForMajor,
  getMajorIndexItems,
} from "@/lib/data";
import { cleanText } from "@/lib/utils/format";

const entryIcons = {
  curriculum: GraduationCap,
  core: Layers,
  labs: Wrench,
  concepts: BookOpen,
};

export default function HomePage() {
  const majorIndex = new Map(
    getMajorIndexItems().map((major) => [major.id, major]),
  );
  const majors = getAllMajors().map((major) => ({
    ...major,
    courseCount: majorIndex.get(major.id)?.courseCount ?? 0,
  }));
  const featuredMajor = majors.find((major) => major.id === "electrical-engineering");
  const featuredElectricalCourses = getCoursesForMajor("electrical-engineering")
    .filter((course) => !course.isElective)
    .slice(0, 3);
  const featuredTools = getAllToolDefs().filter((tool) =>
    ["ohms-law", "rlc-response", "fourier-series", "bode-plot"].includes(tool.id),
  );
  const featuredMajors = majors.filter((major) =>
    ["core", "electrical-engineering", "mechanical-engineering", "computer-engineering"].includes(
      major.id,
    ),
  );

  return (
    <div className="container space-y-12 py-10 md:py-14">
      <PageHeader
        eyebrow="Engineering Atlas"
        title="Curriculum maps, concept links, and future labs in one engineering learning surface."
        description="Engineering Atlas is an engineering-first platform that connects shared foundation courses, specialization pathways, concept relationships, and interactive lab metadata. Electrical Engineering is the first deeply built track, while the other majors already work as navigable curriculum maps."
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
              className="rounded-full border border-border bg-white px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Browse labs
            </Link>
          </>
        }
        meta={
          <>
            <Badge tone="accent">10 majors mapped</Badge>
            <Badge>16 core foundation courses</Badge>
            <Badge>{getAllConcepts().length} concepts linked</Badge>
            <Badge>{getAllToolDefs().length} labs planned</Badge>
          </>
        }
        className="overflow-hidden bg-[linear-gradient(135deg,rgba(13,45,64,0.04),rgba(208,110,36,0.08))]"
      />

      <section className="grid gap-4 lg:grid-cols-4">
        {[
          {
            id: "curriculum",
            href: "/curriculum",
            title: "Curriculum Atlas",
            body: "Compare majors, trace year-by-year structure, and move from the shared foundation into each specialization.",
          },
          {
            id: "core",
            href: "/curriculum/core",
            title: "Core Engineering",
            body: "Use the shared math, physics, mechanics, design, and ethics layer as the launch point for every specialization.",
          },
          {
            id: "labs",
            href: "/labs",
            title: "Labs Hub",
            body: "See the first calculator, simulator, and visualizer definitions connected to courses and concepts, without the interactive UIs yet.",
          },
          {
            id: "concepts",
            href: "/concepts",
            title: "Concept Graph",
            body: "Jump from concepts to courses, majors, glossary terms, and future lab experiences from one place.",
          },
        ].map((entry) => {
          const Icon = entryIcons[entry.id as keyof typeof entryIcons];

          return (
            <Link
              key={entry.id}
              href={entry.href}
              className="surface-panel flex h-full flex-col gap-4 p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{entry.title}</h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  {entry.body}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                Open section <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Curriculum-first usability",
            body: "Every major now has a usable overview page, every course route resolves, and the core foundation is visible as a shared dependency layer instead of background knowledge.",
            icon: GraduationCap,
          },
          {
            title: "Cross-linked learning model",
            body: "Course pages point into concepts, concepts point back into courses and majors, and tool metadata now acts like the bridge into the upcoming lab layer.",
            icon: CircuitBoard,
          },
          {
            title: "Built to grow beyond MVP",
            body: "Electrical Engineering already feels deeper, while the remaining majors stay structurally useful as curriculum maps that can be enriched later without changing the navigation model.",
            icon: FlaskConical,
          },
        ].map((item) => (
          <div key={item.title} className="surface-panel space-y-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <item.icon className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="text-sm leading-7 text-muted-foreground">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </section>

      {featuredMajor ? (
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Featured specialization"
            title="Electrical Engineering is the first deep-build track"
            description="EE already combines a richer course graph, direct tool metadata, and stronger concept linking. The rest of the atlas still works as a navigable curriculum product, but EE is the clearest example of where the platform is headed."
            aside={
              <Link
                href="/majors/electrical-engineering"
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Open Electrical Engineering
              </Link>
            }
          />
          <div className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
            <div className="surface-panel space-y-5 p-6">
              <div className="flex flex-wrap gap-2">
                <Badge tone="accent">Deep in V1</Badge>
                <Badge>{featuredMajor.courseCount} courses</Badge>
                <Badge>{featuredMajor.recommendedTools.length} linked labs</Badge>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-semibold">{featuredMajor.name}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {cleanText(featuredMajor.description)}
                </p>
                <p className="text-sm leading-7 text-muted-foreground">
                  {cleanText(featuredMajor.summaryChain)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredMajor.mainSubfields.slice(0, 6).map((field) => (
                  <Badge key={field}>{field}</Badge>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {featuredElectricalCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Platform overview"
          title="The atlas already connects the key learning flows"
          description="Students can move from shared foundation to major, from major to course, from course to concepts, and from concepts to the future labs layer without leaving the main route system."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Start with the shared core",
              detail: "Use Core Engineering as the foundation map for math, physics, mechanics, design, and ethics.",
            },
            {
              title: "Choose a specialization",
              detail: "Open any major to see its stage structure, foundation dependencies, and course map.",
            },
            {
              title: "Open a course page",
              detail: "Trace prerequisites, next courses, concepts, topic clusters, and the lab tools that fit that course.",
            },
            {
              title: "Follow concepts outward",
              detail: "Use the concepts and glossary sections as the reusable vocabulary layer across majors and labs.",
            },
          ].map((item, index) => (
            <div key={item.title} className="surface-panel space-y-4 p-6">
              <Badge tone="muted">Flow {index + 1}</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Featured majors"
          title="Core plus specialization entry points"
          description="The homepage now points straight into the shared foundation, the flagship EE track, and adjacent majors that already have usable map-level curriculum structure."
        />
        <MajorGrid majors={featuredMajors} />
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Featured labs"
          title="Tool cards are live as metadata-driven placeholders"
          description="The lab UIs are still deferred, but the platform already knows which majors, courses, and concepts each tool belongs to. That gives the curriculum pages a real bridge into the future interactive layer."
          aside={
            <Link
              href="/labs"
              className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Open labs hub
            </Link>
          }
        />
        <ToolGrid tools={featuredTools} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">What the MVP already covers</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            The MVP now behaves like a real curriculum product: majors are comparable, courses are cross-linked, concepts and glossary terms are discoverable, and the labs layer has enough metadata to guide future expansion.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white/70 p-4">
              <p className="text-sm text-muted-foreground">Concept index</p>
              <p className="mt-1 text-2xl font-semibold">{getAllConcepts().length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-white/70 p-4">
              <p className="text-sm text-muted-foreground">Glossary terms</p>
              <p className="mt-1 text-2xl font-semibold">{getAllGlossaryTerms().length}</p>
            </div>
          </div>
        </div>
        <div className="surface-panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">What comes next</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            The next major step is turning the labs metadata into real interactive engineering tools, starting with the highest-value EE and shared-core experiences that already have course and concept hooks in place.
          </p>
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Continue into the curriculum atlas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
