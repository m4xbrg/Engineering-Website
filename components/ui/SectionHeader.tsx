import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  aside?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  aside,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {aside ? <div>{aside}</div> : null}
    </div>
  );
}
