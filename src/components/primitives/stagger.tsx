"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerItemVariants } from "@/lib/motion";

export interface StaggerProps {
  delay?: number;
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}

const Stagger = React.forwardRef<HTMLDivElement, StaggerProps>(
  ({ className, delay = 0, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.08,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={staggerItemVariants}>{child}</motion.div>
        ) : (
          child
        ),
      )}
    </motion.div>
  ),
);
Stagger.displayName = "Stagger";

export { Stagger };
