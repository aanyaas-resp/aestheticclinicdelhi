// app/components/BookingModal.tsx
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { X, Phone, ChevronDown, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useSmoothScroll } from "@/app/Smoothscroll";

const CLINIC_WHATSAPP = "918057790577"; // TODO: confirm WhatsApp-enabled number

const SERVICES = [
  "Skin Aesthetics",
  "Anti-Ageing",
  "Body Lab",
  "MediFacial",
  "Hair Restoration",
];

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Exact treatment name from a specific service card (e.g. "PRP Therapy").
   *  When set, the form locks to this treatment instead of showing the
   *  generic category dropdown. */
  presetService?: string;
};

export default function BookingModal({ isOpen, onClose, presetService }: BookingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const { pause, resume } = useSmoothScroll();

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const isLocked = Boolean(presetService);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) {
      setService(presetService ?? "");
      setStatus("idle");
      setError("");
    }
  }, [isOpen, presetService]);

  useEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set(panelRef.current, { autoAlpha: 0, y: 24, scale: 0.96 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 }, 0).to(
        panelRef.current,
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 },
        0.05
      );
    });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Stops background scroll for users on the ScrollSmoother path — plain
    // `overflow: hidden` above only stops native scroll, which does nothing
    // once ScrollSmoother is driving the page via transforms.
    pause();

    // Move focus into the modal for keyboard/screen-reader users
    nameInputRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      ctx.revert();
      document.body.style.overflow = previousOverflow;
      resume();
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function handleClose() {
    if (!overlayRef.current || !panelRef.current) {
      onClose();
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "power2.in" }, onComplete: onClose });
    tl.to(panelRef.current, { autoAlpha: 0, y: 16, scale: 0.97, duration: 0.25 }, 0).to(
      overlayRef.current,
      { autoAlpha: 0, duration: 0.25 },
      0.02
    );
  }

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

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative w-full max-w-md rounded-3xl border border-white/15 bg-deep-teal/95 p-7 shadow-2xl shadow-black/50 backdrop-blur-md sm:p-9"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close booking form"
          className="absolute right-5 top-5 rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <h2 id="booking-modal-title" className="font-display text-2xl font-semibold text-white">
          Book Your Consultation
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Fill in your details — you&apos;ll be redirected to WhatsApp to confirm.
        </p>

        {status === "sent" ? (
          <div className="mt-8 rounded-2xl border border-gold-soft/30 bg-gold-soft/10 px-5 py-6 text-center">
            <p className="font-semibold text-white">Thank you! 🎉</p>
            <p className="mt-1 text-sm text-white/75">
              Continue the conversation on WhatsApp — we&apos;ll confirm your slot there.
            </p>
            <button type="button" onClick={handleClose} className="btn-pill-solid mt-5 justify-center">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="booking-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Full Name
              </label>
              <input
                ref={nameInputRef}
                id="booking-name"
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
              <label htmlFor="booking-phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Phone
              </label>
              <div className="flex overflow-hidden rounded-xl border border-white/15 bg-white/5 focus-within:ring-2 focus-within:ring-gold-soft">
                <span className="flex items-center border-r border-white/15 px-4 text-sm text-white/70">+91</span>
                <input
                  id="booking-phone"
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

            {isLocked ? (
              <div>
                <p className="mb-2 block text``` font-semibold uppercase tracking-[0.15em] text-white">
                  Treatment Selected
                </p>
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-gold-soft/30 bg-gold-soft/10 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-white">
                    <Sparkles className="h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.75} />
                    {presetService}
                  </span>
                  <button
                    type="button"
                    onClick={() => setService("")}
                    className="shrink-0 text-xs font-semibold text-gold-soft underline-offset-2 hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="booking-service" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white">
                  Treatment Interest
                </label>
                <div className="relative">
                  <select
                    id="booking-service"
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
            )}

            {error && <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

            <button
              type="submit"
              className="btn-pill-solid w-full justify-center bg-gold text-teal-darker hover:bg-gold/90"
            >
              Send via WhatsApp
            </button>
            <a
              href="tel:+918057790577"
              className="btn-pill flex w-full items-center justify-center gap-2 border-2 border-white/25 text-white hover:border-gold-soft/60 hover:bg-white/5"
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              Or Call Us Directly
            </a>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}