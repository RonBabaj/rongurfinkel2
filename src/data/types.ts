export type DemoStatus =
  | "live"
  | "offline"
  | "on-demand"
  | "deployable-phase2";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  image?: string;
  /** When set, "View details" links to `/projects/[detailSlug]/`. */
  detailSlug?: string;
  /** Status badge on Projects page; only for items that have a demo/deploy story (e.g. deployable-phase2). */
  status?: DemoStatus;
  /** When live: URL of the deployed app (opens in new tab). */
  demoUrl?: string;
  /** Translation key for demo CTA (e.g. "projectCard.openWebsite"). */
  ctaLabelKey?: string;
}

/** Long-form project page (`/projects/[slug]/`). */
export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  status: DemoStatus;
  githubUrl?: string;
  tech?: string[];
  overview?: string;
  architecture?: string;
  stack?: string[];
  screenshotPlaceholder?: boolean;
  demoUrl?: string;
  ctaLabelKey?: string;
  commandPreview?: { input: string; output: string }[];
  architectureDiagram?: string;
}
