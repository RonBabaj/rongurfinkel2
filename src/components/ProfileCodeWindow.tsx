"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import {
  PROFILE_CODE_PLAIN,
  PROFILE_CODE_SEGMENTS,
  profileCodeTotalLength,
} from "@/data/profileCodeSegments";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTypewriter } from "@/hooks/useTypewriter";

function renderVisibleSegments(visible: number): ReactNode[] {
  let remaining = visible;
  const out: ReactNode[] = [];
  PROFILE_CODE_SEGMENTS.forEach((seg, i) => {
    if (remaining <= 0) return;
    const take = Math.min(seg.text.length, remaining);
    out.push(
      <span key={i} className={seg.className}>
        {seg.text.slice(0, take)}
      </span>
    );
    remaining -= take;
  });
  return out;
}

/**
 * Hero: macOS-style `profile.js` with character typewriter + blinking cursor (reference layout).
 */
export function ProfileCodeWindow() {
  const total = profileCodeTotalLength();
  const reduced = usePrefersReducedMotion();
  const visible = useTypewriter(total, 44, reduced);

  const codeBody = useMemo(() => renderVisibleSegments(visible), [visible]);

  return (
    <div className="group/profile code-hero-window relative rounded-2xl border border-slate-300/90 bg-[#0f172a] shadow-2xl shadow-black/50 transition-all duration-700 ease-out dark:border-white/[0.08] dark:bg-[#0f172a] max-w-[44rem] w-full overflow-hidden hover:border-emerald-400/40 hover:shadow-[0_0_80px_-24px_rgba(46,230,212,0.22)] dark:hover:border-emerald-400/45 dark:hover:shadow-[0_0_100px_-20px_rgba(46,230,212,0.2)]">
      <div className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 border-b border-white/[0.06] bg-black/25">
        <span className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57] sm:h-3.5 sm:w-3.5" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e] sm:h-3.5 sm:w-3.5" />
          <span className="h-3 w-3 rounded-full bg-[#28c840] sm:h-3.5 sm:w-3.5" />
        </span>
        <span className="code-titlebar-filename font-mono text-[12px] sm:text-[13px] ms-1" dir="ltr">
          profile.js
        </span>
      </div>
      <pre
        className="profile-code-body m-0 min-h-[min(48vh,22rem)] p-4 sm:p-6 sm:min-h-[24rem] font-mono text-[12px] sm:text-[14px] leading-[1.65] text-start overflow-x-auto"
        dir="ltr"
      >
        <code className="text-[12px] sm:text-[14px] font-mono" aria-hidden="true">
          {codeBody}
          <span className="code-cursor code-cursor-hero ms-px inline-block min-w-[0.55ch] translate-y-px" aria-hidden>
            |
          </span>
        </code>
      </pre>
      <span className="sr-only">{PROFILE_CODE_PLAIN}</span>
    </div>
  );
}
