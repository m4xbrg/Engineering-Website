import Link from "next/link";

import { SiteNav } from "@/components/layout/SiteNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/78 backdrop-blur">
      <div className="container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Engineering Atlas
          </p>
          <div className="space-y-1">
            <p className="font-display text-lg font-semibold md:text-xl">
              Curriculum atlas, concept explorer, and interactive engineering lab.
            </p>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Move from the shared engineering foundation into majors, courses,
              concepts, and tool-backed lab experiences without losing context.
            </p>
          </div>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
