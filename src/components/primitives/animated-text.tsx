"use client";
import { motion, type Variants } from "framer-motion";

import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const word: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}

/**
 * Word-by-word reveal. Each word wraps in an overflow-hidden span so the
 * letters slide up from below — gives the headline weight and intentionality.
 *
 * Accessibility: screen readers get the plain string via aria-label.
 * The animated spans are aria-hidden — they are purely visual.
 */
export function AnimatedText({ text, className, as: Tag = "h2" }: AnimatedTextProps) {
  const words = text.split(" ");
  return (
    <Tag className={cn("inline-block", className)}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={container}
        aria-label={text}
      >
        {words.map((w, i) => (
          <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.1em]">
            <motion.span variants={word} className="inline-block">
              {w}
              {i < words.length - 1 && " "}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
