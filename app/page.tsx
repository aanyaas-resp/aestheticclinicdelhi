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

      <div id="services">
        <Services />
      </div>

      <div id="about">
        <About />
      </div>

      {/* RealResults already renders <section id="results"> internally */}
      <RealResults />

      <div id="journey">
        <JourneySection />
      </div>

      {/* Gallery already renders <section id="gallery"> internally */}
      <Gallery />

      <div id="all-results">
        <ResultsPage instagramUrl={INSTAGRAM_URL} />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <div id="faq">
        <FAQPage />
      </div>
    </main>
  );
}