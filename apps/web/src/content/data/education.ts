import { z } from "zod";

import { educationListSchema, type EducationRecord } from "../schemas/education.schema";

const educationInput = [
  {
    id: "education-rtsu",

    institution: "Russian-Tajik (Slavonic) University",
    publicInstitutionName: "Russian-Tajik (Slavonic) University",

    degree: "Bachelor’s degree",
    fieldOfStudy: "Applied Informatics",
    specialization: "Applied Informatics in Economics",

    location: "Dushanbe, Tajikistan",

    startYear: "2019",
    endYear: "2023",

    summary:
      "Bachelor’s degree in Applied Informatics with a specialization in applying information systems and software technologies to economic and organizational processes.",

    verificationStatus: "document-supported",
    displayOrder: 1,
  },
] satisfies z.input<typeof educationListSchema>;

export const educationEntries: EducationRecord[] = educationListSchema.parse(educationInput);

export function getEducationEntries(): EducationRecord[] {
  return [...educationEntries].sort((left, right) => left.displayOrder - right.displayOrder);
}
