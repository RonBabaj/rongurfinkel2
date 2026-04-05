"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

function readHash(): string {
  return typeof window !== "undefined" ? window.location.hash : "";
}

/** URL hash for landing anchors (e.g. /#career) and nav active state. */
export function useHash(): string {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useLayoutEffect(() => {
    setHash(readHash());
  }, [pathname]);

  useEffect(() => {
    const sync = () => setHash(readHash());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  return hash;
}
