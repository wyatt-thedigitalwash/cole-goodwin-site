import type { Metadata } from "next";
import Link from "next/link";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center bg-brown px-5 text-center"
    >
      <h1 className="mb-4" style={centeredHeadline}>
        Page Not Found
      </h1>
      <p className="mb-8 text-lg text-cream/70">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="btn-listen px-10 py-3.5">
        Go Home
      </Link>
    </main>
  );
}
