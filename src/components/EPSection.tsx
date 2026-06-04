"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const SONGS = [
  {
    title: "Howdy",
    cover: "/cover-images/ColeGoodwin_Howdy_CoverArt.jpg",
    url: "https://colegoodwin.lnk.to/howdyWE",
  },
  {
    title: "Girl That\u2019s How",
    cover: "/cover-images/ColeGoodwin_GirlThatsHow_CoverArt.jpg",
    url: "#",
  },
  {
    title: "Where She\u2019s Coming From",
    cover: "/cover-images/ColeGoodwin_WhereShesComingFrom_CoverArt.jpg",
    url: "https://colegoodwin.ffm.to/whereshescomingfrom",
  },
];

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

export default function EPSection() {
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
      className="ep-section bg-brown px-5 py-20 md:px-8 md:py-28"
      data-bg="brown"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 flex flex-col items-center md:mb-20">
          <h2 className="ep-anim-heading" style={centeredHeadline}>The EP</h2>
          <p className="ep-anim-subline mt-3 text-sm uppercase tracking-[0.2em] text-cream/70 md:text-base">
            Out June 26, 2026
          </p>
        </div>

        {/* Songs */}
        <div className="mx-auto grid max-w-md grid-cols-1 gap-14 md:max-w-none md:grid-cols-3 md:gap-10">
          {SONGS.map((song, i) => (
            <div key={song.title} className="flex flex-col items-center">
              {/* Cover + title */}
              <div className="w-full">
                <Image
                  src={song.cover}
                  alt={`${song.title} cover art`}
                  width={600}
                  height={600}
                  sizes="(max-width: 768px) 85vw, 33vw"
                  className="ep-anim-cover w-full rounded-lg"
                  style={{ transitionDelay: `${0.3 + i * 0.15}s` }}
                />
                <h3
                  className="ep-anim-title mt-5 text-center text-xl md:mt-6 md:text-2xl"
                  style={{
                    ...centeredHeadline,
                    transitionDelay: `${0.3 + i * 0.15 + 0.15}s`,
                  }}
                >
                  {song.title}
                </h3>
              </div>

              {/* Listen button */}
              <a
                href={song.url}
                target={song.url !== "#" ? "_blank" : undefined}
                rel={song.url !== "#" ? "noopener noreferrer" : undefined}
                className="btn-listen mt-4"
              >
                Listen
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
