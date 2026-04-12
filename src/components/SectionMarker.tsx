"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/contexts/LocaleContext";

/**
 * Terminal-style section label (Base44: // 01. WORK — uppercase, monospace).
 * Hebrew defaults to `dir="rtl"` so labels like `עבודה · 01 //` align with
 * `text-start` (inline start = right). Pass `dir="ltr"` explicitly for LTR-only lines.
 */
export function SectionMarker({
  children,
  className = "",
  dir: dirProp,
}: {
  children: ReactNode;
  className?: string;
  dir?: "ltr" | "rtl";
}) {
  const { locale } = useLocale();
  const dir = dirProp ?? (locale === "he" ? "rtl" : "ltr");
  const alignClass =
    dir === "rtl" ? "text-start" : locale === "he" ? "text-end" : "text-start";

  return (
    <p
      dir={dir}
      className={`font-mono text-xs sm:text-sm text-teal-800 dark:text-brand/80 tracking-wide uppercase ${alignClass} isolate [unicode-bidi:isolate] ${className}`}
    >
      {children}
    </p>
  );
}
