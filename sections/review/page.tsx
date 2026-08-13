// sections/reviews/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star, Quote } from "lucide-react";
import gsap from "gsap";

// TODO: swap in more/different reviews any time — just edit this array.
// Ratings aren't shown in the text export from Google, so defaulting to 5
// stars for all (all quoted reviews read as clearly positive) — double check
// against the actual star counts on the Maps listing if any should differ.
const REVIEWS = [
  {
    id: "review-1",
    name: "Yashvi",
    rating: 5,
    service: "Manicure, Pedicure & Hair Spa",
    quote:
      "It's always a great experience getting all services here. Shivam does my manicure, pedicure, and hair spa, and the service was excellent from start to finish. He's professional, attentive, and makes sure you're comfortable throughout.",
  },
  {
    id: "review-2",
    name: "Prabhleen Kaur",
    rating: 5,
    service: "Hair Styling",
    quote:
      "Had an amazing experience at Square Salon! The staff was professional, welcoming, and really attentive to what I wanted. My hair service turned out exactly how I imagined — the cut, styling, and overall finish were perfect.",
  },
  {
    id: "review-3",
    name: "Harnoor Kaur",
    rating: 5,
    service: "Waxing & Hair Treatment",
    quote:
      "Best salon in the city. Amazing service. Muskan makes waxing feel painless. Got my hair done too and they did an amazing job tackling my frizz and curls with hair botox treatment.",
  },
  {
    id: "review-4",
    name: "Kanika Rawat",
    rating: 5,
    service: "Bridal Nails",
    quote:
      "Got my bridal nails done by Sanjay. He did such an amazing work. Everyone loved my nails. I would definitely get all my future nails done by him.",
  },
  {
    id: "review-5",
    name: "Zoya Nehra",
    rating: 5,
    service: "Hair Colour",
    quote:
      "Got my hair color done here for the second time and very happy with the results again! The staff is super professional and really takes the time to understand what you want.",
  },
  {
    id: "review-6",
    name: "Pooja Malhotra",
    rating: 5,
    service: "Hair Colour & Makeup",
    quote:
      "Amazing experience at Square Salon. Got hair colour and makeup done by the experienced and friendly staff! Must visit this luxury salon.",
  },
  {
    id: "review-7",
    name: "Priyanka Sobti",
    rating: 5,
    service: "General Services",
    quote:
      "Amazing hospitality, services, and the staff was very helpful and cooperative — highly professional and trained. The salon is very hygienic and they treat clients like guests, not just customers.",
  },
  {
    id: "review-8",
    name: "Mayank Singh",
    rating: 5,
    service: "Hair Styling",
    quote:
      "The service is fantastic! The stylist did an amazing job. The atmosphere is great, the staff is professional, and I couldn't be happier with the results. Highly recommended.",
  },
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/The+Square+Salon+%26+Aesthtics/@28.6401307,77.1188865,15z/data=!4m6!3m5!1s0x390d035c49b138f7:0x19f6fb39c8a9f081!8m2!3d28.6402193!4d77.1188545!16s%2Fg%2F11mm08t12v";

// Small inline "G" mark so we're not pulling in a PNG/logo asset.
function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.9 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6c-2 1.5-4.6 2.4-7.7 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.6 5.6C41.4 35.9 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export default function Reviews() {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (!headingWrapRef.current) return;
    gsap.fromTo(
      headingWrapRef.current,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 }
      );
    }, rowRef);

    return () => ctx.revert();
  }, []);

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
  }, []);

  function scrollByCard(direction: "left" | "right") {
    const el = rowRef.current;
    if (!el) return;
    const firstCard = cardRefs.current[0];
    const step = firstCard ? firstCard.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  }

  return (
    <section id="reviews" className="bg-ivory px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div ref={headingWrapRef} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 justify-center">Google Reviews</p>
          <h2 className="font-display text-3xl font-semibold leading-snug text-chocolate-deep sm:text-4xl lg:text-5xl">
            Aesthetic Reviews on <span className="accent-italic">Google</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-chocolate-deep/70">
            Real feedback from happy clients at The Square Salon & Aesthetics, Rajouri Garden.
          </p>
        </div>

        <div className="relative mt-14">
          <div ref={rowRef} className="services-scroll">
            {REVIEWS.map((r, i) => (
              <div
                key={r.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="service-card flex w-[280px] shrink-0 flex-col justify-between rounded-3xl border border-chocolate-deep/10 bg-white p-6 shadow-[0_10px_30px_-6px_rgba(94,59,21,0.15)] transition-shadow duration-500 hover:shadow-[0_20px_45px_-10px_rgba(94,59,21,0.35)] sm:w-[320px] sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`h-4 w-4 ${
                            starIdx < r.rating
                              ? "fill-bronze text-bronze"
                              : "fill-transparent text-chocolate-deep/20"
                          }`}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <GoogleMark />
                  </div>

                  <Quote
                    className="mt-4 h-6 w-6 text-bronze/40"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="mt-2 text-sm leading-relaxed text-chocolate-deep/80 sm:text-[0.95rem]">
                    {r.quote}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-chocolate-deep/10 pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bronze/10 font-display text-sm font-semibold text-bronze">
                    {r.name.charAt(0)}
                  </div>
                  <div className="leading-tight">
                    <p className="font-display text-sm font-semibold text-chocolate-deep">
                      {r.name}
                    </p>
                    <p className="text-xs text-chocolate-deep/60">{r.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll to previous reviews"
              className="scroll-nav-btn"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              aria-label="Scroll to more reviews"
              className="scroll-nav-btn"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
         <a 
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill group inline-flex items-center gap-2 bg-bronze px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-chocolate-deep/30 transition-transform duration-300 hover:scale-[1.04] hover:bg-chocolate active:scale-[0.98]"
          >
            Read Aesthetic Reviews on Google
            <ExternalLink
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </section>
  );
}