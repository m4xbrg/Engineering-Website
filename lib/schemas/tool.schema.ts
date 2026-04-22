import { z } from "zod";

import {
  toolCategorySchema,
  toolStatusSchema,
  toolSlugSchema,
} from "@/lib/schemas/taxonomy.schema";

export const toolSchema = z.object({
  id: toolSlugSchema,
  name: z.string(),
  category: toolCategorySchema,
  description: z.string(),
  whyMvp: z.string(),
  purpose: z.string(),
  majorIds: z.array(z.string()),
  courseIds: z.array(z.string()),
  conceptIds: z.array(z.string()),
  clusterIds: z.array(z.string()),
  complexityEstimate: z.string(),
  status: toolStatusSchema,
  routePath: z.string(),
  thumbnailDescription: z.string(),
});

export type ToolDefinition = z.infer<typeof toolSchema>;
