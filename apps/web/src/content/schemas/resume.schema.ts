import { z } from "zod";

export const resumeDocumentSchema = z.object({
  id: z.string().min(1),

  title: z.string().min(1),
  filename: z.string().regex(/^[A-Za-z0-9_-]+\.pdf$/),

  publicPath: z.string().regex(/^\/downloads\/[A-Za-z0-9_-]+\.pdf$/),

  language: z.enum(["en", "ru"]),
  format: z.literal("pdf"),

  version: z.string().min(1),

  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Resume updatedAt must use YYYY-MM-DD."),

  active: z.boolean(),

  description: z.string().min(20),
});

export type ResumeDocument = z.infer<typeof resumeDocumentSchema>;
