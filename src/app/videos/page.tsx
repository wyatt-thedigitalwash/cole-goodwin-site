import type { Metadata } from "next";
import { getVideos } from "@/lib/videos";
import VideosPageClient from "@/components/VideosPageClient";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch Cole Goodwin's official music videos. Country music visuals from the Pooler, Georgia native signed to Big Machine Records.",
  alternates: { canonical: "https://colegoodwinmusic.com/videos" },
  openGraph: {
    title: "Videos | Cole Goodwin",
    description:
      "Watch Cole Goodwin's official music videos. Country music visuals from the Pooler, Georgia native signed to Big Machine Records.",
    url: "https://colegoodwinmusic.com/videos",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Videos | Cole Goodwin",
    description:
      "Watch Cole Goodwin's official music videos. Country music visuals from the Pooler, Georgia native signed to Big Machine Records.",
    images: ["/og-image.png"],
  },
};

export default async function Videos() {
  const videos = await getVideos();
  return <VideosPageClient videos={videos} />;
}
