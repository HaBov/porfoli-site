import { z } from "zod";

import { FACT_VERIFICATION_STATUSES } from "../registries/content";
import { WORK_FORMATS } from "../registries/experience";
import { contentIdSchema, yearMonthSchema } from "./shared.schema";

export const experienceSchema = z
  .object({
    id: contentIdSchema,

    company: z.string().min(2).max(120),
    publicCompanyName: z.string().min(2).max(120),

    officialTitle: z.string().min(2).max(120),
    publicTitle: z.string().min(2).max(120),

    location: z.string().min(2).max(120),
    workFormat: z.enum(WORK_FORMATS),

    startDate: yearMonthSchema,
    endDate: yearMonthSchema.optional(),
    ongoing: z.boolean(),
    periodLabel: z.string().min(4).max(80),

    summary: z.string().min(80).max(800),

    responsibilities: z.array(z.string().min(20).max(240)).min(2).max(10),

    resumeBullets: z.array(z.string().min(30).max(400)).min(2).max(8),

    timelineSummary: z.string().min(30).max(240),

    technologyIds: z.array(contentIdSchema).default([]),

    relatedProjectIds: z.array(contentIdSchema).default([]),

    confidentialityLevel: z.number().int().min(0).max(3),

    companyPublicationAllowed: z.boolean(),
    verificationStatus: z.enum(FACT_VERIFICATION_STATUSES),

    featured: z.boolean(),
    displayOrder: z.number().int().positive(),
  })
  .superRefine((experience, context) => {
    if (experience.ongoing && experience.endDate) {
      context.addIssue({
        code: "custom",
        message: "Ongoing experience must not have an end date.",
        path: ["endDate"],
      });
    }

    if (!experience.ongoing && !experience.endDate) {
      context.addIssue({
        code: "custom",
        message: "Completed experience must have an end date.",
        path: ["endDate"],
      });
    }

    if (experience.endDate && experience.endDate < experience.startDate) {
      context.addIssue({
        code: "custom",
        message: "Experience end date cannot be earlier than start date.",
        path: ["endDate"],
      });
    }
  });

export const experienceListSchema = z.array(experienceSchema).min(1);

export type ExperienceRecord = z.infer<typeof experienceSchema>;
