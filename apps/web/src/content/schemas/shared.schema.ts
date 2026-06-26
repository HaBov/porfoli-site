import { z } from "zod";

export const CONTENT_ID_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const YEAR_MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export const YEAR_PATTERN = /^\d{4}$/;

export const ISO_DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export const E164_PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;

export const contentIdSchema = z
  .string()
  .min(3)
  .max(120)
  .regex(CONTENT_ID_PATTERN, "Content ID must use lowercase kebab-case.");

export const slugSchema = z
  .string()
  .min(2)
  .max(100)
  .regex(SLUG_PATTERN, "Slug must use lowercase kebab-case.");

export const yearMonthSchema = z
  .string()
  .regex(YEAR_MONTH_PATTERN, "Date must use YYYY-MM format.");

export const yearSchema = z.string().regex(YEAR_PATTERN, "Year must use YYYY format.");

export const isoDateSchema = z.string().regex(ISO_DATE_PATTERN, "Date must use YYYY-MM-DD format.");

export const externalUrlSchema = z
  .string()
  .url()
  .refine((value) => value.startsWith("https://"), "External URLs must use HTTPS.");

export const internalPathSchema = z
  .string()
  .min(1)
  .regex(/^\/(?!\/)[^\s]*$/, "Internal path must start with a single slash.");

export const emailSchema = z.string().email().max(254);

export const phoneSchema = z
  .string()
  .regex(E164_PHONE_PATTERN, "Phone number must use E.164 format.");

export const ctaSchema = z
  .object({
    label: z.string().min(2).max(40),
    href: z.string().min(1),
    external: z.boolean().optional(),
    download: z.boolean().optional(),
    ariaLabel: z.string().min(2).max(100).optional(),
  })
  .superRefine((cta, context) => {
    const external = cta.external === true;

    if (external) {
      const result = externalUrlSchema.safeParse(cta.href);

      if (!result.success) {
        context.addIssue({
          code: "custom",
          message: "External CTA must use a valid HTTPS URL.",
          path: ["href"],
        });
      }

      return;
    }

    const result = internalPathSchema.safeParse(cta.href);

    if (!result.success) {
      context.addIssue({
        code: "custom",
        message: "Internal CTA must use an application path.",
        path: ["href"],
      });
    }
  });

export type CTAConfig = z.infer<typeof ctaSchema>;
