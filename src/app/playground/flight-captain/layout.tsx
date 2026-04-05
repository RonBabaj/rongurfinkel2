import type { Metadata } from "next";

/** Legacy route redirects to /playground/fly-fix — keep out of search index. */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function LegacyFlightCaptainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
