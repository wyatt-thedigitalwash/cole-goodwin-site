import type { ReactNode } from "react";

// Client-requested: every legal page renders on a cream background with brown
// text (the default site palette is a brown surface, which is hard to read for
// long-form legal copy). This wrapper paints the ENTIRE legal viewport cream
// (min-h-screen, so short pages like the hub have no brown gap below the
// content), sets brown as the default text color, and carries the `cg-legal`
// class so links keep the site's rust accent and headings resolve to brown.
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="cg-legal min-h-screen bg-[#F9F0E3] text-[#493629]">
      {children}
    </div>
  );
}
