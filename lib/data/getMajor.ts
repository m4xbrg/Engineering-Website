import { notFound } from "next/navigation";

import { getCatalog } from "@/lib/data/catalog";
import type { MajorSlug } from "@/types";

export function getMajor(slug: MajorSlug) {
  return getMajorOrThrow(slug);
}

export function getMajorOrThrow(slug: string) {
  const major = getCatalog().majors.find((item) => item.id === slug);

  if (!major) {
    notFound();
  }

  return major;
}
