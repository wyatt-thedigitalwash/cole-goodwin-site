import type { Metadata } from "next";
import TourPageClient from "@/components/TourPageClient";

export const metadata: Metadata = {
  title: "Tour",
  description:
    "Cole Goodwin upcoming tour dates and tickets. See where he is playing next and get tickets to a show near you.",
  alternates: { canonical: "https://colegoodwinmusic.com/tour" },
  openGraph: {
    title: "Tour | Cole Goodwin",
    description:
      "Cole Goodwin upcoming tour dates and tickets. See where he is playing next and get tickets to a show near you.",
    url: "https://colegoodwinmusic.com/tour",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour | Cole Goodwin",
    description:
      "Cole Goodwin upcoming tour dates and tickets. See where he is playing next and get tickets to a show near you.",
    images: ["/og-image.png"],
  },
};

export default function Tour() {
  return <TourPageClient />;
}
