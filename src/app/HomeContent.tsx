"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import type { CareerJob } from "@/types/career";
import { CareerJobModal } from "@/components/CareerJobModal";
import { HashScroll } from "@/components/HashScroll";
import { getCareerJobs } from "@/data/careerJobs";
import { getLandingFeatured } from "@/data/landing";
import { getStackSkills } from "@/data/stackSkills";
import { SectionMarker } from "@/components/SectionMarker";
import { LandingFeaturedCard } from "@/components/LandingFeaturedCard";
import { ProfileCodeWindow } from "@/components/ProfileCodeWindow";
import { LandingContactForm } from "@/components/LandingContactForm";
import { Reveal } from "@/components/Reveal";
import { StackSkillCard } from "@/components/StackSkillCard";
import { CareerTimeline } from "@/components/CareerTimeline";
import { navigateToLandingHash } from "@/lib/landingHashNav";

/** Base44: primary CTA = solid teal (View Projects); secondary = outline (Get in touch). */
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-base font-semibold text-obsidian shadow-[0_0_24px_-4px_rgba(45,212,191,0.4)] transition-all duration-300 hover:scale-[1.02] hover:bg-brand/90 hover:shadow-[0_0_36px_-4px_rgba(45,212,191,0.55)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-obsidian";

const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-400/50 dark:border-white/20 bg-transparent px-7 py-3.5 text-base font-medium text-slate-800 dark:text-slate-100 transition-all duration-300 hover:scale-[1.02] hover:border-brand/45 hover:bg-brand/5 hover:shadow-[0_0_28px_-8px_rgba(45,212,191,0.18)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-obsidian";

const linkArrow =
  "link-arrow-shift inline-flex items-center gap-1 font-mono text-sm text-brand-dim dark:text-brand transition-all duration-300 hover:gap-2";

export function HomeContent() {
  const { t, locale } = useLocale();
  const featured = getLandingFeatured();
  const stackCards = getStackSkills(locale);
  const jobs = getCareerJobs(t);
  const [careerModalJob, setCareerModalJob] = useState<CareerJob | null>(null);

  return (
    <>
      <HashScroll />
      <CareerJobModal job={careerModalJob} onClose={() => setCareerModalJob(null)} />
      <div className="page-shell font-mono text-sm sm:text-base">
      {/* Hero — code window + typewriter + CTAs + scroll (reference scale) */}
      <section className="relative z-[1] pt-10 sm:pt-16 md:pt-20 pb-10 sm:pb-14 animate-fade-in-up">
        <SectionMarker
          dir={locale === "he" ? "rtl" : "ltr"}
          className="mb-4 sm:mb-6 text-[13px] sm:text-sm tracking-[0.12em]"
        >
          {locale === "he" ? (
            <>
              <span dir="ltr" className="inline-block opacity-95">
                //
              </span>
              <span className="ms-1.5">{t("home.greetingHeBody")}</span>
            </>
          ) : (
            t("home.greeting")
          )}
        </SectionMarker>
        <div className="mt-8 sm:mt-10 w-full max-w-[44rem]">
          <ProfileCodeWindow />
        </div>
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4">
          <Link href="/projects" className={primaryBtn}>
            {t("home.ctaViewProjects")}
            <ArrowRight className="w-5 h-5 rtl:rotate-180 shrink-0" aria-hidden />
          </Link>
          <Link
            href="/#contact"
            scroll={false}
            className={secondaryBtn}
            onClick={(e) => {
              if (navigateToLandingHash("/#contact")) e.preventDefault();
            }}
          >
            {t("home.ctaGetInTouch")}
          </Link>
        </div>
        <div
          className="mt-16 sm:mt-20 flex flex-col items-center text-[11px] uppercase tracking-[0.4em] text-slate-500 dark:text-slate-600"
          aria-hidden
        >
          <span>{t("home.scrollHint")}</span>
          <span className="mt-2 h-12 w-px origin-top bg-gradient-to-b from-brand/60 to-transparent animate-scroll-hint-line" />
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 sm:py-24 md:py-28 border-t border-slate-200/80 dark:border-white/5">
        <Reveal>
          <SectionMarker className="mb-3">{t("home.sectionWork")}</SectionMarker>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {t("home.featuredHeading")}
            </h2>
            <Link href="/projects" className={linkArrow}>
              {t("home.viewAll")}
              <span aria-hidden className="inline-block rtl:rotate-180">
                →
              </span>
            </Link>
          </div>
        </Reveal>
        <ul className="grid gap-5 sm:gap-6 sm:grid-cols-2 list-none p-0 m-0 animate-stagger">
          {featured.map((project, i) => (
            <li key={project.id}>
              <Reveal delayMs={i * 70}>
                <LandingFeaturedCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Stack */}
      <section id="stack" className="py-16 sm:py-24 md:py-28 border-t border-slate-200/80 dark:border-white/5 scroll-mt-24">
        <Reveal>
          <SectionMarker className="mb-3">{t("home.sectionAbout")}</SectionMarker>
          <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
            {t("home.stackHeading")}
          </h2>
          <p className="font-sans text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-12">
            {t("home.stackIntro")}
          </p>
        </Reveal>
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stackCards.map((card, i) => (
            <Reveal key={card.titleKey} delayMs={i * 80}>
              <StackSkillCard
                title={t(card.titleKey)}
                highlights={card.highlights}
                other={card.other}
              />
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={120}>
          <p className="mt-8">
            <Link href="/about" className={linkArrow}>
              {t("nav.skillsHobbies")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180 shrink-0" aria-hidden />
            </Link>
          </p>
        </Reveal>
      </section>

      {/* Career — centered spine + alternating cards (reference layout) */}
      <section id="career" className="py-16 sm:py-24 md:py-28 border-t border-slate-200/80 dark:border-white/5 scroll-mt-24">
        <Reveal>
          <SectionMarker className="mb-3">{t("home.sectionCareer")}</SectionMarker>
          <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
            {t("home.careerHeading")}
          </h2>
          <p className="font-sans text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl">{t("home.careerIntro")}</p>
        </Reveal>
        <CareerTimeline jobs={jobs} locale={locale} onSelectJob={setCareerModalJob} />
      </section>

      {/* Contact — Base44: heading + intro + form + links + location */}
      <section
        id="contact"
        className="py-16 sm:py-28 border-t border-slate-200/80 dark:border-white/5 mb-8 scroll-mt-24"
      >
        <Reveal>
          <SectionMarker className="mb-3">{t("home.sectionContact")}</SectionMarker>
          <h2 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-5">
            {t("home.contactHeading")}
          </h2>
          <p className="font-sans text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-12">
            {t("home.contactIntro")}
          </p>
        </Reveal>
        <Reveal delayMs={80}>
          <LandingContactForm />
        </Reveal>
      </section>
    </div>
    </>
  );
}
