"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import type { DesignProject } from "@/types/design-project";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

/**
 * Visual project card — image-led layout for design work.
 * Hover: scale + cyan glow following cursor (same language as code project cards).
 * Click: opens Behance project in new tab.
 */
export function DesignCard({ project, index }: { project: DesignProject; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const aspect = project.aspectRatio ?? "4/3";
  const aspectClass = {
    "4/3":  "aspect-[4/3]",
    "1/1":  "aspect-square",
    "3/4":  "aspect-[3/4]",
    "16/9": "aspect-video",
  }[aspect];

  return (
    <motion.a
      ref={ref}
      href={project.behanceUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: easeOutExpo, delay: index * 0.06 }}
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-2xl",
        "border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl",
        "transition-colors duration-500 hover:border-white/[0.12] focus-lume",
      )}
      aria-label={`${project.title} — view on Behance`}
    >
      {/* Cursor-follow accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), hsl(190 90% 55% / 0.10), transparent 40%)",
        }}
      />

      {/* Image */}
      <div className={cn("relative w-full overflow-hidden", aspectClass)}>
        <Image
          src={project.coverImage}
          alt={project.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority={index < 3}
        />
        {/* Subtle gradient overlay for legibility on hover */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      {/* Caption */}
      <div className="relative z-10 flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="font-mono text-eyebrow uppercase text-bone-dim">
            {project.category}
            {project.year && <> · {project.year}</>}
          </p>
          <h3 className="mt-1.5 font-display text-xl font-medium tracking-tight text-bone">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight
          aria-hidden
          className="mt-1 h-4 w-4 shrink-0 text-bone-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lume-300"
        />
      </div>
    </motion.a>
  );
}
