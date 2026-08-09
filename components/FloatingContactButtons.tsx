"use client";

import { Phone } from "lucide-react";

const PHONE_DISPLAY = "080577 90577";
const PHONE_TEL = "918057790577"; // TODO: confirm
const PHONE_WHATSAPP = "918057790577"; // TODO: confirm WhatsApp-enabled number
const WHATSAPP_MESSAGE = "Hi! I'd like to know more and book an appointment.";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2zm0 18.15c-1.65 0-3.2-.46-4.52-1.25l-.32-.19-3.01.79.8-2.93-.21-.3a8.15 8.15 0 0 1-1.26-4.27c0-4.52 3.68-8.19 8.22-8.19 2.2 0 4.26.86 5.81 2.4a8.14 8.14 0 0 1 2.41 5.79c0 4.52-3.68 8.15-8.22 8.15z" />
    </svg>
  );
}

export default function FloatingContactButtons() {
  const whatsappHref = `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const telHref = `tel:+${PHONE_TEL}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a href={telHref} aria-label={`Call now at ${PHONE_DISPLAY}`} className="group relative flex items-center">
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-teal-darker px-3 py-1.5 text-xs font-semibold text-teal-dark opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100 group-hover:mr-3.5">
          Call Now · {PHONE_DISPLAY}
        </span>
        <span className="absolute inset-0 rounded-full bg-teal-darker/40 animate-ping-slow" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-teal-darker text-teal-dark shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95">
          <Phone className="h-6 w-6" strokeWidth={2} />
        </span>
      </a>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center"
      >
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100 group-hover:mr-3.5">
          Chat on WhatsApp
        </span>
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping-slow" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95">
          <WhatsAppIcon className="h-6 w-6" />
        </span>
      </a>
    </div>
  );
}