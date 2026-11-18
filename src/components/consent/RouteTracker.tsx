"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackSpaPageView } from "./injectScripts";

// Reports client-side navigations to the consented tags. The landing page's
// pageview is sent by the tags themselves when they load (after consent), so
// the first render is skipped to avoid double counting.
export default function RouteTracker() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // Wait a tick so the new page's <title> is in place before it is read.
    const id = window.setTimeout(trackSpaPageView, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
