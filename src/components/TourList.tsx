import type { BandsintownEvent } from "@/lib/bandsintown";
import TourRow from "@/components/TourRow";

const BANDSINTOWN_URL =
  "https://www.bandsintown.com/a/15558214?app_id=umg_bigmachinelabelgroup_colegoodwin";

export default function TourList({
  events,
  theme,
  layout = "wide",
}: {
  events: BandsintownEvent[];
  theme: "light" | "dark";
  layout?: "wide" | "narrow";
}) {
  if (events.length === 0) {
    const textColor = theme === "light" ? "text-brown/70" : "text-cream/70";
    return (
      <p className={`text-center ${textColor}`}>
        More dates coming soon.{" "}
        <a
          href={BANDSINTOWN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="!text-rust underline"
        >
          Follow Cole on Bandsintown
        </a>{" "}
        for updates.
      </p>
    );
  }

  return (
    <div role="list" aria-label="Tour dates">
      {events.map((event, i) => (
        <div role="listitem" key={event.id}>
          <TourRow event={event} theme={theme} layout={layout} isLast={i === events.length - 1} />
        </div>
      ))}
    </div>
  );
}
