import { ExperiencePreview } from "@/components/home/experience-preview";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { FinalCTA } from "@/components/home/final-cta";
import { HomeHero } from "@/components/home/home-hero";
import { HomeMetrics } from "@/components/home/home-metrics";
import { TechnicalFocus } from "@/components/home/technical-focus";
import { profile } from "@/content";
import { createPageMetadata } from "@/lib/metadata";
import { CodeSamplesPreview } from "@/components/home/code-samples-preview";

export const metadata = createPageMetadata({
  title: profile.primaryTitle,
  description: profile.professionalDescriptor,
});

export default function HomePage() {
  return (
    <main id="main-content">
      <HomeHero />
      <HomeMetrics />
      <FeaturedProjects />
      <TechnicalFocus />
      <CodeSamplesPreview />
      <ExperiencePreview />
      <FinalCTA />
    </main>
  );
}
