// src/lib/motion.ts
import type { Variants } from "framer-motion";

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeOutQuart: [number, number, number, number] = [0.25, 1, 0.5, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeOutQuart } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
  show: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOutExpo } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOutExpo } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const heroChoreography: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

// Used by the <Stagger> primitive — mount-triggered variant keys
export const staggerItemVariants: Variants = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const motionConfig = {
  transition: { duration: 0.6, ease: easeOutExpo },
};

// Viewport defaults — used by every <Reveal>
export const viewportOnce = { once: true, margin: "-15% 0px -15% 0px" };

export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  cinematic: 1.1,
} as const;

export const spring = {
  responsive: { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.5 },
  gentle:     { type: "spring" as const, stiffness: 150, damping: 18, mass: 0.6 },
  weighted:   { type: "spring" as const, stiffness: 220, damping: 28, mass: 1.0 },
};