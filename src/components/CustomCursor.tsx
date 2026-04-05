"use client";

import { useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor-hover]";

/**
 * Desktop only: dot + ring that scales up over interactive elements.
 */
export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  const onOver = useCallback((e: MouseEvent) => {
    const t = e.target as HTMLElement | null;
    if (!t) return;
    setHover(!!t.closest(INTERACTIVE));
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver, true);
    return () => {
      root.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
    };
  }, [enabled, reduced, onMove, onOver]);

  if (!enabled || reduced) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      aria-hidden
    >
      <div
        className="custom-cursor-ring -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/90 bg-brand/10 shadow-[0_0_20px_rgba(45,212,191,0.35)] transition-[width,height,opacity,box-shadow] duration-200 ease-out dark:border-brand dark:bg-brand/15 dark:shadow-[0_0_24px_rgba(45,212,191,0.25)]"
        style={{
          width: hover ? 40 : 8,
          height: hover ? 40 : 8,
          opacity: hover ? 1 : 0.85,
        }}
      />
    </div>
  );
}
