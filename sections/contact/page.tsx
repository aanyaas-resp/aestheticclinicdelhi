"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  Send,
  MapPin,
  Clock,
  Navigation,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CLINIC_WHATSAPP = "918057790577"; // TODO: confirm WhatsApp-enabled number
const CLINIC_EMAIL = "info@aestheticclinicrg.in"; // TODO: replace with the real clinic email

const CLINIC_PHONES = [{ display: "080577 90577", tel: "8057790577" }];

const CLINIC_ADDRESSES = [
  {
    label: "Rajouri Garden, Delhi",
    text: "Shop No-2, J12/13, Block J, Rajouri Garden Extension, Rajouri Garden, New Delhi, Delhi 110027",
  },
];

// Official short link — TODO: confirm this Google Maps listing is for
// Aesthetic Clinic and not the previous business at this address.
const CLINIC_MAPS_LINK = "https://maps.app.goo.gl/gm5ACAhHxdnQjrga9";

const GENDERS = ["Male", "Female"];
const DEPARTMENTS = ["Laser Hair Reduction", "Skin Aesthetics", "Hair Restoration", "Body Lab", "Other"];

// TODO: this embed still resolves to the previous business's Google
// listing (place name in the URL) — swap for Aesthetic Clinic's own
// embed once the GMB listing is set up, so the map pin matches the name.
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.615948808627!2d77.1188865!3d28.6401307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d035c49b138f7%3A0x19f6fb39c8a9f081!2sThe%20Square%20Salon!5e0!3m2!1sen!2sin!4v1786298766205!5m2!1sen!2sin";

function directionsUrl(address: string) {
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
}

export default function Contact() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(GENDERS[0]);
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

        tl.fromTo(headingWrapRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
          .fromTo(
            cardRefs.current,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
            0.2
          )
          .fromTo(mapRef.current, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0.5)
          .fromTo(formRef.current, { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.7 }, 0.25);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMobile = mobile.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(trimmedMobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");

    const lines = [
      "Hi, I'd like to get in touch with Aesthetic Clinic.",
      "",
      `Name: ${trimmedName}`,
      `Mobile: ${trimmedMobile}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      `Gender: ${gender}`,
      `Interested in: ${department}`,
      message.trim() ? `Message: ${message.trim()}` : null,
    ].filter(Boolean);

    const url = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    setName("");
    setMobile("");
    setEmail("");
    setGender(GENDERS[0]);
    setDepartment(DEPARTMENTS[0]);
    setMessage("");
  }

  const inputClass =
    "w-full rounded-xl border border-teal-darker/15 bg-white py-3 pl-11 pr-4 text-sm text-teal-darker placeholder:text-teal-darker/40 outline-none transition-colors duration-200 focus:border-gold-soft focus:ring-2 focus:ring-gold-soft/30";
  const selectClass =
    "w-full appearance-none rounded-xl border border-teal-darker/15 bg-white py-3 pl-11 pr-9 text-sm text-teal-darker outline-none transition-colors duration-200 focus:border-gold-soft focus:ring-2 focus:ring-gold-soft/30";

  return (
    <section ref={sectionRef} id="contact" className="bg-cream-text px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div ref={headingWrapRef} className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">Get In Touch</p>
          <h2 className="font-display text-3xl font-semibold leading-snug text-teal-darker sm:text-4xl lg:text-5xl">
            Contact <span className="accent-italic">Us</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-teal-darker/70">
            Have a question or ready to book? Reach out and our team will get back to you shortly.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <a
                ref={(el) => {
                  cardRefs.current[0] = el;
                }}
                href={`mailto:${CLINIC_EMAIL}`}
                className="group flex items-start gap-4 rounded-2xl border border-teal-darker/10 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-soft/60 hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-darker/5 transition-colors duration-300 group-hover:bg-gold-soft">
                  <Mail className="h-4 w-4 text-gold-soft transition-colors duration-300 group-hover:text-teal-darker" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-darker/50">Email</p>
                  <p className="mt-1 text-sm font-medium text-teal-darker sm:text-base">{CLINIC_EMAIL}</p>
                </div>
              </a>

              <div
                ref={(el) => {
                  cardRefs.current[1] = el;
                }}
                className="rounded-2xl border border-teal-darker/10 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-soft/60 hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-darker/5">
                    <Phone className="h-4 w-4 text-gold-soft" strokeWidth={1.75} />
                  </span>
                  <div className="w-full">
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal-darker/50">Phone</p>
                    <div className="mt-1 flex flex-col gap-1">
                      {CLINIC_PHONES.map((p) => (
                        <a key={p.tel} href={`tel:+91${p.tel}`} className="text-sm font-medium text-teal-darker transition-colors hover:text-gold-soft sm:text-base">
                          {p.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {CLINIC_ADDRESSES.map((addr, i) => (
                <div
                  key={addr.label}
                  ref={(el) => {
                    cardRefs.current[2 + i] = el;
                  }}
                  className="group flex items-start gap-4 rounded-2xl border border-teal-darker/10 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-soft/60 hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-darker/5 transition-colors duration-300 group-hover:bg-gold-soft">
                    <MapPin className="h-4 w-4 text-gold-soft transition-colors duration-300 group-hover:text-teal-darker" strokeWidth={1.75} />
                  </span>
                  <div className="w-full">
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal-darker/50">{addr.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-teal-darker sm:text-base">{addr.text}</p>
                    <a
                      href={CLINIC_MAPS_LINK || directionsUrl(addr.text)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-soft transition-colors hover:text-teal-darker"
                    >
                      <Navigation className="h-3.5 w-3.5" strokeWidth={2} />
                      Get Directions
                    </a>
                  </div>
                </div>
              ))}

              <div
                ref={(el) => {
                  cardRefs.current[3] = el;
                }}
                className="group flex items-start gap-4 rounded-2xl border border-teal-darker/10 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-soft/60 hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-darker/5 transition-colors duration-300 group-hover:bg-gold-soft">
                  <Clock className="h-4 w-4 text-gold-soft transition-colors duration-300 group-hover:text-teal-darker" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-darker/50">Clinic Hours</p>
                  {/* TODO: confirm exact closing time — opening time (10:30 AM) is confirmed */}
                  <p className="mt-1 text-sm leading-relaxed text-teal-darker sm:text-base">Open daily from 10:30 AM</p>
                </div>
              </div>
            </div>

            <div
              ref={mapRef}
              className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-teal-darker/10 shadow-[0_8px_28px_rgba(0,0,0,0.1)]"
            >
              <iframe
                src={MAP_EMBED_SRC}
                title="Aesthetic Clinic location map"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-3xl border border-teal-darker/10 bg-white/70 p-6 shadow-[0_10px_30px_-6px_rgba(27,58,92,0.1)] sm:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative sm:col-span-2">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-darker/40" strokeWidth={1.75} />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputClass} />
                </div>

                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-darker/40" strokeWidth={1.75} />
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-darker/40" strokeWidth={1.75} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" className={inputClass} />
                </div>

                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-darker/40" strokeWidth={1.75} />
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className={selectClass}>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-darker/40" strokeWidth={1.75} />
                </div>

                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-darker/40" strokeWidth={1.75} />
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} className={selectClass}>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-darker/40" strokeWidth={1.75} />
                </div>

                <div className="relative sm:col-span-2">
                  <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-teal-darker/40" strokeWidth={1.75} />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you're looking for (optional)"
                    rows={4}
                    className={`${inputClass} resize-none pt-3`}
                  />
                </div>
              </div>

              {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
              {submitted && !error && (
                <p className="mt-4 text-sm font-medium text-teal-dark">
                  Thanks! We&apos;ve opened WhatsApp so you can send your details.
                </p>
              )}

              <button
                type="submit"
                className="btn-pill btn-pill-solid group mt-6 w-full justify-center transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                Send Message
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}