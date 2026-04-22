import { notFound } from "next/navigation";

import { getCatalog } from "@/lib/data/catalog";

export function getAllConcepts() {
  return getCatalog().concepts;
}

export function getConcept(conceptSlug: string) {
  const concept = getCatalog().concepts.find((item) => item.id === conceptSlug);

  if (!concept) {
    notFound();
  }

  return concept;
}

export function getConceptsForCourse(courseId: string) {
  return getCatalog().concepts.filter((concept) => concept.taughtIn.includes(courseId));
}
