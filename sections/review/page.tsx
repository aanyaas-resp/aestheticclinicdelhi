// sections/reviews/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import gsap from "gsap";

// TODO: drop your 4 review-card images into /public/reviews/ with these
// filenames (or rename these to match whatever you save them as).
const REVIEWS = [
  { id: "review-1", image: "/reviews/review1.jpg", alt: "Google review for The Square Aesthetics & Wellness Clinic" },
  { id: "review-2", image: "/reviews/review2.jpg", alt: "Google review for The Square Aesthetics & Wellness Clinic" },
  { id: "review-3", image: "/reviews/review3.jpg", alt: "Google review for The Square Aesthetics & Wellness Clinic" },
  { id: "review-4", image: "/reviews/review4.jpg", alt: "Google review for The Square Aesthetics & Wellness Clinic" },
];

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/gm5ACAhHxdnQjrga9";

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
          <p className="eyebrow mb-4 justify-center">Patient Reviews</p>
          <h2 className="font-display text-3xl font-semibold leading-snug text-chocolate-deep sm:text-4xl lg:text-5xl">
            What Our <span className="accent-italic">Patients Say</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-chocolate-deep/70">
            Real reviews from real patients at The Square Aesthetics & Wellness Clinic, Rajouri Garden.
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
                className="service-card relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_10px_30px_-6px_rgba(94,59,21,0.25)] transition-shadow duration-500 hover:shadow-[0_20px_45px_-10px_rgba(94,59,21,0.45)]"
              >
                <Image
                  src={r.image}
                  alt={r.alt}
                  fill
                  sizes="(max-width: 1024px) 82vw, 30vw"
                  className="object-cover"
                />
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
            Show More on Google
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