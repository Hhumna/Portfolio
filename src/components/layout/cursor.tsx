"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Ring lags behind cursor for organic feel
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.4 });

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || isReduced) return;

    setActive(true);
    document.documentElement.classList.add("cursor-custom");

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      setHovering(
        !!el?.closest(
          'a, button, [role="button"], input, label, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
    };

    document.documentElement.addEventListener("mouseleave", () => setVisible(false));
    document.documentElement.addEventListener("mouseenter", () => setVisible(true));
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY]);

  if (!active) return null;

  return (
    <>
      {/* Outer glow ring — lags, expands on hover */}
      <motion.div
        className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
        }}
        transition={{ opacity: { duration: 0.2 }, width: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }, height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
      >
        <div
          className="h-full w-full rounded-full border border-lume-500/50"
          style={{
            background: "radial-gradient(circle, hsl(190 90% 55% / 0.06) 0%, transparent 70%)",
            boxShadow: "0 0 16px hsl(190 90% 55% / 0.25), inset 0 0 8px hsl(190 90% 55% / 0.05)",
          }}
        />
      </motion.div>

      {/* Inner dot — snaps to cursor precisely */}
      <motion.div
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lume-500"
        style={{
          x: mouseX,
          y: mouseY,
          boxShadow: "0 0 6px hsl(190 90% 55% / 0.8)",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 5 : 3,
          height: hovering ? 5 : 3,
        }}
        transition={{ opacity: { duration: 0.15 }, width: { duration: 0.15 }, height: { duration: 0.15 } }}
      />
    </>
  );
}
