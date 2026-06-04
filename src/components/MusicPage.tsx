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
  { title: "Messin\u2019 With My Mind", url: "https://colegoodwin.lnk.to/MessinWithMyMindWE" },
  { title: "Dust On The Dancefloor", url: "https://colegoodwin.lnk.to/DustOnTheDancefloorWE" },
  { title: "Girlfriend\u2019s Got A Boyfriend", url: "https://colegoodwin.lnk.to/GirlfriendsGotABoyfriendWE" },
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
    <div ref={pageRef} className="bg-brown">
      {/* Section 1: EP Hero — two-column showcase, fills the viewport */}
      <section className="music-section music-section-hidden flex min-h-screen items-center px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16 lg:gap-24">
            {/* Left — EP cover, large */}
            <div className="w-full max-w-[360px] shrink-0 md:max-w-none md:w-[45%]">
              <Image
                src="/cover-images/ColeGoodwin_HowdyEP_CoverArt.jpg"
                alt="Howdy EP cover art"
                width={800}
                height={800}
                sizes="(max-width: 768px) 360px, 45vw"
                className="w-full rounded-xl shadow-[10px_10px_0_rgba(0,0,0,0.3)]"
              />
            </div>

            {/* Right — EP info + track strip */}
            <div className="flex flex-1 flex-col items-center md:items-start">
              <h1
                className="text-center text-5xl md:text-left md:text-6xl lg:text-7xl md:[transform-origin:left_center]"
                style={centeredHeadline}
              >
                The Howdy EP
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
                Pre-save the EP
              </a>

              {/* Track strip — visual tracklist */}
              <div className="mt-12 w-full md:mt-14">
                <p className="mb-3 text-xs uppercase tracking-[0.15em] text-cream/40 md:text-sm">
                  Tracklist
                </p>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {EP_TRACKS.map((track) => (
                    <a
                      key={track.num}
                      href={track.url}
                      target={track.url !== "#" ? "_blank" : undefined}
                      rel={track.url !== "#" ? "noopener noreferrer" : undefined}
                      className="group relative aspect-square overflow-hidden rounded-md"
                      aria-label={`${track.title}${track.released ? " — Listen" : " — Pre-save"}`}
                    >
                      {track.cover ? (
                        <Image
                          src={track.cover}
                          alt={track.title}
                          fill
                          sizes="(max-width: 768px) 60px, 120px"
                          className="object-cover transition-transform duration-150 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-black/40">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cream/40 md:text-xs">
                            06.26
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

      {/* Section 3: Singles */}
      <section className="music-section music-section-hidden px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center md:mb-14">
            <h2 style={centeredHeadline}>Singles</h2>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-cream/70 md:text-base">
              More from Cole
            </p>
          </div>

          <div className="flex flex-col">
            {SINGLES.map((single) => (
              <div
                key={single.title}
                className="flex flex-col gap-3 border-t border-cream/10 py-5 md:flex-row md:items-center md:gap-6"
              >
                <div className="flex-1">
                  <p
                    className="uppercase text-cream"
                    style={{
                      fontFamily: "var(--font-headline)",
                      fontWeight: 700,
                    }}
                  >
                    {single.title}
                  </p>
                  <p className="mt-0.5 text-sm text-cream/50">Single</p>
                </div>
                <a
                  href={single.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-listen self-start text-sm md:self-center"
                >
                  Listen
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Listen Everywhere */}
      <section className="music-section music-section-hidden px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center md:mb-14">
            <h2 style={centeredHeadline}>Listen Everywhere</h2>
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
    </div>
  );
}
