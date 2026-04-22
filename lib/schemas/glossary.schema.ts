import { z } from "zod";

export const glossaryEntrySchema = z.object({
  id: z.string(),
  term: z.string(),
  shortDef: z.string(),
  extendedDef: z.string(),
  domain: z.array(z.string()),
  conceptId: z.string().nullable(),
  relatedConcepts: z.array(z.string()),
  relatedTerms: z.array(z.string()),
});

export type GlossaryEntry = z.infer<typeof glossaryEntrySchema>;
