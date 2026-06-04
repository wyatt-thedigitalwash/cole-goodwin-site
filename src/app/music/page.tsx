import type { Metadata } from "next";
import MusicPage from "@/components/MusicPage";

export const metadata: Metadata = {
  title: "Music - Cole Goodwin",
  description:
    "Listen to Cole Goodwin, including the new EP Howdy and his catalog of singles.",
};

export default function Music() {
  return <MusicPage />;
}
