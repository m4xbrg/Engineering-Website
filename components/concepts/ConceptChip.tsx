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
        "atlas-chip-link",
        className,
      )}
    >
      {name}
    </Link>
  );
}
