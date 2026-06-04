import Hero from "@/components/Hero";
import HeroScrollLock from "@/components/HeroScrollLock";
import EPSection from "@/components/EPSection";
import VideoBanner from "@/components/VideoBanner";
import TourSection from "@/components/TourSection";
import AboutSection from "@/components/AboutSection";
import VideosSection from "@/components/VideosSection";
import EmailListSection from "@/components/EmailListSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroScrollLock />
      <Hero />
      <EPSection />
      <VideoBanner />
      <TourSection />
      <VideosSection />
      <AboutSection />
      <EmailListSection />
    </main>
  );
}
