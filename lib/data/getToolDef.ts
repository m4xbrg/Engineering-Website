import { notFound } from "next/navigation";

import { getCatalog } from "@/lib/data/catalog";

export function getAllToolDefs() {
  return getCatalog().tools;
}

export function getToolDef(toolSlug: string) {
  const tool = getCatalog().tools.find((item) => item.id === toolSlug);

  if (!tool) {
    notFound();
  }

  return tool;
}
