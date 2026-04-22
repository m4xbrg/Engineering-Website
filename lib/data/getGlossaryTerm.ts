import { notFound } from "next/navigation";

import { getCatalog } from "@/lib/data/catalog";

export function getAllGlossaryTerms() {
  return getCatalog().glossary;
}

export function getGlossaryTerm(termSlug: string) {
  const term = getCatalog().glossary.find((item) => item.id === termSlug);

  if (!term) {
    notFound();
  }

  return term;
}
