import { z } from "zod";

export const prereqEdgeSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
  type: z.enum(["prerequisite", "corequisite", "recommended"]),
  crossMajor: z.boolean(),
  note: z.string().nullable().optional(),
});

export const clusterRelationshipSchema = z.object({
  from: z.string(),
  to: z.string(),
  relationship: z.string(),
});

export const toolLinkSchema = z.object({
  toolId: z.string(),
  courseIds: z.array(z.string()),
  conceptIds: z.array(z.string()),
});

export type PrereqEdge = z.infer<typeof prereqEdgeSchema>;
export type ClusterRelationship = z.infer<typeof clusterRelationshipSchema>;
export type ToolLink = z.infer<typeof toolLinkSchema>;
