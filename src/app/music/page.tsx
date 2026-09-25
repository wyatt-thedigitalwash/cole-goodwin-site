import type { Metadata } from "next";
import MusicPage from "@/components/MusicPage";
import { isCloserOut } from "@/lib/release";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Cole Goodwin's new single Closer Every Day, the Howdy EP and his catalog of country singles. Stream on Spotify, Apple Music and all platforms.",
  alternates: { canonical: "https://colegoodwinmusic.com/music" },
  openGraph: {
    title: "Music | Cole Goodwin",
    description:
      "Cole Goodwin's new single Closer Every Day, the Howdy EP and his catalog of country singles. Stream on Spotify, Apple Music and all platforms.",
    url: "https://colegoodwinmusic.com/music",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Music | Cole Goodwin",
    description:
      "Cole Goodwin's new single Closer Every Day, the Howdy EP and his catalog of country singles. Stream on Spotify, Apple Music and all platforms.",
    images: ["/og-image.png"],
  },
};

export default function Music() {
  // Read the clock on the server so the pre-save copy flips on release day
  // without a hydration mismatch. See src/lib/release.ts.
  return <MusicPage closerReleased={isCloserOut()} />;
}
