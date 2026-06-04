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

export default function EPTracklist() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ep-block-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const blocks = sectionRef.current?.querySelectorAll(".ep-block");
    blocks?.forEach((block) => observer.observe(block));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="the-ep"
      className="bg-brown px-5 py-20 md:px-8 md:py-28"
      data-bg="brown"
    >
      {/* Section heading */}
      <div className="ep-block ep-block-hidden mb-14 text-center md:mb-20">
        <h2>The Howdy EP</h2>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-cream/70 md:text-base">
          Out June 26, 2026
        </p>
      </div>

      {/* Songs row (desktop) / stack (mobile) */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 md:flex-row md:gap-6 lg:gap-10">
        {SONGS.map((song, i) => (
          <div
            key={song.title}
            className="ep-block ep-block-hidden flex flex-1 flex-col items-center"
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {/* Cover art */}
            <div className="ep-block-cover relative aspect-square w-full overflow-hidden rounded-lg shadow-xl">
              <Image
                src={song.cover}
                alt={`${song.title} cover art`}
                fill
                sizes="(max-width: 768px) 90vw, 33vw"
                className="object-cover"
              />
            </div>

            {/* Title + button */}
            <div className="ep-block-info mt-5 flex flex-col items-center gap-3 text-center md:mt-6">
              <h3 className="text-xl md:text-2xl">{song.title}</h3>
              <a
                href={song.url}
                target={song.url !== "#" ? "_blank" : undefined}
                rel={song.url !== "#" ? "noopener noreferrer" : undefined}
                className="btn-rust text-sm"
              >
                Listen
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
