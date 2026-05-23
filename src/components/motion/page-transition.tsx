"use client";
import { motion } from "framer-motion";
import React from "react";

export interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      exit={{ opacity: 0, filter: "blur(6px)", y: -6 }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 0.45 },
      }}
    >
      {children}
    </motion.div>
  );
}
