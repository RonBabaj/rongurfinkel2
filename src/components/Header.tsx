"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon, Github } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useHash } from "@/hooks/useHash";
import { navigateToLandingHash } from "@/lib/landingHashNav";

const GITHUB = "https://github.com/RonBabaj";

/** Base44: Projects, Skills & Hobbies, Career, Contact — no Home (logo → /). */
const navLinks = [
  { href: "/projects/", labelKey: "nav.projects" },
  { href: "/about/", labelKey: "nav.skillsHobbies" },
  { href: "/#career", labelKey: "nav.career" },
  { href: "/#contact", labelKey: "nav.contact" },
] as const;

function isNavActive(pathname: string, hash: string, href: string): boolean {
  if (href === "/#career") return pathname === "/" && hash === "#career";
  if (href === "/#contact") return pathname === "/" && hash === "#contact";
  if (href.startsWith("/")) {
    if (pathname === href) return true;
    const prefix = href.endsWith("/") ? href : `${href}/`;
    return pathname.startsWith(prefix);
  }
  return false;
}

export function Header() {
  const pathname = usePathname();
  const hash = useHash();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();
  const githubLabel = t("nav.github");

  const linkClass = (href: string) =>
    `text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
      isNavActive(pathname, hash, href)
        ? "text-brand-dim dark:text-brand"
        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
    }`;

  return (
    <header className="nav-liquid sticky top-0 z-50 border-b border-slate-300/70 bg-slate-200/55 shadow-[0_8px_28px_rgba(15,23,42,0.05)] backdrop-blur-xl backdrop-saturate-125 dark:border-white/[0.08] dark:bg-black/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)] dark:backdrop-blur-2xl dark:backdrop-saturate-125">
      <div className="page-shell flex items-center justify-between min-h-14 py-2 gap-3">
        <Link
          href="/"
          data-cursor-hover
          aria-label={t("nav.home")}
          className="font-mono text-sm text-brand-dim dark:text-brand shrink-0 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-slate-200/90 dark:focus:ring-offset-black rounded inline-flex items-center"
        >
          <span dir={locale === "he" ? "rtl" : "ltr"}>{t("nav.brandName")}</span>
          <span className="code-cursor inline-block min-w-[0.55ch] text-brand" aria-hidden>
            _
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6 flex-wrap justify-end min-w-0">
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              scroll={false}
              data-cursor-hover
              className={linkClass(href)}
              onClick={(e) => {
                if (pathname === "/" && href.startsWith("/#") && navigateToLandingHash(href)) {
                  e.preventDefault();
                }
              }}
            >
              {t(labelKey)}
            </Link>
          ))}
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-1.5 rounded-md border border-brand/50 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-dim dark:text-brand hover:bg-brand/10 transition-colors"
          >
            {locale === "he" ? (
              <>
                <span>{githubLabel}</span>
                <Github className="w-3.5 h-3.5 shrink-0" aria-hidden />
              </>
            ) : (
              <>
                <Github className="w-3.5 h-3.5 shrink-0" aria-hidden />
                <span>{githubLabel}</span>
              </>
            )}
          </a>
          <div className="flex items-center gap-1 ps-3 border-s border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-slate-200/90 dark:focus:ring-offset-obsidian"
              aria-label={t("a11y.toggleTheme")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "he" : "en")}
              className="px-2 py-1 text-xs font-medium rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-slate-200/90 dark:focus:ring-offset-obsidian"
              aria-label={t("a11y.setLanguage")}
            >
              {locale === "en" ? "עב" : "EN"}
            </button>
          </div>
        </nav>

        <div className="flex md:hidden items-center gap-1">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded border border-brand/40 text-brand"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded text-slate-500 dark:text-slate-400"
            aria-label={t("a11y.toggleTheme")}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "he" : "en")}
            className="px-2 py-1 text-xs font-medium text-slate-500 dark:text-slate-400"
          >
            {locale === "en" ? "עב" : "EN"}
          </button>
          <button
            type="button"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-slate-200 dark:border-white/5 px-4 py-3 flex flex-col gap-2 animate-fade-in text-start">
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              scroll={false}
              data-cursor-hover
              onClick={(e) => {
                if (pathname === "/" && href.startsWith("/#") && navigateToLandingHash(href)) {
                  e.preventDefault();
                }
                setMobileOpen(false);
              }}
              className={`py-2 text-sm uppercase tracking-wide transition-colors ${
                isNavActive(pathname, hash, href)
                  ? "text-brand-dim dark:text-brand"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              {t(labelKey)}
            </Link>
          ))}
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="py-2 text-sm uppercase tracking-wide text-slate-600 dark:text-slate-400 flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            {locale === "he" ? (
              <>
                <span>{githubLabel}</span>
                <Github className="w-4 h-4 shrink-0" aria-hidden />
              </>
            ) : (
              <>
                <Github className="w-4 h-4 shrink-0" aria-hidden />
                <span>{githubLabel}</span>
              </>
            )}
          </a>
        </nav>
      )}
    </header>
  );
}
