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
  /** When set, card links to /playground/[detailSlug] for full detail (e.g. SpeechInsight2). */
  detailSlug?: string;
  /** Status badge on Projects page; only for items that have a demo/deploy story (e.g. deployable-phase2). */
  status?: DemoStatus;
  /** When live: URL of the deployed app (opens in new tab). */
  demoUrl?: string;
  /** Translation key for demo CTA (e.g. "playground.openWebsite"). */
  ctaLabelKey?: string;
}

export interface PlaygroundItem {
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
  /** When live: URL of the deployed app (or external product link). */
  demoUrl?: string;
  /** Translation key for primary CTA (e.g. "playground.openWebsite"). */
  ctaLabelKey?: string;
  /** Example command/output pairs for a "fake terminal" preview. */
  commandPreview?: { input: string; output: string }[];
  /** Custom ASCII/code-block diagram for the architecture section (project-specific). */
  architectureDiagram?: string;
}
