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
      <p className="atlas-kicker">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.length ? (
          items.map((item) => (
            <Link
              key={`${title}-${item.href}-${item.label}`}
              href={item.href}
              className="rounded-[1.4rem] border border-border bg-white/82 px-4 py-3 transition-colors hover:bg-muted"
            >
              <p className="text-sm font-medium">{item.label}</p>
              {item.description ? (
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </Link>
          ))
        ) : (
          <div className="rounded-[1.4rem] border border-dashed border-border bg-muted/40 px-4 py-3 text-sm leading-7 text-muted-foreground">
            This connection surface has not been populated yet for the current MVP slice.
          </div>
        )}
      </div>
    </section>
  );
}
