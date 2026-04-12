import type { ProjectDetail } from "./types";

const FLY_FIX_WEB = "https://fly-fix.com";

/**
 * Extended copy for `/projects/[slug]/`. Slugs align with `projects[].detailSlug`.
 */
export const projectDetails: ProjectDetail[] = [
  {
    id: "fly-fix",
    slug: "fly-fix",
    title: "Fly-Fix",
    shortDescription:
      "Skyscanner-style flight metasearch: Go API (Amadeus, Duffel, Google Flights) + Expo web & mobile. Live site with search, monthly deals, and booking redirects.",
    status: "live",
    demoUrl: FLY_FIX_WEB,
    ctaLabelKey: "projectCard.openWebsite",
    githubUrl: "https://github.com/RonBabaj/flight_captain-react",
    tech: ["Go", "TypeScript", "Expo", "React Native", "Amadeus API", "Duffel API"],
    overview:
      "Fly-Fix is a full product: a Go HTTP backend aggregates real offers from Amadeus, Duffel, and Google Flights (SerpAPI), and an Expo React Native frontend ships the same UI on web, iOS, and Android. The public site includes a marketing landing, multi-provider search, monthly deals, filters, and partner booking redirects — with full RTL for Hebrew and Russian.",
    architecture:
      "The backend exposes REST endpoints for search sessions, polling, monthly deals, airport search, and uniform booking redirects. The frontend is a single Expo app (React Native Web for production web); it talks only to the API contracts. SPA routing and Apache-style rewrites support deep links on static hosting.",
    architectureDiagram: `┌──────────────┐   HTTPS      ┌─────────────────────┐
│  Web / iOS / │ ──────────► │   Go API (single     │
│  Android     │ ◄────────── │   or scaled process) │
│  (Expo RN)   │   JSON      └──────────┬───────────┘
└──────────────┘                        │
                                          │ Amadeus, Duffel,
                                          │ Google Flights (SerpAPI)
                                          ▼
                        ┌─────────────────────────────────┐
                        │   Normalized offers + booking    │
                        │   redirects & affiliate params   │
                        └─────────────────────────────────┘`,
    stack: ["Go", "TypeScript", "Expo", "React Native", "Amadeus", "Duffel", "SerpAPI"],
    commandPreview: [
      {
        input: "User: Search TLV → JFK (web /search)",
        output: "Session created → results stream in from Amadeus, Duffel, GF2 — sort, filter, book",
      },
      {
        input: "User: Monthly deals · March 2026",
        output: "Cheapest round-trip windows · filters client-side · Book now → partner URL",
      },
    ],
  },
  {
    id: "speechinsight2",
    slug: "speechinsight2",
    title: "SpeechInsight2",
    shortDescription:
      "Audio transcription app: upload a file in the browser, get a transcript. Backend API + UI, deployed as one product.",
    status: "live",
    demoUrl: "https://speechinsight2.onrender.com",
    githubUrl: "https://github.com/RonBabaj/SpeechInsight2",
    tech: ["C#", ".NET", "ASP.NET Core"],
    overview:
      "SpeechInsight2 is a C# .NET application consisting of two parts: a backend API and a web UI. You upload an audio file in the browser, and the app transcribes it using Whisper-based speech recognition. The two projects are designed to be deployed together as one product.",
    architecture:
      "The system has two components: (1) Backend API — handles file upload and transcription; (2) UI application — browser-based interface for uploading audio and viewing results. They run together in one container behind a reverse proxy (Render).",
    architectureDiagram: `┌─────────────┐     HTTP      ┌─────────────┐
│ Backend API │ ◄──────────► │  UI App     │
│ (C# .NET)   │              │  (browser)  │
└─────────────┘              └─────────────┘
        Deployed together (Render)`,
    stack: ["C#", ".NET", "ASP.NET Core", "Whisper"],
    screenshotPlaceholder: true,
  },
  {
    id: "pig-clicker-farm",
    slug: "pig-clicker-farm",
    title: "Pig Clicker Farm",
    shortDescription:
      "Android Studio final school project — a clicker-style game in Java with scoring, upgrades, and simple game loop.",
    status: "offline",
    githubUrl: "https://github.com/RonBabaj/Pig-Clicker-Farm",
    tech: ["Java", "Android SDK", "XML"],
    overview:
      "Pig Clicker Farm is a small Android game built as a capstone-style school project. The focus is on a complete app loop: tapping mechanics, incremental rewards, UI screens, and persistence basics — all in Java with Android Studio.",
    architecture:
      "Classic single-app structure: Activities or Fragments for game and menus, game state held in memory with optional SharedPreferences for high scores. Touch events drive the core loop; layouts use XML with Material-style components where appropriate.",
    architectureDiagram: `┌─────────────────┐
│   Main activity  │
│  (tap / UI loop) │
└────────┬──────────┘
         │ events
         ▼
┌─────────────────┐     ┌──────────────┐
│  Game state     │────►│ Score / meta │
│  (Java model)   │     │ (optional    │
└─────────────────┘     │  persist)    │
                        └──────────────┘`,
    stack: ["Java", "Android", "XML", "Gradle"],
    screenshotPlaceholder: true,
  },
  {
    id: "portfolio",
    slug: "portfolio",
    title: "Personal Portfolio Website",
    shortDescription:
      "This Next.js site: landing, project detail pages, i18n (EN/HE), RTL, and theme toggle — static-first.",
    status: "live",
    demoUrl: "https://rongurfinkel.com",
    ctaLabelKey: "projectCard.openWebsite",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    overview:
      "A static-friendly portfolio built with the App Router: home with featured work, career timeline, contact form (mailto flow), and per-project detail pages under /projects. Styling uses Tailwind with a cohesive light/dark theme and Hebrew RTL support alongside English.",
    architecture:
      "Next.js layouts wrap shared header/footer. Content is driven by typed data modules (projects, translations). Client components handle theme, locale, hash navigation, and interactive sections; pages are prerendered where possible.",
    architectureDiagram: `┌──────────────┐     ┌─────────────────┐
│  app/layout  │────►│ Header / Footer │
└──────┬───────┘     └─────────────────┘
       │
       ├──► /  (HomeContent)
       ├──► /projects/
       ├──► /projects/[slug]  ◄── project detail
       └──► i18n + Theme providers (client)`,
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    commandPreview: [
      {
        input: "pnpm build && deploy out/",
        output: "Static routes + project detail slugs from generateStaticParams",
      },
      {
        input: "Locale: en ↔ he",
        output: "dir=rtl on <html> + logical Tailwind (ms/me, rtl:rotate)",
      },
    ],
  },
];

const bySlug = new Map(projectDetails.map((p) => [p.slug, p]));

export function getProjectDetailBySlug(slug: string): ProjectDetail | undefined {
  return bySlug.get(slug);
}
