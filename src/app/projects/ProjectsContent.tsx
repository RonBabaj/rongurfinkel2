"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { landingCardDisplay } from "@/data/landing";
import { projects } from "@/data/projects";
import { LandingFeaturedCard } from "@/components/LandingFeaturedCard";
import { SectionMarker } from "@/components/SectionMarker";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/contexts/LocaleContext";

export function ProjectsContent() {
  const { t } = useLocale();
  const catalog = projects.filter((p) => landingCardDisplay[p.id] != null);

  return (
    <div className="page-shell py-12 sm:py-16 font-mono text-sm sm:text-base">
      <section className="border-t border-slate-200/80 dark:border-white/5 -mt-px pt-2">
        <Reveal>
          <SectionMarker className="mb-3">{t("projects.sectionMarker")}</SectionMarker>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <h1 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {t("projects.title")}
            </h1>
            <Link
              href="/"
              className="link-arrow-shift inline-flex items-center gap-1 font-mono text-sm text-brand-dim dark:text-brand transition-all duration-300 hover:gap-2 shrink-0"
            >
              {t("projects.backHome")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180 shrink-0" aria-hidden />
            </Link>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-12 font-sans text-lg">
            {t("projects.intro")}
          </p>
        </Reveal>
        <ul className="grid gap-5 sm:gap-6 sm:grid-cols-2 list-none p-0 m-0 animate-stagger">
          {catalog.map((project, i) => (
            <li key={project.id}>
              <Reveal delayMs={i * 70}>
                <LandingFeaturedCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
