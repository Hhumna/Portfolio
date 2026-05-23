"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollIndicator({ className }: { className?: string }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.a
      href="#about"
      aria-label="Scroll to about section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      className={cn(
        "group flex flex-col items-center gap-2 focus-lume rounded-md p-2",
        className,
      )}
    >
      <span className="eyebrow text-[0.65rem]">Scroll</span>
      <div className="relative h-10 w-[1px] overflow-hidden bg-border">
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-lume-500 to-transparent"
          animate={shouldReduce ? {} : { y: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.a>
  );
}