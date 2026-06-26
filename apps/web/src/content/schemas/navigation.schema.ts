import { z } from "zod";

import { NAVIGATION_GROUPS } from "../registries/navigation";
import { contentIdSchema, internalPathSchema } from "./shared.schema";

export const navigationItemSchema = z.object({
  id: contentIdSchema,

  label: z.string().min(2).max(40),
  href: internalPathSchema,

  group: z.enum(NAVIGATION_GROUPS),

  enabled: z.boolean(),

  showInDesktop: z.boolean(),
  showInMobile: z.boolean(),
  showInFooter: z.boolean(),

  displayOrder: z.number().int().positive(),
});

export const navigationListSchema = z.array(navigationItemSchema).min(1);

export type NavigationItem = z.infer<typeof navigationItemSchema>;
