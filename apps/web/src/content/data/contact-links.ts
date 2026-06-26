import { z } from "zod";

import { contactLinkListSchema, type ContactLink } from "../schemas/contact-link.schema";

const contactLinksInput = [
  {
    id: "contact-email",
    type: "email",
    label: "Email",
    value: "bobojonovhasanjon@gmail.com",
    href: "mailto:bobojonovhasanjon@gmail.com",
    external: true,
    enabled: true,
    displayOrder: 1,
  },
  {
    id: "contact-phone",
    type: "phone",
    label: "Phone",
    value: "+992 93 733 2012",
    href: "tel:+992937332012",
    external: true,
    enabled: true,
    displayOrder: 2,
  },
  {
    id: "contact-github",
    type: "github",
    label: "GitHub",
    value: "github.com/HaBov",
    href: "https://github.com/HaBov",
    external: true,
    enabled: true,
    displayOrder: 3,
  },
  {
    id: "contact-resume",
    type: "resume",
    label: "Resume",
    href: "/resume",
    external: false,
    enabled: true,
    displayOrder: 4,
  },
] satisfies z.input<typeof contactLinkListSchema>;

export const contactLinks: ContactLink[] = contactLinkListSchema.parse(contactLinksInput);

export function getEnabledContactLinks(): ContactLink[] {
  return contactLinks
    .filter((link) => link.enabled)
    .sort((left, right) => left.displayOrder - right.displayOrder);
}

export function getContactLink(type: ContactLink["type"]): ContactLink | undefined {
  return getEnabledContactLinks().find((link) => link.type === type);
}
