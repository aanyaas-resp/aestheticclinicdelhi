"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Award, Phone, ChevronDown } from "lucide-react";
import gsap from "gsap";

const CLINIC_WHATSAPP = "918057790577"; // TODO: confirm WhatsApp-enabled number

const BADGES = [
  { icon: Star, label: "4.9/5 Google Reviews" },
  { icon: ShieldCheck, label: "70+ Happy Clients" },
  { icon: Award, label: "Trusted in Rajouri Garden" },
];

// Aligned with the real category list in sections/services/page.tsx
const SERVICES = [
  "Laser Hair Reduction",
  "Skin Aesthetics",
  "Hair Restoration",
  "Body Lab",
  "Not sure yet",
];

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const actionsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(bgRef.current, { scale: 1.12 }, { scale: 1, duration: 2.2, ease: "power2.out" }, 0)
        .fromTo(eyebrowRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
        .fromTo(headingRef.current, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.22)
        .fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.4)
        .fromTo(
          badgeRefs.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.09 },
          0.55
        )
        .fromTo(actionsRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.6)
        .fromTo(
          formRef.current,
          { y: 24, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          0.4
        );

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-deep-teal">
      {/* Background image — priority + fetchPriority high since this is the LCP element */}
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src="/herobg2.png"
          alt="Aesthetic Clinic — skin and hair treatment clinic interior in Rajouri Garden, Delhi"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center brightness-[0.5] saturate-[0.85]"
        />
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-deep-teal/92 via-teal-dark/40 to-deep-teal/88" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-[520px] w-[520px] rounded-full bg-gold-soft/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/15 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-6 py-28 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10 lg:px-16">
        <div>
          <p ref={eyebrowRef} className="mb-5 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-gold-soft">
            Aesthetic Clinic — Rajouri Garden
          </p>

          {/* Single H1 on the page — good for SEO */}
          <h1 ref={headingRef} className="font-display text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
            Rajouri Garden&apos;s{" "}
            <span className="bg-[length:200%_auto] bg-gradient-to-r from-gold-soft via-amber-200 to-gold-soft bg-clip-text italic text-transparent animate-text-shimmer">
              Precision
            </span>{" "}
            Skin &amp; Hair Clinic
          </h1>

          <p ref={subRef} className="mt-6 max-w-md font-sans text-base leading-relaxed text-white/85 sm:text-lg">
            At Aesthetic Clinic, we don&apos;t follow trends — we treat with
            clinical precision. Doctor-led skin, hair and body treatments,
            modern technology, and care that puts your results first.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#booking" className="btn-pill-solid">
              Book Consultation
            </a>
            <a
              href="tel:+918057790577"
              className="btn-pill inline-flex items-center gap-2 border-2 border-white/25 text-white hover:border-gold-soft/60 hover:bg-white/5"
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              Call Now
            </a>
          </div>

          <div ref={actionsRef} className="mt-8 flex flex-wrap items-center gap-3">
            {BADGES.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                ref={(el) => {
                  badgeRefs.current[i] = el;
                }}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] text-white/90 backdrop-blur-sm sm:text-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.75} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={formRef} id="booking">
          <ConsultationForm />
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[6] h-32 bg-gradient-to-t from-white/0 to-transparent" />

      <svg aria-hidden="true" className="hero-curve" viewBox="0 0 500 60" preserveAspectRatio="none">
        <path d="M0,25 C125,-5 375,-5 500,25 L500,60 L0,60 Z" fill="currentColor" />
      </svg>

      <style>{`
        @keyframes textShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-text-shimmer { animation: textShimmer 4s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-text-shimmer { animation: none; }
        }
      `}</style>
    </section>
  );
}

function ConsultationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!service) {
      setError("Please select a treatment.");
      return;
    }
    setError("");

    const message = `Hi, I'd like to book a consultation.\n\nName: ${trimmedName}\nPhone: ${trimmedPhone}\nInterested in: ${service}`;
    const url = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setStatus("sent");
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-deep-teal/70 p-7 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-9">
      <h2 className="font-display text-2xl font-semibold text-white">Request Consultation</h2>
      <p className="mt-2 text-sm text-white/70">You&apos;ll be redirected to WhatsApp to confirm.</p>

      {status === "sent" ? (
        <div className="mt-8 rounded-2xl border border-gold-soft/30 bg-gold-soft/10 px-5 py-6 text-center">
          <p className="font-semibold text-white">Thank you! 🎉</p>
          <p className="mt-1 text-sm text-white/75">Continue on WhatsApp — we&apos;ll confirm your slot there.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-gold-soft">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-glass"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-gold-soft">
              Phone
            </label>
            <div className="flex overflow-hidden rounded-xl border border-white/15 bg-white/5 focus-within:ring-2 focus-within:ring-gold-soft">
              <span className="flex items-center border-r border-white/15 px-4 text-sm text-white/70">+91</span>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                required
                placeholder="99999 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-gold-soft">
              Treatment Interest
            </label>
            <div className="relative">
              <select
                id="service"
                name="service"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="input-glass appearance-none pr-10"
              >
                <option value="" disabled className="text-teal-darker">
                  Select Service...
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="text-teal-darker">
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            </div>
          </div>

          {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

          <button type="submit" className="btn-pill-solid w-full justify-center bg-gold text-teal-darker hover:bg-gold/90">
            Send via WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}