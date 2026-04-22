import { notFound } from "next/navigation";

import { conceptSchema } from "@/lib/schemas";
import { conceptSource } from "@/lib/data/sources";

export function getAllConcepts() {
  return conceptSchema.array().parse(conceptSource);
}

export function getConcept(conceptSlug: string) {
  const concept = getAllConcepts().find((item) => item.id === conceptSlug);

  if (!concept) {
    notFound();
  }

  return concept;
}
