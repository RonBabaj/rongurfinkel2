"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("a11y.backToTop")}
      className="fixed bottom-6 end-4 sm:bottom-8 sm:end-6 h-11 w-11 rounded-full border border-teal-600/30 bg-white/90 dark:bg-midnight/80 dark:border-teal-400/25 text-slate-800 dark:text-slate-100 shadow-md shadow-slate-900/10 dark:shadow-brand/10 backdrop-blur-md flex items-center justify-center transition-transform transition-colors duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-midnight focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-[#e8edf4] dark:focus:ring-offset-obsidian"
    >
      <ArrowUp className="w-5 h-5" aria-hidden />
      <span className="sr-only">{t("a11y.backToTop")}</span>
    </button>
  );
}
