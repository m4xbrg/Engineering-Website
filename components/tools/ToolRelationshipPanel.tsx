import Link from "next/link";

type RelationshipItem = {
  href: string;
  label: string;
  description?: string;
};

type ToolRelationshipPanelProps = {
  title: string;
  items: RelationshipItem[];
};

export function ToolRelationshipPanel({
  title,
  items,
}: ToolRelationshipPanelProps) {
  return (
    <section className="surface-panel p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </p>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <Link
            key={`${title}-${item.href}-${item.label}`}
            href={item.href}
            className="rounded-2xl border border-border bg-white/80 px-4 py-3 transition-colors hover:bg-muted"
          >
            <p className="text-sm font-medium">{item.label}</p>
            {item.description ? (
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}

