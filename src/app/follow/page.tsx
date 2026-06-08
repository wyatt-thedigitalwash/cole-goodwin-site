import type { Metadata } from "next";
import FollowPageClient from "@/components/FollowPageClient";

export const metadata: Metadata = {
  title: "Follow Along",
  description:
    "Follow Cole Goodwin on Instagram, TikTok, Facebook and YouTube. Stream his music on Spotify, Apple Music and more.",
  alternates: { canonical: "https://colegoodwinmusic.com/follow" },
  openGraph: {
    title: "Follow Along | Cole Goodwin",
    description:
      "Follow Cole Goodwin on Instagram, TikTok, Facebook and YouTube. Stream his music on Spotify, Apple Music and more.",
    url: "https://colegoodwinmusic.com/follow",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Follow Along | Cole Goodwin",
    description:
      "Follow Cole Goodwin on Instagram, TikTok, Facebook and YouTube. Stream his music on Spotify, Apple Music and more.",
    images: ["/og-image.png"],
  },
};

export default function Follow() {
  return <FollowPageClient />;
}
