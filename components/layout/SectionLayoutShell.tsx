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
      <section className="surface-panel p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Section
        </p>
        <div className="mt-3 max-w-4xl space-y-3">
          <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
          <p className="text-base leading-8 text-muted-foreground">
            {description}
          </p>
        </div>
      </section>
      <div
        className={
          sidebar ? "grid gap-8 lg:grid-cols-[18rem,1fr]" : "grid gap-8"
        }
      >
        {sidebar ? <aside className="space-y-6">{sidebar}</aside> : null}
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
}
