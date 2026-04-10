import type { Metadata } from "next";
import { SITE_URL } from "./site";

/** ~155 chars — tuned for Google snippet (distinct from generic Flutter template text). */
const defaultDescription =
  "Official portfolio of Ron Gurfinkel: developer, 3D tech designer, and musician — projects, live demos, career, and contact. React, Flutter, Go, web & mobile. Israel · EN/HE.";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Ron Gurfinkel",
  title: {
    default: "Ron Gurfinkel — Developer, 3D Tech Designer, Musician",
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
    title: "Ron Gurfinkel — Developer, 3D Tech Designer, Musician",
    description: defaultDescription,
    images: [
      {
        url: "/og-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Ron Gurfinkel — portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ron Gurfinkel — Developer, 3D Tech Designer, Musician",
    description: defaultDescription,
    images: ["/og-thumbnail.png"],
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

/** Main crawlable routes — mirrors sitemap; helps crawlers understand site sections (sitelinks are still algorithmic). */
const SITE_NAV: { name: string; path: string }[] = [
  { name: "Projects", path: "/projects/" },
  { name: "Skills & Hobbies", path: "/about/" },
  { name: "Playground", path: "/playground/" },
  { name: "Career", path: "/career/" },
  { name: "Contact", path: "/contact/" },
];

export function buildJsonLdGraph() {
  const navItemList = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#site-sections`,
    name: "Main sections",
    numberOfItems: SITE_NAV.length,
    itemListElement: SITE_NAV.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "WebPage",
        name: item.name,
        url: `${SITE_URL}${item.path}`,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Ron Gurfinkel",
        alternateName: ["rongurfinkel.com", "Ron Gurfinkel portfolio"],
        description: defaultDescription,
        inLanguage: ["en", "he"],
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      navItemList,
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
