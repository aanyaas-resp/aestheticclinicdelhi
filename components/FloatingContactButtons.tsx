"use client";

import { Phone } from "lucide-react";

const PHONE_DISPLAY = "080577 90577";
const PHONE_TEL = "918057790577";
const PHONE_WHATSAPP = "918057790577";

const WHATSAPP_MESSAGE =
  "Hi! I'd like to know more about The Square Aesthetics & Wellness Clinic and book an appointment.";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 01-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.946L.057 24l6.304-1.654a11.882 11.882 0 005.684 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.479-8.413" />
    </svg>
  );
}

export default function FloatingContactButtons() {
  const whatsappHref = `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  const telHref = `tel:+${PHONE_TEL}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {/* Call Button — icon only, matches WhatsApp button's size/shape */}
      <a
        href={telHref}
        aria-label={`Call now at ${PHONE_DISPLAY}`}
        className="group relative flex items-center"
      >
        {/* Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-taupe/60 bg-ivory px-4 py-2 text-xs font-semibold tracking-wide text-chocolate opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:mr-4">
          Call for an Appointment
        </span>

        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-bronze/40 bg-chocolate text-cream shadow-xl shadow-chocolate/25 transition-all duration-300 hover:-translate-y-1 hover:bg-chocolate-deep hover:shadow-2xl active:scale-95">
          <Phone className="h-6 w-6 stroke-[1.8]" />
        </span>
      </a>

      {/* WhatsApp Button — icon only */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center"
      >
        {/* Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-taupe/60 bg-ivory px-4 py-2 text-xs font-semibold tracking-wide text-chocolate opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:mr-4">
          Chat on WhatsApp
        </span>

        {/* Soft bronze pulse */}
        <span className="absolute inset-0 rounded-full bg-bronze/30 animate-ping-slow" />

        {/* Button */}
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-bronze/50 bg-cream text-chocolate shadow-xl shadow-chocolate/20 transition-all duration-300 hover:-translate-y-1 hover:bg-chocolate hover:text-cream hover:shadow-2xl active:scale-95">
          <WhatsAppIcon className="h-6 w-6" />
        </span>
      </a>
    </div>
  );
}