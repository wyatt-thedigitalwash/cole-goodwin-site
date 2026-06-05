"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

const BANDSINTOWN_URL = "https://www.bandsintown.com/a/15558214";

export default function TourSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("tour-in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Script
        src="https://widget.bandsintown.com/main.min.js"
        strategy="lazyOnload"
        onError={() => setScriptError(true)}
      />

      <section
        ref={sectionRef}
        id="tour"
        className="tour-section bg-brown px-5 py-28 md:px-8 md:py-36"
        data-bg="brown"
      >
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <div className="mb-14 flex flex-col items-center md:mb-20">
            <h2 className="tour-anim-heading" style={centeredHeadline}>
              Tour
            </h2>
          </div>

          {/* Widget or fallback */}
          <div className="tour-anim-row">
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
                data-display-track-button="false"
                data-display-rsvp-button="true"
                data-display-play-my-city="false"
                aria-label="Cole Goodwin tour dates"
              />
            )}
          </div>

          {/* CTA buttons */}
          {!scriptError && (
            <div className="tour-anim-row mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
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
        </div>
      </section>
    </>
  );
}
