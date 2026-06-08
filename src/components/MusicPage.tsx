"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

const PRESAVE_URL = "https://colegoodwin.ffm.to/howdyep.OPR";

const EP_TRACKS = [
  { num: 1, title: "Howdy", released: true, url: "https://colegoodwin.lnk.to/howdyWE", cover: "/cover-images/ColeGoodwin_Howdy_CoverArt.jpg" },
  { num: 2, title: "Girl That\u2019s How", released: true, url: "#", cover: "/cover-images/ColeGoodwin_GirlThatsHow_CoverArt.jpg" },
  { num: 3, title: "Where She\u2019s Coming From", released: true, url: "https://colegoodwin.ffm.to/whereshescomingfrom", cover: "/cover-images/ColeGoodwin_WhereShesComingFrom_CoverArt.jpg" },
  { num: 4, title: "Call Me Colorado", released: false, url: PRESAVE_URL, cover: null },
  { num: 5, title: "Keep on Rainin\u2019", released: false, url: PRESAVE_URL, cover: null },
];

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

export default function MusicPage() {
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
      {/* Section 1: EP Hero — two-column showcase, fills the viewport */}
      <section className="music-section music-section-hidden flex min-h-screen items-center px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto w-full max-w-5xl md:max-w-7xl">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16 lg:gap-24">
            {/* Left — EP cover, large */}
            <div className="w-full shrink-0 md:w-[45%]">
              <Image
                src="/cover-images/ColeGoodwin_HowdyEP_CoverArt.jpg"
                alt="Howdy EP cover art"
                width={800}
                height={800}
                sizes="(max-width: 768px) 100vw, 45vw"
                className="w-full rounded-xl shadow-[10px_10px_0_rgba(0,0,0,0.3)]"
              />
            </div>

            {/* Right — EP info + track strip */}
            <div className="flex w-full flex-1 flex-col items-center md:items-start">
              <h1
                className="text-center text-5xl ![transform-origin:center_center] md:text-left md:text-6xl md:![transform-origin:left_center] lg:text-7xl"
              >
                Howdy EP
              </h1>
              <p className="mt-3 text-base uppercase tracking-[0.2em] text-cream/60 md:mt-4 md:text-lg">
                Out June 26, 2026
              </p>

              {/* Pre-save button */}
              <a
                href={PRESAVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-listen mt-8 px-12 py-4 text-lg md:mt-10 md:px-14 md:py-5 md:text-xl"
              >
                Pre-save Howdy EP
              </a>

              {/* Track strip — visual tracklist */}
              <div className="mt-12 w-full md:mt-14">
                <p className="mb-3 text-xs uppercase tracking-[0.15em] text-cream/40 md:text-sm">
                  Tracklist
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:grid md:grid-cols-5 md:gap-3">
                  {EP_TRACKS.map((track, i) => (
                    <a
                      key={track.num}
                      href={track.url}
                      target={track.url !== "#" ? "_blank" : undefined}
                      rel={track.url !== "#" ? "noopener noreferrer" : undefined}
                      className="group relative aspect-square w-[calc(33.333%-0.375rem)] overflow-hidden rounded-md md:w-auto"
                      aria-label={`${track.title}${track.released ? " — Listen" : " — Pre-save"}`}
                    >
                      {track.cover ? (
                        <Image
                          src={track.cover}
                          alt={track.title}
                          fill
                          sizes="(max-width: 768px) 30vw, 120px"
                          className="object-cover transition-transform duration-150 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-black/40">
                          <span
                            className="text-center text-xs uppercase leading-tight text-cream/50 md:text-sm"
                            style={{ fontFamily: "var(--font-headline)", fontWeight: 700 }}
                          >
                            Coming
                            <br />
                            Soon
                          </span>
                        </div>
                      )}
                      <span className="absolute bottom-1 left-1.5 text-[10px] font-bold text-cream/60 md:text-xs">
                        {track.num}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
