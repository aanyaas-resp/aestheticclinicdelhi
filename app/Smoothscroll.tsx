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
  scrollTo: (target: string | HTMLElement) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  pause: () => {},
  resume: () => {},
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const [ctxValue] = useState<SmoothScrollContextValue>(() => ({
    pause: () => smootherRef.current?.paused(true),
    resume: () => smootherRef.current?.paused(false),
    // Falls back to native smooth scroll for reduced-motion users, since
    // ScrollSmoother.create() never runs for them (see matchMedia below).
    scrollTo: (target) => {
      if (smootherRef.current) {
        smootherRef.current.scrollTo(target, true, "top top");
      } else {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
  }));

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
        smoothTouch: 0,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      return () => {
        smootherRef.current?.kill();
        smootherRef.current = null;
      };
    });

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