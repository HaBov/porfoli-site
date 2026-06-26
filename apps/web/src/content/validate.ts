import { contactLinks, getContactLink } from "./data/contact-links";
import { educationEntries } from "./data/education";
import { experienceEntries } from "./data/experience";
import { languages } from "./data/languages";
import { profile } from "./data/profile";
import { technologies } from "./data/technologies";
import { contactLinkListSchema } from "./schemas/contact-link.schema";
import { educationListSchema } from "./schemas/education.schema";
import { experienceListSchema } from "./schemas/experience.schema";
import { languageListSchema } from "./schemas/language.schema";
import { siteProfileSchema } from "./schemas/profile.schema";
import { technologyListSchema } from "./schemas/technology.schema";

function assertCondition(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertUnique<T extends string | number>(values: readonly T[], label: string): void {
  const uniqueValues = new Set(values);

  assertCondition(uniqueValues.size === values.length, `Duplicate ${label} detected.`);
}

function validateProfileRelations(): void {
  const emailLink = getContactLink("email");

  assertCondition(
    emailLink?.href === `mailto:${profile.email}`,
    "Profile email does not match the email contact link.",
  );

  if (profile.phone) {
    const phoneLink = getContactLink("phone");

    assertCondition(
      phoneLink?.href === `tel:${profile.phone}`,
      "Profile phone does not match the phone contact link.",
    );
  }

  if (profile.githubUrl) {
    const githubLink = getContactLink("github");

    assertCondition(
      githubLink?.href === profile.githubUrl,
      "Profile GitHub URL does not match the GitHub contact link.",
    );
  }

  if (!profile.linkedinUrl) {
    assertCondition(
      getContactLink("linkedin") === undefined,
      "LinkedIn must be omitted when no approved URL exists.",
    );
  }
}

function validateTechnologyRelations(): void {
  const technologyIds = new Set(technologies.map((technology) => technology.id));

  for (const experience of experienceEntries) {
    for (const technologyId of experience.technologyIds) {
      assertCondition(
        technologyIds.has(technologyId),
        `Experience "${experience.id}" references unknown technology "${technologyId}".`,
      );
    }
  }
}

function validateContent(): void {
  siteProfileSchema.parse(profile);
  contactLinkListSchema.parse(contactLinks);
  languageListSchema.parse(languages);
  educationListSchema.parse(educationEntries);
  technologyListSchema.parse(technologies);
  experienceListSchema.parse(experienceEntries);

  assertUnique(
    contactLinks.map((link) => link.id),
    "contact link ID",
  );

  assertUnique(
    contactLinks.map((link) => link.displayOrder),
    "contact link display order",
  );

  assertUnique(
    languages.map((language) => language.id),
    "language ID",
  );

  assertUnique(
    languages.map((language) => language.displayOrder),
    "language display order",
  );

  assertUnique(
    educationEntries.map((education) => education.id),
    "education ID",
  );

  assertUnique(
    technologies.map((technology) => technology.id),
    "technology ID",
  );

  assertUnique(
    technologies.map((technology) => technology.name.toLowerCase()),
    "technology name",
  );

  assertUnique(
    experienceEntries.map((experience) => experience.id),
    "experience ID",
  );

  assertUnique(
    experienceEntries.map((experience) => experience.displayOrder),
    "experience display order",
  );

  assertCondition(
    experienceEntries.filter((experience) => experience.ongoing).length <= 1,
    "Only one current experience entry is supported.",
  );

  validateProfileRelations();
  validateTechnologyRelations();

  console.log("Content validation passed.");
  console.log(`Profile: ${profile.fullName}`);
  console.log(`Contact links: ${contactLinks.length}`);
  console.log(`Languages: ${languages.length}`);
  console.log(`Education entries: ${educationEntries.length}`);
  console.log(`Technologies: ${technologies.length}`);
  console.log(`Experience entries: ${experienceEntries.length}`);
}

validateContent();
