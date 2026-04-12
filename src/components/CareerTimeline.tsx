"use client";

import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/data/translations";
import type { CareerJob } from "@/types/career";
import { Reveal } from "@/components/Reveal";

function CareerEntryCard({
  job,
  locale,
  onOpen,
  hint,
}: {
  job: CareerJob;
  locale: Locale;
  onOpen: () => void;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/card career-card relative w-full text-start overflow-hidden rounded-xl border border-slate-200/90 bg-white/88 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 ease-out dark:border-brand/35 dark:bg-[rgba(15,23,42,0.55)] hover:-translate-y-1.5 hover:border-teal-400/45 hover:shadow-[0_0_36px_-12px_rgba(13,148,136,0.18)] dark:hover:border-brand/50 dark:hover:shadow-[0_0_48px_-10px_rgba(45,212,191,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-obsidian cursor-pointer"
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(45,212,191,0.12), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative">
        <p
          className="mb-3 inline-block rounded-full border border-slate-200/90 bg-slate-100/90 px-3 py-1 font-mono text-[11px] font-normal text-slate-600 transition-colors duration-300 group-hover/card:border-teal-400/35 group-hover/card:text-slate-800 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-500 dark:group-hover/card:border-brand/30 dark:group-hover/card:text-slate-400"
          dir="ltr"
        >
          {job.date}
        </p>
        <h3 className="font-sans text-xl font-bold leading-snug tracking-tight text-slate-950 transition-colors duration-300 group-hover/card:text-slate-900 dark:text-white dark:group-hover/card:text-white">
          {job.title}
        </h3>
        <p className="mt-1 font-mono text-sm text-brand-dim transition-colors duration-300 group-hover/card:text-brand dark:text-brand dark:group-hover/card:text-brand">
          {job.company}
        </p>
        <p className="mt-3 font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {job.line}
        </p>
        {hint ? (
          <p className="mt-3 font-mono text-[11px] text-teal-800/90 dark:text-brand/70">{hint}</p>
        ) : null}
      </div>
    </button>
  );
}

function TimelineNode({ index }: { index: number }) {
  return (
    <span
      className="relative z-[2] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ring-[5px] ring-[#e8edf4] dark:ring-obsidian"
      aria-hidden
    >
      <span
        className="timeline-node block h-3 w-3 rounded-full bg-brand"
        style={{ animationDelay: `${index * 0.35}s` }}
      />
    </span>
  );
}

export function CareerTimeline({
  jobs,
  locale,
  onSelectJob,
}: {
  jobs: CareerJob[];
  locale: Locale;
  onSelectJob?: (job: CareerJob) => void;
}) {
  const { t } = useLocale();
  const hint = onSelectJob ? t("careerModal.clickHint") : "";

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Center spine — desktop */}
      <div
        className="timeline-spine pointer-events-none absolute left-1/2 top-2 bottom-2 z-0 hidden w-[2px] -translate-x-1/2 md:block"
        aria-hidden
      />

      <ul className="relative z-[1] m-0 list-none space-y-10 p-0 md:space-y-14">
        {jobs.map((job, i) => {
          /* LTR: even index → left column; RTL: mirror so reading order follows the spine */
          const cardLeft = locale === "he" ? i % 2 !== 0 : i % 2 === 0;
          return (
            <li
              key={job.company}
              className="grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-x-6 lg:gap-x-10 gap-x-4"
            >
              {/* Mobile rail + connector */}
              <div className="col-start-1 row-start-1 flex flex-col items-center pt-1 md:hidden">
                <TimelineNode index={i} />
                {i < jobs.length - 1 ? (
                  <span
                    className="mt-2 min-h-[4.5rem] w-px flex-1 bg-gradient-to-b from-brand/45 via-brand/25 to-brand/15"
                    aria-hidden
                  />
                ) : null}
              </div>

              {/* Desktop center node (second column) */}
              <div className="hidden md:col-start-2 md:row-start-1 md:flex md:justify-center md:self-center md:px-0.5">
                <TimelineNode index={i} />
              </div>

              {/* Card: mobile col 2; desktop col 1 or 3 */}
              <Reveal
                className={`col-start-2 row-start-1 min-w-0 md:row-start-1 md:w-full md:max-w-md ${
                  cardLeft
                    ? "md:col-start-1 md:justify-self-end"
                    : "md:col-start-3 md:justify-self-start"
                }`}
                delayMs={i * 90}
              >
                <CareerEntryCard
                  job={job}
                  locale={locale}
                  hint={hint}
                  onOpen={() => onSelectJob?.(job)}
                />
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
