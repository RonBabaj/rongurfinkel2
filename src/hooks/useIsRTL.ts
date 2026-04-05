import { useLocale } from "@/contexts/LocaleContext";

/** True when the active locale is Hebrew — layout should mirror (RTL). */
export function useIsRTL(): boolean {
  return useLocale().isRTL;
}
