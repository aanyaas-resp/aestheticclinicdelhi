"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { ChevronDown, ArrowUpRight } from "lucide-react";

const FAQS = [
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "We recommend booking ahead so our patient relationship manager can prepare for your visit and minimize wait time. You can book via our website or WhatsApp. Walk-ins are welcome when slots are available, but appointments get priority.",
  },
  {
    question: "What happens during my first visit?",
    answer:
      "Your first visit starts with a comprehensive skin or hair diagnosis with our dermatologist. We assess your concerns using our diagnostic tools and build a treatment protocol tailored to your skin type, condition, and goals — nothing is one-size-fits-all.",
  },
  {
    question: "How many sessions will I need to see results?",
    answer:
      "This depends entirely on your condition and treatment plan — everything from mild pigmentation to acne scarring responds differently. Your dermatologist will walk you through an expected timeline after your diagnosis, and adjust it as your skin responds.",
  },
  {
    question: "Are your treatments safe for Indian skin tones?",
    answer:
      "Yes. Our protocols are specifically calibrated for the pigmentation and sensitivity patterns common in Indian skin, which reduces risks like post-inflammatory hyperpigmentation that can occur with generic treatment settings.",
  },
  {
    question: "Do you offer both skin and hair treatments?",
    answer:
      "Yes — Aesthetic Clinic covers advanced skin treatments (scars, pigmentation, acne, anti-aging) as well as hair and scalp care, all under dermatologist-guided care rather than separate, disconnected services.",
  },
  {
    question: "What payment options do you accept?",
    answer:
      "We accept cash, all major cards, and UPI. If you're considering a multi-session package, ask our front desk about available payment plans during your consultation.",
  },
  {
    question: "Where is the clinic located, and what are your hours?",
    answer:
      "We're located in Rajouri Garden, Delhi. For current operating hours and holiday schedules, please check our contact page or WhatsApp us directly — hours can shift around festivals and holidays.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="bg-cream-text px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow mb-4 justify-center">Questions & Answers</p>
          <h1 className="font-display text-3xl font-semibold leading-snug text-teal-darker sm:text-4xl lg:text-5xl">
            Frequently Asked <span className="accent-italic">Questions</span>
          </h1>
          <p className="mt-4 font-sans text-base leading-relaxed text-teal-darker/70">
            Everything you need to know before your visit to Aesthetic
            Clinic. Can&apos;t find your answer here? Reach out and we&apos;ll
            help directly.
          </p>
        </div>

        <div className="mt-14 space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-deep-teal/12 bg-white/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="font-display text-base font-semibold text-teal-darker sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-deep-teal transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={2}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 font-sans text-sm leading-relaxed text-teal-darker/70 sm:px-6 sm:pb-6 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl bg-deep-teal px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-xl font-semibold text-cream-text sm:text-2xl">
            Still have questions?
          </h2>
          <p className="mt-2 font-sans text-sm text-cream-text/75 sm:text-base">
            Book a consultation and get answers specific to your skin or hair.
          </p>
          <a
            href="#contact"
            className="btn-pill group mt-6 inline-flex bg-gold-soft text-deep-teal shadow-md shadow-black/15 transition-transform duration-300 hover:scale-[1.04] hover:bg-gold-soft/90 active:scale-[0.98]"
          >
            Book Your Appointment
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </main>
  );
}