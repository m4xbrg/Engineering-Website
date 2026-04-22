import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { getAllMajors } from "@/lib/data";
import { getMajorRoute } from "@/lib/utils/routes";

export function CurriculumSidebar() {
  const majors = getAllMajors();

  return (
    <div className="surface-panel sticky top-6 space-y-5 p-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Curriculum Map
        </p>
        <h2 className="text-xl font-semibold">Atlas navigation</h2>
      </div>
      <Link
        href="/curriculum"
        className="block rounded-2xl border border-border bg-muted/60 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
      >
        Curriculum overview
      </Link>
      <div className="grid gap-2">
        {majors.map((major) => (
          <Link
            key={major.id}
            href={getMajorRoute(major.id)}
            className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <span>{major.name}</span>
            <Badge tone={major.depthV1 === "full" ? "accent" : "muted"}>
              {major.depthV1}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
