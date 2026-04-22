import Link from "next/link";

import { CurriculumMajorExplorer } from "@/components/curriculum/CurriculumMajorExplorer";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAllMajors, getMajorIndexItems } from "@/lib/data";
import { cleanText } from "@/lib/utils/format";

export default function CurriculumPage() {
  const majorIndex = new Map(
    getMajorIndexItems().map((major) => [major.id, major]),
  );
  const majors = getAllMajors()
    .map((major) => ({
      ...major,
      courseCount: majorIndex.get(major.id)?.courseCount ?? 0,
    }))
    .sort((left, right) => {
      if (left.id === "core") {
        return -1;
      }

      if (right.id === "core") {
        return 1;
      }

      if (left.depthV1 !== right.depthV1) {
        return left.depthV1 === "full" ? -1 : 1;
      }

      return left.name.localeCompare(right.name);
    });
  const core = majors.find((major) => major.id === "core");

  return (
    <>
      <BreadcrumbBar
        items={[{ href: "/", label: "Home" }, { label: "Curriculum" }]}
      />
      <PageHeader
        eyebrow="Curriculum overview"
        title="Use Engineering Atlas as the gateway into every major."
        description="The curriculum section now works as a real all-majors entry point: start from the shared core, compare specializations, and move into year-by-year course maps with concept and labs links carried along."
        meta={
          <>
            <Badge tone="accent">Shared core + 9 specializations</Badge>
            <Badge>Electrical Engineering is deepest in V1</Badge>
            <Badge>{majors.length} total atlas tracks</Badge>
          </>
        }
      />

      {core ? (
        <section className="surface-panel space-y-5 p-6">
          <SectionHeader
            eyebrow="Start here"
            title="Core Engineering is the shared foundation underneath every specialization"
            description="The core overview now makes the shared structure explicit so students can see the common launch sequence before branching into a major."
            aside={
              <Link
                href="/curriculum/core"
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Open Core Engineering
              </Link>
            }
            className="border-none pb-0"
          />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white/80 p-5">
              <p className="text-sm text-muted-foreground">Foundation summary</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {cleanText(core.summaryChain)}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white/80 p-5">
              <p className="text-sm text-muted-foreground">Core coverage</p>
              <p className="mt-2 text-3xl font-semibold">{core.courseCount}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                shared courses already mapped into the atlas
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white/80 p-5">
              <p className="text-sm text-muted-foreground">Why it matters</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {cleanText(core.description)}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="space-y-6">
        <SectionHeader
          eyebrow="All majors"
          title="Compare majors by scope, depth, and fit"
          description="Search by name or subfield, then use the V1 depth filter to separate the first fully built tracks from the map-level branches."
        />
        <CurriculumMajorExplorer majors={majors} />
      </section>
    </>
  );
}
