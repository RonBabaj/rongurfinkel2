"use client";

import Link from "next/link";
import { ExternalLink, FileText, Github } from "lucide-react";
import type { DemoStatus } from "@/data/types";
import { StatusBadge } from "./StatusBadge";
import { useLocale } from "@/contexts/LocaleContext";

interface ProjectCardProps {
  title: string;
  description: string;
  tech?: string[];
  githubUrl?: string;
  detailSlug?: string;
  status?: DemoStatus;
  demoUrl?: string;
  /** e.g. "projectCard.openWebsite" or "projectCard.openLiveApp" (default) */
  ctaLabelKey?: string;
}

export function ProjectCard({
  title,
  description,
  tech = [],
  githubUrl,
  detailSlug,
  status,
  demoUrl,
  ctaLabelKey,
}: ProjectCardProps) {
  const { t } = useLocale();
  const detailHref = detailSlug ? `/projects/${detailSlug}/` : undefined;

  const demoCtaLabel = ctaLabelKey ? t(ctaLabelKey) : t("projectCard.openLiveApp");

  const cardClass =
    "glass-card block p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-brand/10 hover:border-brand/25 dark:hover:border-teal-400/20 group focus-within:ring-2 focus-within:ring-brand/40 focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-obsidian outline-none";

  const linkClass =
    "inline-flex items-center rtl:flex-row-reverse gap-1.5 text-brand-dim dark:text-brand hover:text-brand dark:hover:text-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-obsidian rounded font-medium transition-colors";

  return (
    <div className={cardClass}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        {status != null && (
          <StatusBadge status={status} label={t(`status.${status}`)} />
        )}
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 line-clamp-3">{description}</p>
      {tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tech.map((tag) => (
            <span
              key={tag}
              className="rounded bg-slate-200/90 dark:bg-slate-800/60 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {(detailHref ?? demoUrl ?? githubUrl) && (
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
              {demoCtaLabel}
            </a>
          )}
          {detailHref && (
            <Link href={detailHref} className={linkClass}>
              <FileText className="w-4 h-4 shrink-0" aria-hidden />
              {t("projectCard.viewDetails")}
            </Link>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Github className="w-4 h-4 shrink-0" aria-hidden />
              {t("projectCard.github")}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
