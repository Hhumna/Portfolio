"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Maximum translate range in pixels. Keep small — 40-80 reads as premium, 200 reads as cheap. */
  range?: number;
  className?: string;
}

export function Parallax({ children, range = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // When reduced motion is on, range collapses to zero — element stays still
  const effectiveRange = shouldReduce ? 0 : range;
  const y = useTransform(scrollYProgress, [0, 1], [effectiveRange, -effectiveRange]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
