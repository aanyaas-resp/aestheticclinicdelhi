"use client";

import { useState, type FormEvent } from "react";
import { User, Phone, Stethoscope, Send, ChevronDown } from "lucide-react";

const CLINIC_WHATSAPP = "918057790577"; // TODO: confirm WhatsApp-enabled number

// TODO: update once the clinic's real service menu is finalized.
const TREATMENTS = [
  "Laser Hair Reduction",
  "Acne & Scar Treatment",
  "Anti-Aging & Skin Tightening",
  "Chemical Peels",
  "Hair Restoration / PRP",
  "Other Skin Concern",
];

export default function BookingForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [treatment, setTreatment] = useState(TREATMENTS[0]);
  const [error, setError] = useState("");

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

    const message = `Hi, I'd like to book an appointment.\n\nName: ${trimmedName}\nMobile: ${trimmedMobile}\nInterested in: ${treatment}`;
    const url = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setName("");
    setMobile("");
    setTreatment(TREATMENTS[0]);
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
      <div className="group relative">
        <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-darker/45 transition-colors duration-200 group-focus-within:text-teal-dark" strokeWidth={1.75} />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full rounded-2xl border border-white bg-white/55 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-teal-darker/45 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md transition-all duration-200 focus:border-teal-dark focus:bg-white/80 focus:ring-4 focus:ring-teal-dark/15"
        />
      </div>

      <div className="group relative">
        <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white transition-colors duration-200 group-focus-within:text-teal-dark" strokeWidth={1.75} />
        <input
          type="tel"
          inputMode="numeric"
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="Mobile number"
          className="w-full rounded-2xl border border-white bg-white/55 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-teal-darker/45 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md transition-all duration-200 focus:border-teal-dark focus:bg-white/80 focus:ring-4 focus:ring-teal-dark/15"
        />
      </div>

      <div className="group relative">
        <Stethoscope className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white transition-colors duration-200 group-focus-within:text-teal-dark" strokeWidth={1.75} />
        <select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-white bg-white/55 py-3.5 pl-11 pr-10 text-sm text-teal-darker outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md transition-all duration-200 focus:border-teal-dark focus:bg-white/80 focus:ring-4 focus:ring-teal-dark/15"
        >
          {TREATMENTS.map((option) => (
            <option key={option} value={option} className="bg-white text-teal-darker">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-darker/45 transition-colors duration-200 group-focus-within:text-teal-dark" strokeWidth={1.75} />
      </div>

      {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-teal-dark px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(47,191,196,0.4)] transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_14px_32px_rgba(47,191,196,0.5)] active:scale-[0.98]"
      >
        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
        Send via WhatsApp
      </button>
    </form>
  );
}