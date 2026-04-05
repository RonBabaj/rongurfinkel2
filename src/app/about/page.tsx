import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ron Gurfinkel — background, how I work, and what drives the projects on this site.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Ron Gurfinkel",
    description:
      "Background, approach, and focus — developer and designer building real products.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
