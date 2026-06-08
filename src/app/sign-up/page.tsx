import type { Metadata } from "next";
import SignUpPageClient from "@/components/SignUpPageClient";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Sign up for Cole Goodwin's email list. Get tour announcements, new music drops and first access to ticket presales.",
  alternates: { canonical: "https://colegoodwinmusic.com/sign-up" },
  openGraph: {
    title: "Sign Up | Cole Goodwin",
    description:
      "Sign up for Cole Goodwin's email list. Get tour announcements, new music drops and first access to ticket presales.",
    url: "https://colegoodwinmusic.com/sign-up",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | Cole Goodwin",
    description:
      "Sign up for Cole Goodwin's email list. Get tour announcements, new music drops and first access to ticket presales.",
    images: ["/og-image.png"],
  },
};

export default function SignUp() {
  return <SignUpPageClient />;
}
