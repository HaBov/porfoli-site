import { z } from "zod";

import { ctaSchema, emailSchema, externalUrlSchema, phoneSchema } from "./shared.schema";

export const siteProfileSchema = z.object({
  fullName: z.string().min(3).max(100),
  shortName: z.string().min(2).max(50),
  initials: z
    .string()
    .min(2)
    .max(4)
    .regex(/^[A-Z]+$/, "Initials must contain uppercase letters only."),

  primaryTitle: z.string().min(3).max(80),
  functionalTitle: z.string().min(3).max(80),
  professionalDescriptor: z.string().min(30).max(180),

  heroEyebrow: z.string().min(10).max(100),
  heroHeading: z.string().min(20).max(100),
  heroDescription: z.string().min(80).max(350),

  location: z.string().min(3).max(100),
  relocationStatus: z.string().min(10).max(160),
  availabilityStatus: z.string().min(10).max(160),

  email: emailSchema,
  phone: phoneSchema.optional(),

  githubUrl: externalUrlSchema.optional(),
  linkedinUrl: externalUrlSchema.optional(),
  portfolioUrl: externalUrlSchema.optional(),

  aboutShort: z.string().min(60).max(300),
  aboutFull: z.array(z.string().min(80).max(700)).min(2).max(5),

  currentFocus: z.array(z.string().min(3).max(80)).min(1).max(8),

  currentlyExploring: z.array(z.string().min(3).max(80)).max(8).optional(),

  primaryCTA: ctaSchema,
  secondaryCTA: ctaSchema,
  tertiaryCTA: ctaSchema.optional(),
});

export type SiteProfile = z.infer<typeof siteProfileSchema>;
