"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cleanTitle } from "@/lib/videos";
import type { VideoEntry } from "@/lib/videos";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

export default function VideosPageClient({
  videos,
}: {
  videos: VideoEntry[];
}) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const sections = pageRef.current?.querySelectorAll(".vp-section");
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vp-section-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function handlePlay(id: string) {
    setActiveId(id);
  }

  return (
    <main id="main-content" ref={pageRef} className="flex-1 bg-brown" data-header-style="transparent">
      {/* Mobile banner — image with overlaid heading */}
      <div className="relative md:hidden">
        <Image
          src="/banners/ColeGoodwin_HowdySingle_DesktopBanner.jpg"
          alt="Cole Goodwin"
          width={1080}
          height={1350}
          sizes="100vw"
          className="w-full"
          priority
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown/80 to-transparent pb-8 pt-20">
          <h1 className="text-center text-[3.375rem]" style={centeredHeadline}>Videos</h1>
        </div>
      </div>

      {/* Desktop: split layout */}
      <div className="md:flex">
        {/* Left column — videos */}
        <div className="flex-1 pt-8 md:w-1/2 md:pt-32">
          {/* Page hero — desktop only */}
          <section className="vp-section vp-section-hidden hidden px-5 pb-12 text-center md:block md:px-8 md:pb-16">
            <h1 style={centeredHeadline}>Videos</h1>
          </section>

          {/* Videos list — single column */}
          <section className="px-5 pb-12 md:px-8 md:pb-16">
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-col gap-10">
                {videos.map((video, i) => {
                  const isPlaying = activeId === video.id;
                  const title = cleanTitle(video.title);

                  return (
                    <div
                      key={video.id}
                      className="vp-section vp-section-hidden"
                      style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                    >
                      <div className="vp-tile relative aspect-video w-full overflow-hidden rounded-lg">
                        {isPlaying ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 h-full w-full"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => handlePlay(video.id)}
                            className="group relative h-full w-full cursor-pointer"
                            aria-label={`Play ${title}`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                              alt={title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-[44px] w-[60px] items-center justify-center rounded-xl bg-rust/90 transition-transform duration-150 ease-out group-hover:scale-105 md:h-[52px] md:w-[72px]">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="ml-0.5 h-6 w-6 text-cream md:h-7 md:w-7"
                                  aria-hidden="true"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </button>
                        )}
                      </div>

                      <h2
                        className="mt-4 text-center !text-lg md:!text-xl"
                        style={centeredHeadline}
                      >
                        {title}
                      </h2>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* More on YouTube */}
          <section className="vp-section vp-section-hidden px-5 pb-20 text-center md:px-8 md:pb-28">
            <a
              href="https://www.youtube.com/@ColeGoodwinMusic"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-listen px-10 py-3.5 text-base md:text-lg"
            >
              Watch more on YouTube
            </a>
          </section>
        </div>

        {/* Right column — sticky banner, unpins when left content ends */}
        <div className="relative hidden md:block md:w-1/2 md:self-start md:sticky md:top-0 md:h-screen">
          <Image
            src="/banners/ColeGoodwin_HowdySingle_DesktopBanner.jpg"
            alt="Cole Goodwin"
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </main>
  );
}
