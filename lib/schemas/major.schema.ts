import { z } from "zod";

import {
  majorDepthSchema,
  majorSlugSchema,
  stagePreviewSchema,
} from "@/lib/schemas/taxonomy.schema";

export const majorSchema = z.object({
  id: majorSlugSchema,
  name: z.string(),
  shortName: z.string(),
  description: z.string(),
  mainSubfields: z.array(z.string()),
  coreFoundationIds: z.array(z.string()),
  conceptClusters: z.array(z.string()),
  summaryChain: z.string(),
  depthV1: majorDepthSchema,
  colorToken: z.string(),
  stages: z.array(stagePreviewSchema),
});

export type Major = z.infer<typeof majorSchema>;
