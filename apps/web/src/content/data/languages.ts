import { z } from "zod";

import { languageListSchema, type LanguageRecord } from "../schemas/language.schema";

const languagesInput = [
  {
    id: "tajik",
    name: "Tajik",
    proficiency: "native",
    publicLabel: "Native",
    verificationStatus: "verified",
    displayOrder: 1,
  },
  {
    id: "russian",
    name: "Russian",
    proficiency: "professional-working",
    publicLabel: "Professional working proficiency",
    verificationStatus: "verified",
    displayOrder: 2,
  },
  {
    id: "english",
    name: "English",
    proficiency: "intermediate-working",
    publicLabel: "Intermediate working proficiency (B1–B2)",
    verificationStatus: "owner-confirmed",
    displayOrder: 3,
  },
] satisfies z.input<typeof languageListSchema>;

export const languages: LanguageRecord[] = languageListSchema.parse(languagesInput);

export function getLanguages(): LanguageRecord[] {
  return [...languages].sort((left, right) => left.displayOrder - right.displayOrder);
}
