"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { PlaygroundItem } from "@/data/types";
import { StatusBadge } from "@/components/StatusBadge";
import { useLocale } from "@/contexts/LocaleContext";

interface PlaygroundSlugContentProps {
  item: PlaygroundItem;
}

export function PlaygroundSlugContent({ item }: PlaygroundSlugContentProps) {
  const { t } = useLocale();

  const primaryCtaLabel = item.ctaLabelKey ? t(item.ctaLabelKey) : t("playground.openLiveApp");

  const sectionHeading = "text-lg font-medium text-slate-800 dark:text-slate-200 mb-2";
  const bodyText = "text-slate-600 dark:text-slate-400 leading-relaxed";
  const boxClass =
    "glass-card rounded-xl p-4 font-mono text-sm text-slate-600 dark:text-slate-400 overflow-x-auto";
  const tagClass = "rounded bg-slate-200/90 dark:bg-slate-800/70 px-3 py-1 text-sm text-slate-600 dark:text-slate-400";

  return (
    <div className="page-shell py-12 sm:py-16">
      {/* justify-start: inline-start — LTR left, RTL right (natural back link edge) */}
      <div className="mb-6 flex w-full justify-start">
        <Link
          href="/projects/"
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 inline-flex items-center gap-1.5 rtl:flex-row-reverse transition-colors"
        >
          <ArrowLeft className="w-4 h-4 shrink-0 rtl:rotate-180" aria-hidden />
          {t("playground.backToProjects")}
        </Link>
      </div>

      <header className="flex flex-wrap items-start justify-between gap-4 mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {item.title}
          </h1>
          <StatusBadge status={item.status} label={t(`status.${item.status}`)} className="mt-2" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {item.demoUrl && (
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rtl:flex-row-reverse gap-2 rounded-lg border border-brand-dim/50 bg-brand/15 px-4 py-2 text-sm font-medium text-brand-dim dark:text-brand hover:bg-brand/25 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-obsidian"
            >
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
              {primaryCtaLabel}
            </a>
          )}
          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rtl:flex-row-reverse gap-2 rounded-lg border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-midnight/60 px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-midnight hover:border-slate-400 dark:hover:border-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-obsidian"
            >
              <Github className="w-4 h-4 shrink-0" aria-hidden />
              {t("playground.viewOnGitHub")}
            </a>
          )}
        </div>
      </header>

      {item.commandPreview && item.commandPreview.length > 0 && (
        <section className="mb-8">
          <h2 className={sectionHeading}>{t("playground.tryCommands")}</h2>
          <div className={`${boxClass} space-y-0`}>
            <pre className="m-0 p-0 bg-transparent text-inherit">
              {item.commandPreview.map(({ input, output }, i) => (
                <span key={i} className="block">
                  <span className="text-brand-dim dark:text-brand">$</span> {input}
                  {"\n"}
                  <span className="text-slate-500 dark:text-slate-500">
                    → {output.split("\n").join("\n  ")}
                  </span>
                  {"\n"}
                </span>
              ))}
            </pre>
          </div>
        </section>
      )}

      {item.overview && (
        <section className="mb-8">
          <h2 className={sectionHeading}>{t("playground.overview")}</h2>
          <p className={bodyText}>{item.overview}</p>
        </section>
      )}

      {item.architecture && (
        <section className="mb-8">
          <h2 className={sectionHeading}>{t("playground.architecture")}</h2>
          <p className={`${bodyText} mb-4`}>{item.architecture}</p>
          {item.architectureDiagram && (
            <div className={boxClass}>
              <pre className="whitespace-pre text-xs sm:text-sm">{item.architectureDiagram}</pre>
            </div>
          )}
        </section>
      )}

      {item.screenshotPlaceholder && !item.demoUrl && (
        <section className="mb-8">
          <h2 className={sectionHeading}>{t("playground.demoSection")}</h2>
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-midnight/40 flex items-center justify-center min-h-[200px] text-slate-500 dark:text-slate-500 text-sm">
            {t("playground.demoSectionPlaceholder")}
          </div>
        </section>
      )}

      {item.stack && item.stack.length > 0 && (
        <section className="mb-8">
          <h2 className={sectionHeading}>{t("playground.techStack")}</h2>
          <ul className="flex flex-wrap gap-2">
            {item.stack.map((s) => (
              <li key={s} className={tagClass}>
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {item.githubUrl && (
        <section>
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-dim dark:text-brand hover:text-brand dark:hover:text-brand/90 break-all"
          >
            {item.githubUrl}
          </a>
        </section>
      )}
    </div>
  );
}
