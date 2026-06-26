import { z } from "zod";

import {
  TECHNOLOGY_CATEGORIES,
  TECHNOLOGY_EVIDENCE_LEVELS,
  TECHNOLOGY_VISIBILITIES,
} from "../registries/technology";
import { contentIdSchema, externalUrlSchema } from "./shared.schema";

export const technologySchema = z.object({
  id: contentIdSchema,
  name: z.string().min(1).max(80),
  shortName: z.string().min(1).max(40).optional(),

  category: z.enum(TECHNOLOGY_CATEGORIES),
  evidenceLevel: z.enum(TECHNOLOGY_EVIDENCE_LEVELS),
  visibility: z.enum(TECHNOLOGY_VISIBILITIES),

  description: z.string().min(10).max(240),
  aliases: z.array(z.string().min(1).max(80)).default([]),

  relatedProjectIds: z.array(contentIdSchema).default([]),

  website: externalUrlSchema.optional(),
  featured: z.boolean(),
});

export const technologyListSchema = z.array(technologySchema).min(1);

export type Technology = z.infer<typeof technologySchema>;
