import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function RealResults() {
  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="relative overflow-hidden bg-cream-text px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Before / After image */}
        <div className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] shadow-[0_16px_48px_rgba(30,58,52,0.18)] ring-1 ring-inset ring-gold-soft/20 sm:rounded-[28px]">
            {/*
              Put ONE image here for now. Make sure this exact file exists
              at: public/result.png
              (or change the src below to a file that actually exists in
              your public/ folder — check with `ls public/` in your terminal)
            */}
            <Image
              src="/result.png"
              alt="Before and after skin treatment results at Aesthetic Clinic, Rajouri Garden, Delhi"
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="mt-4 flex items-center justify-between px-1">
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
          <p className="eyebrow mb-4 text-teal-darker/70">Real Results</p>
          <h2
            id="results-heading"
            className="font-display text-[2rem] font-semibold leading-tight text-teal-darker sm:text-4xl lg:text-5xl"
          >
            Erase the Past, Reveal the Future:{" "}
            <span className="accent-italic">The Ultimate Skin Renaissance</span>
          </h2>

          <p className="mt-6 font-sans text-base leading-relaxed text-teal-darker/75 sm:text-lg">
            Real patients, real transformations. At Aesthetic Clinic, our
            treatments are led by dermatologist-guided protocols — from
            chemical peels to microneedling and collagen induction — each
            plan built around your skin&apos;s specific needs.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-teal-darker/75 sm:text-lg">
            Witness the transformation from pitted, dull texture to the
            coveted <span className="font-semibold">Glass Skin</span> finish.
            Our bespoke treatments are designed for Indian skin, ensuring
            safe, lasting correction of scars, pores, and pigmentation.
          </p>

          <a
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