"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Images, ZoomIn } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type GalleryItem = {
  slug: string;
  image: string;
  caption: string;
};

const GALLERY: GalleryItem[] = [
  {
    slug: "waiting-lounge",
    image: "/gallery/galary-1-compressed.jpg",
    caption: "A comfortable waiting lounge designed for calm and comfort, right before your appointment begins.",
  },
  {
    slug: "treatment-room",
    image: "/gallery/galary-2-compressed.jpg",
    caption: "Aesthetic Clinic provides a modern, welcoming space for every skin, hair and wellness treatment.",
  },
  {
    slug: "clinic-interior",
    image: "/gallery/galary-3-compressed.jpg",
    caption: "We offer the perfect blend of clinical precision and care — expert diagnosis to advanced treatment — for the best result.",
  },
  {
    slug: "reception-desk",
    image: "/gallery/galary-4-compressed.jpg",
    caption: "Welcome to Aesthetic Clinic — visit our reception in Rajouri Garden to book your next appointment.",
  },
];

const INITIAL_VISIBLE = 6;

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const animatedCount = useRef(0);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + GALLERY.length) % GALLERY.length));
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY.length));
  }, []);

  // Heading + initial grid — reveal on scroll
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          headingWrapRef.current,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Card entrance — runs for newly-added cards only (so "View More" also
  // animates in, instead of just popping the new row into place).
  useEffect(() => {
    const cards = cardRefs.current.slice(animatedCount.current, visibleCount).filter(Boolean) as HTMLButtonElement[];
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 28, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
          }
        );
      }, sectionRef);
      return () => ctx.revert();
    });

    animatedCount.current = visibleCount;
    return () => mm.revert();
  }, [visibleCount]);

  // Lightbox: escape/arrow keys, scroll lock, and a basic focus trap
  useEffect(() => {
    if (lightboxIndex === null) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      previousFocusRef.current?.focus();
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const visibleItems = GALLERY.slice(0, visibleCount);
  const hasMore = visibleCount < GALLERY.length;

  return (
    <section ref={sectionRef} id="gallery" className="bg-cream-text px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div ref={headingWrapRef} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">A Look Inside</p>
          <h2 className="font-display text-3xl font-semibold leading-snug text-teal-darker sm:text-4xl lg:text-5xl">
            Our <span className="accent-italic">Gallery</span>
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-teal-darker/70">
            A glimpse into our clinic — modern amenities, a calm setting, and the space where every treatment comes to life.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((item, index) => (
            <button
              key={item.slug}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl text-left shadow-[0_10px_30px_-6px_rgba(9,88,92,0.20)] outline-none transition-shadow duration-500 hover:shadow-[0_20px_45px_-10px_rgba(9,88,92,0.4)] focus-visible:ring-4 focus-visible:ring-gold-soft/40"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 1024px) 90vw, 32vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-deep-teal/70 via-deep-teal/5 to-transparent" />

              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-deep-teal shadow-sm backdrop-blur-sm">
                <ZoomIn className="h-4 w-4" strokeWidth={1.75} />
              </span>

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-deep-teal/95 via-deep-teal/50 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-sans text-sm font-medium leading-relaxed text-white line-clamp-4">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => Math.min(count + INITIAL_VISIBLE, GALLERY.length))}
              className="btn-pill group bg-deep-teal text-white shadow-md shadow-deep-teal/30 transition-transform duration-300 hover:scale-[1.04] hover:bg-deep-teal/90 active:scale-[0.98]"
            >
              <Images className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" strokeWidth={1.75} />
              View More Photos
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery viewer"
          tabIndex={-1}
          ref={dialogRef}
          className="lightbox-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-deep-teal/95 px-4 backdrop-blur-sm outline-none"
          onClick={closeLightbox}
        >
          <p className="absolute left-1/2 top-5 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.14em] text-cream-text/60">
            {lightboxIndex + 1} / {GALLERY.length}
          </p>

          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close gallery"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cream-text transition-colors duration-200 hover:border-gold-soft hover:text-gold-soft"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-cream-text transition-colors duration-200 hover:border-gold-soft hover:text-gold-soft sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>

          <div className="flex w-full max-w-3xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div key={lightboxIndex} className="lightbox-image relative aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-inset ring-gold-soft/20">
              <Image src={GALLERY[lightboxIndex].image} alt={GALLERY[lightboxIndex].caption} fill className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-deep-teal/90 via-transparent to-transparent" />
              <p className="absolute inset-x-6 bottom-6 font-sans text-sm font-medium leading-relaxed text-cream-text sm:text-base">{GALLERY[lightboxIndex].caption}</p>
            </div>

            {GALLERY.length > 1 && (
              <div className="mt-5 flex items-center gap-2">
                {GALLERY.map((item, i) => (
                  <button
                    key={item.slug}
                    type="button"
                    aria-label={`Go to photo ${i + 1}`}
                    onClick={() => setLightboxIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === lightboxIndex ? "w-6 bg-gold-soft" : "w-1.5 bg-cream-text/30 hover:bg-cream-text/50"}`}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-cream-text transition-colors duration-200 hover:border-gold-soft hover:text-gold-soft sm:right-6"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes galleryBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        .lightbox-backdrop { animation: galleryBackdropIn 0.25s ease-out forwards; }
        @keyframes galleryImageIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        .lightbox-image { animation: galleryImageIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .lightbox-backdrop, .lightbox-image { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}