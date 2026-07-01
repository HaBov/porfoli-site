import { contactLinks, getContactLink } from "./data/contact-links";
import { educationEntries } from "./data/education";
import { experienceEntries } from "./data/experience";
import { languages } from "./data/languages";
import { projectMetrics } from "./data/metrics";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { technologies } from "./data/technologies";
import { contactLinkListSchema } from "./schemas/contact-link.schema";
import { educationListSchema } from "./schemas/education.schema";
import { experienceListSchema } from "./schemas/experience.schema";
import { languageListSchema } from "./schemas/language.schema";
import { projectMetricListSchema } from "./schemas/metric.schema";
import { siteProfileSchema } from "./schemas/profile.schema";
import { projectListSchema } from "./schemas/project.schema";
import { technologyListSchema } from "./schemas/technology.schema";
import { navigationItems } from "./data/navigation";
import { skillGroups } from "./data/skills";
import { codeSamples } from "./data/code-samples";
import { navigationListSchema } from "./schemas/navigation.schema";
import { skillGroupListSchema } from "./schemas/skill-group.schema";
import { codeSampleListSchema } from "./schemas/code-sample.schema";
import { CASE_STUDY_SLUGS } from "./registries/case-study";
import { CODE_SAMPLE_SLUGS } from "./registries/code-sample";

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

function validateExperienceTechnologyRelations(): void {
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

function validateProjectRelations(): void {
  const projectIds = new Set(projects.map((project) => project.id));


  const technologyIds = new Set(technologies.map((technology) => technology.id));

  const experienceIds = new Set(experienceEntries.map((experience) => experience.id));

  const metricIds = new Set(projectMetrics.map((metric) => metric.id));

  for (const project of projects) {
    if (project.publicationStatus === "draft") {
  assertCondition(
    project.versionOne === false,
    `Draft project "${project.id}" cannot be included in Version 1.`,
  );

  assertCondition(
    project.featured === false,
    `Draft project "${project.id}" cannot be featured.`,
  );
}

if (project.tier === 4) {
  assertCondition(
    project.versionOne === false,
    `Backlog project "${project.id}" cannot be included in Version 1.`,
  );

  assertCondition(
    project.featured === false,
    `Backlog project "${project.id}" cannot be featured.`,
  );
}
    for (const technologyId of project.technologyIds) {
      assertCondition(
        technologyIds.has(technologyId),
        `Project "${project.id}" references unknown technology "${technologyId}".`,
      );
    }

    for (const experienceId of project.relatedExperienceIds) {
      assertCondition(
        experienceIds.has(experienceId),
        `Project "${project.id}" references unknown experience "${experienceId}".`,
      );
    }

    for (const metricId of project.metricIds) {
      assertCondition(
        metricIds.has(metricId),
        `Project "${project.id}" references unknown metric "${metricId}".`,
      );

      const metric = projectMetrics.find((candidate) => candidate.id === metricId);

      assertCondition(
        metric?.projectId === project.id,
        `Metric "${metricId}" does not belong to project "${project.id}".`,
      );
    }

    const featuredMetrics = project.metricIds
      .map((metricId) => projectMetrics.find((metric) => metric.id === metricId))
      .filter((metric) => metric?.featured);

    assertCondition(
      featuredMetrics.length <= 1,
      `Project "${project.id}" has more than one featured metric.`,
    );

    if (!project.confidentiality.metricsAllowed) {
      assertCondition(
        project.metricIds.length === 0,
        `Project "${project.id}" cannot expose public metrics.`,
      );
    }
  }

  for (const metric of projectMetrics) {
    assertCondition(
      projectIds.has(metric.projectId),
      `Metric "${metric.id}" references unknown project "${metric.projectId}".`,
    );
  }

  for (const technology of technologies) {
    for (const projectId of technology.relatedProjectIds) {
      assertCondition(
        projectIds.has(projectId),
        `Technology "${technology.id}" references unknown project "${projectId}".`,
      );
    }
  }

  for (const experience of experienceEntries) {
    for (const projectId of experience.relatedProjectIds) {
      assertCondition(
        projectIds.has(projectId),
        `Experience "${experience.id}" references unknown project "${projectId}".`,
      );
    }
  }
}

function validateCodeSampleRelations(): void {
  const projectMap = new Map(
    projects.map((project) => [
      project.id,
      project,
    ]),
  );

  const technologyIds = new Set(
    technologies.map(
      (technology) => technology.id,
    ),
  );

  const registeredSlugs = new Set<string>(
    CODE_SAMPLE_SLUGS,
  );

  assertCondition(
    codeSamples.length ===
      CODE_SAMPLE_SLUGS.length,
    "Version 1 must contain exactly eight code samples.",
  );

  for (const slug of CODE_SAMPLE_SLUGS) {
    assertCondition(
      codeSamples.some(
        (sample) => sample.slug === slug,
      ),
      `Code sample registry references missing slug "${slug}".`,
    );
  }

  for (const sample of codeSamples) {
    assertCondition(
      registeredSlugs.has(sample.slug),
      `Code sample "${sample.id}" uses unregistered slug "${sample.slug}".`,
    );

    assertCondition(
      sample.publicationStatus === "published",
      `Code sample "${sample.id}" must be published during Phase 5D.`,
    );

    assertCondition(
      new Set(sample.relatedProjectIds).size ===
        sample.relatedProjectIds.length,
      `Code sample "${sample.id}" contains duplicate project relations.`,
    );

    assertCondition(
      new Set(sample.relatedTechnologyIds).size ===
        sample.relatedTechnologyIds.length,
      `Code sample "${sample.id}" contains duplicate technology relations.`,
    );

    for (const projectId of sample.relatedProjectIds) {
      const project = projectMap.get(projectId);

      assertCondition(
        project !== undefined,
        `Code sample "${sample.id}" references unknown project "${projectId}".`,
      );

      assertCondition(
        project.publicationStatus !== "draft",
        `Code sample "${sample.id}" cannot reference draft project "${project.id}".`,
      );
      
      assertCondition(
        project.versionOne === true,
        `Code sample "${sample.id}" must reference a Version 1 project. Project "${project.id}" is excluded.`,
      );

      assertCondition(
        project.confidentiality
          .rewrittenCodeAllowed,
        `Project "${project.id}" does not allow rewritten public code samples.`,
      );
    }

    for (const technologyId of sample.relatedTechnologyIds) {
      assertCondition(
        technologyIds.has(technologyId),
        `Code sample "${sample.id}" references unknown technology "${technologyId}".`,
      );
    }
  }

  for (const project of projects.filter(
    (candidate) => candidate.featured,
  )) {
    assertCondition(
      codeSamples.some((sample) =>
        sample.relatedProjectIds.includes(
          project.id,
        ),
      ),
      `Featured project "${project.id}" requires at least one related code sample.`,
    );
  }
}

function validatePortfolioScope(): void {
  const projectIds = new Set(projects.map((project) => project.id));

  assertCondition(
    !projectIds.has("project-truck-claim"),
    "Truck Claim must remain excluded from Version 1.",
  );

  assertCondition(
    projects.filter((project) => project.featured).length === 4,
    "Version 1 must contain exactly four featured projects.",
  );

  console.log(`Skill groups: ${skillGroups.length}`);
  console.log(`Navigation items: ${navigationItems.length}`);

  assertCondition(
    projects.filter((project) => project.tier === 1).length === 4,
    "Version 1 must contain exactly four Tier 1 projects.",
  );
}

function validateContent(): void {
  siteProfileSchema.parse(profile);
  contactLinkListSchema.parse(contactLinks);
  languageListSchema.parse(languages);
  educationListSchema.parse(educationEntries);
  technologyListSchema.parse(technologies);
  experienceListSchema.parse(experienceEntries);
  projectMetricListSchema.parse(projectMetrics);
  projectListSchema.parse(projects);
  codeSampleListSchema.parse(codeSamples);
  skillGroupListSchema.parse(skillGroups);
  navigationListSchema.parse(navigationItems);

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

  assertUnique(
    projectMetrics.map((metric) => metric.id),
    "project metric ID",
  );

  assertUnique(
    projects.map((project) => project.id),
    "project ID",
  );

  assertUnique(
    projects.map((project) => project.slug),
    "project slug",
  );

  assertUnique(
    projects.map((project) => project.priority),
    "project priority",
  );

  assertUnique(
  codeSamples.map((sample) => sample.id),
  "code sample ID",
);

assertUnique(
  codeSamples.map((sample) => sample.slug),
  "code sample slug",
);

assertUnique(
  codeSamples.map((sample) => sample.priority),
  "code sample priority",
);

  assertUnique(
    skillGroups.map((skillGroup) => skillGroup.id),
    "skill group ID",
  );

  assertUnique(
    skillGroups.map((skillGroup) => skillGroup.displayOrder),
    "skill group display order",
  );

  assertUnique(
    navigationItems.map((navigationItem) => navigationItem.id),
    "navigation item ID",
  );

  assertUnique(
    navigationItems.map((navigationItem) => navigationItem.displayOrder),
    "navigation display order",
  );

  assertUnique(
    navigationItems.map((navigationItem) => navigationItem.href),
    "navigation path",
  );

  assertCondition(
    experienceEntries.filter((experience) => experience.ongoing).length <= 1,
    "Only one current experience entry is supported.",
  );

  validateProfileRelations();
  validateExperienceTechnologyRelations();
  validateProjectRelations();
  validateCodeSampleRelations();
  validatePortfolioScope();
  validateSkillRelations();
  validateNavigationRelations();
  validateCaseStudyRelations();

  console.log("Content validation passed.");
  console.log(`Profile: ${profile.fullName}`);
  console.log(`Contact links: ${contactLinks.length}`);
  console.log(`Languages: ${languages.length}`);
  console.log(`Education entries: ${educationEntries.length}`);
  console.log(`Technologies: ${technologies.length}`);
  console.log(`Experience entries: ${experienceEntries.length}`);
  console.log(`Project metrics: ${projectMetrics.length}`);
  console.log(`Projects: ${projects.length}`);
  console.log(`Projects: ${projects.length}`);
  console.log(`Featured projects: ${projects.filter((project) => project.featured).length}`);
  console.log(`Case studies: ${CASE_STUDY_SLUGS.length}`);
}

function validateSkillRelations(): void {
  const technologyMap = new Map(technologies.map((technology) => [technology.id, technology]));

  for (const skillGroup of skillGroups) {
    for (const technologyId of skillGroup.technologyIds) {
      const technology = technologyMap.get(technologyId);

      assertCondition(
        technology !== undefined,
        `Skill group "${skillGroup.id}" references unknown technology "${technologyId}".`,
      );

      assertCondition(
        technology.visibility !== "excluded",
        `Skill group "${skillGroup.id}" references excluded technology "${technologyId}".`,
      );
    }
  }
}

function validateNavigationRelations(): void {
  const enabledNavigation = navigationItems.filter((item) => item.enabled);

  const enabledPaths = new Set(enabledNavigation.map((item) => item.href));

  const internalCtas = [profile.primaryCTA, profile.secondaryCTA, profile.tertiaryCTA].filter(
    (cta): cta is NonNullable<typeof profile.tertiaryCTA> =>
      cta !== undefined && cta.external !== true,
  );

  for (const cta of internalCtas) {
    assertCondition(
      enabledPaths.has(cta.href),
      `Profile CTA "${cta.label}" references navigation path "${cta.href}" that is not enabled.`,
    );
  }

  const desktopNavigation = enabledNavigation
    .filter((item) => item.showInDesktop)
    .sort((left, right) => left.displayOrder - right.displayOrder);

  const mobileNavigation = enabledNavigation
    .filter((item) => item.showInMobile)
    .sort((left, right) => left.displayOrder - right.displayOrder);

  assertCondition(
    desktopNavigation.every((item) => item.href !== "/"),
    "Desktop navigation must not contain a separate Home link.",
  );

  assertCondition(mobileNavigation[0]?.href === "/", "Mobile navigation must begin with Home.");
}

function validateCaseStudyRelations(): void {
  for (const slug of CASE_STUDY_SLUGS) {
    const project = projects.find((candidate) => candidate.slug === slug);

    assertCondition(project !== undefined, `Case study references unknown project slug "${slug}".`);

    assertCondition(
      project.versionOne,
      `Case study project "${project.id}" must be included in Version 1.`,
    );

    assertCondition(
      project.tier === 1,
      `Case study project "${project.id}" must be Tier 1 during the flagship case-study phase.`,
    );

    assertCondition(
      project.confidentiality.architectureAllowed,
      `Case study project "${project.id}" does not allow public architecture.`,
    );
  }
}

validateContent();
