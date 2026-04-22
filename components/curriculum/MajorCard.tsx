import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { cleanText, readableDepth } from "@/lib/utils/format";
import { getMajorRoute } from "@/lib/utils/routes";
import type { Major, MajorIndexItem } from "@/types";

type MajorCardProps = {
  major: MajorIndexItem &
    Partial<Pick<Major, "mainSubfields" | "recommendedTools" | "coreFoundationIds">>;
};

export function MajorCard({ major }: MajorCardProps) {
  return (
    <Link
      href={getMajorRoute(major.id)}
      className="surface-panel flex h-full flex-col gap-5 p-6 transition-transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {major.shortName}
          </p>
          <h3 className="mt-2 text-xl font-semibold">{major.name}</h3>
        </div>
        <Badge tone={major.depthV1 === "full" ? "accent" : "muted"}>
          {readableDepth(major.depthV1)}
        </Badge>
      </div>
      <p className="text-sm leading-7 text-muted-foreground">
        {cleanText(major.description)}
      </p>
      {"courseCount" in major ? (
        <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
          <p>{major.courseCount} courses</p>
          <p>{major.coreFoundationIds?.length ?? 0} core links</p>
          <p>{major.recommendedTools?.length ?? 0} lab links</p>
        </div>
      ) : null}
      {major.mainSubfields?.length ? (
        <div className="flex flex-wrap gap-2">
          {major.mainSubfields.slice(0, 4).map((field) => (
            <Badge key={field}>{field}</Badge>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
