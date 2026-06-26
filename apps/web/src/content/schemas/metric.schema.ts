import { z } from "zod";

import { FACT_VERIFICATION_STATUSES } from "../registries/content";
import { METRIC_KINDS } from "../registries/project";
import { contentIdSchema } from "./shared.schema";

export const projectMetricSchema = z.object({
  id: contentIdSchema,
  projectId: contentIdSchema,

  value: z.string().min(1).max(40),
  label: z.string().min(3).max(100),
  context: z.string().min(3).max(180).optional(),

  kind: z.enum(METRIC_KINDS),
  verificationStatus: z.enum(FACT_VERIFICATION_STATUSES),

  approximate: z.boolean(),
  featured: z.boolean(),
  publicAllowed: z.boolean(),

  displayOrder: z.number().int().positive(),
});

export const projectMetricListSchema = z.array(projectMetricSchema).min(1);

export type ProjectMetric = z.infer<typeof projectMetricSchema>;
