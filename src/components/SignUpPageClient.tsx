"use client";

import { useEffect, useRef } from "react";
import SignupForm from "./SignupForm";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

const PERKS = [
  {
    title: "Tour Alerts",
    description: "Be first to know when Cole's coming to your city.",
  },
  {
    title: "New Music",
    description: "Hear singles and EPs the moment they drop.",
  },
  {
    title: "Ticket Presales",
    description: "Early access to tickets before they sell out.",
  },
];

export default function SignUpPageClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const sections = pageRef.current?.querySelectorAll(".su-section");
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("su-section-visible");
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
    <main id="main-content" ref={pageRef} className="flex-1 bg-cream pt-28 text-brown md:pt-32">
      {/* Section 1: Page hero */}
      <section className="su-section su-section-hidden px-5 pb-10 text-center md:px-8 md:pb-16">
        <h1 style={centeredHeadline} className="text-brown">
          Stay Posted
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brown/70 md:text-lg">
          Sign up for Cole&rsquo;s email list to get tour announcements, new
          music drops, and first access to ticket sales. No spam, ever.
        </p>
      </section>

      {/* Section 2: Form */}
      <section className="su-section su-section-hidden px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-md text-center">
          <SignupForm inputIdPrefix="signup-page" />
        </div>
      </section>

      {/* Section 3: What you get */}
      <section className="su-section su-section-hidden px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center md:mb-14">
            <h2 style={centeredHeadline} className="text-brown">
              What You Get
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {PERKS.map((perk) => (
              <div key={perk.title} className="text-center">
                <h3
                  className="text-lg text-brown md:text-xl"
                  style={{
                    ...centeredHeadline,
                    fontFamily: "var(--font-headline)",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                  }}
                >
                  {perk.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown/60 md:text-base">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
