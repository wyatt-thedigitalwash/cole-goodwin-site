import Image from "next/image";
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
      <div className="relative bg-brown">
        {/* Background texture for Hero only */}
        <Image
          src="/backgrounds/HowdyBackground_Landscape.jpg"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover opacity-35 md:block"
          priority
        />
        <Image
          src="/backgrounds/HowdyBackground_Portrait.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35 md:hidden"
          priority
        />
        <div className="relative z-10">
          <Hero />
        </div>
      </div>
      <VideoBanner />
      <EPSection />
      <TourSection events={events} />
      <VideosSection />
      <AboutSection />
      <EmailListSection />
    </main>
  );
}
