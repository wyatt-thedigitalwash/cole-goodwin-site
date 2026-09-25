"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CLOSER_EVERY_DAY, closerCopy } from "@/lib/release";

const HOWDY_EP_URL = "https://colegoodwin.ffm.to/howdyep.OPR";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

// `closerReleased` comes from the server page so the pre-save copy flips on
// release day without a hydration mismatch. See src/lib/release.ts.
export default function EPSection({ closerReleased }: { closerReleased: boolean }) {
  const closer = closerCopy(closerReleased);

  // The new single and the EP, newest first.
  const releases = [
    {
      title: CLOSER_EVERY_DAY.title,
      cover: CLOSER_EVERY_DAY.cover,
      alt: `${CLOSER_EVERY_DAY.title} single cover art`,
      status: closer.dateLine,
      cta: closer.cta,
      url: CLOSER_EVERY_DAY.link,
    },
    {
      title: "Howdy EP",
      cover: "/cover-images/ColeGoodwin_HowdyEP_CoverArt.jpg",
      alt: "Howdy EP cover art",
      status: "Out Now",
      cta: "Listen",
      url: HOWDY_EP_URL,
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);

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
          section.classList.add("ep-in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="the-ep"
      className="ep-section relative bg-brown px-5 py-28 md:px-8 md:py-36"
      data-bg="brown"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-center md:mb-20">
          <h2 className="ep-anim-heading" style={centeredHeadline}>The Latest</h2>
        </div>

        {/* Releases */}
        <div className="mx-auto grid max-w-md grid-cols-1 gap-14 md:max-w-5xl md:grid-cols-2 md:gap-12 lg:gap-16">
          {releases.map((release, i) => (
            <div key={release.title} className="flex flex-col items-center">
              {/* Cover + title */}
              <div className="w-full">
                <Image
                  src={release.cover}
                  alt={release.alt}
                  width={1000}
                  height={1000}
                  sizes="(max-width: 768px) 85vw, 480px"
                  className="ep-anim-cover aspect-square w-full rounded-lg object-cover"
                  style={{ transitionDelay: `${0.3 + i * 0.15}s` }}
                />
                <h3
                  className="ep-anim-title mt-6 text-center text-2xl md:mt-8 md:text-3xl"
                  style={{
                    ...centeredHeadline,
                    transitionDelay: `${0.3 + i * 0.15 + 0.15}s`,
                  }}
                >
                  {release.title}
                </h3>
                <p
                  className="ep-anim-title mt-2 text-center text-base font-bold uppercase tracking-wide text-cream/60 md:text-lg"
                  style={{ transitionDelay: `${0.3 + i * 0.15 + 0.2}s` }}
                >
                  {release.status}
                </p>
              </div>

              {/* Listen / pre-save button */}
              <a
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-listen mt-5"
              >
                {release.cta}
                <span className="sr-only"> {release.title} (opens in new tab)</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
