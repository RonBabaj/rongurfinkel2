"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

export function PlaygroundContent() {
  const { t } = useLocale();

  return (
    <div className="page-shell py-12 sm:py-16 rtl:text-start">
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        {t("playground.projectsAndDemos")}
      </p>
      <div className="flex w-full justify-start">
        <Link
          href="/projects"
          className="text-brand-dim dark:text-brand hover:text-brand dark:hover:text-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-obsidian rounded"
        >
          <span className="inline-flex items-center gap-1 rtl:flex-row-reverse">
            {t("playground.goToProjects")}
            <span className="inline-block rtl:rotate-180" aria-hidden>
              →
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
