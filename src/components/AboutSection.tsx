"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

const BIO_PARAGRAPHS = [
  `24-year-old singer/songwriter Cole Goodwin has garnered attention for his strong, textured voice paired with his meaningful writing and return to old-school Country sound. The Pooler, Georgia, native burst on the scene in 2023 with the release of his original, self-produced EP Soon Enough. Cole has toured the Southeast playing honky tonks, clubs and festivals, as well as opening shows for artists including Zach Top and Billy Currington.`,
  `Last year, the up-and-coming artist released what are now fan-favorite songs including "When You Get Home," co-written with fellow Georgia Southern University alum Will Moseley, and "Catchin' On," written with songwriter Justin Dukes. Cole was voted Savannah's Best Country Artist of 2023 and 2024, as well as 2024's Best Singer/Songwriter, Best Local Concert, and Best All-Around Musician.`,
  `Recently signed to Big Machine Records, more new music from Cole is expected throughout the summer as he crisscrosses the country opening on select dates of Luke Bryan's Country Song Came On Tour. Cole's new EP, Howdy, arrives June 26, 2026.`,
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
