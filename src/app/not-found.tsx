import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
      <p className="mb-8 text-lg text-cream/70">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="btn-rust">
        Go Home
      </Link>
    </main>
  );
}
