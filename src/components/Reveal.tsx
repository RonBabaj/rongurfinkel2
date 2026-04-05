"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  const style: CSSProperties | undefined =
    delayMs > 0 ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties) : undefined;

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${visible ? "is-visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
