"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  variants?: Variants;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
}

/**
 * Scroll-triggered reveal. Single source of truth for entrance animations
 * throughout the site — change the variants here, change the whole feel.
 */
export function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}