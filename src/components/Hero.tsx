"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const SESSION_KEY = "colegoodwin_splash_shown";

function startAnimation(
  setAnimate: (v: boolean) => void,
  setAnimKey: (fn: (k: number) => number) => void
) {
  setAnimate(false);
  setAnimKey((k) => k + 1);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setAnimate(true);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!prefersReducedMotion) {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        setTimeout(() => {
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
        }, 2200);
      }
    });
  });
}

export default function Hero() {
  const pathname = usePathname();
  const [animKey, setAnimKey] = useState(0);
  const [animate, setAnimate] = useState(false);

  // On mount or pathname change to home, decide whether to animate now or wait for splash
  useEffect(() => {
    if (pathname !== "/") return;

    // Splash disabled — animate immediately
    startAnimation(setAnimate, setAnimKey);
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-36 pt-28 md:flex-row md:items-center md:justify-start md:px-0 md:pb-0 md:pt-0"
      data-bg="brown"
    >
      {/* Portrait background (mobile) */}
      <Image
        src="/backgrounds/HowdyBackground_Portrait.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover md:hidden"
        priority
      />
      {/* Landscape background (desktop) */}
      <Image
        src="/backgrounds/HowdyBackground_Landscape.jpg"
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover md:block"
        priority
      />
      <h1 className="sr-only">Cole Goodwin - Howdy EP</h1>

      {/* ── Mobile layout (stacked, centered) ── */}
      <div
        key={`mobile-${animKey}`}
        className="relative mx-auto w-[90%] max-w-[calc(32rem*0.9)] md:hidden"
      >
        <div className={`${animate ? "hero-reveal-frame" : "opacity-0"} relative z-10`}>
          <div className="overflow-hidden rounded-2xl border-[5px] border-black">
            <div className="relative aspect-square w-full">
              <Image
                src="/banners/ColeGoodwin_HowdyVisual.jpg"
                alt="Cole Goodwin"
                fill
                sizes="90vw"
                className={`${animate ? "hero-photo-breathe" : ""} object-cover object-top`}
                priority
              />
            </div>
          </div>
        </div>

        <div className={`${animate ? "hero-reveal-cta" : "opacity-0"} mt-8 flex flex-col items-center`}>
          <p className="mb-3 font-headline text-2xl uppercase tracking-wide !text-cream lg:hidden" style={{ transformOrigin: "center center" }}>
            Out June 26
          </p>
          <a
            href="https://colegoodwin.ffm.to/howdyep.OPR"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-listen whitespace-nowrap px-14 py-4 text-lg"
          >
            Pre-save Howdy EP
          </a>
        </div>

        <div className={`${animate ? "hero-reveal-title" : "opacity-0"} absolute -top-[10%] left-0 z-30 w-[74%]`}>
          <Image
            src="/branding/HowdyLogo_Colored.png"
            alt="Howdy"
            width={800}
            height={250}
            className="h-auto w-full"
            priority
          />
        </div>

        <div className={`${animate ? "hero-reveal-name" : "opacity-0"} absolute -top-[10%] right-[-7%] z-20 w-[34%]`}>
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

      {/* ── Desktop layout (side-by-side) ── */}
      <div
        key={`desktop-${animKey}`}
        className="relative hidden w-full min-h-screen items-center justify-center md:flex"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center gap-10 lg:gap-14">
          {/* Left: photo */}
          <div className={`${animate ? "hero-reveal-frame" : "opacity-0"} w-[48%] shrink-0`}>
            <div className="overflow-hidden rounded-2xl border-[6px] border-black md:rounded-3xl">
              <div className="relative aspect-square w-full">
                <Image
                  src="/banners/ColeGoodwin_HowdyVisual.jpg"
                  alt="Cole Goodwin"
                  fill
                  sizes="42vw"
                  className={`${animate ? "hero-photo-breathe" : ""} object-cover object-top`}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right: branding + CTA text */}
          <div className="flex flex-1 flex-col items-start">
            <div className="relative">
              <div className={`${animate ? "hero-reveal-title" : "opacity-0"} w-full max-w-[460px] lg:max-w-[540px] xl:max-w-[600px]`}>
                <Image
                  src="/branding/HowdyLogo_Colored.png"
                  alt="Howdy"
                  width={800}
                  height={250}
                  className="h-auto w-full"
                  priority
                />
              </div>
              <div className={`${animate ? "hero-reveal-name" : "opacity-0"} ml-[41%] -mt-[9%] w-[55%] lg:-mt-[10%]`}>
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

            <a
              href="https://colegoodwin.ffm.to/howdyep.OPR"
              target="_blank"
              rel="noopener noreferrer"
              className={`${animate ? "hero-reveal-cta" : "opacity-0"} mt-6 block cursor-pointer !text-cream hover:!text-black lg:mt-8`}
              style={{ transition: "color 0.3s ease-in-out" }}
            >
              <p
                className="font-headline text-3xl leading-tight tracking-wide lg:text-4xl xl:text-5xl"
                style={{ textTransform: "uppercase" }}
              >
                Out June 26
                <br />
                Pre-save Now
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
