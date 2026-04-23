type Insight = {
  label: string;
  text: string;
};

type InsightPanelProps = {
  title?: string;
  insights: Insight[];
};

export function InsightPanel({
  title = "What to notice",
  insights,
}: InsightPanelProps) {
  return (
    <section className="surface-panel space-y-4 p-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {title}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {insights.map((insight) => (
          <div
            key={insight.label}
            className="rounded-2xl border border-border bg-white/80 p-4"
          >
            <p className="text-sm font-semibold">{insight.label}</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {insight.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

