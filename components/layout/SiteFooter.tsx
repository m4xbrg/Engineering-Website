import Link from "next/link";

import { MAIN_NAV_ITEMS } from "@/lib/utils/routes";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-white/72">
      <div className="container grid gap-8 py-10 lg:grid-cols-[1.2fr,0.85fr,0.95fr]">
        <div className="space-y-3">
          <p className="atlas-kicker">
            Engineering Atlas
          </p>
          <h2 className="text-2xl font-semibold">
            A curriculum-first engineering product that unifies map, language,
            and lab.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            The MVP already connects shared foundations, specialization tracks,
            concept pages, glossary terms, and the first live engineering tools.
          </p>
        </div>
        <div className="space-y-3">
          <p className="atlas-kicker">Main sections</p>
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
        <div className="space-y-3">
          <p className="atlas-kicker">Product focus</p>
          <div className="grid gap-3 text-sm leading-7 text-muted-foreground">
            <p>Curriculum Atlas: compare majors and trace course progression.</p>
            <p>Concept Explorer: follow reusable ideas across the whole map.</p>
            <p>Interactive Labs: use tools in the context of real coursework.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
