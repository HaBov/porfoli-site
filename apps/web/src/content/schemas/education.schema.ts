import { z } from "zod";

import { FACT_VERIFICATION_STATUSES } from "../registries/content";
import { contentIdSchema, yearSchema } from "./shared.schema";

export const educationSchema = z
  .object({
    id: contentIdSchema,

    institution: z.string().min(3).max(160),
    publicInstitutionName: z.string().min(3).max(160),

    degree: z.string().min(3).max(120),
    fieldOfStudy: z.string().min(3).max(120),
    specialization: z.string().min(3).max(160).optional(),

    location: z.string().min(3).max(120),

    startYear: yearSchema,
    endYear: yearSchema,

    summary: z.string().min(40).max(400),
    verificationStatus: z.enum(FACT_VERIFICATION_STATUSES),

    displayOrder: z.number().int().positive(),
  })
  .superRefine((education, context) => {
    if (education.endYear < education.startYear) {
      context.addIssue({
        code: "custom",
        message: "Education end year cannot be earlier than start year.",
        path: ["endYear"],
      });
    }
  });

export const educationListSchema = z.array(educationSchema).min(1);

export type EducationRecord = z.infer<typeof educationSchema>;
