"use client";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  /** Show the radial fade mask. Default true — without it the grid feels flat. */
  fade?: boolean;
}

export function GridBackground({ className, fade = true }: GridBackgroundProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {/* Static grid — pure CSS, no JS cost */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(0 0% 100% / 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsl(0 0% 100% / 0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: fade
            ? "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)"
            : undefined,
          WebkitMaskImage: fade
            ? "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)"
            : undefined,
        }}
      />
      {/* Subtle ambient pulse — the only motion on the grid */}
      {!shouldReduce && (
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle 600px at 50% 50%, hsl(190 90% 55% / 0.03), transparent)",
          }}
        />
      )}
    </div>
  );
}
