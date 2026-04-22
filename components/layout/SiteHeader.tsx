import Link from "next/link";

import { SiteNav } from "@/components/layout/SiteNav";

export function SiteHeader() {
  return (
    <header className="border-b border-border/80 bg-white/75 backdrop-blur">
      <div className="container flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Engineering Atlas
          </p>
          <p className="font-display text-xl font-semibold">
            Shared engineering core. Specialized tracks. Interactive labs.
          </p>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
