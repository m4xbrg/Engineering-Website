import { notFound } from "next/navigation";

import { majorSchema } from "@/lib/schemas";
import { majorSources } from "@/lib/data/sources";
import type { MajorSlug } from "@/types";

export function getMajor(slug: MajorSlug) {
  return majorSchema.parse(majorSources[slug]);
}

export function getMajorOrThrow(slug: string) {
  if (!(slug in majorSources)) {
    notFound();
  }

  return majorSchema.parse(majorSources[slug as MajorSlug]);
}
