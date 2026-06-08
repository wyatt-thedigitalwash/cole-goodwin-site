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

      <main id="main-content" ref={pageRef} className="flex-1 bg-brown" data-header-style="transparent">
        {/* Mobile banner — video with overlaid heading */}
        <div className="relative md:hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            poster="/video/ColeGoodwin_TourBanner_Square_poster.jpg"
            className="w-full"
          >
            <source src="/video/ColeGoodwin_TourBanner_Square.webm" type="video/webm" />
            <source src="/video/ColeGoodwin_TourBanner_Square.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown/80 to-transparent pb-8 pt-20">
            <h1 className="text-center text-[3.375rem]" style={centeredHeadline}>Tour</h1>
          </div>
        </div>

        {/* Desktop: split layout */}
        <div className="md:flex">
          {/* Left column — tour content */}
          <div className="flex-1 pt-8 md:w-1/2 md:pt-32">
            {/* Page hero — desktop only */}
            <section className="tp-section tp-section-hidden hidden px-5 pb-16 text-center md:block md:px-8 md:pb-24">
              <h1 style={centeredHeadline}>Tour</h1>
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
                    data-display-track-button="false"
                    data-display-rsvp-button="true"
                    data-display-play-my-city="false"
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

          {/* Right column — sticky video banner */}
          <div className="relative hidden md:block md:w-1/2 md:self-start md:sticky md:top-0 md:h-screen">
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              poster="/video/ColeGoodwin_TourBanner_Square_poster.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/video/ColeGoodwin_TourBanner_Square.webm" type="video/webm" />
              <source src="/video/ColeGoodwin_TourBanner_Square.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </main>
    </>
  );
}
