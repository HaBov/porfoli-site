import { z } from "zod";

import { SKILL_GROUP_TYPES } from "../registries/skill";
import { contentIdSchema } from "./shared.schema";

export const skillGroupSchema = z.object({
  id: contentIdSchema,

  title: z.string().min(3).max(100),
  shortTitle: z.string().min(2).max(60).optional(),

  type: z.enum(SKILL_GROUP_TYPES),

  description: z.string().min(40).max(400),

  technologyIds: z.array(contentIdSchema).min(2).max(14),

  featured: z.boolean(),
  displayOrder: z.number().int().positive(),
});

export const skillGroupListSchema = z.array(skillGroupSchema).min(1);

export type SkillGroup = z.infer<typeof skillGroupSchema>;
