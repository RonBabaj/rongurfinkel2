"use client";

import { useEffect } from "react";

/** Legacy URL: send visitors to the landing career section. */
export default function CareerRedirectPage() {
  useEffect(() => {
    window.location.replace("/#career");
  }, []);

  return (
    <div className="page-shell py-24 text-center text-slate-500 dark:text-slate-400 font-mono text-sm">
      Redirecting...
    </div>
  );
}
