"use client";

interface StackSkillCardProps {
  title: string;
  highlights: string[];
  other: string[];
}

/**
 * Dark “ledger” card: ALL CAPS mono header, cyan bullets + muted dashes (reference design).
 */
export function StackSkillCard({ title, highlights, other }: StackSkillCardProps) {
  return (
    <div className="group stack-skill-card relative overflow-hidden rounded-xl border border-slate-200/90 bg-white/90 p-5 shadow-sm transition-all duration-500 ease-out dark:border-white/10 dark:bg-[rgba(15,23,42,0.65)] dark:shadow-none dark:backdrop-blur-md dark:hover:border-brand/45 dark:hover:shadow-[0_0_40px_-12px_rgba(45,212,191,0.4)] hover:-translate-y-[5px] hover:border-brand/35 hover:shadow-[0_12px_40px_-16px_rgba(45,212,191,0.18)]">
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(45,212,191,0.15) 0%, transparent 42%, rgba(45,212,191,0.06) 100%)",
        }}
        aria-hidden
      />
      <h3 className="relative font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-dim dark:text-brand mb-4">
        {title}
      </h3>
      <ul className="relative space-y-2.5 text-sm">
        {highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-brand-dim dark:text-brand">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand shadow-[0_0_10px_rgba(45,212,191,0.85)]"
              aria-hidden
            />
            <span className="leading-snug">{h}</span>
          </li>
        ))}
        {other.map((o) => (
          <li key={o} className="flex gap-2.5 text-slate-600 dark:text-slate-400">
            <span className="mt-0.5 shrink-0 text-slate-400 dark:text-slate-600" aria-hidden>
              –
            </span>
            <span className="leading-snug">{o}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
