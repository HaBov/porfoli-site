import { z } from "zod";

import {
  CODE_LANGUAGES,
  CODE_SAMPLE_CATEGORIES,
  CODE_SAMPLE_COMPLEXITIES,
} from "../registries/code";
import { PUBLICATION_STATUSES } from "../registries/content";
import {
  contentIdSchema,
  isoDateSchema,
  slugSchema,
} from "./shared.schema";

export const codeSampleSchema = z.object({
  id: contentIdSchema,
  title: z.string().min(4).max(100),
  slug: slugSchema,
  summary: z.string().min(30).max(260),

  publicationStatus: z.enum(PUBLICATION_STATUSES),
  category: z.enum(CODE_SAMPLE_CATEGORIES),
  complexity: z.enum(CODE_SAMPLE_COMPLEXITIES),

  language: z.enum(CODE_LANGUAGES),
  framework: z.string().min(2).max(60).optional(),

  relatedTechnologyIds: z
    .array(contentIdSchema)
    .min(1),

  relatedProjectIds: z
    .array(contentIdSchema)
    .min(1),

  featured: z.boolean(),
  priority: z.number().int().positive(),

  filename: z.string().min(3).max(160),
  lineCount: z.number().int().positive(),

  estimatedReadingMinutes: z
    .number()
    .int()
    .min(2)
    .max(30),

  portfolioRewritten: z.literal(true),
  confidentialityReviewed: z.literal(true),

  publishedAt: isoDateSchema,
  updatedAt: isoDateSchema,
});

export const codeSampleListSchema = z
  .array(codeSampleSchema)
  .min(1);

export type CodeSampleRecord = z.infer<
  typeof codeSampleSchema
>;
