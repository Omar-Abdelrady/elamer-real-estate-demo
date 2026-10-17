"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.classList.add("motion-enabled");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return () => document.body.classList.remove("motion-enabled");
    }

    const lenis = new Lenis({ smoothWheel: true, lerp: 0.08 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      document.body.classList.remove("motion-enabled");
    };
  }, []);

  return <div data-smooth-scroll>{children}</div>;
}
