"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Mouse-following spotlight. Uses CSS variables + transform on a single
 * element — never triggers React re-renders. Throttled to rAF.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    // Skip on touch / coarse pointer
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      // Lerp toward target for smoothing
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (ref.current) {
        ref.current.style.setProperty("--x", `${currentX}px`);
        ref.current.style.setProperty("--y", `${currentY}px`);
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, [shouldReduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] opacity-60 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), hsl(190 90% 55% / 0.08), transparent 40%)",
      }}
    />
  );
}