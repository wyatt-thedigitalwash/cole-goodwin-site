import { getVideos } from "@/lib/videos";
import VideosClient from "./VideosClient";

export default async function VideosSection() {
  // Home page shows the three newest; the full list lives on /videos.
  const videos = (await getVideos()).slice(0, 3);
  return <VideosClient videos={videos} />;
}
