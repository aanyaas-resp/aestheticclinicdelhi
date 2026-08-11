"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import BookingModal from "@/components/BookingModal";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Results", href: "/#all-results" },
  { label: "FAQ", href: "/#faq" },
];

const SCROLL_THRESHOLD = 48;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const isCompact = !isHome || isScrolled || isMobileOpen;

  // Handles hash links (#about, #services, etc). If already on "/", scroll
  // smoothly instead of letting Link do a hash-only URL change that doesn't
  // reliably scroll. If on another route, navigate to "/" first, then scroll
  // once the page has mounted.
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.includes("#")) return; // plain routes (e.g. "/") behave normally

    const id = href.split("#")[1];
    if (!id) return;

    e.preventDefault();
    setIsMobileOpen(false);

    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `/#${id}`);
    } else {
      router.push("/");
      // Wait for the home page to mount before scrolling
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto transition-all duration-500 ease-out ${
          isCompact ? "max-w-3xl px-3 pt-3 sm:px-4 sm:pt-4 lg:max-w-4xl" : "max-w-7xl px-4 pt-0 sm:px-6 lg:px-16"
        }`}
      >
        <nav
          className={`flex items-center justify-between gap-3 transition-all duration-500 ease-out ${
            isCompact
              ? "rounded-full border border-cream/60 bg-cream/80 px-4 py-2.5 shadow-[0_8px_30px_-6px_rgba(94,59,21,0.25)] backdrop-blur-xl sm:px-5"
              : "rounded-none border-transparent bg-transparent px-2 py-4 sm:py-5"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            onClick={() => setIsMobileOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="The Square Aesthetics & Wellness Clinic logo"
              width={40}
              height={40}
              className={`transition-all duration-500 ${isCompact ? "h-7 w-7 sm:h-8 sm:w-8" : "h-9 w-9 sm:h-10 sm:w-10"}`}
              priority
            />
            <span
              className={`whitespace-nowrap font-display font-semibold leading-tight transition-all duration-500 ${
                isCompact ? "text-base text-chocolate-deep sm:text-lg" : "text-lg text-cream sm:text-xl"
              }`}
            >
              The Square{" "}
              <span className={isCompact ? "italic text-bronze" : "italic text-bronze"}>
                Aesthetics
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`whitespace-nowrap font-sans text-sm font-medium transition-colors duration-300 ${
                    isCompact
                      ? "text-chocolate-deep/80 hover:text-bronze"
                      : "text-cream/90 hover:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={`btn-pill group hidden shrink-0 whitespace-nowrap shadow-md transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] lg:inline-flex ${
              isCompact
                ? "bg-chocolate-deep text-cream shadow-chocolate-deep/30 hover:bg-chocolate"
                : "bg-cream/15 text-cream shadow-black/10 backdrop-blur-md hover:bg-cream/25"
            }`}
          >
            Book Appointment
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
              isCompact
                ? "border-chocolate-deep/15 text-chocolate-deep"
                : "border-cream/40 text-cream"
            }`}
          >
            {isMobileOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </nav>

        {/* Mobile menu panel */}
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-out lg:hidden ${
            isMobileOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden rounded-3xl border border-cream/60 bg-cream/90 shadow-[0_8px_30px_-6px_rgba(94,59,21,0.25)] backdrop-blur-xl">
            <ul className="flex flex-col gap-1 px-4 pb-2 pt-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-chocolate-deep/85 transition-colors duration-200 hover:bg-bronze/10 hover:text-bronze"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-4 pb-4 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsMobileOpen(false);
                  setIsModalOpen(true);
                }}
                className="btn-pill group w-full justify-center bg-chocolate-deep text-cream shadow-md shadow-chocolate-deep/30 active:scale-[0.98]"
              >
                Book Appointment
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}