import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type ConceptChipProps = {
  slug: string;
  name: string;
  className?: string;
};

export function ConceptChip({ slug, name, className }: ConceptChipProps) {
  return (
    <Link
      href={`/concepts/${slug}`}
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-white/80 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      {name}
    </Link>
  );
}
