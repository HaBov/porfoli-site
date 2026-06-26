import { contactLinks } from "./data/contact-links";
import { educationEntries } from "./data/education";
import { experienceEntries } from "./data/experience";
import { languages } from "./data/languages";
import { projectMetrics } from "./data/metrics";
import { navigationItems } from "./data/navigation";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { skillGroups } from "./data/skills";
import { technologies } from "./data/technologies";

function countBy<T>(
  items: readonly T[],
  getKey: (item: T) => string | number,
): Record<string, number> {
  return items.reduce<Record<string, number>>((result, item) => {
    const key = String(getKey(item));

    result[key] = (result[key] ?? 0) + 1;

    return result;
  }, {});
}

function printSection(title: string): void {
  console.log("");
  console.log(title);
  console.log("-".repeat(title.length));
}

console.log("Portfolio Content Report");
console.log("========================");
console.log(`Candidate: ${profile.fullName}`);
console.log(`Title: ${profile.primaryTitle}`);
console.log(`Location: ${profile.location}`);

printSection("Content totals");

console.table({
  "Contact links": contactLinks.length,
  Languages: languages.length,
  Education: educationEntries.length,
  Experience: experienceEntries.length,
  Technologies: technologies.length,
  "Skill groups": skillGroups.length,
  Projects: projects.length,
  Metrics: projectMetrics.length,
  Navigation: navigationItems.length,
});

printSection("Project tiers");

console.table(countBy(projects, (project) => project.tier));

printSection("Project publication statuses");

console.table(countBy(projects, (project) => project.publicationStatus));

printSection("Project confidentiality");

console.table(countBy(projects, (project) => project.confidentiality.level));

printSection("Featured projects");

console.table(
  projects
    .filter((project) => project.featured)
    .map((project) => ({
      title: project.title,
      tier: project.tier,
      status: project.publicationStatus,
      metrics: project.metricIds.length,
    })),
);

printSection("Public technology visibility");

console.table(countBy(technologies, (technology) => technology.visibility));

printSection("Content requiring review");

const reviewProjects = projects.filter(
  (project) => project.publicationStatus === "review" || project.publicationStatus === "draft",
);

if (reviewProjects.length === 0) {
  console.log("No projects require review.");
} else {
  console.table(
    reviewProjects.map((project) => ({
      title: project.title,
      status: project.publicationStatus,
      timeframe: project.timeframeLabel,
      confidentiality: project.confidentiality.level,
    })),
  );
}

printSection("Known incomplete project dates");

const incompleteDates = projects.filter((project) => !project.startDate);

if (incompleteDates.length === 0) {
  console.log("All projects have structured dates.");
} else {
  console.table(
    incompleteDates.map((project) => ({
      title: project.title,
      timeframe: project.timeframeLabel,
    })),
  );
}

printSection("Excluded technologies");

const excludedTechnologies = technologies.filter(
  (technology) => technology.visibility === "excluded",
);

if (excludedTechnologies.length === 0) {
  console.log("No technologies are excluded.");
} else {
  console.table(
    excludedTechnologies.map((technology) => ({
      name: technology.name,
      evidence: technology.evidenceLevel,
      reason: technology.description,
    })),
  );
}

console.log("");
console.log("Content report completed.");
