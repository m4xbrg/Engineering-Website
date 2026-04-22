import Link from "next/link";

type RelatedLink = {
  href: string;
  label: string;
};

type RelatedContentProps = {
  title: string;
  items: RelatedLink[];
};

export function RelatedContent({ title, items }: RelatedContentProps) {
  return (
    <section className="surface-panel p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
