import { z } from "zod";

import { resumeDocumentSchema, type ResumeDocument } from "../schemas/resume.schema";

const resumeInput = {
  id: "resume-software-developer-en",

  title: "Software Developer Resume",

  filename: "Khasandjon_Babadzhanov_Software_Developer_Resume.pdf",

  publicPath: "/downloads/Khasandjon_Babadzhanov_Software_Developer_Resume.pdf",

  language: "en",
  format: "pdf",

  version: "1.0",
  updatedAt: "2026-07-02",

  active: true,

  description:
    "A concise overview of my professional experience, technical skills, selected projects, education, and language proficiency.",
} satisfies z.input<typeof resumeDocumentSchema>;

export const activeResume: ResumeDocument = resumeDocumentSchema.parse(resumeInput);
