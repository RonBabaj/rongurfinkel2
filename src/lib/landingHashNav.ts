/**
 * Same-route hash navigation for the landing page (`/` + `#section`).
 * Next.js `<Link href="/#id" scroll={false}>` often does not update the hash when
 * already on `/`, so hashchange never fires — call this from the link onClick.
 *
 * Smooth-scrolls to the target, then syncs the URL with `replaceState` and a
 * synthetic `hashchange` so `useHash` updates. `HashScroll` ignores non-trusted
 * hashchange events to avoid double-scrolling.
 */
export function navigateToLandingHash(href: string): boolean {
  const m = href.match(/^\/#(.+)$/);
  if (!m) return false;
  const id = decodeURIComponent(m[1]);
  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({ behavior: "smooth", block: "start" });

  const nextHash = `#${id}`;
  if (window.location.hash !== nextHash) {
    history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${nextHash}`
    );
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  return true;
}
