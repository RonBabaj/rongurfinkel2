"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/types";
import { useLocale } from "@/contexts/LocaleContext";
import { FEATURED_YEAR, hrefForLandingProject, landingCardDisplay } from "@/data/landing";

interface LandingFeaturedCardProps {
  project: Project;
}

function LanguageBars({ stats }: { stats: { label: string; pct: number }[] }) {
  return (
    <div className="mt-4 space-y-2">
      {stats.map(({ label, pct }) => (
        <div key={label} className="flex items-center gap-2 text-[10px] sm:text-[11px]" dir="ltr">
          <span className="w-20 shrink-0 text-slate-500 dark:text-slate-500 truncate">{label}</span>
          <div className="flex-1 h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand/80 dark:bg-brand/70"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-8 shrink-0 text-end text-slate-500 dark:text-slate-500 tabular-nums">
            {pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

const cardClassName =
  "group glass-card relative flex flex-col overflow-hidden rounded-xl transition-all duration-500 ease-out hover:-translate-y-[6px] hover:border-brand/45 hover:shadow-[0_16px_48px_-14px_rgba(45,212,191,0.28)] dark:hover:border-brand/50 dark:hover:shadow-[0_0_44px_-6px_rgba(45,212,191,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-black active:scale-[0.99]";

export function LandingFeaturedCard({ project }: LandingFeaturedCardProps) {
  const { isRTL } = useLocale();
  const href = hrefForLandingProject(project);
  const d = landingCardDisplay[project.id];
  if (!d) return null;

  const external = /^https?:\/\//.test(href);

  const hoverGlow =
    isRTL
      ? "radial-gradient(ellipse 90% 70% at 20% -10%, rgba(45,212,191,0.14), transparent 50%)"
      : "radial-gradient(ellipse 90% 70% at 80% -10%, rgba(45,212,191,0.14), transparent 50%)";

  const inner = (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-[1]"
        style={{ background: hoverGlow }}
        aria-hidden
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <Image
          src={d.previewImage}
          alt={`${d.title} preview`}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-3 inset-x-3 flex items-end justify-between gap-2">
          <span className="font-mono text-[10px] sm:text-[11px] text-white/90 truncate drop-shadow-sm" dir="ltr">
            {d.pathLabel}
          </span>
          <span
            className="shrink-0 font-mono text-[10px] sm:text-[11px] text-brand border border-brand/40 rounded px-1.5 py-0.5 bg-black/35 backdrop-blur-sm"
            dir="ltr"
          >
            {FEATURED_YEAR}
          </span>
        </div>
      </div>
      <div className="relative z-[2] p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-dim dark:group-hover:text-brand transition-colors">
          {d.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
          {d.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {d.techTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-200/80 dark:bg-slate-800/80 px-2 py-0.5 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <LanguageBars stats={d.stats} />
      </div>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className={cardClassName}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} data-cursor-hover className={cardClassName}>
      {inner}
    </Link>
  );
}
