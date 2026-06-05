"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [animate, setAnimate] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const played = sessionStorage.getItem("hero-played");
    if (!played) {
      setAnimate(true);
      sessionStorage.setItem("hero-played", "1");
    }
    setReady(true);
  }, []);

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brown px-5 pb-36 pt-28 md:px-8 md:pb-44 md:pt-32"
      data-bg="brown"
    >
      {/* Composition wrapper — centered */}
      <div className="relative mx-auto w-[90%] max-w-[calc(32rem*0.9)] md:max-w-[calc(36rem*0.9)] lg:max-w-[calc(42rem*0.9)]">
        {/* Photo frame — outer relative for button positioning, inner for overflow clip */}
        <div className={`${animate ? "hero-reveal-frame" : ""} relative z-10`}>
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

        {/* Pre-save + release date — centered below the frame */}
        <div className={`${animate ? "hero-reveal-cta" : ""} mt-8 flex justify-center md:mt-10`}>
          <a
            href="https://colegoodwin.ffm.to/howdyep.OPR"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-listen whitespace-nowrap px-14 py-4 text-lg md:px-16 md:py-5 md:text-xl"
          >
            Pre-save Howdy
          </a>
        </div>

        {/* HOWDY title logo — top-left, overlapping frame edge */}
        <div className={`${animate ? "hero-reveal-title" : ""} absolute -top-[10%] left-0 z-30 w-[74%] md:-top-[11%] md:w-[67.5%]`}>
          <Image
            src="/branding/HowdyLogo_Colored.png"
            alt="Howdy"
            width={800}
            height={250}
            className="h-auto w-full"
            priority
          />
        </div>

        {/* Cole Goodwin name script (textured) — top-right, overlapping frame */}
        <div className={`${animate ? "hero-reveal-name" : ""} absolute -top-[10%] right-[-7%] z-20 w-[34%] md:-top-[12%] md:right-[-1%] md:w-[31.5%]`}>
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
