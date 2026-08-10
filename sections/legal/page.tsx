import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Service",
  description:
    "Privacy Policy and Terms of Service for The Square Aesthetics & Wellness Clinic, Rajouri Garden, Delhi.",
};

const CLINIC_NAME = "The Square Aesthetics & Wellness Clinic";
const ADDRESS = "Shop No. 2, J-12/13, Block J, Rajouri Garden, Delhi, India - 110027";
const PHONE_DISPLAY = "080577 90577";
const PHONE_TEL = "+918057790577";
const EMAIL = "info@thesquaresalon.in";
const WEBSITE = "https://thesquaresalon.in";

const PRIVACY_SECTIONS = [
  {
    title: "1. Introduction",
    body: `${CLINIC_NAME} ("we", "us", "our") operates the website ${WEBSITE} and a clinic located at ${ADDRESS}. This Privacy Policy explains how we collect, use, and protect information you share with us when you visit our website or book an appointment.`,
  },
  {
    title: "2. Information We Collect",
    body: `When you use our contact or booking forms, we may collect your name, phone number, email address, and any message or appointment details you provide. If you contact us via WhatsApp, phone, or Instagram, we receive the information you choose to share through those channels. We do not collect payment or medical information through this website.`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use the information you provide to respond to enquiries, schedule and confirm appointments, and communicate with you about our services. We do not sell or rent your personal information to third parties.`,
  },
  {
    title: "4. Cookies & Analytics",
    body: `Our website may use basic cookies or analytics tools to understand how visitors use the site and to improve its performance. These do not identify you personally. You can disable cookies in your browser settings at any time.`,
  },
  {
    title: "5. Third-Party Links & Embeds",
    body: `Our website may include links to third-party platforms such as Instagram and WhatsApp, and an embedded Google Map to help you find our clinic. These third parties have their own privacy policies, and we encourage you to review them separately — we are not responsible for their practices.`,
  },
  {
    title: "6. Data Security",
    body: `We take reasonable measures to protect the information you share with us. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "7. Your Rights",
    body: `You may request access to, correction of, or deletion of the personal information you've shared with us by contacting us using the details below.`,
  },
  {
    title: "8. Children's Privacy",
    body: `Our services and website are not directed at children under 18, and we do not knowingly collect personal information from minors without parental consent.`,
  },
  {
    title: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.`,
  },
];

const TERMS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using the ${WEBSITE} website, or by booking a consultation with ${CLINIC_NAME}, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.`,
  },
  {
    title: "2. Our Services",
    body: `${CLINIC_NAME} offers laser treatments, skin treatments, hair treatments, Botox, filler, PRP, and related aesthetic and wellness services. All treatments are administered by qualified professionals following a consultation.`,
  },
  {
    title: "3. Appointments & Consultations",
    body: `Booking a consultation through this website (via form or WhatsApp) does not guarantee a specific appointment slot until confirmed by our team. We reserve the right to reschedule or decline appointments at our discretion.`,
  },
  {
    title: "4. Medical Disclaimer",
    body: `Information on this website is provided for general informational purposes only and does not constitute medical advice. Individual results vary and are not guaranteed. A qualified practitioner will assess your suitability for any treatment during an in-person consultation.`,
  },
  {
    title: "5. Payments & Cancellations",
    body: `Pricing shown on the website is indicative and subject to change following an in-clinic consultation. Cancellation and rescheduling policies will be communicated at the time of booking.`,
  },
  {
    title: "6. Intellectual Property",
    body: `All content on this website — including text, images, logos, and design — is the property of ${CLINIC_NAME} unless otherwise stated, and may not be reproduced without our written permission.`,
  },
  {
    title: "7. Limitation of Liability",
    body: `To the extent permitted by law, ${CLINIC_NAME} is not liable for any indirect or consequential loss arising from your use of this website. Nothing in these Terms limits liability that cannot be excluded under applicable law.`,
  },
  {
    title: "8. Governing Law",
    body: `These Terms are governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts in Delhi.`,
  },
  {
    title: "9. Changes to These Terms",
    body: `We may update these Terms of Service from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated Terms.`,
  },
];

export default function LegalPage() {
  return (
    <main className="bg-ivory px-5 pb-20 pt-32 sm:px-10 sm:pt-40 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="font-display text-3xl font-semibold leading-snug text-chocolate-deep sm:text-4xl lg:text-5xl">
          Privacy Policy &amp; <span className="accent-italic">Terms of Service</span>
        </h1>
        <p className="mt-4 font-sans text-sm text-chocolate-deep/60">Last updated: August 2026</p>

        {/* Privacy Policy */}
        <section id="privacy" className="mt-12 scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold text-chocolate-deep sm:text-3xl">
            Privacy <span className="accent-italic">Policy</span>
          </h2>
          <div className="mt-8 space-y-9 sm:space-y-10">
            {PRIVACY_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="font-display text-lg font-semibold text-chocolate-deep sm:text-xl">
                  {section.title}
                </h3>
                <p className="mt-2.5 font-sans text-sm leading-relaxed text-chocolate-deep/75 sm:text-base">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Terms of Service */}
        <section id="terms" className="mt-16 scroll-mt-28 border-t border-chocolate-deep/10 pt-12">
          <h2 className="font-display text-2xl font-semibold text-chocolate-deep sm:text-3xl">
            Terms of <span className="accent-italic">Service</span>
          </h2>
          <div className="mt-8 space-y-9 sm:space-y-10">
            {TERMS_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="font-display text-lg font-semibold text-chocolate-deep sm:text-xl">
                  {section.title}
                </h3>
                <p className="mt-2.5 font-sans text-sm leading-relaxed text-chocolate-deep/75 sm:text-base">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16 border-t border-chocolate-deep/10 pt-12">
          <h2 className="font-display text-lg font-semibold text-chocolate-deep sm:text-xl">
            Contact Us
          </h2>
          <p className="mt-2.5 font-sans text-sm leading-relaxed text-chocolate-deep/75 sm:text-base">
            If you have questions about this Privacy Policy, our Terms of
            Service, or how your information is handled, reach out to us:
          </p>
          <ul className="mt-3 space-y-1.5 font-sans text-sm text-chocolate-deep/75 sm:text-base">
            <li>{CLINIC_NAME}</li>
            <li>{ADDRESS}</li>
            <li>
              Phone:{" "}
              <a href={`tel:${PHONE_TEL}`} className="text-bronze hover:text-chocolate-deep">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              Email:{" "}
              <a href={`mailto:${EMAIL}`} className="text-bronze hover:text-chocolate-deep">
                {EMAIL}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}