"use client";

import { useEffect, useRef } from "react";
import SignupForm from "./SignupForm";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  YouTubeIcon,
  SpotifyIcon,
  AppleMusicIcon,
  AmazonMusicIcon,
  PandoraIcon,
} from "./SocialIcons";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/colegoodwinmusic/", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/ColeGoodwinMusic/", Icon: FacebookIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@colegoodwinmusic", Icon: TikTokIcon },
  { label: "YouTube", href: "https://www.youtube.com/@ColeGoodwinMusic", Icon: YouTubeIcon },
];

const STREAMING_LINKS = [
  { label: "Spotify", href: "https://open.spotify.com/artist/1BJuLsavR5ekNDC4FhjTmF", Icon: SpotifyIcon },
  { label: "Apple Music", href: "https://music.apple.com/us/artist/cole-goodwin/1674367221", Icon: AppleMusicIcon },
  { label: "Amazon Music", href: "https://music.amazon.com/artists/B07NFCRSL6/cole-goodwin", Icon: AmazonMusicIcon },
  { label: "Pandora", href: "https://pandora.app.link/EMGZOrlQEUb", Icon: PandoraIcon },
];

export default function FollowPageClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const sections = pageRef.current?.querySelectorAll(".follow-section");
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("follow-section-visible");
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
    <main id="main-content" ref={pageRef} className="flex-1 bg-brown pt-28 md:pt-32">
      <h1 className="sr-only">Follow Along</h1>
      {/* Social + Listen — two columns on desktop, stacked on mobile */}
      <section className="follow-section follow-section-hidden px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-14 md:flex-row md:gap-16">
            {/* Left — Social */}
            <div className="flex-1">
              <h2 className="mb-8 text-center md:mb-10" style={centeredHeadline}>
                Social
              </h2>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-listen gap-4 py-4 text-sm md:text-base"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-cream" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Listen */}
            <div className="flex-1">
              <h2 className="mb-8 text-center md:mb-10" style={centeredHeadline}>
                Listen
              </h2>
              <div className="flex flex-col gap-3">
                {STREAMING_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-listen gap-4 py-4 text-sm md:text-base"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-cream" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email signup */}
      <section className="follow-section follow-section-hidden bg-cream px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-brown" style={centeredHeadline}>
            Stay Posted
          </h2>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-brown/60 md:text-base">
            Tour dates, new music, first dibs.
          </p>
          <div className="mt-10">
            <SignupForm inputIdPrefix="follow-page" />
          </div>
        </div>
      </section>
    </main>
  );
}
