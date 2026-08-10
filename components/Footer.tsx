"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import BookingModal from "@/components/BookingModal";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// All routes are anchors on the single homepage, since About, Services,
// JourneySection, Gallery, RealResults, ResultsPage, Contact, and FAQPage
// are all sections composed on the same page (app/page.tsx) — matching
// the "id" set on each section's root element.
// In Footer.tsx — replace the QUICK_LINKS array with this
const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Results", href: "/#results" },
  { label: "Journey", href: "/#journey" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Full Results", href: "/#all-results" },
  { label: "Contact", href: "/#contact" },
  { label: "FAQ", href: "/#faq" },
];
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/thesquare.salon/", icon: InstagramIcon },
];

const CLINIC_NAME = "The Square Aesthetics & Wellness Clinic";
const PHONE_DISPLAY = "080577 90577";
const PHONE_TEL = "+918057790577";
const EMAIL = "info@thesquaresalon.in";
const ADDRESS = "Shop No. 2, J-12/13, Block J, Rajouri Garden, Delhi, India - 110027";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="bg-chocolate-deep px-5 py-14 sm:px-10 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt={`${CLINIC_NAME} logo`} width={36} height={36} className="h-8 w-8 sm:h-9 sm:w-9" />
              <p className="font-display text-xl font-semibold text-cream sm:text-2xl">
                The Square <span className="italic text-bronze">Aesthetics</span>
              </p>
            </Link>
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-cream/60">
              Advanced aesthetics &amp; wellness clinic in the heart of Rajouri
              Garden, Delhi — expert-led, result-driven care.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-all duration-200 hover:border-bronze hover:text-bronze"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-cream/70 transition-colors duration-200 hover:text-bronze"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">
              Contact
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze" strokeWidth={1.75} />
                <span className="font-sans text-sm leading-relaxed text-cream/70">{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-bronze" strokeWidth={1.75} />
                <a href={`tel:${PHONE_TEL}`} className="font-sans text-sm text-cream/70 hover:text-bronze">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-bronze" strokeWidth={1.75} />
                <a href={`mailto:${EMAIL}`} className="font-sans text-sm text-cream/70 hover:text-bronze">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Book CTA — opens the same BookingModal used in the navbar */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">
              Ready When You Are
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-cream/65">
              Book your consultation today and start your treatment plan.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-pill mt-5 inline-flex bg-bronze text-cream shadow-md shadow-black/20 transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
            >
              Book Your Appointment
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 sm:mt-14 sm:flex-row">
          <p className="font-sans text-xs text-cream/45">
            © {year} {CLINIC_NAME}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/legal#privacy" className="font-sans text-xs text-cream/45 hover:text-bronze">
              Privacy Policy
            </Link>
            <Link href="/legal#terms" className="font-sans text-xs text-cream/45 hover:text-bronze">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}