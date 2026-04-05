"use client";

interface StackSkillCardProps {
  title: string;
  highlights: string[];
  other: string[];
}

/**
 * Dark “ledger” card: cyan title only; body lines are neutral gray (no accent list rows).
 */
export function StackSkillCard({ title, highlights, other }: StackSkillCardProps) {
  const rowClass =
    "flex gap-2.5 text-slate-600 dark:text-slate-400";
  const markerClass = "mt-0.5 shrink-0 text-slate-400 dark:text-slate-600";

  return (
    <div className="group stack-skill-card relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white/90 p-5 shadow-sm transition-all duration-500 ease-out dark:border-white/10 dark:bg-[rgba(15,23,42,0.65)] dark:shadow-none dark:backdrop-blur-md dark:hover:border-brand/45 dark:hover:shadow-[0_0_40px_-12px_rgba(45,212,191,0.4)] hover:-translate-y-[5px] hover:border-brand/35 hover:shadow-[0_12px_40px_-16px_rgba(45,212,191,0.18)]">
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(45,212,191,0.15) 0%, transparent 42%, rgba(45,212,191,0.06) 100%)",
        }}
        aria-hidden
      />
      <h3 className="relative font-mono text-[11px] sm:text-sm font-extrabold uppercase tracking-[0.14em] text-brand-dim dark:text-brand mb-4 [text-shadow:0_0_20px_rgba(46,230,212,0.12)]">
        {title}
      </h3>
      <ul className="relative flex-1 space-y-2.5 text-sm font-normal">
        {highlights.map((h) => (
          <li key={h} className={rowClass}>
            <span className={markerClass} aria-hidden>
              –
            </span>
            <span className="leading-snug">{h}</span>
          </li>
        ))}
        {other.map((o) => (
          <li key={o} className={rowClass}>
            <span className={markerClass} aria-hidden>
              –
            </span>
            <span className="leading-snug">{o}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
