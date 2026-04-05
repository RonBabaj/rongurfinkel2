"use client";

import type { ReactNode } from "react";

/**
 * Terminal-style section label (Base44: // 01. WORK — uppercase, monospace).
 * Default `dir="ltr"` keeps // markers aligned like code. Use `dir="rtl"` for
 * locale-native hero lines (e.g. Hebrew greeting) so text aligns with `text-start`.
 */
export function SectionMarker({
  children,
  className = "",
  dir = "ltr",
}: {
  children: ReactNode;
  className?: string;
  /** `"rtl"` for Hebrew hero copy; section markers with // 01. … stay `"ltr"`. */
  dir?: "ltr" | "rtl";
}) {
  return (
    <p
      dir={dir}
      className={`font-mono text-xs sm:text-sm text-brand/90 dark:text-brand/80 tracking-wide uppercase text-start ${className}`}
    >
      {children}
    </p>
  );
}
