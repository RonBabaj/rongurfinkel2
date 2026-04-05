"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** On `/`, scroll matching `id` into view when the URL hash changes (e.g. nav to `/#career`). */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const raw = typeof window !== "undefined" ? window.location.hash : "";
    if (!raw || raw.length < 2) return;
    const id = decodeURIComponent(raw.slice(1));
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [pathname]);

  useEffect(() => {
    const onHash = (e: Event) => {
      if (pathname !== "/") return;
      // Skip synthetic hashchange from `navigateToLandingHash` (already scrolled there)
      if (e.isTrusted === false) return;
      const raw = window.location.hash;
      if (!raw || raw.length < 2) return;
      const id = decodeURIComponent(raw.slice(1));
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("hashchange", onHash as EventListener);
    return () => window.removeEventListener("hashchange", onHash as EventListener);
  }, [pathname]);

  return null;
}
