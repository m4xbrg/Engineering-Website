import type { ReactNode } from "react";

type ControlPanelProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function ControlPanel({
  title = "Control panel",
  description,
  actions,
  children,
}: ControlPanelProps) {
  return (
    <section className="surface-panel space-y-5 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {title}
          </p>
          {description ? (
            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

