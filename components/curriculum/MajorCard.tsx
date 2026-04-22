import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { getMajorRoute } from "@/lib/utils/routes";
import type { MajorIndexItem } from "@/types";

type MajorCardProps = {
  major: MajorIndexItem;
};

export function MajorCard({ major }: MajorCardProps) {
  return (
    <Link
      href={getMajorRoute(major.id)}
      className="surface-panel flex h-full flex-col gap-4 p-6 transition-transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {major.shortName}
          </p>
          <h3 className="mt-2 text-xl font-semibold">{major.name}</h3>
        </div>
        <Badge tone={major.depthV1 === "full" ? "accent" : "muted"}>
          {major.depthV1 === "full" ? "Deep in V1" : "Structural in V1"}
        </Badge>
      </div>
      <p className="text-sm leading-7 text-muted-foreground">
        {major.description}
      </p>
    </Link>
  );
}
