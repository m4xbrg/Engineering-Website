import { z } from "zod";

export const conceptSchema = z.object({
  id: z.string(),
  name: z.string(),
  aliases: z.array(z.string()),
  shortDef: z.string(),
  extendedDef: z.string(),
  equation: z.string().nullable(),
  topicClusters: z.array(z.string()),
  majorTags: z.array(z.string()),
  taughtIn: z.array(z.string()),
  toolLinks: z.array(z.string()),
  relatedConcepts: z.array(z.string()),
  isFoundational: z.boolean(),
});

export type Concept = z.infer<typeof conceptSchema>;
