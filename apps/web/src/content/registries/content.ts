export const PUBLICATION_STATUS_LABELS = {
  draft: "Draft",
  review: "In Review",
  approved: "Approved",
  published: "Published",
  archived: "Archived",
} as const;

export type PublicationStatus = keyof typeof PUBLICATION_STATUS_LABELS;

export const PUBLICATION_STATUSES = Object.keys(PUBLICATION_STATUS_LABELS) as PublicationStatus[];

export const FACT_VERIFICATION_STATUSES = [
  "verified",
  "owner-confirmed",
  "document-supported",
  "approximate",
  "unknown",
] as const;

export type FactVerificationStatus = (typeof FACT_VERIFICATION_STATUSES)[number];

export const FACT_VERIFICATION_STATUS_LABELS: Record<FactVerificationStatus, string> = {
  verified: "Verified",
  "owner-confirmed": "Owner Confirmed",
  "document-supported": "Document Supported",
  approximate: "Approximate",
  unknown: "Unknown",
};
