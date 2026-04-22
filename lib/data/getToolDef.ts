import { notFound } from "next/navigation";

import { toolSchema } from "@/lib/schemas";
import { toolsSource } from "@/lib/data/sources";

export function getAllToolDefs() {
  return toolSchema.array().parse(toolsSource);
}

export function getToolDef(toolSlug: string) {
  const tool = getAllToolDefs().find((item) => item.id === toolSlug);

  if (!tool) {
    notFound();
  }

  return tool;
}
