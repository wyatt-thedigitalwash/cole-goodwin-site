"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useSplash } from "./SplashContext";
import SplashOverlay from "./SplashOverlay";

export default function LayoutShell({ children }: { children: ReactNode }) {
  const { state } = useSplash();

  const siteVisible = state === "site" || state === "closing";

  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Remove the server-rendered blocker once React has taken over
  useEffect(() => {
    const blocker = document.getElementById("splash-blocker");
    if (blocker) blocker.remove();
  }, []);

  let wrapperStyle: React.CSSProperties;

  if (state === "loading") {
    // Don't set inline styles — let CSS data-attribute rules control visibility
    wrapperStyle = {};
  } else if (state === "splash") {
    wrapperStyle = { opacity: 0, pointerEvents: "none" };
  } else if (state === "closing") {
    // crossfade: site fading in as splash fades out
    wrapperStyle = reduced
      ? { opacity: 1 }
      : { opacity: 1, transition: "opacity 500ms ease-out" };
  } else {
    // site — fully visible
    wrapperStyle = { opacity: 1 };
  }

  return (
    <>
      <SplashOverlay />
      <div
        data-splash-site-wrapper
        style={wrapperStyle}
        aria-hidden={!siteVisible}
      >
        {children}
      </div>
    </>
  );
}
