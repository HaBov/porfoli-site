import { z } from "zod";

import { siteProfileSchema, type SiteProfile } from "../schemas/profile.schema";

const profileInput = {
  fullName: "Khasanzhon Babadzhanov",
  shortName: "Khasanzhon",
  initials: "KB",

  primaryTitle: "Software Developer",
  functionalTitle: "Python Backend Developer",
  professionalDescriptor:
    "Backend-focused Software Developer building business applications, APIs, integrations, and automation.",

  heroEyebrow: "SOFTWARE DEVELOPER · PYTHON · BACKEND SYSTEMS",
  heroHeading: "I build reliable backend systems for real business operations.",
  heroDescription:
    "I am a Software Developer focused on Python backend systems, relational data, API integrations, and operational automation. I work across requirements, data modeling, implementation, deployment, and release validation.",

  location: "Khujand, Tajikistan",
  relocationStatus: "Open to relocation and international remote opportunities",
  availabilityStatus: "Currently employed but open to opportunities",

  email: "bobojonovhasanjon@gmail.com",
  phone: "+992937332012",

  githubUrl: "https://github.com/HaBov",

  aboutShort:
    "Software Developer from Tajikistan with a backend focus and a background in technical support, system analysis, business-process automation, integrations, and production infrastructure.",

  aboutFull: [
    "My path into software development started with technical support, business-process automation, and system analysis. That background taught me to begin with the operational problem: who uses the system, where the process fails, and what must remain reliable after deployment.",
    "Today, I focus on Python backend systems, relational data, API integrations, and operational automation. My work spans requirements analysis, data modeling, implementation, deployment, troubleshooting, and release validation for systems used by internal operational teams.",
  ],

  currentFocus: [
    "Backend systems",
    "Business applications",
    "API integrations",
    "Relational data modeling",
    "Operational automation",
    "Linux deployment",
  ],

  primaryCTA: {
    label: "View Projects",
    href: "/projects",
  },

  secondaryCTA: {
    label: "Download Resume",
    href: "/resume",
  },

  tertiaryCTA: {
    label: "Contact Me",
    href: "/contact",
  },
} satisfies z.input<typeof siteProfileSchema>;

export const profile: SiteProfile = siteProfileSchema.parse(profileInput);
