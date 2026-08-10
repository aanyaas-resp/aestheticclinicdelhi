"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, ShieldCheck, Sparkles, Users, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookingModal from "@/components/BookingModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// TODO: swap for the founder's real credentials/highlights
const HIGHLIGHTS = [
  { icon: ShieldCheck, text: "Years of clinical experience in skin & hair care" },
  { icon: Sparkles, text: "Trained in advanced aesthetic and dermatology techniques" },
  { icon: Users, text: "Personally overseeing every patient's treatment plan" },
];

export default function Founder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLElement>(null);
  const copyColRef = useRef<HTMLDivElement>(null);
  const highlightRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(
          imageColRef.current,
          { autoAlpha: 0, x: -24, scale: 0.98 },
          { autoAlpha: 1, x: 0, scale: 1, duration: 0.8 },
          0
        )
          .fromTo(
            badgeRef.current,
            { autoAlpha: 0, y: 14, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 },
            0.35
          )
          .fromTo(
            copyColRef.current,
            { autoAlpha: 0, x: 24 },
            { autoAlpha: 1, x: 0, duration: 0.8 },
            0.1
          )
          .fromTo(
            highlightRefs.current,
            { autoAlpha: 0, x: 14 },
            { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.11 },
            0.45
          );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founder"
      aria-labelledby="founder-heading"
      className="relative overflow-hidden bg-deep-teal px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(217,173,119,0.18),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Image column */}
          <div ref={imageColRef} className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] shadow-[0_16px_48px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-white/10 sm:rounded-[32px]">
              <Image
                src="/founder.jpg"
                alt="Founder of Aesthetic Clinic, Rajouri Garden, Delhi"
                fill
                sizes="(max-width: 540px) 72vw, (max-width: 1024px) 60vw, 35vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            <address
              ref={badgeRef}
              className="not-italic absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-cream-text px-4 py-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.25)] sm:-bottom-7 sm:-right-7 sm:left-auto sm:px-5 sm:py-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep-teal/8 sm:h-11 sm:w-11">
                <MapPin className="h-4.5 w-4.5 text-gold sm:h-5 sm:w-5" strokeWidth={1.75} />
              </span>
              <div className="leading-tight">
                {/* TODO: replace with founder's name / title */}
                <p className="font-display text-base font-semibold text-teal-darker sm:text-lg">
                  Dr. Pooja Sahni
                </p>
                <p className="font-sans text-xs text-teal-darker/60">Founder & Lead Physician</p>
              </div>
            </address>
          </div>

          {/* Copy column */}
          <div ref={copyColRef} className="mt-4 lg:mt-0">
            <p className="eyebrow mb-4 text-gold-soft [&::before]:bg-gold-soft/50">Meet the Founder</p>
            <h2
              id="founder-heading"
              className="font-display text-[2rem] font-semibold leading-tight text-cream-text sm:text-4xl lg:text-5xl"
            >
              The Vision Behind <span className="font-display italic text-gold-soft">Aesthetic Clinic</span>
            </h2>

            {/* TODO: replace with the founder's real bio */}
            <p className="mt-6 font-sans text-base leading-relaxed text-cream-text/80 sm:text-lg">
              Aesthetic Clinic was founded on a simple belief — that skin and
              hair care deserve the same clinical precision as any other
              branch of medicine. What began as a single vision in Rajouri
              Garden has grown into a trusted destination for patients
              seeking real, doctor-led results.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-cream-text/80 sm:text-lg">
              With a career built on continuous learning and a deep respect
              for patient care, the founder personally shaped the clinic&apos;s
              philosophy — no trends, no shortcuts, just expert care that
              puts your results first.
            </p>

            <ul className="mt-9 space-y-4">
              {HIGHLIGHTS.map(({ icon: Icon, text }, i) => (
                <li
                  key={text}
                  ref={(el) => {
                    highlightRefs.current[i] = el;
                  }}
                  className="group flex items-center gap-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/8 ring-1 ring-inset ring-gold-soft/30 transition-colors duration-300 group-hover:bg-gold-soft">
                    <Icon
                      className="h-4 w-4 text-gold-soft transition-colors duration-300 group-hover:text-teal-darker"
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="font-sans text-sm text-cream-text/85 sm:text-base">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                aria-haspopup="dialog"
                className="btn-pill group w-full justify-center bg-gold-soft text-teal-darker shadow-md shadow-black/20 transition-transform duration-300 hover:scale-[1.04] hover:bg-gold-soft/90 active:scale-[0.98] sm:w-auto"
              >
                Book Your Appointment
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </button>
              
            
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}