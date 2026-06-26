import { z } from "zod";

import { projectMetricListSchema, type ProjectMetric } from "../schemas/metric.schema";

const metricsInput = [
  {
    id: "metric-hr-api-operations",
    projectId: "project-internal-hr-platform",

    value: "200+",
    label: "REST API operations",
    context: "Across 12 functional modules",

    kind: "scale",
    verificationStatus: "verified",

    approximate: false,
    featured: true,
    publicAllowed: true,

    displayOrder: 1,
  },
  {
    id: "metric-hr-modules",
    projectId: "project-internal-hr-platform",

    value: "12",
    label: "Functional modules",
    context: "Covering core employee-lifecycle workflows",

    kind: "coverage",
    verificationStatus: "verified",

    approximate: false,
    featured: false,
    publicAllowed: true,

    displayOrder: 2,
  },
  {
    id: "metric-hr-migrations",
    projectId: "project-internal-hr-platform",

    value: "24",
    label: "Alembic revisions",
    context: "Supporting iterative relational schema development",

    kind: "quality",
    verificationStatus: "verified",

    approximate: false,
    featured: false,
    publicAllowed: true,

    displayOrder: 3,
  },
  {
    id: "metric-hr-smoke-tests",
    projectId: "project-internal-hr-platform",

    value: "17",
    label: "Release smoke-test scripts",
    context: "Validating critical application workflows",

    kind: "quality",
    verificationStatus: "verified",

    approximate: false,
    featured: false,
    publicAllowed: true,

    displayOrder: 4,
  },
  {
    id: "metric-archive-volume",
    projectId: "project-call-recording-archive",

    value: "90K–150K",
    label: "Recording files archived",
    context: "Per 90-day processing cycle",

    kind: "scale",
    verificationStatus: "owner-confirmed",

    approximate: true,
    featured: true,
    publicAllowed: true,

    displayOrder: 1,
  },
  {
    id: "metric-archive-retention",
    projectId: "project-call-recording-archive",

    value: "2 years",
    label: "Recording retention",
    context: "Extended from approximately 90 days",

    kind: "business-impact",
    verificationStatus: "document-supported",

    approximate: true,
    featured: false,
    publicAllowed: true,

    displayOrder: 2,
  },
  {
    id: "metric-access-groups",
    projectId: "project-access-lifecycle-automation",

    value: "~1,500",
    label: "Corporate groups",
    context: "Covered by employee access workflows",

    kind: "scale",
    verificationStatus: "owner-confirmed",

    approximate: true,
    featured: true,
    publicAllowed: true,

    displayOrder: 1,
  },
  {
    id: "metric-fleet-throughput",
    projectId: "project-fleet-safety-media",

    value: "1.5K–2K",
    label: "Videos delivered per week",
    context: "Up from approximately 150 per week",

    kind: "performance",
    verificationStatus: "owner-confirmed",

    approximate: true,
    featured: true,
    publicAllowed: true,

    displayOrder: 1,
  },
  {
    id: "metric-fleet-growth",
    projectId: "project-fleet-safety-media",

    value: "10–13×",
    label: "Throughput growth",
    context: "Derived from approved approximate weekly values",

    kind: "business-impact",
    verificationStatus: "approximate",

    approximate: true,
    featured: false,
    publicAllowed: true,

    displayOrder: 2,
  },
] satisfies z.input<typeof projectMetricListSchema>;

export const projectMetrics: ProjectMetric[] = projectMetricListSchema.parse(metricsInput);

export function getMetricById(id: string): ProjectMetric | undefined {
  return projectMetrics.find((metric) => metric.id === id);
}

export function getProjectMetrics(projectId: string): ProjectMetric[] {
  return projectMetrics
    .filter((metric) => metric.projectId === projectId && metric.publicAllowed)
    .sort((left, right) => left.displayOrder - right.displayOrder);
}

export function getFeaturedMetrics(): ProjectMetric[] {
  return projectMetrics.filter((metric) => metric.featured && metric.publicAllowed);
}
