"use client";

import { useEffect, useState } from "react";

/**
 * Increments `visibleChars` from 0 → `totalLength` at ~`charsPerSecond`.
 * Jumps to end when `skip` is true (e.g. reduced motion).
 */
export function useTypewriter(totalLength: number, charsPerSecond = 42, skip = false) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (skip || totalLength <= 0) {
      setVisibleChars(totalLength);
    }
  }, [skip, totalLength]);

  useEffect(() => {
    if (skip) return;
    if (totalLength <= 0) return;
    if (visibleChars >= totalLength) return;

    const ms = Math.max(8, Math.round(1000 / charsPerSecond));
    const id = window.setTimeout(() => {
      setVisibleChars((c) => Math.min(c + 1, totalLength));
    }, ms);

    return () => window.clearTimeout(id);
  }, [visibleChars, totalLength, skip]);

  return visibleChars;
}
