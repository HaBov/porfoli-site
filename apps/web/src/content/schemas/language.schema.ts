import { z } from "zod";

import { FACT_VERIFICATION_STATUSES } from "../registries/content";
import { LANGUAGE_PROFICIENCY_LEVELS } from "../registries/profile";
import { contentIdSchema } from "./shared.schema";

export const languageSchema = z.object({
  id: contentIdSchema,
  name: z.string().min(2).max(60),
  proficiency: z.enum(LANGUAGE_PROFICIENCY_LEVELS),
  publicLabel: z.string().min(2).max(100),
  verificationStatus: z.enum(FACT_VERIFICATION_STATUSES),
  displayOrder: z.number().int().positive(),
});

export const languageListSchema = z.array(languageSchema).min(1);

export type LanguageRecord = z.infer<typeof languageSchema>;
