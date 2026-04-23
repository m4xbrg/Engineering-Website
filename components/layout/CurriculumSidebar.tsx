import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { getMajorIndexItems } from "@/lib/data";
import { readableDepth } from "@/lib/utils/format";
import { getMajorRoute } from "@/lib/utils/routes";

export function CurriculumSidebar() {
  const majors = getMajorIndexItems();

  return (
    <div className="surface-panel sticky top-24 space-y-6 p-5">
      <div className="space-y-2">
        <p className="atlas-kicker">
          Curriculum Map
        </p>
        <h2 className="text-xl font-semibold">Atlas navigation</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          Move between the shared foundation, specialization maps, and the lab
          and concept layers from one sidebar.
        </p>
      </div>
      <div className="grid gap-2">
        <p className="atlas-kicker">Quick links</p>
        <Link
          href="/curriculum"
          className="rounded-2xl border border-border bg-muted/60 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
        >
          Curriculum overview
        </Link>
        <Link
          href="/curriculum/core"
          className="rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Core Engineering
        </Link>
        <Link
          href="/labs"
          className="rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Labs hub
        </Link>
        <Link
          href="/concepts"
          className="rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Concepts index
        </Link>
      </div>
      <div className="grid gap-2">
        <p className="atlas-kicker">Majors</p>
        {majors.map((major) => (
          <Link
            key={major.id}
            href={getMajorRoute(major.id)}
            className="flex items-start justify-between gap-3 rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <span className="pr-2">{major.name}</span>
            <Badge tone={major.depthV1 === "full" ? "accent" : "muted"}>
              {readableDepth(major.depthV1)}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
