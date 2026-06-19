"use client";

import { type ReactNode } from "react";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

export default function TourPageShell({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="flex-1 bg-brown" data-header-style="transparent">
      {/* Mobile banner -- video with overlaid heading */}
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
        {/* Left column -- tour content */}
        <div className="flex-1 pt-8 md:w-1/2 md:pt-32">
          {/* Page hero -- desktop only */}
          <section className="hidden px-5 pb-16 text-center md:block md:px-8 md:pb-24">
            <h1 style={centeredHeadline}>Tour</h1>
          </section>

          {/* Tour dates */}
          <section className="px-5 pb-20 md:px-8 md:pb-28" aria-label="Tour dates">
            <div className="mx-auto max-w-5xl">
              {children}
            </div>
          </section>
        </div>

        {/* Right column -- sticky video banner */}
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
  );
}
