import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat, Cinzel } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/app/Smoothscroll";
import FloatingContactButtons from "@/components/FloatingContactButtons";

// Playfair Display — elegant serif for headings/logo type.
const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-family",
  display: "swap",
});

// Montserrat — clean geometric sans for body copy & UI.
const sansFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-family",
  display: "swap",
});

// Cinzel — small-caps accent face for eyebrows / kicker labels only.
const accentFont = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-accent-family",
  display: "swap",
});

const SITE_URL = "https://www.thesquareaesthetics.com/";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#5E3B15",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Square Aesthetics & Wellness Clinic | Rajouri Garden, Delhi",
    template: "%s | The Square Aesthetics & Wellness Clinic",
  },
  description:
    "The Square Aesthetics & Wellness Clinic — Rajouri Garden, Delhi. Laser, skin & hair treatments, Botox, filler and PRP. Expert-led, result-driven care. Book your consultation today.",
  keywords: [
    "The Square Aesthetics",
    "aesthetics clinic Rajouri Garden",
    "wellness clinic Rajouri Garden",
    "Botox Delhi",
    "filler Rajouri Garden",
    "PRP treatment Delhi",
    "laser hair reduction Delhi",
    "skin clinic Rajouri Garden",
    "hair treatment Delhi",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "The Square Aesthetics & Wellness Clinic | Rajouri Garden, Delhi",
    description:
      "At Square Aesthetics, we don't follow trends — we treat with clinical precision. Doctor-led skin, hair and body treatments, modern technology, and care that puts your results first. Rajouri Garden's Best Skin & Hair Clinic.",
    url: SITE_URL,
    siteName: "The Square Aesthetics & Wellness Clinic",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Square Aesthetics & Wellness Clinic | Rajouri Garden, Delhi",
    description:
      "At Square Aesthetics, we don't follow trends — we treat with clinical precision. Doctor-led skin, hair and body treatments, modern technology, and care that puts your results first. Rajouri Garden's Best Skin & Hair Clinic.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "The Square Aesthetics & Wellness Clinic",
  image: `${SITE_URL}/og-image.png`,
  telephone: "+91-8057790577",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No. 2, J-12/13, Block J, Rajouri Garden",
    addressLocality: "Delhi",
    addressRegion: "DL",
    postalCode: "110027",
    addressCountry: "IN",
  },
  url: SITE_URL,
  sameAs: ["https://www.instagram.com/thesquare.salon/"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:30",
      closes: "20:30", // TODO: confirm actual closing time
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${displayFont.variable} ${sansFont.variable} ${accentFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD),
          }}
        />
      </head>
      <body>
        {/* Navbar stays OUTSIDE SmoothScroll — it's position:fixed and must
            stay pinned to the real viewport, not the virtual-scroll content. */}
        <Navbar />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
          <FloatingContactButtons />

      </body>
    </html>
  );
}
