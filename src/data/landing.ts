import { projects } from "./projects";
import type { Project } from "./types";

/**
 * Base44 portfolio order: Fly-Fix first, SpeechInsight second.
 * Display copy matches https://ron-gurfinkel-portfolio-copy-3c9f3b6e.base44.app/ (card links use live demo or GitHub).
 */
export const LANDING_FEATURED_IDS = ["fly-fix", "speechinsight2"] as const;

export const FEATURED_YEAR = "2026";

/** Exact Base44-style path labels + stats (links still go to your deployed projects). */
export const landingCardDisplay: Record<
  string,
  {
    pathLabel: string;
    title: string;
    description: string;
    techTags: string[];
    stats: { label: string; pct: number }[];
    /** Hero preview in featured grid (`public/` path) */
    previewImage: string;
  }
> = {
  "fly-fix": {
    pathLabel: "~/projects/fly-fix",
    title: "Fly-Fix",
    previewImage: "/featured/fly-fix.svg",
    description:
      "Flight metasearch on the web — Go API plus Expo; search, monthly deals, booking links",
    techTags: ["TypeScript", "Go", "React Native", "Expo"],
    stats: [
      { label: "TypeScript", pct: 55 },
      { label: "Go", pct: 40 },
      { label: "Other", pct: 5 },
    ],
  },
  portfolio: {
    pathLabel: "~/projects/portfolio",
    title: "Personal Portfolio Website",
    previewImage: "/featured/portfolio.svg",
    description:
      "Static Next.js portfolio: projects, skills, bilingual UI, i18n, and a cohesive landing experience.",
    techTags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    stats: [
      { label: "TypeScript", pct: 55 },
      { label: "CSS", pct: 30 },
      { label: "Other", pct: 15 },
    ],
  },
  speechinsight2: {
    pathLabel: "~/projects/speechinsight",
    title: "SpeechInsight2",
    previewImage: "/featured/speechinsight2.svg",
    description:
      "Audio transcription & AI analysis — upload a file, get structured insights",
    techTags: ["C#", ".NET", "Blazor", "OpenAI"],
    stats: [
      { label: "C#", pct: 85 },
      { label: "CSS", pct: 10 },
      { label: "Other", pct: 5 },
    ],
  },
  "pig-clicker-farm": {
    pathLabel: "~/projects/pig-clicker-farm",
    title: "Pig Clicker Farm",
    previewImage: "/featured/portfolio.svg",
    description: "Android tapping game — Java school project, scoring & incremental mechanics",
    techTags: ["Java", "Android"],
    stats: [
      { label: "Java", pct: 80 },
      { label: "XML", pct: 15 },
      { label: "Other", pct: 5 },
    ],
  },
};

export function getLandingFeatured(): Project[] {
  const map = new Map(projects.map((p) => [p.id, p]));
  return LANDING_FEATURED_IDS.map((id) => map.get(id)).filter(
    (p): p is Project => p != null
  );
}

export function hrefForLandingProject(p: Project): string {
  if (p.detailSlug) return `/projects/${p.detailSlug}/`;
  if (p.demoUrl) return p.demoUrl;
  if (p.githubUrl) return p.githubUrl;
  return "/projects/";
}
