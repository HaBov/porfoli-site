export const WORK_FORMATS = ["onsite", "remote", "hybrid"] as const;

export type WorkFormat = (typeof WORK_FORMATS)[number];

export const WORK_FORMAT_LABELS: Record<WorkFormat, string> = {
  onsite: "On-site",
  remote: "Remote",
  hybrid: "Hybrid",
};
