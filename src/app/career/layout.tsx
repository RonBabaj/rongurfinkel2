import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Career timeline — roles, companies, and highlights from Ron Gurfinkel’s experience (legacy /career route).",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "Career | Ron Gurfinkel",
    description: "Professional experience and roles — timeline with detail modals.",
    url: "/career",
  },
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
