import type { Metadata, Viewport } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/app/Smoothscroll";

// Geist is a variable font — no discrete weight array needed, font-weight
// in CSS just works across its full range. It also has no italic cut, so
// any `italic` class on text using this variable falls back to the
// browser's synthetic (slanted) style rather than a true italic.
const displayFont = Geist({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-family",
  display: "swap",
});

// TODO: confirm actual live domain before deploy
const SITE_URL = "https://www.aestheticclinicdelhi.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09585c",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aesthetic Clinic | Best Skin & Hair Clinic in Rajouri Garden, Delhi",
    template: "%s | Aesthetic Clinic",
  },
  description:
    "Aesthetic Clinic in Rajouri Garden, West Delhi — laser hair reduction, skin aesthetics, hair restoration & body contouring. Doctor-led, precision treatments. Book your consultation today.",
  keywords: [
    "aesthetic clinic Rajouri Garden",
    "skin clinic Rajouri Garden",
    "laser hair reduction Delhi",
    "dermatologist Rajouri Garden",
    "hair restoration Delhi",
    "PRP therapy Delhi",
    "HIFU treatment Delhi",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Aesthetic Clinic | Rajouri Garden, Delhi",
    description:
      "Doctor-led skin, hair & body treatments — laser hair reduction, PRP, HIFU and more. Aesthetic Clinic, Rajouri Garden Extension, West Delhi.",
    url: SITE_URL,
    siteName: "Aesthetic Clinic",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aesthetic Clinic | Rajouri Garden, Delhi",
    description:
      "Doctor-led skin, hair & body clinic in Rajouri Garden, West Delhi.",
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
  name: "Aesthetic Clinic",
  image: `${SITE_URL}/og-image.png`,
  telephone: "+91-8057790577",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No-2, J12/13, Block J, Rajouri Garden Extension",
    addressLocality: "Rajouri Garden, New Delhi",
    addressRegion: "DL",
    postalCode: "110027",
    addressCountry: "IN",
  },
  url: SITE_URL,
  // TODO: replace with the clinic's actual Instagram — this was the old salon's handle
  sameAs: [],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:30",
      closes: "20:30", // TODO: confirm actual closing time
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${displayFont.variable} ${sansFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
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
      </body>
    </html>
  );
}