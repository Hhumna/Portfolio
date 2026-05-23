"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypingHeadlineProps {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}

/**
 * Typing animation with proper accessibility:
 * - Full phrase list is rendered for screen readers (visually hidden)
 * - aria-live="off" on the visible part to avoid spam
 * - Cursor is decorative
 */
export function TypingHeadline({
  phrases,
  className,
  typeSpeed = 70,
  deleteSpeed = 35,
  pauseMs = 1800,
}: TypingHeadlineProps) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    // Reduced motion → just show first phrase, no animation
    if (shouldReduce) {
      setText(phrases[0]);
      return;
    }

    const current = phrases[phraseIndex];
    const isComplete = !isDeleting && text === current;
    const isEmpty = isDeleting && text === "";

    if (isComplete) {
      const t = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (isEmpty) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const t = setTimeout(
      () => {
        setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      },
      isDeleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(t);
  }, [text, isDeleting, phraseIndex, phrases, typeSpeed, deleteSpeed, pauseMs, shouldReduce]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      {/* Screen-reader-only: full phrase list, read once */}
      <span className="sr-only">{phrases.join(". ")}</span>

      {/* Visible animated text */}
      <span aria-live="off" className="tabular-nums">
        {text}
      </span>

      {/* Blinking caret */}
      <span
        aria-hidden
        className="ml-1 inline-block h-[0.85em] w-[2px] translate-y-[0.05em] bg-lume-500 motion-safe:animate-pulse"
      />
    </span>
  );
}