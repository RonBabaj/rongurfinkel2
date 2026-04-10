import type { Metadata } from "next";
import { PlaygroundContent } from "./PlaygroundContent";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Interactive demos and experiments — flight search, speech apps, games, and portfolio builds.",
  alternates: { canonical: "/playground/" },
  openGraph: {
    title: "Playground | Ron Gurfinkel",
    description:
      "Playable demos and side projects: live apps, architecture notes, and GitHub sources.",
    url: "/playground/",
  },
};

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
