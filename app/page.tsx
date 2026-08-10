import FloatingContactButtons from "@/components/FloatingContactButtons";
import About from "@/sections/about/page";
import Contact from "@/sections/contact/page";
import FAQPage from "@/sections/faq/page";
import Gallery from "@/sections/galary/page";
import Hero from "@/sections/hero/page";
import JourneySection from "@/sections/journey/page";
import RealResults from "@/sections/result/page";
import ResultsPage from "@/sections/results/page";
import Services from "@/sections/services/page";

const INSTAGRAM_URL = "https://www.instagram.com/thesquare.salon/";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <RealResults />
      <JourneySection />
      <Gallery />
      <ResultsPage instagramUrl={INSTAGRAM_URL} />
      <Contact />
      <FAQPage />
    </main>
  );
}