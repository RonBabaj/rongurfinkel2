import type { Metadata } from "next";
import { SITE_URL } from "./site";

const defaultDescription =
  "Ron Gurfinkel — developer and designer: full-stack web & mobile projects, React, Flutter, Go, playground demos, and career highlights. Israel · English & Hebrew.";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ron Gurfinkel — Developer, Designer, Hobbyist Musician",
    template: "%s | Ron Gurfinkel",
  },
  description: defaultDescription,
  keywords: [
    "Ron Gurfinkel",
    "Ron Gurfinkel portfolio",
    "full-stack developer",
    "React developer",
    "Flutter developer",
    "Go developer",
    "Israel developer",
    "web developer",
    "מפתח",
    "רון גורפינקל",
  ],
  authors: [{ name: "Ron Gurfinkel", url: SITE_URL }],
  creator: "Ron Gurfinkel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["he_IL"],
    url: SITE_URL,
    siteName: "Ron Gurfinkel",
    title: "Ron Gurfinkel — Developer, Designer, Hobbyist Musician",
    description: defaultDescription,
  },
  twitter: {
    card: "summary",
    title: "Ron Gurfinkel — Developer, Designer, Hobbyist Musician",
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "technology",
};

export function buildJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Ron Gurfinkel",
        description: defaultDescription,
        inLanguage: ["en", "he"],
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Ron Gurfinkel",
        url: SITE_URL,
        sameAs: [
          "https://github.com/RonBabaj",
          "https://il.linkedin.com/in/ron-gurfinkel-44966a244",
        ],
        knowsLanguage: ["English", "Hebrew"],
      },
    ],
  };
}
