"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  /** HSL color — defaults to accent */
  color?: string;
  size?: number;
  /** Animation duration in seconds */
  duration?: number;
}

/**
 * Ambient drifting glow. Uses transform/opacity only — composited on GPU.
 * Three layered radial gradients give it depth instead of looking flat.
 */
export function GlowOrb({
  className,
  color = "hsl(190 90% 55%)",
  size = 600,
  duration = 18,
}: GlowOrbProps) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 50% 50%,
          ${color.replace(")", " / 0.35)")} 0%,
          ${color.replace(")", " / 0.15)")} 30%,
          transparent 70%)`,
        filter: "blur(40px)",
      }}
      animate={shouldReduce ? {} : {
        x: [0, 30, -20, 0],
        y: [0, -25, 20, 0],
        scale: [1, 1.08, 0.96, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}