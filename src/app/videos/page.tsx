import type { Metadata } from "next";
import { getVideos } from "@/lib/videos";
import VideosPageClient from "@/components/VideosPageClient";

export const metadata: Metadata = {
  title: "Videos - Cole Goodwin",
  description: "Music videos and visual content from Cole Goodwin.",
};

export default async function Videos() {
  const videos = await getVideos();
  return <VideosPageClient videos={videos} />;
}
