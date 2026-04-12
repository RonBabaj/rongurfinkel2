"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { BackToTop } from "./BackToTop";
import { useLocale } from "@/contexts/LocaleContext";

const LINK_GITHUB = "https://github.com/RonBabaj";
const LINK_LINKEDIN = "https://il.linkedin.com/in/ron-gurfinkel-44966a244";
const EMAIL = "mailto:ronzvi200@gmail.com";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLocale();

  const iconClass =
    "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-[#e8edf4] dark:focus:ring-offset-obsidian rounded";

  return (
    <footer className="border-t border-slate-200/90 dark:border-white/5 mt-auto">
      <div className="page-shell py-6 space-y-4">
        <nav
          aria-label={t("footer.siteNav")}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400"
        >
          <Link href="/projects/" className="hover:text-teal-800 dark:hover:text-brand transition-colors">
            {t("nav.projects")}
          </Link>
          <Link href="/about/" className="hover:text-teal-800 dark:hover:text-brand transition-colors">
            {t("about.title")}
          </Link>
          <Link href="/career/" className="hover:text-teal-800 dark:hover:text-brand transition-colors">
            {t("nav.career")}
          </Link>
          <Link href="/contact/" className="hover:text-teal-800 dark:hover:text-brand transition-colors">
            {t("contact.title")}
          </Link>
        </nav>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-center sm:text-start">
            <span className="text-slate-700 dark:text-slate-400">© {year} Ron Gurfinkel</span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-600">·</span>
            <span className="text-slate-500 dark:text-slate-600">{t("footer.tagline")}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={LINK_GITHUB} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href={LINK_LINKEDIN} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={EMAIL} className={iconClass} aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            <BackToTop />
          </div>
        </div>
        <p className="text-center sm:text-start text-xs text-slate-500 dark:text-slate-600">
          {t("footer.builtWith")}
        </p>
      </div>
    </footer>
  );
}
