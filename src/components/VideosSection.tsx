import { getVideos } from "@/lib/videos";
import VideosClient from "./VideosClient";

export default async function VideosSection() {
  const videos = await getVideos();
  return <VideosClient videos={videos} />;
}
