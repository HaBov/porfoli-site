export const CASE_STUDY_SLUGS = ["internal-hr-operations-platform"] as const;

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

export function hasCaseStudy(slug: string): slug is CaseStudySlug {
  return CASE_STUDY_SLUGS.includes(slug as CaseStudySlug);
}
