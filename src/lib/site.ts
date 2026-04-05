/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in CI or `.env.local` when the public URL differs (e.g. preview hosts).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rongurfinkel.com"
).replace(/\/$/, "");

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
