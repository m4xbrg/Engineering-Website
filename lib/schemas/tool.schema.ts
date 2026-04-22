import { z } from "zod";

import {
  toolCategorySchema,
  toolSlugSchema,
} from "@/lib/schemas/taxonomy.schema";

export const toolSchema = z.object({
  id: toolSlugSchema,
  name: z.string(),
  category: toolCategorySchema,
  description: z.string(),
  purpose: z.string(),
  majorIds: z.array(z.string()),
  courseIds: z.array(z.string()),
  conceptIds: z.array(z.string()),
  clusterIds: z.array(z.string()),
  complexityEstimate: z.string(),
  status: z.enum(["live", "stub", "planned"]),
  routePath: z.string(),
});

export type ToolDefinition = z.infer<typeof toolSchema>;
