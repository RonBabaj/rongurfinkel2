import type { Project } from "./types";

/**
 * Single source for all real projects. CV-aligned; no mockups.
 * Projects with detailSlug have a dedicated page at /playground/[slug].
 */
export const projects: Project[] = [
  {
    id: "speechinsight2",
    title: "SpeechInsight2",
    description:
      "C#, Whisper-based transcription system: backend API plus web UI. Upload an audio file in the browser and get a transcript. Two projects (API and UI) intended to be deployed together.",
    tech: ["C#", ".NET", "ASP.NET Core", "Whisper"],
    githubUrl: "https://github.com/RonBabaj/SpeechInsight2",
    detailSlug: "speechinsight2",
    status: "live",
    demoUrl: "https://speechinsight2.onrender.com",
  },
  {
    id: "fly-fix",
    title: "Fly-Fix",
    description:
      "Flight metasearch product: Go backend (Amadeus, Duffel, Google Flights) plus Expo web and native apps. Search, monthly deals, filters, and booking redirects — live at fly-fix.com.",
    tech: ["Go", "TypeScript", "Expo", "Amadeus API", "Duffel API"],
    githubUrl: "https://github.com/RonBabaj/flight_captain-react",
    detailSlug: "fly-fix",
    status: "live",
    demoUrl: "https://fly-fix.com",
    ctaLabelKey: "playground.openWebsite",
  },
  {
    id: "pig-clicker-farm",
    title: "Pig Clicker Farm",
    description:
      "Android Studio final school project: a tapping game in Java — UI, scoring, and incremental mechanics.",
    tech: ["Java", "Android"],
    githubUrl: "https://github.com/RonBabaj/Pig-Clicker-Farm",
    detailSlug: "pig-clicker-farm",
    status: "offline",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    description:
      "This site: a static Next.js portfolio with projects, skills, and a future-proof playground for live demos.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    detailSlug: "portfolio",
    status: "live",
    demoUrl: "https://rongurfinkel.com",
    ctaLabelKey: "playground.openWebsite",
  },
];
