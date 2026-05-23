import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Used sparingly — the accent appears at most 4 times per viewport.
 * This is one of them.
 */
export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        "bg-gradient-to-br from-bone via-lume-300 to-lume-500",
        className,
      )}
    >
      {children}
    </span>
  );
}