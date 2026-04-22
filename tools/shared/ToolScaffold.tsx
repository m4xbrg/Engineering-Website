"use client";

import { Badge } from "@/components/ui/Badge";

type ToolScaffoldProps = {
  title: string;
  pattern: string;
  note: string;
};

export default function ToolScaffold({
  title,
  pattern,
  note,
}: ToolScaffoldProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
      <section className="surface-panel space-y-5 p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Placeholder controls
          </p>
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        <div className="grid gap-3">
          <div className="rounded-2xl border border-dashed border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            Control panel inputs will be implemented here in the next pass.
          </div>
          <div className="rounded-2xl border border-dashed border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            This tool follows the <strong>{pattern}</strong> interaction pattern
            from the MVP tool plan.
          </div>
        </div>
      </section>
      <section className="surface-panel space-y-5 p-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone="accent">Client-side shell</Badge>
          <Badge tone="warning">Implementation deferred</Badge>
        </div>
        <div className="rounded-[1.75rem] border border-dashed border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(235,244,247,0.78))] p-10">
          <div className="mx-auto max-w-md space-y-3 text-center">
            <h4 className="text-2xl font-semibold">
              Visualization area reserved
            </h4>
            <p className="text-sm leading-7 text-muted-foreground">{note}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
