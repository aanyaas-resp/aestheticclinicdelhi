import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Aesthetic Clinic, Rajouri Garden, Delhi.",
};

const SECTIONS = [
  {
    title: "1. Introduction",
    body: `Aesthetic Clinic ("we", "us", "our") operates a website and clinic located at Shop No-2, J12/13, Block J, Rajouri Garden Extension, Rajouri Garden, New Delhi, Delhi – 110027. This Privacy Policy explains how we collect, use, and protect information you share with us when you visit our website or book an appointment.`,
  },
  {
    title: "2. Information We Collect",
    body: `When you use our contact or booking forms, we may collect your name, phone number, email address, and any message or appointment details you provide. If you contact us via WhatsApp or phone, we receive the information you choose to share through those channels. We do not collect payment or medical information through this website.`,
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
    body: `Our website may include links to third-party platforms such as Instagram, and an embedded Google Map to help you find our clinic. These third parties have their own privacy policies, and we encourage you to review them separately — we are not responsible for their practices.`,
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

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-cream-text px-5 pb-20 pt-32 sm:px-10 sm:pt-40 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="font-display text-3xl font-semibold leading-snug text-teal-darker sm:text-4xl lg:text-5xl">
          Privacy <span className="accent-italic">Policy</span>
        </h1>
        <p className="mt-4 font-sans text-sm text-teal-darker/60">
          Last updated: August 2026
        </p>

        <div className="mt-10 space-y-9 sm:mt-12 sm:space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-lg font-semibold text-teal-darker sm:text-xl">
                {section.title}
              </h2>
              <p className="mt-2.5 font-sans text-sm leading-relaxed text-teal-darker/75 sm:text-base">
                {section.body}
              </p>
            </section>
          ))}

          <section>
            <h2 className="font-display text-lg font-semibold text-teal-darker sm:text-xl">
              10. Contact Us
            </h2>
            <p className="mt-2.5 font-sans text-sm leading-relaxed text-teal-darker/75 sm:text-base">
              If you have questions about this Privacy Policy or how your
              information is handled, reach out to us:
            </p>
            <ul className="mt-3 space-y-1.5 font-sans text-sm text-teal-darker/75 sm:text-base">
              <li>Aesthetic Clinic</li>
              <li>
                Shop No-2, J12/13, Block J, Rajouri Garden Extension, Rajouri
                Garden, New Delhi, Delhi – 110027
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+918057790577" className="text-deep-teal hover:text-gold-soft">
                  +91 80577 90577
                </a>
              </li>
              <li>
                Email:{" "}
                <a href="mailto:hello@aestheticclinic.in" className="text-deep-teal hover:text-gold-soft">
                  hello@aestheticclinic.in
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}