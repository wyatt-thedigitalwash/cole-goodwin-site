import Hero from "@/components/Hero";
import EPSection from "@/components/EPSection";
import VideoBanner from "@/components/VideoBanner";
import TourSection from "@/components/TourSection";
import AboutSection from "@/components/AboutSection";
import VideosSection from "@/components/VideosSection";
import EmailListSection from "@/components/EmailListSection";
import { getTourEvents } from "@/lib/bandsintown";

export default async function Home() {
  const events = await getTourEvents();

  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <VideoBanner />
      <EPSection />
      <TourSection events={events} />
      <VideosSection />
      <AboutSection />
      <EmailListSection />
    </main>
  );
}
