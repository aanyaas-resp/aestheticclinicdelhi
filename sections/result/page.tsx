"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RealResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        // Image reveals with a clip-path wipe, left to right — echoes the
        // "before → after" reveal concept instead of a generic fade.
        tl.fromTo(
          imageWrapRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut" },
          0
        )
          .fromTo(dividerRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.7)
          .fromTo(
            dotRef.current,
            { autoAlpha: 0, scale: 0 },
            { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
            0.85
          )
          .fromTo(labelsRef.current, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.9)
          .fromTo(eyebrowRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.15)
          .fromTo(headingRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.25)
          .fromTo(
            paraRefs.current,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 },
            0.4
          )
          .fromTo(ctaRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.65);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="results"
      aria-labelledby="results-heading"
      className="relative overflow-hidden bg-cream-text px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,173,119,0.14),transparent_65%)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Before / After image */}
        <div className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <div
            ref={imageWrapRef}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] shadow-[0_16px_48px_rgba(30,58,52,0.18)] ring-1 ring-inset ring-gold-soft/20 sm:rounded-[28px]"
          >
            {/*
              TODO: replace with a real before/after composite —
              "before" half on the left, "after" half on the right —
              so the center divider lines up visually. e.g. "/results/patient-01.jpg"
            */}
            <Image
              src="/result.png"
              alt="Before and after skin treatment results at Aesthetic Clinic, Rajouri Garden, Delhi"
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 45vw"
              className="object-cover"
              loading="lazy"
            />

            <div
              ref={dividerRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cream-text/70 to-transparent"
            />
            <div
              ref={dotRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream-text/80 bg-teal-darker/20 backdrop-blur-sm"
            />
          </div>

          <div ref={labelsRef} className="mt-4 flex items-center justify-between px-1">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-teal-darker/70">
              Before
            </span>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-teal-darker/70">
              After
            </span>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p ref={eyebrowRef} className="eyebrow mb-4 text-teal-darker/70">
            Real Results
          </p>
          <h2
            ref={headingRef}
            id="results-heading"
            className="font-display text-[2rem] font-semibold leading-tight text-teal-darker sm:text-4xl lg:text-5xl"
          >
            Erase the Past, Reveal the Future:{" "}
            <span className="accent-italic">The Ultimate Skin Renaissance</span>
          </h2>

          <p
            ref={(el) => {
              paraRefs.current[0] = el;
            }}
            className="mt-6 font-sans text-base leading-relaxed text-teal-darker/75 sm:text-lg"
          >
            Real patients, real transformations. At Aesthetic Clinic, our
            treatments are led by dermatologist-guided protocols — from
            chemical peels to microneedling and collagen induction — each
            plan built around your skin&apos;s specific needs.
          </p>
          <p
            ref={(el) => {
              paraRefs.current[1] = el;
            }}
            className="mt-4 font-sans text-base leading-relaxed text-teal-darker/75 sm:text-lg"
          >
            Witness the transformation from pitted, dull texture to the
            coveted <span className="font-semibold">Glass Skin</span> finish.
            Our bespoke treatments are designed for Indian skin, ensuring
            safe, lasting correction of scars, pores, and pigmentation.
          </p>

          <a
            ref={ctaRef}
            href="#contact"
            className="btn-pill btn-pill-solid group mt-9 inline-flex w-full items-center justify-center transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] sm:w-auto"
          >
            Claim Your Skin Analysis
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </section>
  );
}