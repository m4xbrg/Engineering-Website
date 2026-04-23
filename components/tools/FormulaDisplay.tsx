type FormulaDisplayProps = {
  title?: string;
  expression: string;
  substituted?: string;
};

export function FormulaDisplay({
  title = "Active formula",
  expression,
  substituted,
}: FormulaDisplayProps) {
  return (
    <section className="rounded-2xl border border-border bg-white/85 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </p>
      <p className="mt-3 font-display text-lg">{expression}</p>
      {substituted ? (
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {substituted}
        </p>
      ) : null}
    </section>
  );
}

