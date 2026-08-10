import About from "@/sections/about/page";
import Contact from "@/sections/contact/page";
import FAQPage from "@/sections/faq/page";
import Gallery from "@/sections/galary/page";
import Hero from "@/sections/hero/page";
import JourneySection from "@/sections/journey/page";
import RealResults from "@/sections/result/page";
import ResultsPage from "@/sections/results/page";
import Services from "@/sections/services/page";

const INSTAGRAM_URL = "https://www.instagram.com/thesquareaesthetics/";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      {/* NOTE: RealResults (from /sections/result) and ResultsPage (from
          /sections/results) both render a results section back-to-back.
          Check if this is intentional (e.g. one is a preview strip, one is
          the full gallery) or a leftover duplicate — if it's a duplicate,
          remove one of these two lines. */}
      <RealResults />
      <JourneySection />
      <Gallery />
      <ResultsPage instagramUrl={INSTAGRAM_URL} />
      <Contact />
      <FAQPage />
    </main>
  );
}