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
    <header className={cn("surface-panel p-8 md:p-10", className)}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {meta ? <div className="mt-6 flex flex-wrap gap-2">{meta}</div> : null}
    </header>
  );
}
