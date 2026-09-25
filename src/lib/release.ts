// sessionStorage key for the splash, read by the pre-paint script in the root
// layout, Splash.tsx and useSplashEntered. Versioned so a new campaign re-shows
// the splash to everyone: bump the suffix when the release changes. Lives here,
// not in a "use client" file, so the server layout gets the plain string.
export const SPLASH_KEY = "cg_splash_closer_every_day";

// Current campaign: the single "Closer Every Day". One place for the link, the
// artwork and the release-day copy flip, used by the splash and /music.
export const CLOSER_EVERY_DAY = {
  title: "Closer Every Day",
  link: "https://colegoodwin.ffm.to/closereveryday",
  cover: "/cover-images/ColeGoodwin_CloserEverDay_Cover.jpg",
  // Clean plates: the title and signature are set live on top in Splash.tsx.
  backgroundDesktop: "/backgrounds/ColeGoodwin_CloserEveryDay_Desktop.jpg",
  backgroundMobile: "/backgrounds/ColeGoodwin_CloserEveryDay_Mobile.jpg",
} as const;

// Midnight Eastern on release day, when the single goes live on US services.
const RELEASE = new Date("2026-10-09T00:00:00-04:00");

// Call this from server components only and pass the result down as a prop. A
// client component reading the clock itself would disagree with prerendered
// HTML on either side of release day and trip a hydration mismatch. The root
// layout revalidates hourly, so every route picks up the flip on its own.
export function isCloserOut(): boolean {
  return Date.now() >= RELEASE.getTime();
}

export function closerCopy(released: boolean) {
  return released
    ? { dateLine: "Out Now", cta: "Listen Now" }
    : { dateLine: "Out October 9", cta: "Pre-Save" };
}
