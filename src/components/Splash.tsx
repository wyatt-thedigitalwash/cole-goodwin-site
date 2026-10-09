"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CLOSER_EVERY_DAY, SPLASH_KEY, closerCopy } from "@/lib/release";

// Hard ceiling on how long the cascade waits for the background art. A slow
// connection or a broken image must never leave "Enter Site" invisible.
const REVEAL_TIMEOUT_MS = 1200;

// Must match the #splash-overlay opacity transition in globals.css.
const EXIT_MS = 800;

// Only the background actually on screen should trigger the reveal. The other one
// is display: none but still downloads, and may finish first.
function isShown(img: HTMLImageElement | null): boolean {
  return !!img && img.getClientRects().length > 0;
}

// `released` comes from the server layout rather than the clock here, so the
// prerendered copy and the hydrated copy always agree. See src/lib/release.ts.
export default function Splash({ released }: { released: boolean }) {
  const copy = closerCopy(released);
  const pathname = usePathname();
  const [artLoaded, setArtLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const ready = timedOut || artLoaded;

  useEffect(() => {
    const t = window.setTimeout(() => setTimedOut(true), REVEAL_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, []);

  // The pre-paint script in the root layout handles the first paint. This
  // handles client-side navigation, e.g. clicking the Terms link on the splash
  // itself. Someone who deep-links to a legal page is exempt but NOT marked as
  // entered, so reading the Terms is never treated as agreeing to them.
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("splash-entered")) return;
    root.classList.toggle("splash-exempt", pathname.startsWith("/legal"));
  }, [pathname]);

  const enterSite = () => {
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      /* private mode throws -- dismiss regardless */
    }
    const overlay = document.getElementById("splash-overlay");
    if (overlay) {
      // Fade first, then display: none. Flipping the class immediately would
      // hard-cut instead of dissolving.
      overlay.classList.add("is-exiting");
      window.setTimeout(() => {
        document.documentElement.classList.add("splash-entered");
      }, EXIT_MS);
    } else {
      document.documentElement.classList.add("splash-entered");
    }
  };

  // The ref check catches a browser-cached image that fires onLoad before
  // React attaches the handler. onError reveals anyway -- fail open, always.
  const artProps = {
    fill: true,
    priority: true,
    sizes: "100vw",
    ref: (img: HTMLImageElement | null) => {
      if (img?.complete && isShown(img)) setArtLoaded(true);
    },
    onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (isShown(e.currentTarget)) setArtLoaded(true);
    },
    onError: () => setArtLoaded(true),
  };

  return (
    <div
      id="splash-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${CLOSER_EVERY_DAY.title}. New single from Cole Goodwin`}
      className={ready ? "splash-ready" : undefined}
    >
      {/* Clean background plates; the photo is decorative. The stage mirrors
          object-fit: cover in CSS so the lockup and CTA can be pinned to the
          artwork, where the label's banner puts them, at any viewport size. */}
      <div className="splash-stage" aria-hidden="true">
        <Image
          {...artProps}
          src={CLOSER_EVERY_DAY.backgroundDesktop}
          alt=""
          className="splash-art splash-art-landscape"
        />
        <Image
          {...artProps}
          src={CLOSER_EVERY_DAY.backgroundMobile}
          alt=""
          className="splash-art splash-art-portrait"
        />
      </div>
      <div className="splash-scrim" aria-hidden="true" />

      {/* One column on desktop, centered vertically as a group. On portrait
          the wrapper has no box of its own and its children pin themselves. */}
      <div className="splash-content">
        {/* Title lockup rebuilt from the label banner: the title in Rafaella,
            with the signature logo tucked in beside "Day". Rafaella's lowercase
            glyphs are its plain capitals (the uppercase ones are swash forms),
            so the title is typed lowercase on purpose. Every offset is in em,
            so the whole lockup scales from one font-size in globals.css. */}
        <p className="splash-rise splash-lockup" style={{ animationDelay: "100ms" }}>
          <span className="splash-lockup-line splash-lockup-l1">closer</span>{" "}
          <span className="splash-lockup-line splash-lockup-l2">every</span>{" "}
          <span className="splash-lockup-line splash-lockup-l3">day</span>
          <Image
            src="/branding/HowdyNameLogo_Flat.png"
            alt="Cole Goodwin"
            width={5818}
            height={3102}
            sizes="(min-aspect-ratio: 5/4) 18vw, 45vw"
            priority
            className="splash-lockup-logo"
          />
        </p>

        <div className="splash-cta">
          <p className="splash-rise splash-date" style={{ animationDelay: "380ms" }}>
            {copy.dateLine}
          </p>

          <div className="splash-rise splash-buttons" style={{ animationDelay: "500ms" }}>
            <a
              href={CLOSER_EVERY_DAY.link}
              target="_blank"
              rel="noopener noreferrer"
              className="splash-btn splash-btn-primary"
            >
              {copy.cta}
              <span className="sr-only"> {CLOSER_EVERY_DAY.title} (opens in new tab)</span>
            </a>
            <button type="button" onClick={enterSite} className="splash-btn splash-btn-ghost">
              Enter Site
            </button>
          </div>

          {/* Arbitration / class-action notice, directly under the entry
              buttons so no visitor can claim they had no notice of it. Each of
              the three phrases deep-links to its own section. */}
          <p
            className="splash-rise splash-legal"
            style={{ animationDelay: "630ms", "--rise-to": 0.8 } as React.CSSProperties}
          >
            By entering, you consent to our{" "}
            <Link href="/legal/terms">Terms &amp; Conditions</Link>, including{" "}
            <Link href="/legal/terms#section-17">binding arbitration</Link> and a{" "}
            <Link href="/legal/terms#class-action-waiver">waiver of class action rights</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
