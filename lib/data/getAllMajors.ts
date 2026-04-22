import { majorIndexItemSchema } from "@/lib/schemas";
import { majorsIndexSource } from "@/lib/data/sources";

export function getAllMajors() {
  return majorIndexItemSchema.array().parse(majorsIndexSource);
}
