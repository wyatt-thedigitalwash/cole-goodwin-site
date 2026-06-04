"use client";

import { useEffect, useRef, useState } from "react";
import { cleanTitle } from "@/lib/videos";
import type { VideoEntry } from "@/lib/videos";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

export default function VideosClient({ videos }: { videos: VideoEntry[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const featured = videos[featuredIdx];

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
          section.classList.add("videos-in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function handleStripClick(originalIdx: number) {
    if (originalIdx === featuredIdx) return;
    setPlaying(false);
    setTransitioning(true);
    setTimeout(() => {
      setFeaturedIdx(originalIdx);
      setTransitioning(false);
    }, 100);
  }

  return (
    <section
      ref={sectionRef}
      id="videos"
      className="videos-section bg-brown px-5 py-20 md:px-8 md:py-28"
      data-bg="brown"
    >
      <div className="mx-auto max-w-[900px]">
        {/* Heading */}
        <div className="mb-14 flex flex-col items-center md:mb-20">
          <h2 className="videos-anim-heading" style={centeredHeadline}>
            Videos
          </h2>
          <p className="videos-anim-subline mt-3 text-sm uppercase tracking-[0.2em] text-cream/70 md:text-base">
            Watch
          </p>
        </div>

        {/* Featured title */}
        <h3
          className="videos-anim-featured mb-4 text-center text-xl md:mb-5 md:text-2xl"
          style={centeredHeadline}
        >
          {cleanTitle(featured.title)}
        </h3>

        {/* Featured player */}
        <div
          className={`videos-anim-featured relative aspect-video w-full overflow-hidden rounded-xl border-[3px] border-black md:border-4 ${
            transitioning ? "vid-swap-out" : "vid-swap-in"
          }`}
        >
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${featured.id}?autoplay=1`}
              title={cleanTitle(featured.title)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group relative h-full w-full cursor-pointer"
              aria-label={`Play ${cleanTitle(featured.title)}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${featured.id}/maxresdefault.jpg`}
                alt={cleanTitle(featured.title)}
                className="h-full w-full object-cover"
              />
              {/* Play button — extruded rust */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-rust shadow-[4px_4px_0_#000] transition-all duration-150 ease-out group-hover:bg-rust/90 md:h-20 md:w-20">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-7 w-7 text-cream md:h-8 md:w-8"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Strip thumbnails — fills featured width */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory md:mt-8 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible md:pb-0">
          {videos.map((video, i) => {
            const isActive = i === featuredIdx;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => handleStripClick(i)}
                aria-label={`Watch ${video.title}`}
                className={`videos-anim-strip relative aspect-video w-[45%] flex-shrink-0 snap-start overflow-hidden rounded-lg md:w-auto ${
                  isActive
                    ? "ring-2 ring-rust ring-offset-2 ring-offset-brown"
                    : ""
                }`}
                style={{ transitionDelay: `${0.5 + i * 0.1}s` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Small play glyph overlay */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-rust/80 md:h-9 md:w-9">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-0.5 h-4 w-4 text-cream"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
