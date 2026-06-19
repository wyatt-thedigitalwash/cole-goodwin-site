import type { BandsintownEvent } from "@/lib/bandsintown";
import TourList from "@/components/TourList";

const centeredHeadline: React.CSSProperties = {
  transformOrigin: "center center",
};

export default function TourSection({ events }: { events: BandsintownEvent[] }) {
  return (
    <section
      id="tour"
      className="bg-cream px-5 py-28 text-brown md:px-8 md:py-36"
      data-bg="cream"
      aria-label="Tour dates"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-center md:mb-20">
          <h2 className="text-brown" style={centeredHeadline}>
            Tour
          </h2>
        </div>

        <TourList events={events} theme="light" layout="wide" />
      </div>
    </section>
  );
}
