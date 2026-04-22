"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { cleanText } from "@/lib/utils/format";
import { MAJOR_LABELS } from "@/lib/utils/routes";
import type { GlossaryEntry } from "@/types";

type GlossaryExplorerProps = {
  terms: GlossaryEntry[];
};

export function GlossaryExplorer({ terms }: GlossaryExplorerProps) {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("all");
  const deferredSearch = useDeferredValue(search);
  const query = deferredSearch.trim().toLowerCase();

  const domainOptions = Array.from(
    new Set(terms.flatMap((term) => term.domain)),
  ).sort((left, right) => left.localeCompare(right));

  const filteredTerms = terms.filter((term) => {
    const haystack = [term.term, term.shortDef, term.extendedDef]
      .map((value) => cleanText(value).toLowerCase())
      .join(" ");
    const matchesSearch = !query || haystack.includes(query);
    const matchesDomain = domain === "all" || term.domain.includes(domain);

    return matchesSearch && matchesDomain;
  });

  const groupedTerms = filteredTerms.reduce<Record<string, GlossaryEntry[]>>(
    (groups, term) => {
      const letter = term.term.charAt(0).toUpperCase();
      groups[letter] ??= [];
      groups[letter].push(term);
      return groups;
    },
    {},
  );

  const letters = Object.keys(groupedTerms).sort((left, right) =>
    left.localeCompare(right),
  );

  return (
    <div className="space-y-6">
      <div className="surface-panel grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr),minmax(16rem,0.35fr)]">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Search glossary
          </span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by term or definition"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Domain
          </span>
          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
          >
            <option value="all">All domains</option>
            {domainOptions.map((option) => (
              <option key={option} value={option}>
                {MAJOR_LABELS[option as keyof typeof MAJOR_LABELS] ?? option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {letters.length ? (
        <div className="flex flex-wrap gap-2">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#glossary-${letter}`}
              className="rounded-full border border-border bg-white px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {letter}
            </a>
          ))}
        </div>
      ) : null}

      <p className="text-sm text-muted-foreground">
        Showing {filteredTerms.length} of {terms.length} glossary terms.
      </p>

      {letters.length ? (
        <div className="space-y-6">
          {letters.map((letter) => (
            <section
              key={letter}
              id={`glossary-${letter}`}
              className="surface-panel space-y-4 p-6"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
                <h2 className="text-2xl font-semibold">{letter}</h2>
                <p className="text-sm text-muted-foreground">
                  {groupedTerms[letter].length} terms
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {groupedTerms[letter]
                  .sort((left, right) => left.term.localeCompare(right.term))
                  .map((term) => (
                    <Link
                      key={term.id}
                      href={`/glossary/${term.id}`}
                      className="rounded-2xl border border-border bg-white/80 p-4 transition-colors hover:bg-muted"
                    >
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{term.term}</h3>
                        <p className="text-sm leading-7 text-muted-foreground">
                          {cleanText(term.shortDef)}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {term.domain.slice(0, 3).map((entry) => (
                          <Badge key={entry} tone="muted">
                            {MAJOR_LABELS[entry as keyof typeof MAJOR_LABELS] ?? entry}
                          </Badge>
                        ))}
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No glossary terms matched"
          description="Try a broader search or reset the domain filter."
        />
      )}
    </div>
  );
}
