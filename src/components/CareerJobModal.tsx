"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import type { CareerJob } from "@/types/career";
import { useLocale } from "@/contexts/LocaleContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CareerJobModalProps = {
  job: CareerJob | null;
  onClose: () => void;
};

export function CareerJobModal({ job, onClose }: CareerJobModalProps) {
  const { t, locale } = useLocale();
  const reduced = usePrefersReducedMotion();
  const [fullscreen, setFullscreen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (job) {
      setFullscreen(false);
      setIsClosing(false);
    }
  }, [job?.id]);

  const runClose = useCallback(() => {
    if (reduced) {
      onClose();
      return;
    }
    setIsClosing(true);
  }, [onClose, reduced]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (fullscreen) {
        setFullscreen(false);
        return;
      }
      runClose();
    },
    [fullscreen, runClose]
  );

  useEffect(() => {
    if (!job) return;
    document.addEventListener("keydown", handleEscape);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = prev;
    };
  }, [job, handleEscape]);

  const onPanelAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (!isClosing) return;
      if (e.animationName !== "career-modal-minimize") return;
      onClose();
      setIsClosing(false);
    },
    [isClosing, onClose]
  );

  if (typeof document === "undefined" || !job) return null;

  const detail = t(job.detailKey);

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex ${
        fullscreen ? "flex-col p-0" : "items-center justify-center p-4 sm:p-6"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-modal-title"
    >
      {!fullscreen && (
        <button
          type="button"
          className="absolute inset-0 z-0 bg-black/65 backdrop-blur-[2px] cursor-default"
          aria-label={t("a11y.closeModal")}
          onClick={runClose}
        />
      )}
      <div
        className={`career-modal-shell pointer-events-auto overflow-hidden flex flex-col border border-slate-300/90 bg-slate-50/95 backdrop-blur-xl dark:border-white/[0.1] dark:bg-[#0f172a]/95 transition-[border-radius,box-shadow] duration-300 ease-out ${
          fullscreen
            ? "relative z-10 flex-1 min-h-0 w-full max-w-none rounded-none shadow-2xl shadow-black/50 dark:shadow-black/70"
            : "relative z-10 w-full max-w-lg rounded-2xl shadow-2xl shadow-black/40 dark:shadow-black/60"
        } ${isClosing ? "animate-career-modal-minimize" : ""}`}
        dir={locale === "he" ? "rtl" : "ltr"}
        data-cursor-hover
        onAnimationEnd={onPanelAnimationEnd}
      >
        <div
          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-200/90 dark:border-white/[0.08] bg-slate-100/90 dark:bg-black/40 shrink-0"
          dir="ltr"
        >
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={runClose}
              aria-label={t("careerModal.close")}
              data-cursor-hover
              className="group flex h-8 w-8 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-[#0f172a]"
            >
              <span
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-[#ff5f57] shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)] ring-1 ring-black/[0.12] transition group-hover:brightness-110 group-active:brightness-95"
                aria-hidden
              />
            </button>
            <button
              type="button"
              onClick={() => setFullscreen((f) => !f)}
              aria-label={fullscreen ? t("careerModal.exitFullscreen") : t("careerModal.enterFullscreen")}
              data-cursor-hover
              className="group flex h-8 w-8 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-[#0f172a]"
            >
              <span
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)] ring-1 ring-black/[0.12] transition group-hover:brightness-110 group-active:brightness-95 ${
                  fullscreen ? "bg-[#28c840]/75 ring-emerald-900/20" : "bg-[#28c840]"
                }`}
                aria-hidden
              />
            </button>
          </div>
          <span
            className="min-w-0 flex-1 text-center font-mono text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400 truncate px-1"
            dir="ltr"
          >
            {job.company} — {job.date}
          </span>
          <div className="w-12 sm:w-14 shrink-0" aria-hidden />
        </div>
        <div
          className={`min-h-0 flex-1 overflow-y-auto ${
            fullscreen ? "p-8 sm:p-10 md:p-12 max-h-none" : "p-5 sm:p-6 max-h-[min(70vh,520px)]"
          }`}
        >
          <h2
            id="career-modal-title"
            className={`font-sans font-bold tracking-tight text-slate-950 dark:text-white ${
              fullscreen ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
            }`}
          >
            {job.title}
          </h2>
          <p className="mt-1 font-mono text-sm text-brand-dim dark:text-brand">{job.company}</p>
          <p
            className={`mt-4 leading-relaxed text-slate-600 dark:text-slate-400 whitespace-pre-wrap ${
              fullscreen ? "text-base sm:text-lg max-w-3xl" : "text-sm"
            }`}
          >
            {detail}
          </p>
          <p
            className={`mt-4 leading-relaxed text-slate-500 dark:text-slate-500 border-t border-slate-200/80 dark:border-white/[0.08] pt-4 ${
              fullscreen ? "text-sm sm:text-base max-w-3xl" : "text-sm"
            }`}
          >
            {job.line}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
