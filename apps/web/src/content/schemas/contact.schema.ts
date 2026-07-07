import { z } from "zod";

const singleLineText = z
  .string()
  .trim()
  .refine((value) => !/[\r\n]/.test(value), "This field must use one line.");

export const contactSubmissionSchema = z.object({
  name: singleLineText.min(2, "Enter your name.").max(100, "Name must not exceed 100 characters."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email address is too long."),

  company: singleLineText.max(120, "Company name must not exceed 120 characters."),

  subject: singleLineText
    .min(3, "Enter a subject.")
    .max(160, "Subject must not exceed 160 characters."),

  message: z
    .string()
    .trim()
    .min(20, "Message must contain at least 20 characters.")
    .max(5000, "Message must not exceed 5,000 characters."),

  website: z.string().max(0, "Automated submission rejected."),

  elapsedMs: z.number().int().min(0).max(7_200_000),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export type ContactVisibleField = "name" | "email" | "company" | "subject" | "message";
