import type { DemoStatus } from "@/data/types";

const statusConfig: Record<DemoStatus, { className: string }> = {
  live: {
    className: "bg-brand/15 text-brand-dim dark:text-brand border-brand/35",
  },
  offline: {
    className: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  "on-demand": {
    className: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  "deployable-phase2": {
    className: "bg-slate-400/30 dark:bg-slate-600/30 text-slate-600 dark:text-slate-400 border-slate-400/40 dark:border-slate-500/30",
  },
};

interface StatusBadgeProps {
  status: DemoStatus;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className = "" }: StatusBadgeProps) {
  const { className: statusClassName } = statusConfig[status];
  const fallback: Record<DemoStatus, string> = {
    live: "Live",
    offline: "Offline",
    "on-demand": "On-Demand",
    "deployable-phase2": "Deployable · Live in Phase 2",
  };
  const text = label ?? fallback[status];
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${statusClassName} ${className}`}
    >
      {text}
    </span>
  );
}
