"use client";

import { useEffect } from "react";

const ANIMATION_DURATION = 2200; // ms — matches hero entrance total

export default function HeroScrollLock() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const played = sessionStorage.getItem("hero-played");
    if (played) return;

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
