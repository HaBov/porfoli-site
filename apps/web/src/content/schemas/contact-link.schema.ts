import { z } from "zod";

import { contentIdSchema, externalUrlSchema, internalPathSchema } from "./shared.schema";

export const contactLinkTypeSchema = z.enum([
  "email",
  "phone",
  "github",
  "linkedin",
  "resume",
  "website",
]);

const contactHrefSchema = z
  .string()
  .min(1)
  .refine(
    (value) =>
      value.startsWith("/") ||
      value.startsWith("https://") ||
      value.startsWith("mailto:") ||
      value.startsWith("tel:"),
    "Unsupported contact link protocol.",
  );

export const contactLinkSchema = z
  .object({
    id: contentIdSchema,
    type: contactLinkTypeSchema,
    label: z.string().min(2).max(50),
    value: z.string().min(1).max(200).optional(),
    href: contactHrefSchema,
    external: z.boolean(),
    enabled: z.boolean(),
    displayOrder: z.number().int().positive(),
  })
  .superRefine((link, context) => {
    const addHrefIssue = (message: string) => {
      context.addIssue({
        code: "custom",
        message,
        path: ["href"],
      });
    };

    if (link.type === "email" && !link.href.startsWith("mailto:")) {
      addHrefIssue("Email contact link must use mailto:.");
    }

    if (link.type === "phone" && !link.href.startsWith("tel:")) {
      addHrefIssue("Phone contact link must use tel:.");
    }

    if (["github", "linkedin", "website"].includes(link.type)) {
      const result = externalUrlSchema.safeParse(link.href);

      if (!result.success) {
        addHrefIssue("External contact link must use HTTPS.");
      }
    }

    if (link.type === "resume") {
      const result = internalPathSchema.safeParse(link.href);

      if (!result.success) {
        addHrefIssue("Resume contact link must use an internal path.");
      }
    }
  });

export const contactLinkListSchema = z.array(contactLinkSchema).min(1);

export type ContactLink = z.infer<typeof contactLinkSchema>;

export type ContactLinkType = z.infer<typeof contactLinkTypeSchema>;
