import { useLocale } from "@/contexts/LocaleContext";

/**
 * RTL/LTR helpers for layout — prefer this over duplicating components.
 * `dir` matches `<html dir>` (also set by ThemeScript + LocaleProvider).
 */
export function useDirection() {
  const { isRTL, dir, locale } = useLocale();
  return { isRTL, dir, locale };
}
