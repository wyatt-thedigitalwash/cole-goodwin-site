import type { Metadata } from "next";
import FollowPageClient from "@/components/FollowPageClient";

export const metadata: Metadata = {
  title: "Follow Along - Cole Goodwin",
  description:
    "Follow Cole Goodwin on social media and streaming platforms. Sign up for email updates.",
};

export default function Follow() {
  return <FollowPageClient />;
}
