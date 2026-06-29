export { contactLinks, getContactLink, getEnabledContactLinks } from "./data/contact-links";

export { educationEntries, getEducationEntries } from "./data/education";

export { experienceEntries, getCurrentExperience, getExperienceEntries } from "./data/experience";

export { getLanguages, languages } from "./data/languages";

export {
  getFeaturedMetrics,
  getMetricById,
  getProjectMetrics,
  projectMetrics,
} from "./data/metrics";

export { profile } from "./data/profile";

export { NAVIGATION_GROUP_LABELS, NAVIGATION_GROUPS } from "./registries/navigation";

export { SKILL_GROUP_TYPE_LABELS, SKILL_GROUP_TYPES } from "./registries/skill";

export {
  getFeaturedProjects,
  getProjectById,
  getProjectBySlug,
  getProjects,
  getVersionOneProjects,
  projects,
} from "./data/projects";

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
  CONFIDENTIALITY_LEVEL_LABELS,
  CONFIDENTIALITY_LEVELS,
  METRIC_KIND_LABELS,
  METRIC_KINDS,
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_LABELS,
  PROJECT_STATUSES,
  PROJECT_STATUS_LABELS,
  PROJECT_TIER_LABELS,
  PROJECT_TIERS,
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

export {
  getEnabledNavigation,
  getFooterNavigation,
  getMobileNavigation,
  getPrimaryNavigation,
  navigationItems,
} from "./data/navigation";

export { getFeaturedSkillGroups, getSkillGroups, skillGroups } from "./data/skills";

export type { ProjectMetric } from "./schemas/metric.schema";
export type { SiteProfile } from "./schemas/profile.schema";

export type { ConfidentialityConfig, ProjectRecord } from "./schemas/project.schema";

export type { Technology } from "./schemas/technology.schema";

export type { NavigationItem } from "./schemas/navigation.schema";
export type { SkillGroup } from "./schemas/skill-group.schema";

export { CASE_STUDY_SLUGS, hasCaseStudy } from "./registries/case-study";

export type { CaseStudySlug } from "./registries/case-study";
