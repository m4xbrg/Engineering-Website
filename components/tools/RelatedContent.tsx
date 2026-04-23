import Link from "next/link";

type RelatedLink = {
  href: string;
  label: string;
  description?: string;
};

type RelatedContentProps = {
  title: string;
  items: RelatedLink[];
};

export function RelatedContent({ title, items }: RelatedContentProps) {
  return (
    <section className="surface-panel p-6">
      <p className="atlas-kicker">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.length ? (
          items.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="rounded-[1.4rem] border border-border bg-white/82 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <p className="font-medium text-foreground">{item.label}</p>
              {item.description ? (
                <p className="mt-1 leading-6 text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </Link>
          ))
        ) : (
          <div className="rounded-[1.4rem] border border-dashed border-border bg-muted/40 px-4 py-3 text-sm leading-7 text-muted-foreground">
            No related content has been authored here yet.
          </div>
        )}
      </div>
    </section>
  );
}
