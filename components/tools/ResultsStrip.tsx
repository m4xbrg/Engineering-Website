type ResultItem = {
  label: string;
  value: string;
  detail?: string;
};

type ResultsStripProps = {
  title?: string;
  items: ResultItem[];
};

export function ResultsStrip({ title = "Key results", items }: ResultsStripProps) {
  return (
    <section className="surface-panel space-y-4 p-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {title}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border bg-white/85 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-3 text-2xl font-semibold">{item.value}</p>
            {item.detail ? (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.detail}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

