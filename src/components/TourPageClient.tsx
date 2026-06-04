"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

const BANDSINTOWN_URL = "https://www.bandsintown.com/a/15558214";

export default function TourPageClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const sections = pageRef.current?.querySelectorAll(".tp-section");
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("tp-section-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Script
        src="https://widget.bandsintown.com/main.min.js"
        strategy="lazyOnload"
        onError={() => setScriptError(true)}
      />

      <div ref={pageRef} className="bg-brown pt-28 md:pt-32">
        {/* Page hero */}
        <section className="tp-section tp-section-hidden px-5 pb-16 text-center md:px-8 md:pb-24">
          <h1 style={centeredHeadline}>Tour</h1>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-cream/70 md:text-base">
            Catch him live.
          </p>
        </section>

        {/* Widget */}
        <section className="tp-section tp-section-hidden px-5 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto max-w-5xl">
            {scriptError ? (
              <p className="text-center text-cream/70">
                Tour dates are loading.{" "}
                <a
                  href={BANDSINTOWN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rust underline"
                >
                  View the full schedule on Bandsintown
                </a>
                .
              </p>
            ) : (
              <a
                className="bit-widget-initializer"
                data-artist-name="Cole Goodwin"
                data-app-id="umg_bigmachinelabelgroup_colegoodwin"
                data-affil-code="umg_us"
                data-display-local-dates="false"
                data-display-past-dates="false"
                data-auto-style="false"
                data-text-color="#F9F0E3"
                data-link-color="#B5502A"
                data-title-text-color="#F9F0E3"
                data-background-color="rgba(0,0,0,0)"
                data-popup-background-color="#493629"
                data-button-bar-background-color="#493629"
                data-button-bar-color="#F9F0E3"
                data-separator-color="rgba(249,240,227,0.2)"
                data-display-limit="all"
                data-display-track-button="true"
                data-display-rsvp-button="true"
                data-display-play-my-city="true"
                aria-label="Cole Goodwin tour dates"
              />
            )}
          </div>

          {/* CTA buttons */}
          {!scriptError && (
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
              <a
                href="https://www.bandsintown.com/a/15558214?came_from=267&utm_medium=web&utm_source=widget&utm_campaign=track_button"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-listen px-8 py-3 text-sm md:text-base"
              >
                Track on Bandsintown
              </a>
              <a
                href="https://www.bandsintown.com/a/15558214?came_from=267&utm_medium=web&utm_source=widget&utm_campaign=play_my_city"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-listen px-8 py-3 text-sm md:text-base"
              >
                Play My City
              </a>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
