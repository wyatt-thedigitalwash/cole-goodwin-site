"use client";

import { useEffect, useRef } from "react";
import SignupForm from "./SignupForm";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

export default function EmailListSection() {
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
          section.classList.add("email-in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="email-section bg-cream px-5 py-28 md:px-8 md:py-36"
      data-bg="cream"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className="email-anim-heading text-brown"
          style={centeredHeadline}
        >
          STAY POSTED
        </h2>
        <p className="email-anim-subline mt-3 text-sm uppercase tracking-[0.2em] text-brown/60 md:text-base">
          Tour dates, new music, first dibs.
        </p>

        <div className="email-anim-form mt-10">
          <SignupForm />
        </div>
      </div>
    </section>
  );
}
