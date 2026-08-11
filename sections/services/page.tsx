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
  subheading: string;
  items: Treatment[];
};
const CATEGORIES: Category[] = [
  {
    id: "skin",
    tabLabel: "Skin Aesthetics",
    eyebrow: "Clinical Expertise",
    heading: "Skin Aesthetics",
    subheading:
      "Dermatology-led rejuvenation for texture, tone and skin health — precision care suited to Indian skin.",
    items: [
      // TODO: source link was a Google Photos share page, not a direct image —
      // download the actual photo and save as /services2/dermapen4-compressed.jpg
      { slug: "dermapen-4", image: "/services2/dermapen4-compressed.jpg", label: "DERMAPEN 4", title: "Dermapen 4", tagline: "MICRONEEDLING", description: "Advanced medical microneedling that stimulates collagen production to refine texture, scarring and overall skin quality." },
      { slug: "dermaplaning", image: "/services2/dermaplaning-compressed.jpg", label: "DERMAPLANING", title: "Dermaplaning", tagline: "INSTANT SMOOTHNESS", description: "A gentle exfoliation treatment that sweeps away dead skin and peach fuzz for an immediately smoother, brighter surface." },
      // Merged from separate Tag Removal / Wart Removal cards
      { slug: "tag-wart-removal", image: "/services2/tagremoval-compressed.jpg", label: "TAG & WART REMOVAL", title: "Tag & Wart Removal", tagline: "PRECISION CARE", description: "Safe, precise removal of skin tags and warts using medical-grade techniques, performed under expert supervision with minimal downtime." },
      // TODO: replace with real "before/after" set — the old Dermapen 4 and
      // HIFU cards were sharing the same photo pair
      { slug: "microblading", image: "/services2/microblading-compressed.jpg", label: "MICROBLADING", title: "Microblading", tagline: "DEFINED BROWS", description: "Semi-permanent, hair-stroke brow technique that fills sparse areas and defines shape for natural-looking, low-maintenance brows." },
      { slug: "acne-acne-scar", image: "/services2/acne-compressed.jpg", label: "ACNE & ACNE SCAR", title: "Acne & Acne Scar", tagline: "CLEARER, SMOOTHER SKIN", description: "Targeted clinical protocols that calm active breakouts and resurface acne scarring for a clearer, more even complexion." },
      { slug: "whitening-pigmentation", image: "/services2/skinwhiteningandpigmentation-compressed.jpg", label: "WHITENING & PIGMENTATION", title: "Whitening & Pigmentation", tagline: "EVEN, RADIANT TONE", description: "Medical-grade brightening combined with precision laser and peel therapy to fade pigmentation and even out skin tone." },
      { slug: "korean-glass-skin", image: "/services2/koreanglass-compressed.jpg", label: "KOREAN GLASS SKIN", title: "Korean Glass Skin", tagline: "DEWY, LUMINOUS FINISH", description: "A layered glow-boosting protocol that hydrates, refines pores and evens tone for that signature translucent, glass-like skin." },
      { slug: "open-pores", image: "/services2/open-poars-compressed.jpg", label: "OPEN PORES", title: "Open Pores", tagline: "REFINED TEXTURE", description: "Deep-cleansing and pore-tightening treatments that visibly minimise open pores for a smoother, more refined skin texture." },
      // TODO: source link was a Pinterest pin, not a direct image —
      // download the actual photo and save as /services2/undereye-compressed.jpg
      { slug: "under-eye-treatment", image: "/services2/undereye-compressed.jpg", label: "UNDER EYE TREATMENT", title: "Under-Eye Treatment", tagline: "BRIGHT & REFRESHED", description: "Targeted therapy for dark circles, puffiness and fine lines to refresh and brighten the delicate under-eye area." },
      { slug: "salmon-dna", image: "/services2/salmon-compressed.jpg", label: "SALMON DNA", title: "Salmon DNA", tagline: "SKIN REGENERATION", description: "PDRN-based bio-regeneration therapy that boosts hydration, elasticity and repair for firmer, revitalised skin." },
      // TODO: source link was a Google Photos share page, not a direct image —
      // download the actual photo and save as /services2/hifu-compressed.jpg
      { slug: "hifu", image: "/services2/hifu-compressed.jpg", label: "HIFU", title: "HIFU", tagline: "NON-SURGICAL LIFT", description: "High-intensity focused ultrasound that lifts and firms by triggering deep collagen renewal, with no downtime." },
    ],
  },
  {
    id: "lhr",
    tabLabel: "Laser Hair Reduction",
    eyebrow: "Our Treatments",
    heading: "Laser Hair Reduction Treatments",
    
    subheading:
      "Advanced laser hair reduction treatments for smoother-looking skin across every treatment area.",
    items: [
      {
        slug: "upper-lips",
        image: "/services2/upperlips-compressed.jpg",
        label: "UPPER LIPS",
        title: "Upper Lips LHR Treatment",
        tagline: "SMOOTH SKIN",
        description:
          "Targeted laser hair reduction for the upper lip, designed to reduce unwanted hair and leave the skin feeling smoother.",
      },
      {
        slug: "chin-sidelocks",
        image: "/services2/chin-compressed.jpg",
        label: "CHIN / SIDELOCKS",
        title: "Chin / Sidelocks LHR Treatment",
        tagline: "SMOOTH SKIN",
        description:
          "Targeted laser hair reduction for the chin and sidelocks area, helping reduce unwanted facial hair with minimal discomfort.",
      },
      {
        slug: "full-face",
        image: "/services2/fullface-compressed.jpg",
        label: "FULL FACE",
        title: "Face LHR Treatment",
        tagline: "SMOOTH SKIN",
        description:
          "Comprehensive facial laser hair reduction designed to reduce unwanted hair across the face and maintain a smoother appearance.",
      },
      {
        slug: "underarms",
        image: "/services2/underarms-compressed.jpg",
        label: "UNDERARMS",
        title: "Underarms LHR Treatment",
        tagline: "SMOOTH SKIN",
        description:
          "Quick and targeted laser hair reduction for the underarms, helping reduce unwanted hair over a course of treatments.",
      },
      {
        slug: "full-arms",
        image: "/services2/fullarms-compressed.jpg",
        label: "FULL ARMS",
        title: "Full Arms LHR Treatment",
        tagline: "SMOOTH SKIN",
        description:
          "Full-arm laser hair reduction tailored to the treatment area, helping achieve smoother-looking skin with progressive results.",
      },
      {
        slug: "full-legs",
        image: "/services2/fulllegs-compressed.jpg",
        label: "FULL LEGS",
        title: "Full Legs LHR Treatment",
        tagline: "SMOOTH SKIN",
        description:
          "Laser hair reduction across the full legs to progressively reduce unwanted hair and maintain smoother-looking skin.",
      },
      {
        slug: "half-body",
        image: "/services2/halfbody-compressed.jpg",
        label: "HALF BODY",
        title: "Half Body LHR Treatment",
        tagline: "SMOOTH SKIN",
        description:
          "A convenient combination treatment covering selected body areas for comprehensive and efficient laser hair reduction.",
      },
      {
        slug: "full-body",
        image: "/services2/fullbody-compressed.jpg",
        label: "FULL BODY",
        title: "Full Body LHR Treatment",
        tagline: "SMOOTH SKIN",
        description:
          "A comprehensive full-body laser hair reduction treatment designed to progressively reduce unwanted hair across multiple areas.",
      },
    ],
  },
  {
    id: "anti-ageing",
    tabLabel: "Anti-Ageing",
    eyebrow: "Clinical Expertise",
    heading: "Anti-Ageing",
    subheading:
      "Injectable and regenerative protocols that firm, hydrate and restore facial definition over time.",
    items: [
      { slug: "stunox", image: "/services2/stunox-compressed.jpg", label: "STUNOX", title: "Stunox", tagline: "COLLAGEN RENEWAL", description: "An advanced anti-aging treatment that stimulates collagen renewal to firm the skin and soften visible signs of aging." },
      { slug: "skin-booster", image: "/services2/skinbooster-compressed.jpg", label: "SKIN BOOSTER", title: "Skin Booster", tagline: "DEEP HYDRATION", description: "Injectable hyaluronic acid boosters that hydrate from within for plump, smooth and naturally glowing skin." },
      { slug: "profhilo", image: "/services2/profhilo-compressed.jpg", label: "PROFHILO", title: "Profhilo", tagline: "BIO-REMODELLING", description: "A next-generation bio-remodelling injectable that improves skin laxity, hydration and overall firmness." },
      // TODO: source link was a Pinterest pin, not a direct image —
      // download the actual photo and save as /services2/fillers-compressed.jpg
      { slug: "fillers", image: "/services2/filler-compressed.jpg", label: "FILLERS", title: "Fillers", tagline: "RESTORE VOLUME", description: "Dermal fillers that restore lost volume and soften lines, sculpting natural contours in the cheeks, lips and jawline." },
      // TODO: source link was a Pinterest pin, not a direct image —
      // download the actual photo and save as /services2/threads-compressed.jpg
      { slug: "threads", image: "/services2/threads-compressed.jpg", label: "THREADS", title: "Threads", tagline: "NON-SURGICAL LIFT", description: "Dissolvable thread-lift technique that lifts and tightens sagging skin while stimulating fresh collagen production." },
    ],
  },
  {
    id: "body",
    tabLabel: "Body Lab",
    eyebrow: "Clinical Expertise",
    heading: "Body Lab",
    subheading:
      "Non-surgical contouring and tone-evening treatments for the body, built for results that last.",
    items: [
      { slug: "rf", image: "/services2/rf-compressed.jpg", label: "RF", title: "RF", tagline: "SKIN TIGHTENING", description: "Radiofrequency energy that firms skin and softens stubborn fat pockets by triggering fresh collagen production." },
      { slug: "lipolysis", image: "/services2/lypolysis-compressed.jpg", label: "LIPOLYSIS", title: "Lipolysis", tagline: "FAT REDUCTION", description: "Non-surgical fat-dissolving treatment that targets stubborn pockets for a more contoured body shape." },
      { slug: "body-tan-removal", image: "/services2/bodytan-compressed.jpg", label: "BODY TAN REMOVAL", title: "Body Tan Removal", tagline: "EVEN TONE", description: "Brightening treatments that lift tan lines and uneven tone, restoring a more consistent, radiant skin tone across the body." },
      { slug: "pigmentation-whitening", image: "/services2/pigmentation-compressed.jpg", label: "PIGMENTATION & WHITENING", title: "Pigmentation & Whitening", tagline: "EVEN TONE", description: "Targeted brightening treatments for the body that fade pigmentation and uneven tone for a more radiant finish." },
      { slug: "body-polishing", image: "/services2/bodypolishing-compressed.jpg", label: "BODY POLISHING", title: "Body Polishing", tagline: "SMOOTH & GLOW", description: "Full-body exfoliation and moisturising therapy that buffs away dullness for instantly softer, glowing skin." },
      { slug: "diamond-polishing", image: "/services2/diamond-compressed.jpg", label: "DIAMOND POLISHING", title: "Diamond Polishing", tagline: "RESURFACE & GLOW", description: "Diamond-tip microdermabrasion that buffs away dull, dead skin for an instantly smoother, glowing finish." },
      { slug: "nutrition-diet", image: "/services2/nutritions-compressed.jpg", label: "NUTRITION & DIET", title: "Nutrition & Diet", tagline: "PERSONALISED PLANS", description: "Doctor-guided nutrition and diet planning that supports skin, hair and body goals from the inside out." },
      { slug: "iv-drip", image: "/services2/ivdrips-compressed.jpg", label: "IV DRIP", title: "IV Drip", tagline: "REVITALISE & REPLENISH", description: "Vitamin and nutrient IV therapy that replenishes the body, boosting energy, immunity and skin radiance." },
      { slug: "medical-weight-loss", image: "/services2/medicalweightloss-compressed.jpg", label: "MEDICAL WEIGHT LOSS", title: "Medical Weight Loss", tagline: "DOCTOR-LED PROGRAMS", description: "Physician-supervised weight-loss programs combining clinical assessment, nutrition and treatment for sustainable results." },
    ],
  },
  {
    id: "medifacial",
    tabLabel: "MediFacial",
    eyebrow: "Clinical Expertise",
    heading: "MediFacial",
    subheading:
      "Layered medical-grade facials that cleanse, hydrate and sculpt for a healthy, lasting glow.",
    items: [
      { slug: "hydrafacial", image: "/services2/hydrafacial-compressed.jpg", label: "HYDRAFACIAL", title: "HydraFacial", tagline: "DEEP CLEANSE", description: "A three-step medical-grade facial that clears out impurities and locks in hydration for instantly brighter skin." },
      { slug: "thermal-sculpting-facial", image: "/services2/thermal-compressed.jpg", label: "THERMAL SCULPTING FACIAL", title: "Thermal Sculpting Facial", tagline: "CONTOUR & LIFT", description: "Heat-based contouring therapy that firms facial contours and stimulates collagen for a lifted, sculpted look." },
      // TODO: source link was a Google Photos share page, not a direct image —
      // download the actual photo and save as /services2/fireandice-compressed.jpg
      { slug: "clinical-fire-ice", image: "/services2/fireandice-compressed.jpg", label: "CLINICAL FIRE & ICE", title: "Clinical Fire & Ice", tagline: "RESURFACE & CALM", description: "A dual-action clinical facial that resurfaces with a warming exfoliant, then calms and cools for smooth, refreshed skin." },
      { slug: "obagi", image: "/services2/obagi-compressed.jpg", label: "OBAGI", title: "Obagi", tagline: "MEDICAL SKINCARE", description: "Clinically formulated Obagi protocols that correct tone, texture and signs of aging through guided medical-grade skincare." },
    ],
  },
  {
    id: "hair",
    tabLabel: "Hair Restoration",
    eyebrow: "Clinical Expertise",
    heading: "Hair Restoration",
    subheading:
      "Advanced scalp therapies built to reactivate follicles and support thicker, healthier regrowth.",
    items: [
      { slug: "nano-bubble-hair-wash", image: "/services2/nanobullhair-compressed.jpg", label: "NANO BUBBLE HAIR WASH", title: "Nano Bubble Hair Wash", tagline: "SCALP DETOX", description: "A specialised nano-bubble scalp wash that deep-cleanses buildup and preps the scalp for better treatment absorption." },
      { slug: "exosomes", image: "/services2/exosomes-compressed.jpg", label: "EXOSOMES", title: "Exosomes", tagline: "CELLULAR REGROWTH", description: "Advanced exosome therapy that signals dormant follicles to reactivate, supporting thicker, healthier regrowth." },
      { slug: "prp-therapy", image: "/services2/prptheropy-compressed.jpg", label: "PRP THERAPY", title: "PRP Therapy", tagline: "NATURAL REGROWTH", description: "Platelet-rich plasma therapy that harnesses your own growth factors to stimulate natural, healthier hair regrowth." },
      { slug: "hairfall-treatment", image: "/services2/hairfalltreatment-compressed.jpg", label: "HAIRFALL TREATMENT", title: "Hairfall Treatment", tagline: "REDUCE SHEDDING", description: "A targeted protocol that addresses the root causes of hairfall to reduce shedding and support fuller-looking hair." },
      { slug: "dandruff-control", image: "/services2/dandruff-compressed.jpg", label: "DANDRUFF CONTROL", title: "Dandruff Control", tagline: "CALM, CLEAR SCALP", description: "Medical-grade scalp therapy that targets flaking and irritation for a calmer, healthier scalp." },
      { slug: "hair-strengthening", image: "/services2/strengthening-compressed.jpg", label: "STRENGTHENING", title: "Hair Strengthening", tagline: "FORTIFY FROM ROOT", description: "Nutrient-infused strengthening therapy that fortifies hair from the root, reducing breakage and improving density." },
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
  onBook,
}: {
  items: Treatment[];
  onBook: (title: string) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { refs: activeRefs, activeIndex } = useActiveOnCenter<HTMLDivElement>(items.length);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
            className={`service-card group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_10px_30px_-6px_rgba(94,59,21,0.25)] transition-shadow duration-500 hover:shadow-[0_20px_45px_-10px_rgba(94,59,21,0.45)] ${
              activeIndex === i ? "is-active" : ""
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={t.image}
                alt={`${t.title} at The Square Aesthetics & Wellness Clinic, Rajouri Garden, Delhi`}
                fill
                sizes="(max-width: 1024px) 78vw, 25vw"
                className="service-media-img object-cover"
              />
            </div>

            {/* Resting-state gradient: only strong enough at the very
                bottom to keep the label legible — most of the photo
                stays visible instead of getting washed out. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/75 via-chocolate-deep/10 to-transparent"
            />

            <div className="service-label absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cream/90">{t.label}</p>
               
              </div>
            </div>

            {/* Hover / active overlay: eased back from a near-solid fill
                to a gradient that stays dark where the text sits (bottom
                ~2/3) but lets the top of the photo show through. */}
            <div className="service-overlay absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-chocolate-deep/95 via-chocolate-deep/85 to-chocolate-deep/15 p-6">
              <h3 className="font-display text-xl font-semibold leading-snug text-cream">
                {t.title.replace(/ LHR Treatment$/, "")}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-bronze">
                {t.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/80 line-clamp-4">{t.description}</p>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onBook(t.title)}
                  className="rounded-full bg-bronze px-4 py-2 text-xs font-semibold text-cream shadow-md shadow-chocolate-deep/30 transition-transform duration-200 hover:scale-[1.04] hover:bg-chocolate active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bronze"
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
    <section id="services" className="bg-ivory px-6 py-24 sm:px-10 lg:px-16">
      {/* Structured data — lets search engines see every treatment even
          though the UI only ever renders one category's cards at a time. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />

      <div className="mx-auto max-w-7xl">
        <div ref={headingWrapRef} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 justify-center">{current.eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold leading-snug text-chocolate-deep sm:text-4xl lg:text-5xl">
            {current.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="accent-italic">{current.heading.split(" ").slice(-1)}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-chocolate-deep/70">{current.subheading}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div
            role="tablist"
            aria-label="Treatment categories"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
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
                      ? "border-chocolate bg-chocolate text-cream shadow-md shadow-chocolate/25"
                      : "border-chocolate-deep/20 bg-transparent text-chocolate-deep/70 hover:border-bronze/50 hover:text-chocolate-deep"
                  }`}
                >
                  {c.tabLabel}
                </button>
              );
            })}
          </div>

          
        </div>

        <div
          className="mt-14"
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
        >
          <TreatmentRow key={current.id} items={current.items} onBook={openBooking} />
        </div>

        {/* Visually hidden, crawler/screen-reader visible list of every
            treatment across all categories — keeps full service coverage
            indexable without disturbing the tabbed UI. */}
        <div className="sr-only">
          <h3>All treatments at The Square Aesthetics & Wellness Clinic, Rajouri Garden</h3>
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