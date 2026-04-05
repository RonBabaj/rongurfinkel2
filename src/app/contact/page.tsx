"use client";

import { useEffect } from "react";

/** Legacy URL: send visitors to the landing contact section. */
export default function ContactRedirectPage() {
  useEffect(() => {
    window.location.replace("/#contact");
  }, []);

  return (
    <div className="page-shell py-24 text-center text-slate-500 dark:text-slate-400 font-mono text-sm">
      Redirecting...
    </div>
  );
}
