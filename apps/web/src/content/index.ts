export { contactLinks, getContactLink, getEnabledContactLinks } from "./data/contact-links";

export { educationEntries, getEducationEntries } from "./data/education";

export { experienceEntries, getCurrentExperience, getExperienceEntries } from "./data/experience";

export { getLanguages, languages } from "./data/languages";

export { profile } from "./data/profile";

export {
  getHeadlineTechnologies,
  getPublicTechnologies,
  getTechnologyById,
  technologies,
} from "./data/technologies";

export {
  CODE_LANGUAGES,
  CODE_LANGUAGE_LABELS,
  CODE_SAMPLE_CATEGORY_LABELS,
  CODE_SAMPLE_COMPLEXITY_LABELS,
} from "./registries/code";

export {
  FACT_VERIFICATION_STATUSES,
  FACT_VERIFICATION_STATUS_LABELS,
  PUBLICATION_STATUSES,
  PUBLICATION_STATUS_LABELS,
} from "./registries/content";

export { WORK_FORMATS, WORK_FORMAT_LABELS } from "./registries/experience";

export { LANGUAGE_PROFICIENCY_LEVELS, LANGUAGE_PROFICIENCY_LABELS } from "./registries/profile";

export {
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_LABELS,
  PROJECT_STATUSES,
  PROJECT_STATUS_LABELS,
  PROJECT_TIER_LABELS,
} from "./registries/project";

export {
  TECHNOLOGY_CATEGORIES,
  TECHNOLOGY_CATEGORY_LABELS,
  TECHNOLOGY_EVIDENCE_LEVELS,
  TECHNOLOGY_VISIBILITIES,
} from "./registries/technology";

export type { ContactLink, ContactLinkType } from "./schemas/contact-link.schema";

export type { EducationRecord } from "./schemas/education.schema";
export type { ExperienceRecord } from "./schemas/experience.schema";
export type { LanguageRecord } from "./schemas/language.schema";
export type { SiteProfile } from "./schemas/profile.schema";
export type { Technology } from "./schemas/technology.schema";
