"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useSplash } from "./SplashContext";

const LISTEN_URL = "https://colegoodwin.ffm.to/howdyep.OPR";

export default function SplashOverlay() {
  const { state, dismiss } = useSplash();
  const presaveRef = useRef<HTMLAnchorElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Focus pre-save when splash is shown
  useEffect(() => {
    if (state === "splash" && presaveRef.current) {
      presaveRef.current.focus();
    }
  }, [state]);

  // Escape key dismisses
  useEffect(() => {
    if (state !== "splash") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, dismiss]);

  // Focus trap
  useEffect(() => {
    if (state !== "splash") return;
    function trapFocus(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const els = [presaveRef.current, enterRef.current].filter(
        Boolean
      ) as HTMLElement[];
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [state]);

  // Fully dismissed — remove from DOM
  if (state === "site") return null;

  // Compute container styles
  let containerStyle: React.CSSProperties = {
    touchAction: "none",
    overscrollBehavior: "none",
  };

  if (state === "loading") {
    // Don't set inline opacity — let CSS data-attribute rules control visibility
    // On first visit: CSS shows it (html[data-show-splash] selector)
    // On repeat visit: CSS hides it (default selector)
  } else if (state === "splash") {
    containerStyle.opacity = 1;
  } else if (state === "closing") {
    containerStyle.opacity = 0;
    containerStyle.pointerEvents = "none";
    if (!reduced) {
      containerStyle.transition = "opacity 500ms ease-out";
    }
  }

  const showContent = state === "splash" || state === "closing";

  return (
    <div
      data-splash-overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="splash-heading"
      style={containerStyle}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
    >
      {/* Background — desktop landscape */}
      <Image
        src="/backgrounds/HowdyBackground_Landscape.jpg"
        alt=""
        fill
        className="hidden object-cover md:block"
        priority
      />
      {/* Background — mobile portrait */}
      <Image
        src="/backgrounds/HowdyBackground_Portrait.jpg"
        alt=""
        fill
        className="object-cover md:hidden"
        priority
      />

      {/* Content — only rendered once state is "splash" or "closing" */}
      {showContent && (
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-10 md:flex-row md:gap-16 md:px-16 lg:gap-24 lg:px-24">
          {/* LEFT / TOP — Hero frame composition */}
          <div className="relative w-[85%] max-w-[480px] shrink-0 md:w-[45%] md:max-w-[560px]">
            {/* Photo frame */}
            <div className="relative z-10">
              <div className="overflow-hidden rounded-2xl border-[5px] border-black md:rounded-3xl md:border-[6px]">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/banners/ColeGoodwin_HowdyVisual.jpg"
                    alt="Cole Goodwin"
                    fill
                    sizes="(max-width: 768px) 85vw, 560px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* HOWDY logo — top-left */}
            <div className="absolute -top-[10%] left-0 z-30 w-[74%] md:-top-[11%] md:w-[67.5%]">
              <Image
                src="/branding/HowdyLogo_Colored.png"
                alt="Howdy"
                width={800}
                height={250}
                className="h-auto w-full"
                priority
              />
            </div>

            {/* Cole Goodwin signature — top-right */}
            <div className="absolute -top-[10%] right-[-7%] z-20 w-[34%] md:-top-[12%] md:right-[-1%] md:w-[31.5%]">
              <Image
                src="/branding/HowdyNameLogo_Textured.png"
                alt="Cole Goodwin"
                width={600}
                height={200}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>

          {/* RIGHT / BOTTOM — EP info + CTAs */}
          <div className="mt-8 flex flex-col items-center md:mt-0 md:items-start">
            {/* Heading */}
            <h2
              id="splash-heading"
              className="!text-3xl text-cream ![transform-origin:center_center] md:![transform-origin:left_center] md:!text-6xl lg:!text-7xl"
              style={{
                fontFamily: "var(--font-headline)",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Out Now
            </h2>

            {/* Listen button */}
            <a
              ref={presaveRef}
              href={LISTEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="mt-8 inline-flex w-full max-w-xs items-center justify-center rounded-[4px] px-12 py-4 text-center text-lg uppercase tracking-wider md:w-auto md:text-xl"
              style={{
                fontFamily: "var(--font-headline)",
                fontWeight: 700,
                backgroundColor: "#F9F0E3",
                color: "#000",
                boxShadow: "4px 4px 0 #000",
                transform: "translate(0, 0)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(2px, 2px)";
                e.currentTarget.style.boxShadow = "2px 2px 0 #000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "4px 4px 0 #000";
              }}
              aria-label="Listen to Howdy EP now -- opens in a new tab"
            >
              Listen Now
            </a>

            {/* Enter site button */}
            <button
              ref={enterRef}
              type="button"
              onClick={dismiss}
              className="mt-4 w-full max-w-xs cursor-pointer rounded-[4px] border-2 border-cream px-12 py-3.5 text-center uppercase tracking-wider text-cream transition-colors duration-150 hover:bg-cream hover:text-brown md:w-auto md:text-lg"
              style={{
                fontFamily: "var(--font-headline)",
                fontWeight: 700,
              }}
            >
              Enter Site
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
