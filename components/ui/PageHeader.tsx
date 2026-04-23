import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  meta?: ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("surface-panel-strong overflow-hidden p-7 md:p-9", className)}>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-4">
          {eyebrow ? (
            <p className="atlas-kicker">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-tight md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex flex-wrap items-center gap-3 xl:justify-end">
            {actions}
          </div>
        ) : null}
      </div>
      {meta ? (
        <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-border/70 pt-5">
          {meta}
        </div>
      ) : null}
    </header>
  );
}
