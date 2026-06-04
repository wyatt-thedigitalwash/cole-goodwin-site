import type { Metadata } from "next";
import TourPageClient from "@/components/TourPageClient";

export const metadata: Metadata = {
  title: "Tour - Cole Goodwin",
  description:
    "Cole Goodwin upcoming tour dates and tickets. Catch him live on the road.",
};

export default function Tour() {
  return <TourPageClient />;
}
