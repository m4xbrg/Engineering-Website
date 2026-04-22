import Link from "next/link";

import { MAIN_NAV_ITEMS } from "@/lib/utils/routes";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-white/60">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr,1fr]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Engineering Atlas
          </p>
          <h2 className="text-2xl font-semibold">
            A curriculum-driven platform for exploring engineering from
            foundations to tools.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            This first scaffold establishes the route map, shared layout system,
            data contracts, and placeholder tool architecture for the MVP.
          </p>
        </div>
        <div className="grid gap-2">
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
