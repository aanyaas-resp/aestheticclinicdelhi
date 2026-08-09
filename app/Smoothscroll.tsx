"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

type SmoothScrollContextValue = {
  pause: () => void;
  resume: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  pause: () => {},
  resume: () => {},
});

// Call this from anywhere that opens an overlay/modal on top of the page —
// e.g. BookingModal — and call resume() on close. Regular CSS
// `overflow: hidden` on <body> does NOT stop background scroll once
// ScrollSmoother is active, since it drives scroll via transforms, not the
// native scrollbar.
export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const [ctxValue] = useState<SmoothScrollContextValue>(() => ({
    pause: () => smootherRef.current?.paused(true),
    resume: () => smootherRef.current?.paused(false),
  }));

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Respect reduced-motion users — they get normal instant scroll, no smoothing.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1, // higher = floatier/slower catch-up, lower = snappier. 1–1.5 is a natural range.
        smoothTouch: 0, // keep native scroll feel on phones — avoids jank + extra battery drain on mobile
        normalizeScroll: true, // fixes mobile address-bar-resize jump issues
        ignoreMobileResize: true,
      });

      return () => {
        smootherRef.current?.kill();
        smootherRef.current = null;
      };
    });

    // Images (Hero, Gallery, ResultsGrid, etc.) that finish loading after
    // mount change page height — without a refresh, ScrollSmoother/
    // ScrollTrigger keep using stale measurements and scroll math drifts.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    const images = Array.from(document.images);
    const pending = images.filter((img) => !img.complete);
    pending.forEach((img) => img.addEventListener("load", refresh, { once: true }));

    return () => {
      mm.revert();
      window.removeEventListener("load", refresh);
      pending.forEach((img) => img.removeEventListener("load", refresh));
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={ctxValue}>
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </SmoothScrollContext.Provider>
  );
}