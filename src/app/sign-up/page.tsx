import type { Metadata } from "next";
import SignUpPageClient from "@/components/SignUpPageClient";

export const metadata: Metadata = {
  title: "Sign Up - Cole Goodwin",
  description:
    "Sign up for Cole Goodwin's email list. Tour dates, new music, and first dibs on tickets.",
};

export default function SignUp() {
  return <SignUpPageClient />;
}
