"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CLOSER_EVERY_DAY, closerCopy } from "@/lib/release";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

const HOWDY_EP_URL = "https://colegoodwin.ffm.to/howdyep.OPR";

const SINGLES = [
  { title: "Girl That\u2019s How", url: "#", cover: "/cover-images/ColeGoodwin_GirlThatsHow_CoverArt.jpg" },
  { title: "Where She\u2019s Coming From", url: "https://colegoodwin.ffm.to/whereshescomingfrom", cover: "/cover-images/ColeGoodwin_WhereShesComingFrom_CoverArt.jpg" },
  { title: "Howdy", url: "https://colegoodwin.lnk.to/howdyWE", cover: "/cover-images/ColeGoodwin_Howdy_CoverArt.jpg" },
  { title: "Messin\u2019 With My Mind", url: "https://colegoodwin.lnk.to/MessinWithMyMindWE", cover: "/cover-images/ColeGoodwin_MessinWithMyMind_Cover.jpg" },
  { title: "Dust on the Dancefloor", url: "https://colegoodwin.lnk.to/DustOnTheDancefloorWE", cover: "/cover-images/ColeGoodwin_DustOnTheDanceFloor_Cover.jpg" },
  { title: "Girlfriend\u2019s Got a Boyfriend", url: "https://colegoodwin.lnk.to/GirlfriendsGotABoyfriendWE", cover: "/cover-images/ColeGoodwin_GirlfriendsGotABoyfriend_Cover.jpg" },
];

const PLATFORMS = [
  { label: "Spotify", url: "https://open.spotify.com/artist/1BJuLsavR5ekNDC4FhjTmF" },
  { label: "Apple Music", url: "https://music.apple.com/us/artist/cole-goodwin/1674367221" },
  { label: "Amazon Music", url: "https://music.amazon.com/artists/B07NFCRSL6/cole-goodwin" },
  { label: "Pandora", url: "https://pandora.app.link/EMGZOrlQEUb" },
];

export default function MusicPage({ closerReleased }: { closerReleased: boolean }) {
  const closer = closerCopy(closerReleased);

  // Newest first. Each card: square cover, title, status line, button.
  const releases = [
    {
      title: CLOSER_EVERY_DAY.title,
      kind: "Single",
      cover: CLOSER_EVERY_DAY.cover,
      status: closer.dateLine,
      cta: closer.cta,
      url: CLOSER_EVERY_DAY.link,
    },
    {
      title: "Howdy",
      kind: "EP",
      cover: "/cover-images/ColeGoodwin_HowdyEP_CoverArt.jpg",
      status: "Out Now",
      cta: "Listen Now",
      url: HOWDY_EP_URL,
    },
  ];

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const sections = pageRef.current?.querySelectorAll(".music-section");
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("music-section-visible");
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
    <main id="main-content" ref={pageRef} className="flex-1 bg-brown">
      {/* Section 1: Latest releases -- two large covers side by side */}
      <section className="music-section music-section-hidden flex min-h-screen items-center px-5 pb-16 pt-28 md:px-12 md:pb-24 md:pt-32 lg:px-20">
        <div className="mx-auto w-full max-w-5xl">
          <h1 className="sr-only">Music</h1>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-12 lg:gap-16">
            {releases.map((release) => (
              <article key={release.title} className="flex flex-col items-center text-center">
                <div className="w-full">
                  <Image
                    src={release.cover}
                    alt={`${release.title} ${release.kind === "EP" ? "EP" : "single"} cover art`}
                    width={1000}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, 480px"
                    priority
                    className="aspect-square w-full rounded-xl object-cover shadow-[10px_10px_0_rgba(0,0,0,0.3)]"
                  />
                </div>
                <h2
                  className="mt-8 text-4xl ![transform-origin:center_center] md:mt-10 md:text-5xl"
                >
                  {release.kind === "EP" ? `${release.title} EP` : release.title}
                </h2>
                <p className="mt-3 text-base font-bold uppercase tracking-wide text-cream/60 md:text-lg">
                  {release.status}
                </p>
                <a
                  href={release.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-listen mt-6 px-12 py-4 text-lg md:mt-8"
                >
                  {release.cta}
                  <span className="sr-only"> {release.title} (opens in new tab)</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Singles */}
      <section className="music-section music-section-hidden px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center md:mb-14">
            <h2 style={centeredHeadline}>Singles</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
            {SINGLES.map((single) => (
              <a
                key={single.title}
                href={single.url}
                target={single.url !== "#" ? "_blank" : undefined}
                rel={single.url !== "#" ? "noopener noreferrer" : undefined}
                className="group text-center"
              >
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={single.cover}
                    alt={single.title}
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 45vw, 30vw"
                    className="w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <p
                  className="mt-3 text-sm uppercase text-cream md:text-base"
                  style={{ fontFamily: "var(--font-headline)", fontWeight: 700 }}
                >
                  {single.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Listen Everywhere */}
      <section className="music-section music-section-hidden px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center md:mb-14">
            <h2 style={centeredHeadline}>Listen<br className="md:hidden" /> Everywhere</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
            {PLATFORMS.map((platform) => (
              <a
                key={platform.label}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-listen justify-center py-3.5 text-center text-sm md:text-base"
              >
                {platform.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
