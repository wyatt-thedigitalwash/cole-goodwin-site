"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Hero() {
  const pathname = usePathname();
  const [animKey, setAnimKey] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Re-trigger animation every time we land on the home page
  useEffect(() => {
    if (pathname !== "/") return;

    setAnimate(false);

    // Force remount of animation by bumping key
    setAnimKey((k) => k + 1);

    // Small delay to ensure opacity-0 renders first
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimate(true);

        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (!prefersReducedMotion) {
          document.documentElement.style.overflow = "hidden";
          document.body.style.overflow = "hidden";
          const timer = setTimeout(() => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
          }, 2200);
          return () => {
            clearTimeout(timer);
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
          };
        }
      });
    });
  }, [pathname]);

  // Cleanup overflow on unmount
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brown px-5 pb-36 pt-28 md:px-8 md:pb-44 md:pt-32"
      data-bg="brown"
    >
      <h1 className="sr-only">Cole Goodwin - Howdy EP</h1>
      {/* Composition wrapper — centered */}
      <div
        key={animKey}
        className="relative mx-auto w-[90%] max-w-[calc(32rem*0.9)] md:max-w-[calc(36rem*0.9)] lg:max-w-[calc(42rem*0.9)]"
      >
        {/* Photo frame */}
        <div className={`${animate ? "hero-reveal-frame" : "opacity-0"} relative z-10`}>
          <div className="overflow-hidden rounded-2xl border-[5px] border-black md:rounded-3xl md:border-[6px]">
            <div className="relative aspect-square w-full">
              <Image
                src="/banners/ColeGoodwin_HowdyVisual.jpg"
                alt="Cole Goodwin"
                fill
                sizes="(max-width: 768px) 90vw, 672px"
                className={`${animate ? "hero-photo-breathe" : ""} object-cover object-top`}
                priority
              />
            </div>
          </div>
        </div>

        {/* Pre-save CTA */}
        <div className={`${animate ? "hero-reveal-cta" : "opacity-0"} mt-8 flex justify-center md:mt-10`}>
          <a
            href="https://colegoodwin.ffm.to/howdyep.OPR"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-listen whitespace-nowrap px-14 py-4 text-lg md:px-16 md:py-5 md:text-xl"
          >
            Pre-save Howdy EP
          </a>
        </div>

        {/* HOWDY title logo */}
        <div className={`${animate ? "hero-reveal-title" : "opacity-0"} absolute -top-[10%] left-0 z-30 w-[74%] md:-top-[11%] md:w-[67.5%]`}>
          <Image
            src="/branding/HowdyLogo_Colored.png"
            alt="Howdy"
            width={800}
            height={250}
            className="h-auto w-full"
            priority
          />
        </div>

        {/* Cole Goodwin name script */}
        <div className={`${animate ? "hero-reveal-name" : "opacity-0"} absolute -top-[10%] right-[-7%] z-20 w-[34%] md:-top-[12%] md:right-[-1%] md:w-[31.5%]`}>
          <Image
            src="/branding/HowdyNameLogo_Textured.png"
            alt="Cole Goodwin"
            width={600}
            height={200}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
