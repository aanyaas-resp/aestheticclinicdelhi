import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowUpRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center bg-cream-text px-5 pb-16 pt-32 sm:px-10 sm:pt-40 lg:px-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-7xl font-semibold text-deep-teal/20 sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold leading-snug text-teal-darker sm:text-3xl lg:text-4xl">
          We couldn&apos;t find that <span className="accent-italic">page</span>
        </h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-teal-darker/70 sm:text-base">
          The page you&apos;re looking for may have been moved or no longer
          exists. Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn-pill group w-full justify-center bg-deep-teal text-white shadow-md shadow-deep-teal/30 transition-transform duration-300 hover:scale-[1.04] hover:bg-deep-teal/90 active:scale-[0.98] sm:w-auto"
          >
            <Home className="h-4 w-4" strokeWidth={2} />
            Back to Home
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
          <a
            href="tel:+918057790577"
            className="btn-pill w-full justify-center border-2 border-deep-teal/25 text-teal-darker transition-colors duration-300 hover:border-deep-teal/60 hover:bg-deep-teal/5 sm:w-auto"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            Call Us
          </a>
        </div>
      </div>
    </main>
  );
}