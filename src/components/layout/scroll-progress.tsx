"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 top-0 right-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(190 90% 55%), hsl(220 80% 65%), hsl(190 90% 55%))",
        boxShadow: "0 0 8px hsl(190 90% 55% / 0.7)",
      }}
    />
  );
}
