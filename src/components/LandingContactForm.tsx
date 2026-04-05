"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { MapPin } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const CONTACT_EMAIL = "ronzvi200@gmail.com";
const MAILTO = `mailto:${CONTACT_EMAIL}`;
const LINKEDIN_HREF = "https://il.linkedin.com/in/ron-gurfinkel-44966a244";
const LINKEDIN_DISPLAY = "il.linkedin.com/in/ron-gurfinkel-44966a244";

function ContactInfoCard({
  label,
  children,
  href,
  external,
  cardClass,
  labelClass,
  linkClass,
}: {
  label: string;
  children: ReactNode;
  href: string;
  external?: boolean;
  cardClass: string;
  labelClass: string;
  linkClass: string;
}) {
  const clean = label.replace(/:\s*$/, "").trim();
  return (
    <div className={cardClass}>
      <p className={`${labelClass} uppercase`}>{clean}</p>
      <a
        href={href}
        className={linkClass}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    </div>
  );
}

export function LandingContactForm() {
  const { t, locale } = useLocale();
  const [sentHint, setSentHint] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio: ${name || "message"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `${MAILTO}?subject=${subject}&body=${body}`;
    setSentHint(true);
  }

  const labelClass =
    "block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand-dim dark:text-brand font-mono mb-1.5";

  const contactLinkClass =
    "block w-full text-sm text-slate-700 dark:text-slate-200 font-mono break-all hover:text-brand dark:hover:text-brand transition-colors data-cursor-hover";

  const cardClass =
    "rounded-lg border border-slate-300/90 dark:border-white/[0.1] bg-slate-100/95 dark:bg-[rgba(15,23,42,0.65)] px-4 py-3 shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-start";

  return (
    <div className="space-y-8">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-12 xl:gap-16 lg:items-start">
        <div className="space-y-8 min-w-0">
          <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
            <div>
              <label htmlFor="landing-name" className={labelClass}>
                {t("home.formName")}
              </label>
              <input
                id="landing-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder={t("home.formNamePh")}
                className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-slate-100/95 dark:bg-midnight/50 px-4 py-3 font-mono text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <div>
              <label htmlFor="landing-email" className={labelClass}>
                {t("home.formEmail")}
              </label>
              <input
                id="landing-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t("home.formEmailPh")}
                className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-slate-100/95 dark:bg-midnight/50 px-4 py-3 font-mono text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <div>
              <label htmlFor="landing-message" className={labelClass}>
                {t("home.formMessage")}
              </label>
              <textarea
                id="landing-message"
                name="message"
                required
                rows={4}
                placeholder={t("home.formMessagePh")}
                className="w-full resize-y rounded-lg border border-slate-300 dark:border-white/10 bg-slate-100/95 dark:bg-midnight/50 px-4 py-3 font-mono text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <button type="submit" className={primaryBtn}>
              {t("home.formSubmit")}
            </button>
            {sentHint && (
              <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">{t("home.formOpenedMail")}</p>
            )}
          </form>

          <div className="lg:hidden flex flex-col gap-3">
            <ContactInfoCard
              cardClass={cardClass}
              labelClass={labelClass}
              label={t("contact.email")}
              href={MAILTO}
              linkClass={contactLinkClass}
            >
              {CONTACT_EMAIL}
            </ContactInfoCard>
            <ContactInfoCard
              cardClass={cardClass}
              labelClass={labelClass}
              label={t("contact.github")}
              href="https://github.com/RonBabaj"
              external
              linkClass={contactLinkClass}
            >
              github.com/RonBabaj
            </ContactInfoCard>
            <ContactInfoCard
              cardClass={cardClass}
              labelClass={labelClass}
              label={t("contact.linkedin")}
              href={LINKEDIN_HREF}
              external
              linkClass={contactLinkClass}
            >
              {LINKEDIN_DISPLAY}
            </ContactInfoCard>
            <div className={cardClass}>
              <p className={`${labelClass} uppercase`}>{t("home.locationLabel")}</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 font-mono flex items-center gap-2">
                {locale === "he" ? (
                  <>
                    <span>{t("home.locationValue")}</span>
                    <MapPin className="w-4 h-4 text-brand/80 shrink-0" aria-hidden />
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 text-brand/80 shrink-0" aria-hidden />
                    <span>{t("home.locationValue")}</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <aside className="hidden lg:flex flex-col gap-3 text-sm font-mono lg:border-s lg:border-slate-200/90 dark:lg:border-white/[0.08] lg:ps-8 xl:ps-10 lg:pt-0.5">
          <ContactInfoCard
            cardClass={cardClass}
            labelClass={labelClass}
            label={t("contact.email")}
            href={MAILTO}
            linkClass={contactLinkClass}
          >
            {CONTACT_EMAIL}
          </ContactInfoCard>
          <ContactInfoCard
            cardClass={cardClass}
            labelClass={labelClass}
            label={t("contact.github")}
            href="https://github.com/RonBabaj"
            external
            linkClass={contactLinkClass}
          >
            github.com/RonBabaj
          </ContactInfoCard>
          <ContactInfoCard
            cardClass={cardClass}
            labelClass={labelClass}
            label={t("contact.linkedin")}
            href={LINKEDIN_HREF}
            external
            linkClass={contactLinkClass}
          >
            {LINKEDIN_DISPLAY}
          </ContactInfoCard>
          <div className={cardClass}>
            <p className={`${labelClass} uppercase`}>{t("home.locationLabel")}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 font-mono flex items-center gap-2">
              {locale === "he" ? (
                <>
                  <span>{t("home.locationValue")}</span>
                  <MapPin className="w-4 h-4 text-brand/80 shrink-0" aria-hidden />
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 text-brand/80 shrink-0" aria-hidden />
                  <span>{t("home.locationValue")}</span>
                </>
              )}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-obsidian shadow-[0_0_20px_-4px_rgba(45,212,191,0.35)] transition hover:bg-brand/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-obsidian font-mono";
