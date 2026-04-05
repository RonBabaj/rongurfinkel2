"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Locale } from "@/data/translations";

const STORAGE_KEY = "locale";
const DEFAULT_LOCALE: Locale = "en";

function getNested(obj: object, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const p of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[p];
  }
  return typeof current === "string" ? current : undefined;
}

interface LocaleContextValue {
  locale: Locale;
  /** True when `locale === "he"` — use for conditional layout, `rtl:` Tailwind, or `dir` props. */
  isRTL: boolean;
  /** Document direction for the active locale (`rtl` | `ltr`). Mirrors `<html dir>`. */
  dir: "rtl" | "ltr";
  setLocale: (next: Locale) => void;
  t: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyLocale(locale: Locale) {
  const root = document.documentElement;
  root.setAttribute("lang", locale);
  root.setAttribute("dir", locale === "he" ? "rtl" : "ltr");
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    const next = stored === "he" || stored === "en" ? stored : DEFAULT_LOCALE;
    setLocaleState(next);
    applyLocale(next);
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyLocale(next);
  }, []);

  const t = useCallback(
    (path: string): string => {
      const value = getNested(translations[locale], path);
      if (value != null) return value;
      const enValue = getNested(translations.en, path);
      return enValue ?? path;
    },
    [locale]
  );

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, locale);
      applyLocale(locale);
    }
  }, [mounted, locale]);

  const isRTL = locale === "he";
  const dir: "rtl" | "ltr" = isRTL ? "rtl" : "ltr";

  return (
    <LocaleContext.Provider value={{ locale, isRTL, dir, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
