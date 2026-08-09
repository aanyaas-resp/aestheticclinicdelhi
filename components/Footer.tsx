import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

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

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Results", href: "/results" },
  { label: "Doctors", href: "/#our-doctors" },
  { label: "FAQ", href: "/faq" },
];

// NOTE: this Instagram handle (thesquare.salon) was the only link provided,
// but it doesn't match the business name "Aesthetic Clinic" — confirm this
// is actually your account before this goes live.
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/thesquare.salon/", icon: InstagramIcon },
];

const PHONE_DISPLAY = "+91 80577 90577";
const PHONE_TEL = "+918057790577";
const ADDRESS = "Shop No-2, J12/13, Block J, Rajouri Garden Extension, Rajouri Garden, New Delhi, Delhi – 110027";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-teal px-5 py-14 sm:px-10 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Aesthetic Clinic logo" width={36} height={36} className="h-8 w-8 sm:h-9 sm:w-9" />
              <p className="font-display text-xl font-semibold text-cream-text sm:text-2xl">
                Aesthetic <span className="italic text-gold-soft">Clinic</span>
              </p>
            </Link>
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-cream-text/60">
              Dermatologist-guided skin and hair care in the heart of Rajouri
              Garden, Delhi.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-text/20 text-cream-text/80 transition-all duration-200 hover:border-gold-soft hover:text-gold-soft"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream-text/45">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-cream-text/70 transition-colors duration-200 hover:text-gold-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream-text/45">
              Contact
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.75} />
                <span className="font-sans text-sm leading-relaxed text-cream-text/70">{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.75} />
                <a href={`tel:${PHONE_TEL}`} className="font-sans text-sm text-cream-text/70 hover:text-gold-soft">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.75} />
                <a
                  href="mailto:hello@aestheticclinic.in"
                  className="font-sans text-sm text-cream-text/70 hover:text-gold-soft"
                >
                  hello@aestheticclinic.in
                </a>
              </li>
            </ul>
          </div>

          {/* Book CTA */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream-text/45">
              Ready When You Are
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-cream-text/65">
              Book a consultation and start your treatment plan.
            </p>
            <a
              href="#contact"
              className="btn-pill mt-5 inline-flex bg-gold-soft text-deep-teal shadow-md shadow-black/20 transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
            >
              Book Your Appointment
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream-text/10 pt-6 sm:mt-14 sm:flex-row">
          <p className="font-sans text-xs text-cream-text/45">
            © {year} Aesthetic Clinic. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="font-sans text-xs text-cream-text/45 hover:text-gold-soft">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-sans text-xs text-cream-text/45 hover:text-gold-soft">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}