// sections/services/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import BookingModal from "../../components/BookingModal";

type Treatment = {
  slug: string;
  label: string;
  title: string;
  tagline: string;
  description: string;
  price?: string;
  image: string;
};

type Category = {
  id: string;
  tabLabel: string;
  eyebrow: string;
  heading: string;
  accent: "gold" | "teal" | "deep";
  subheading: string;
  items: Treatment[];
};

const ACCENT_CLASSES: Record<Category["accent"], { tag: string; ring: string }> = {
  gold: { tag: "text-gold-soft", ring: "focus-visible:ring-gold-soft" },
  teal: { tag: "text-teal-dark", ring: "focus-visible:ring-teal-dark" },
  deep: { tag: "text-gold-soft", ring: "focus-visible:ring-deep-teal" },
};

const CATEGORIES: Category[] = [
  {
    id: "lhr",
    tabLabel: "Laser Hair Reduction",
    eyebrow: "Our Treatments",
    heading: "Laser Hair Reduction Treatments",
    accent: "gold",
    subheading:
      "USA FDA-approved laser hair reduction for every area of the body — hover or tap a card for details.",
    items: [
      { slug: "upper-lips", image: "/services/upperlips-compressed.jpg", label: "UPPER LIPS", title: "Upperlips LHR Treatment", price: "999", tagline: "SMOOTH SKIN", description: "A gentle, pain-free laser session for the upper lip using FDA-cleared technology — noticeably smoother skin within just a few visits." },
      { slug: "chin-sidelocks", image: "/services/chin-compressed.jpg", label: "CHIN / SIDELOCKS", title: "Chin / Sidelocks LHR Treatment", price: "2500", tagline: "SMOOTH SKIN", description: "Focused laser sessions for the chin and sidelocks area that thin out hair growth over time with very little discomfort." },
      { slug: "full-face", image: "/services/fullface-compressed.jpg", label: "FULL FACE", title: "Face LHR Treatment", price: "2999", tagline: "SMOOTH SKIN", description: "Full-face laser hair reduction designed to keep skin consistently smooth and even-toned, session after session." },
      { slug: "underarms", image: "/services/underarms-compressed.jpg", label: "UNDERARMS", title: "Underarms LHR Treatment", price: "2999", tagline: "SMOOTH SKIN", description: "Quick underarm sessions built for busy schedules, with lasting hair reduction and zero downtime." },
      { slug: "full-arms", image: "/services/fullarms-compressed.jpg", label: "FULL ARMS", title: "Full Arms LHR Treatment", price: "7999", tagline: "SMOOTH SKIN", description: "A complete arm treatment plan adjusted to your skin tone and hair texture for even, lasting results." },
      { slug: "full-legs", image: "/services/fulllegs-compressed.jpg", label: "FULL LEGS", title: "Full Legs LHR Treatment", price: "7999", tagline: "SMOOTH SKIN", description: "Full-leg laser sessions that leave skin silky and hair-free, with results that build session over session." },
      { slug: "half-body", image: "/services/halfbody-compressed.jpg", label: "HALF BODY", title: "Half Body LHR Treatment", price: "5999", tagline: "SMOOTH SKIN", description: "A bundled package across key areas — an efficient, wallet-friendly way to start your laser hair reduction journey." },
      { slug: "full-body", image: "/services/fullbody-compressed.jpg", label: "FULL BODY", title: "Full Body LHR Treatment", price: "8999", tagline: "SMOOTH SKIN", description: "Our most complete plan — full-body laser hair reduction for lasting, all-over smoothness." },
    ],
  },
  {
    id: "skin",
    tabLabel: "Skin Aesthetics",
    eyebrow: "Clinical Expertise",
    heading: "Skin Aesthetics",
    accent: "gold",
    subheading:
      "Dermatology-led rejuvenation for acne, pigmentation, tone and texture — precision care suited to Indian skin.",
    items: [
      { slug: "acne-scars", image: "/services/acne-compressed.jpg", label: "ACNE & ACNE SCARS", title: "Acne & Acne Scars", tagline: "CLEAR SKIN", description: "CO2 laser resurfacing paired with medical peels to settle active breakouts and soften deep scarring over time." },
      { slug: "anti-aging", image: "/services/antiaging-compressed.jpg", label: "ANTI-AGING", title: "Anti-Aging", tagline: "FACIAL CONTOURING", description: "Non-surgical HIFU and thread-based lifting to firm the skin, ease fine lines and bring back facial definition." },
      { slug: "skin-whitening", image: "/services/skin-whitening-compressed.jpg", label: "SKIN WHITENING", title: "Skin Whitening & Glow", tagline: "VITAMIN INFUSION", description: "Medical-grade brightening infusions and toning sessions, supervised by experts, for a more even and radiant complexion." },
      { slug: "pigmentation", image: "/services/pigmentation-compressed.jpg", label: "PIGMENTATION", title: "Pigmentation & Melasma", tagline: "EVEN TONE", description: "Precision laser therapy and custom peels aimed at fading stubborn dark spots and melasma for a more balanced tone." },
      { slug: "korean-glass-skin", image: "/services/koreanglass-compressed.jpg", label: "KOREAN GLASS SKIN", title: "Korean Glass Skin", tagline: "DEWY GLOW", description: "Deep-hydration facials and collagen-focused protocols that build toward that signature dewy, mirror-like finish." },
      { slug: "hydrafacial", image: "/services/hydrafacial-compressed.jpg", label: "HYDRAFACIAL", title: "HydraFacial", tagline: "DEEP CLEANSE", description: "A three-step medical-grade facial that clears out impurities and locks in hydration for instantly brighter skin." },
      { slug: "open-pores", image: "/services/open-poars-compressed.jpg", label: "OPEN PORES", title: "Open Pores", tagline: "RESURFACING", description: "Microneedling combined with resurfacing peels to refine texture and visibly tighten enlarged pores." },
    ],
  },
  {
    id: "hair",
    tabLabel: "Hair Restoration",
    eyebrow: "Clinical Expertise",
    heading: "Hair Restoration",
    accent: "teal",
    subheading:
      "Clinical scalp and hair therapies built to stop shedding, encourage regrowth and bring back density and shine.",
    items: [
      { slug: "hairfall-treatment", image: "/services/hairfalltreatment-compressed.jpg", label: "HAIRFALL TREATMENT", title: "Hairfall Treatment", tagline: "STOP LOSS", description: "We diagnose the root cause first, then build a medical plan to slow shedding and rebuild density from the scalp up." },
      { slug: "prp-therapy", image: "/services/prptheropy-compressed.jpg", label: "PRP THERAPY", title: "PRP Therapy", tagline: "REGROWTH", description: "Platelet-rich plasma sessions that put your own growth factors to work on thinning areas and early hair loss." },
      { slug: "regrowth-gfc", image: "/services/regrowth-compressed.jpg", label: "REGROWTH & GFC", title: "Regrowth & GFC", tagline: "FOLLICLE STIMULATION", description: "Growth Factor Concentrate sessions that stir dormant follicles back to life and visibly thicken hair over a course of treatments." },
      { slug: "dandruff-control", image: "/services/dandruff-compressed.jpg", label: "DANDRUFF CONTROL", title: "Dandruff Control", tagline: "SCALP HEALTH", description: "A medical-grade scalp reset that calms itching, clears flaking and restores a genuinely healthy scalp." },
      { slug: "strengthening", image: "/services/strengthening-compressed.jpg", label: "STRENGTHENING", title: "Strengthening", tagline: "SPA THERAPY", description: "Deep-conditioning spa sessions that repair dry, brittle strands and bring back natural shine." },
    ],
  },
  {
    id: "body",
    tabLabel: "Body Lab",
    eyebrow: "Clinical Expertise",
    heading: "Body Lab",
    accent: "deep",
    subheading:
      "Non-surgical contouring, fat reduction and medically guided wellness plans built for results that last.",
    items: [
      { slug: "exilis", image: "/services/exilis-compressed.jpg", label: "EXILIS", title: "Exilis", tagline: "SKIN TIGHTENING", description: "Radiofrequency energy that firms skin and softens stubborn fat pockets by triggering fresh collagen production." },
      { slug: "cryolipolysis", image: "/services/cryolipolysis-compressed.jpg", label: "CRYOLIPOLYSIS", title: "Cryolipolysis", tagline: "FAT FREEZING", description: "Controlled cooling that targets stubborn fat cells directly for lasting inch loss — no surgery involved." },
      { slug: "lypolysis", image: "/services/lypolysis-compressed.jpg", label: "LYPOLYSIS", title: "Lypolysis", tagline: "FAT REDUCTION", description: "Localised fat-reduction sessions for the chin, arms, tummy and thighs, tailored around your goals." },
      { slug: "hifu", image: "/services/hifu-compressed.jpg", label: "HIFU", title: "HIFU", tagline: "NON-SURGICAL LIFT", description: "High-intensity focused ultrasound that lifts and firms by triggering deep collagen renewal, with no downtime." },
      { slug: "medical-weight-loss", image: "/services/medicalweightloss-compressed.jpg", label: "MEDICAL WEIGHT LOSS", title: "Medical Weight Loss", tagline: "DOCTOR SUPERVISED", description: "A physician-led evaluation paired with a diet and treatment plan built around safe, sustainable results." },
      { slug: "iv-drips", image: "/services/ivdrips-compressed.jpg", label: "IV DRIPS", title: "IV Drips", tagline: "VITAMIN INFUSION", description: "Medically supervised nutrient infusions that support energy levels, immunity and hydration." },
      { slug: "nutrition-diet", image: "/services/nutritions-compressed.jpg", label: "NUTRITION & DIET", title: "Nutrition & Diet", tagline: "CUSTOM PLANS", description: "Personalised nutrition guidance that supports your weight goals, skin health and long-term wellbeing." },
    ],
  },
];

// Flattened once, at module scope — used for the crawler-visible summary
// and JSON-LD below, so it isn't rebuilt on every render.
const ALL_TREATMENTS = CATEGORIES.flatMap((c) => c.items.map((t) => ({ ...t, category: c.tabLabel })));

const SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: ALL_TREATMENTS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "MedicalProcedure",
      name: t.title,
      description: t.description,
      category: t.category,
    },
  })),
};

function useActiveOnCenter<T extends HTMLElement>(count: number) {
  const refs = useRef<(T | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const els = refs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = els.indexOf(entry.target as T);
          if (idx === -1) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveIndex(idx);
          }
        });
      },
      { threshold: [0.6], rootMargin: "0px" }
    );
    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { refs, activeIndex };
}

function TreatmentRow({
  items,
  accent,
  onBook,
}: {
  items: Treatment[];
  accent: Category["accent"];
  onBook: (title: string) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { refs: activeRefs, activeIndex } = useActiveOnCenter<HTMLDivElement>(items.length);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const accentClasses = ACCENT_CLASSES[accent];

  function setRefs(el: HTMLDivElement | null, i: number) {
    cardRefs.current[i] = el;
    activeRefs.current[i] = el;
  }

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.07 }
      );
    }, rowRef);

    return () => ctx.revert();
  }, [items]);

  function updateScrollButtons() {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateScrollButtons();
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function scrollByCard(direction: "left" | "right") {
    const el = rowRef.current;
    if (!el) return;
    const firstCard = cardRefs.current[0];
    const step = firstCard ? firstCard.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div ref={rowRef} className="services-scroll">
        {items.map((t, i) => (
          <div
            key={t.slug}
            ref={(el) => setRefs(el, i)}
            className={`service-card group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_10px_30px_-6px_rgba(9,88,92,0.25)] transition-shadow duration-500 hover:shadow-[0_20px_45px_-10px_rgba(9,88,92,0.45)] ${
              activeIndex === i ? "is-active" : ""
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={t.image}
                alt={`${t.title} at Aesthetic Clinic, Rajouri Garden, Delhi`}
                fill
                sizes="(max-width: 1024px) 78vw, 25vw"
                className="service-media-img object-cover"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-deep-teal/90 via-deep-teal/20 to-transparent"
            />

            <div className="service-label absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/90">{t.label}</p>
                <p className="text-sm text-white/70">
                  {t.price ? `₹${t.price} onwards` : "Consultation based"}
                </p>
              </div>
            </div>

            <div className="service-overlay absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-deep-teal via-deep-teal/95 to-deep-teal/70 p-6">
              <h3 className="font-display text-xl font-semibold leading-snug text-white">
                {t.title.replace(/ LHR Treatment$/, "")}
              </h3>
              <p className={`mt-1 text-xs font-semibold uppercase tracking-wider ${accentClasses.tag}`}>
                {t.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80 line-clamp-4">{t.description}</p>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onBook(t.title)}
                  className={`rounded-full bg-gold px-4 py-2 text-xs font-semibold text-teal-darker shadow-md shadow-black/20 transition-transform duration-200 hover:scale-[1.04] hover:bg-gold/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${accentClasses.ring}`}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => scrollByCard("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll to previous treatments"
          className="scroll-nav-btn"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard("right")}
          disabled={!canScrollRight}
          aria-label="Scroll to more treatments"
          className="scroll-nav-btn"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | undefined>(undefined);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const headingWrapRef = useRef<HTMLDivElement>(null);

  const current = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0],
    [activeCategory]
  );

  function openBooking(title: string) {
    setPresetService(title);
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (!headingWrapRef.current) return;
    gsap.fromTo(
      headingWrapRef.current,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeCategory]);

  return (
    <section id="services" className="bg-cream-text px-6 py-24 sm:px-10 lg:px-16">
      {/* Structured data — lets search engines see every treatment even
          though the UI only ever renders one category's cards at a time. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />

      <div className="mx-auto max-w-7xl">
        <div ref={headingWrapRef} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">{current.eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold leading-snug text-teal-darker sm:text-4xl lg:text-5xl">
            {current.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="accent-italic">{current.heading.split(" ").slice(-1)}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-teal-darker/70">{current.subheading}</p>
        </div>

        <div
          role="tablist"
          aria-label="Treatment categories"
          className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {CATEGORIES.map((c) => {
            const isActive = c.id === activeCategory;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${c.id}`}
                onClick={() => setActiveCategory(c.id)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 sm:text-sm ${
                  isActive
                    ? "border-deep-teal bg-deep-teal text-white shadow-md shadow-deep-teal/25"
                    : "border-teal-darker/20 bg-transparent text-teal-darker/70 hover:border-deep-teal/40 hover:text-teal-darker"
                }`}
              >
                {c.tabLabel}
              </button>
            );
          })}
        </div>

        <div
          className="mt-14"
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
        >
          <TreatmentRow key={current.id} items={current.items} accent={current.accent} onBook={openBooking} />
        </div>

        {/* Visually hidden, crawler/screen-reader visible list of every
            treatment across all categories — keeps full service coverage
            indexable without disturbing the tabbed UI. */}
        <div className="sr-only">
          <h3>All treatments at Aesthetic Clinic, Rajouri Garden</h3>
          <ul>
            {ALL_TREATMENTS.map((t) => (
              <li key={t.slug}>
                {t.title} ({t.category}): {t.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        presetService={presetService}
        onClose={() => {
          setIsModalOpen(false);
          setPresetService(undefined);
        }}
      />
    </section>
  );
}