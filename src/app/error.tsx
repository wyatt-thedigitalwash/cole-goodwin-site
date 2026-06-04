"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
      <p className="mb-8 text-lg text-cream/70">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-4">
        <button onClick={reset} className="btn-rust">
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-[3px] border border-cream px-6 py-2.5 uppercase tracking-wider text-cream transition-colors hover:bg-cream/10"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
