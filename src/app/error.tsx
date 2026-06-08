"use client";

import Link from "next/link";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center bg-brown px-5 text-center"
    >
      <h1 className="mb-4" style={centeredHeadline}>
        Something Went Wrong
      </h1>
      <p className="mb-8 text-lg text-cream/70">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-4">
        <button onClick={reset} className="btn-listen px-8 py-3">
          Try Again
        </button>
        <Link
          href="/"
          className="btn-listen px-8 py-3"
          style={{ backgroundColor: "transparent", border: "2px solid #F9F0E3" }}
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
