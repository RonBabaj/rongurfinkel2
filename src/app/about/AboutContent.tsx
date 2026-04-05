"use client";

import { Code2, Languages, Music } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const iconClass = "w-5 h-5 text-brand-dim dark:text-brand shrink-0";

export function AboutContent() {
  const { t } = useLocale();

  return (
    <div className="page-shell py-12 sm:py-16">
      <header className="mb-10 animate-fade-in-up">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
          {t("about.title")}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {t("about.intro")}
        </p>
      </header>

      <div className="space-y-10 text-slate-600 dark:text-slate-400 animate-stagger">
        <section id="stack" className="scroll-mt-24">
          <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Code2 className={iconClass} aria-hidden />
            {t("about.technicalSkills")}
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="text-slate-500 dark:text-slate-500">{t("about.programming")}</span> Java,
              Kotlin, JavaScript, Go, HTML, CSS, Dart
            </li>
            <li>
              <span className="text-slate-500 dark:text-slate-500">{t("about.frameworks")}</span> Flutter,
              Android, React
            </li>
            <li>
              <span className="text-slate-500 dark:text-slate-500">{t("about.other")}</span> Web development,
              3D printing, CAD (Onshape, Plasticity), WordPress, music production and editing, music teaching
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Languages className={iconClass} aria-hidden />
            {t("about.languages")}
          </h2>
          <p className="text-sm">{t("about.langsValue")}</p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Music className={iconClass} aria-hidden />
            {t("about.hobbies")}
          </h2>
          <p className="text-sm">{t("about.hobbiesValue")}</p>
        </section>
      </div>
    </div>
  );
}
