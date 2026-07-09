"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

const BIO_PARAGRAPHS = [
  `24-year-old singer-songwriter Cole Goodwin is helping lead country music’s return to its roots with his strong, textured vocals, authentic songwriter and unmistakable traditional sound that Country Central calls “country music done right.” Hailing from Pooler, Georgia, Goodwin first broke onto the scene with his 2023 self-produced 2023 EP Soon Enough, quickly building a devoted fanbase through touring across the Southeast and opening dates for artists like Zach Top, Luke Bryan, and Billy Currington.`,
  `Raised on the music of Waylon Jennings, Merle Haggard and Hank Williams, Goodwin brings an old-school spirit to a new generation of country fans. Now signed to Big Machine Records, Goodwin continues his rise with the release of his new EP, Howdy. The four-song collection showcases his signature blend of honky-tonk swagger, heartfelt storytelling and classic country influences. The title track made an immediate impact at country radio, earning 56 first-week adds, while the project also features fan favorites including “Keep On Rainin'," "Girl That's How” and "Where She's Coming From.”`,
  `Goodwin’s momentum has continued throughout 2026 with performances at CMA Fest, support dates on Zach Top's Cold Beer & Country Music Tour, Vincent Mason's There I Go Tour, a special appearance with Carly Pearce, and his current run on Dierks Bentley's Off The Map Tour. This summer, he'll also join Braxton Keith for select dates on the Real Damn Deal Tour.`,
];

export default function AboutSection() {
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
          section.classList.add("about-in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section bg-brown px-5 py-28 md:px-8 md:py-36"
      data-bg="brown"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-14 flex flex-col items-center md:mb-20">
          <h2 className="about-anim-heading" style={centeredHeadline}>
            About Cole Goodwin
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col gap-10 md:flex-row md:gap-14">
          {/* Photo column */}
          <div className="about-anim-photo w-full flex-shrink-0 md:w-[42%]">
            <Image
              src="/banners/ColeGoodwin_HowdyVisual.jpg"
              alt="Cole Goodwin"
              width={800}
              height={1067}
              sizes="(max-width: 768px) 100vw, 42vw"
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* Bio column */}
          <div className="flex-1">
            {BIO_PARAGRAPHS.map((paragraph, i) => (
              <p
                key={i}
                className="about-anim-bio mb-5 text-base leading-relaxed text-cream md:text-lg md:leading-relaxed"
                style={{ transitionDelay: `${0.35 + i * 0.12}s` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
