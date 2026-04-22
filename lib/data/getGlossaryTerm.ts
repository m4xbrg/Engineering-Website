import { notFound } from "next/navigation";

import { glossaryEntrySchema } from "@/lib/schemas";
import { glossarySource } from "@/lib/data/sources";

export function getAllGlossaryTerms() {
  return glossaryEntrySchema.array().parse(glossarySource);
}

export function getGlossaryTerm(termSlug: string) {
  const term = getAllGlossaryTerms().find((item) => item.id === termSlug);

  if (!term) {
    notFound();
  }

  return term;
}
