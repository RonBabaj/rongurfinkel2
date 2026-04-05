import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ron Gurfinkel — email, LinkedIn, and the site contact form (legacy /contact route).",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Ron Gurfinkel",
    description: "Get in touch via email, LinkedIn, or the contact form.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
