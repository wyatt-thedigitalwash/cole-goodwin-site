import type { Metadata } from "next";
import MusicPage from "@/components/MusicPage";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Listen to Cole Goodwin's new EP Howdy and his catalog of country singles. Stream on Spotify, Apple Music and all platforms.",
  alternates: { canonical: "https://colegoodwinmusic.com/music" },
  openGraph: {
    title: "Music | Cole Goodwin",
    description:
      "Listen to Cole Goodwin's new EP Howdy and his catalog of country singles. Stream on Spotify, Apple Music and all platforms.",
    url: "https://colegoodwinmusic.com/music",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Music | Cole Goodwin",
    description:
      "Listen to Cole Goodwin's new EP Howdy and his catalog of country singles. Stream on Spotify, Apple Music and all platforms.",
    images: ["/og-image.png"],
  },
};

export default function Music() {
  return <MusicPage />;
}
