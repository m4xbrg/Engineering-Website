import type { ReactNode } from "react";

type SectionLayoutShellProps = {
  title: string;
  description: string;
  sidebar?: ReactNode;
  children: ReactNode;
};

export function SectionLayoutShell({
  title,
  description,
  sidebar,
  children,
}: SectionLayoutShellProps) {
  return (
    <div className="container space-y-8 py-10 md:py-14">
      <section className="surface-panel-muted p-6 md:p-7">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),auto] lg:items-end">
          <div className="space-y-3">
            <p className="atlas-kicker">Section shell</p>
            <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
            <p className="max-w-4xl text-sm leading-7 text-muted-foreground md:text-base">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-border bg-white/80 px-3 py-1.5 text-sm text-muted-foreground">
              Curriculum-aware navigation
            </span>
            <span className="rounded-full border border-border bg-white/80 px-3 py-1.5 text-sm text-muted-foreground">
              MVP depth varies by section
            </span>
          </div>
        </div>
      </section>
      <div
        className={
          sidebar ? "grid gap-8 xl:grid-cols-[18.5rem,minmax(0,1fr)]" : "grid gap-8"
        }
      >
        {sidebar ? <aside className="space-y-6">{sidebar}</aside> : null}
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
}
