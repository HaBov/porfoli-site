import { z } from "zod";

import { PUBLICATION_STATUSES } from "../registries/content";
import {
  CONFIDENTIALITY_LEVELS,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
} from "../registries/project";
import { contentIdSchema, externalUrlSchema, slugSchema, yearMonthSchema } from "./shared.schema";

const projectTierSchema = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);

const confidentialityLevelSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);

export const confidentialityConfigSchema = z
  .object({
    level: confidentialityLevelSchema,

    companyNameAllowed: z.boolean(),
    repositoryAllowed: z.boolean(),
    screenshotsAllowed: z.boolean(),
    rewrittenCodeAllowed: z.boolean(),
    architectureAllowed: z.boolean(),
    metricsAllowed: z.boolean(),

    syntheticDataRequired: z.boolean(),

    publicNotice: z.string().min(30).max(500),
  })
  .superRefine((config, context) => {
    if (config.level >= 2 && config.repositoryAllowed) {
      context.addIssue({
        code: "custom",
        message: "Level 2 and Level 3 projects cannot expose the original repository.",
        path: ["repositoryAllowed"],
      });
    }

    if (config.level >= 2 && config.screenshotsAllowed && !config.syntheticDataRequired) {
      context.addIssue({
        code: "custom",
        message: "Internal-project screenshots require synthetic data.",
        path: ["syntheticDataRequired"],
      });
    }

    if (config.level === 3 && config.architectureAllowed) {
      context.addIssue({
        code: "custom",
        message: "Restricted-summary projects cannot expose architecture.",
        path: ["architectureAllowed"],
      });
    }
  });

export const projectSchema = z
  .object({
    id: contentIdSchema,
    title: z.string().min(3).max(140),
    slug: slugSchema,

    summary: z.string().min(40).max(400),
    shortSummary: z.string().min(30).max(220),

    publicationStatus: z.enum(PUBLICATION_STATUSES),
    projectStatus: z.enum(PROJECT_STATUSES),
    tier: projectTierSchema,

    primaryCategory: z.enum(PROJECT_CATEGORIES),
    secondaryCategories: z.array(z.enum(PROJECT_CATEGORIES)).max(2).default([]),

    role: z.string().min(3).max(120),
    teamContext: z.string().min(20).max(400),

    timeframeLabel: z.string().min(4).max(100),
    startDate: yearMonthSchema.optional(),
    endDate: yearMonthSchema.optional(),
    ongoing: z.boolean().optional(),

    featured: z.boolean(),
    versionOne: z.boolean(),
    priority: z.number().int().positive(),

    technologyIds: z.array(contentIdSchema).min(1),
    metricIds: z.array(contentIdSchema).default([]),

    relatedExperienceIds: z.array(contentIdSchema).default([]),

    keyFeatures: z.array(z.string().min(3).max(120)).min(3).max(12),

    resultSummary: z.string().min(30).max(400),

    confidentiality: confidentialityConfigSchema,

    liveUrl: externalUrlSchema.optional(),
    repositoryUrl: externalUrlSchema.optional(),
  })
  .superRefine((project, context) => {
    if (project.endDate && project.startDate && project.endDate < project.startDate) {
      context.addIssue({
        code: "custom",
        message: "Project end date cannot be earlier than start date.",
        path: ["endDate"],
      });
    }

    if (project.ongoing === true && project.endDate) {
      context.addIssue({
        code: "custom",
        message: "An ongoing project must not have an end date.",
        path: ["endDate"],
      });
    }

    if (project.primaryCategory && project.secondaryCategories.includes(project.primaryCategory)) {
      context.addIssue({
        code: "custom",
        message: "Primary category cannot also appear as a secondary category.",
        path: ["secondaryCategories"],
      });
    }

    if (project.repositoryUrl && !project.confidentiality.repositoryAllowed) {
      context.addIssue({
        code: "custom",
        message: "Repository URL is not permitted by the confidentiality configuration.",
        path: ["repositoryUrl"],
      });
    }

    if (project.tier === 1 && project.metricIds.length === 0) {
      context.addIssue({
        code: "custom",
        message: "A Tier 1 project requires at least one metric.",
        path: ["metricIds"],
      });
    }

    if (project.featured && (!project.versionOne || project.tier > 2)) {
      context.addIssue({
        code: "custom",
        message: "Featured projects must be included in Version 1 and use Tier 1 or Tier 2.",
        path: ["featured"],
      });
    }
  });

export const projectListSchema = z.array(projectSchema).min(1);

export type ConfidentialityConfig = z.infer<typeof confidentialityConfigSchema>;

export type ProjectRecord = z.infer<typeof projectSchema>;
