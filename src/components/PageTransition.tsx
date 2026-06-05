"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    // If the URL has a hash, let the browser scroll to the anchor
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
        return;
      }
    }

    // Otherwise jump to top
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return <>{children}</>;
}
