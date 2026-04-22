import { z } from "zod";

import {
  courseStatusSchema,
  majorSlugSchema,
  stageIdSchema,
} from "@/lib/schemas/taxonomy.schema";

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  majorId: majorSlugSchema,
  isCore: z.boolean(),
  stageId: stageIdSchema,
  stageLabel: z.string(),
  year: z.string(),
  shortDesc: z.string(),
  whyItMatters: z.string(),
  prereqs: z.array(z.string()),
  externalPrereqs: z.array(z.string()),
  leadsInto: z.array(z.string()),
  externalLeadsInto: z.array(z.string()),
  skills: z.array(z.string()),
  topicClusters: z.array(z.string()),
  concepts: z.array(z.string()),
  relatedTools: z.array(z.string()),
  isElective: z.boolean(),
  electiveTheme: z.string().nullable(),
  electiveTag: z.string().nullable(),
  status: courseStatusSchema,
  referenceNote: z.string().nullable(),
});

export type Course = z.infer<typeof courseSchema>;
