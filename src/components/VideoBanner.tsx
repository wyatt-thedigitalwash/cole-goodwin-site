"use client";

import { useEffect, useRef } from "react";

export default function VideoBanner() {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const videos = [desktopRef.current, mobileRef.current].filter(
      Boolean
    ) as HTMLVideoElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative -mt-px w-full overflow-hidden" style={{ height: "60vh" }}>
      {/* Desktop video — parallax via object-position shift */}
      <video
        ref={desktopRef}
        className="parallax-video hidden md:block"
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/ColeGoodwin_VideoBanner_poster.jpg"
        aria-hidden="true"
      >
        <source
          src="/video/ColeGoodwin_VideoBanner.webm"
          type="video/webm"
        />
        <source
          src="/video/ColeGoodwin_VideoBanner.mp4"
          type="video/mp4"
        />
      </video>

      {/* Mobile video — parallax via object-position shift */}
      <video
        ref={mobileRef}
        className="parallax-video block md:hidden"
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/ColeGoodwin_Mobile_poster.jpg"
        aria-hidden="true"
      >
        <source
          src="/video/ColeGoodwin_Mobile.webm"
          type="video/webm"
        />
        <source
          src="/video/ColeGoodwin_Mobile.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
