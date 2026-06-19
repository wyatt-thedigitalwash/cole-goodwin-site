import type { BandsintownEvent } from "@/lib/bandsintown";

function formatDate(datetime: string) {
  const d = new Date(datetime);
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(d).toUpperCase();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d).toUpperCase();
  const day = d.getDate();
  return `${weekday}, ${month} ${day}`;
}

function formatLocation(venue: BandsintownEvent["venue"]) {
  const { city, region } = venue;
  return region ? `${city}, ${region}` : city;
}

export default function TourRow({
  event,
  theme,
  layout,
  isLast,
}: {
  event: BandsintownEvent;
  theme: "light" | "dark";
  layout: "wide" | "narrow";
  isLast: boolean;
}) {
  const date = formatDate(event.datetime);
  const location = formatLocation(event.venue);
  const ticket = event.offers.find((o) => o.type === "Tickets" && o.status === "available");
  const primaryUrl = ticket?.url ?? event.url;
  const primaryLabel = ticket ? "Tickets" : "Notify Me";

  const textColor = theme === "light" ? "text-brown" : "text-cream";
  const dividerColor =
    theme === "light" ? "border-brown/20" : "border-cream/20";

  const venueLabel = `${event.venue.name} on ${date}`;

  const rsvpClass = `inline-flex min-w-[120px] items-center justify-center rounded px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors duration-150 ${
    theme === "light"
      ? "border border-brown text-brown hover:bg-brown/10"
      : "border border-cream !text-cream hover:bg-cream/10"
  }`;

  const primaryClass =
    "inline-flex min-w-[120px] items-center justify-center rounded border border-rust bg-rust px-5 py-2 text-sm font-bold uppercase tracking-wide !text-cream transition-opacity duration-150 hover:opacity-85";

  return (
    <article className={`${!isLast ? `border-b ${dividerColor}` : ""}`}>
      {/* Desktop — wide */}
      {layout === "wide" && (
        <div className="hidden items-center gap-6 py-5 md:flex">
          <span
            className="w-[160px] shrink-0 font-headline text-lg uppercase tracking-wide text-rust"
            style={{ transformOrigin: "left center" }}
          >
            {date}
          </span>
          <span
            className={`min-w-0 shrink text-lg font-bold uppercase tracking-wide truncate ${textColor}`}
            style={{ transformOrigin: "left center" }}
          >
            {event.venue.name}
          </span>
          <span className="flex-grow" />
          <span className={`shrink-0 text-sm ${textColor}`}>{location}</span>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`RSVP to Cole Goodwin at ${venueLabel}`}
            className={`shrink-0 ${rsvpClass}`}
          >
            RSVP
          </a>
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${primaryLabel === "Tickets" ? "Buy tickets for" : "Get notified about"} Cole Goodwin at ${venueLabel}`}
            className={`shrink-0 ${primaryClass}`}
          >
            {primaryLabel}
          </a>
        </div>
      )}

      {/* Desktop — narrow */}
      {layout === "narrow" && (
        <div className="hidden items-center gap-6 py-5 md:flex">
          <span
            className="w-[120px] shrink-0 font-headline text-lg uppercase tracking-wide text-rust"
            style={{ transformOrigin: "left center" }}
          >
            {date}
          </span>
          <div className="min-w-0 flex-1">
            <span
              className={`block text-lg font-bold uppercase tracking-wide ${textColor} line-clamp-2`}
            >
              {event.venue.name}
            </span>
            <span className={`mt-1 block text-sm ${textColor}`}>
              {location}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`RSVP to Cole Goodwin at ${venueLabel}`}
              className={rsvpClass}
            >
              RSVP
            </a>
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${primaryLabel === "Tickets" ? "Buy tickets for" : "Get notified about"} Cole Goodwin at ${venueLabel}`}
              className={primaryClass}
            >
              {primaryLabel}
            </a>
          </div>
        </div>
      )}

      {/* Mobile */}
      <div className="flex flex-col gap-1 py-5 md:hidden">
        <span
          className={`font-headline text-base uppercase tracking-wide ${textColor}`}
          style={{ transformOrigin: "left center" }}
        >
          {date}
        </span>
        <span
          className={`text-base font-bold uppercase tracking-wide ${textColor}`}
          style={{ transformOrigin: "left center" }}
        >
          {event.venue.name}
        </span>
        <span className={`text-sm ${textColor}`}>{location}</span>
        <div className="mt-3 flex gap-3">
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`RSVP to Cole Goodwin at ${venueLabel}`}
            className={`flex-1 ${rsvpClass}`}
          >
            RSVP
          </a>
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${primaryLabel === "Tickets" ? "Buy tickets for" : "Get notified about"} Cole Goodwin at ${venueLabel}`}
            className={`flex-1 ${primaryClass}`}
          >
            {primaryLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
