export const LANGUAGE_PROFICIENCY_LEVELS = [
  "native",
  "professional-working",
  "intermediate-working",
  "elementary",
] as const;

export type LanguageProficiency = (typeof LANGUAGE_PROFICIENCY_LEVELS)[number];

export const LANGUAGE_PROFICIENCY_LABELS: Record<LanguageProficiency, string> = {
  native: "Native",
  "professional-working": "Professional working proficiency",
  "intermediate-working": "Intermediate working proficiency",
  elementary: "Elementary proficiency",
};
