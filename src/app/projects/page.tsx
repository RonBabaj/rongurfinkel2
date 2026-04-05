import type { Metadata } from "next";
import { ProjectsContent } from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured projects by Ron Gurfinkel — web and mobile apps, demos, GitHub links, and live sites.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Ron Gurfinkel",
    description:
      "Portfolio projects: React, Flutter, Go, and more — with links to code and live demos.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
