import { z } from "zod";

import {
  CANONICAL_MAJOR_SLUGS,
  CANONICAL_STAGE_IDS,
  CANONICAL_TOOL_SLUGS,
} from "@/lib/utils/routes";

export const majorSlugSchema = z.enum(CANONICAL_MAJOR_SLUGS);
export const stageIdSchema = z.enum(CANONICAL_STAGE_IDS);
export const toolSlugSchema = z.enum(CANONICAL_TOOL_SLUGS);

export const majorDepthSchema = z.enum(["full", "map"]);
export const courseStatusSchema = z.enum(["live", "stub", "planned"]);
export const toolCategorySchema = z.enum([
  "calculator",
  "visualizer",
  "simulator",
  "reference",
]);
export const toolStatusSchema = z.enum(["live", "stub", "planned"]);

export const stageRegistrySchema = z.object({
  id: stageIdSchema,
  label: z.string(),
  typicalYear: z.string(),
});

export const stagePreviewSchema = z.object({
  id: stageIdSchema,
  label: z.string(),
  courseIds: z.array(z.string()),
});

export const majorIndexItemSchema = z.object({
  id: majorSlugSchema,
  name: z.string(),
  shortName: z.string(),
  description: z.string(),
  depthV1: majorDepthSchema,
});

export const topicClusterSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type MajorSlug = z.infer<typeof majorSlugSchema>;
export type StageId = z.infer<typeof stageIdSchema>;
export type ToolSlug = z.infer<typeof toolSlugSchema>;
export type MajorIndexItem = z.infer<typeof majorIndexItemSchema>;
export type StageRegistryRecord = z.infer<typeof stageRegistrySchema>;
export type StagePreview = z.infer<typeof stagePreviewSchema>;
export type TopicCluster = z.infer<typeof topicClusterSchema>;
