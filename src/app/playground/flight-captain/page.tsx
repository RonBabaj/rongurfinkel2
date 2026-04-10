"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Old URL; Fly-Fix now lives at /playground/fly-fix */
export default function LegacyFlightCaptainRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/playground/fly-fix/");
  }, [router]);
  return (
    <div className="page-shell py-16 font-mono text-sm text-slate-500 dark:text-slate-400">
      Redirecting to Fly-Fix…
    </div>
  );
}
