import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbBarProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbBar({ items }: BreadcrumbBarProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2 rounded-full border border-border/70 bg-white/80 px-3 py-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-foreground" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? <ChevronRight className="h-4 w-4 text-border" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
