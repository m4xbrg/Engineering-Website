import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { getAllToolDefs } from "@/lib/data";
import { humanizeToken } from "@/lib/utils/format";

export function LabsSidebar() {
  const tools = getAllToolDefs();
  const liveTools = tools.filter((tool) => tool.status === "live");

  return (
    <div className="surface-panel sticky top-24 space-y-6 p-5">
      <div className="space-y-2">
        <p className="atlas-kicker">Interactive Labs</p>
        <h2 className="text-xl font-semibold">Applied navigation</h2>
        <p className="text-sm leading-7 text-muted-foreground">
          Use the labs layer as the hands-on bridge back into majors, courses,
          and concepts.
        </p>
      </div>

      <div className="grid gap-2">
        <p className="atlas-kicker">Quick links</p>
        <Link
          href="/labs"
          className="rounded-2xl border border-border bg-muted/60 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
        >
          Labs overview
        </Link>
        <Link
          href="/curriculum"
          className="rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Curriculum atlas
        </Link>
        <Link
          href="/concepts"
          className="rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Concepts explorer
        </Link>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <p className="atlas-kicker">Live tools</p>
          <Badge tone="accent">{liveTools.length}</Badge>
        </div>
        {liveTools.slice(0, 5).map((tool) => (
          <Link
            key={tool.id}
            href={tool.routePath}
            className="rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <span className="font-medium text-foreground">{tool.name}</span>
            <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {humanizeToken(tool.category)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
