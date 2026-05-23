"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Star, ExternalLink } from "lucide-react";
import { useRef } from "react";

import type { Project } from "@/types/github";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

import { TechBadge } from "./tech-badge";

/**
 * Card has two motion concerns:
 *   1. Entrance — handled by parent <Reveal> wrapper, not here.
 *   2. Hover — local: lifts subtly, accent glow follows the cursor.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: easeOutExpo, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl",
        "transition-colors duration-500 hover:border-white/[0.12]",
      )}
    >
      {/* Cursor-follow accent glow (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), hsl(190 90% 55% / 0.08), transparent 40%)",
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header — category + arrow */}
        <header className="flex items-start justify-between gap-4">
          <span className="font-mono text-eyebrow uppercase text-bone-dim">
            {project.category.replace("-", " / ")}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.displayName} on GitHub`}
            className="rounded-full p-1 text-bone-muted transition-colors hover:text-lume-300 focus-lume"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </header>

        {/* Title + description */}
        <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-bone">
          {project.displayName}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-bone-muted text-pretty line-clamp-3">
          {project.description}
        </p>

        {/* Spacer to push footer down */}
        <div className="flex-1" />

        {/* Tech badges */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.primaryLanguage && (
            <TechBadge label={project.primaryLanguage} variant="dot" />
          )}
          {project.topics.slice(0, 4).map((topic) => (
            <TechBadge key={topic} label={topic} />
          ))}
        </div>

        {/* Footer — stats + links */}
        <footer className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-4 font-mono text-xs text-bone-dim">
            <span className="inline-flex items-center gap-1.5" aria-label={`${project.stars} stars`}>
              <Star className="h-3.5 w-3.5" /> {project.stars}
            </span>
            <span className="inline-flex items-center gap-1.5" aria-label={`${project.forks} forks`}>
              <GitFork className="h-3.5 w-3.5" /> {project.forks}
            </span>
            <time dateTime={project.pushedAt} className="text-bone-dim/70">
              {formatRelative(project.pushedAt)}
            </time>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-lume-300 transition-colors hover:text-lume-500 focus-lume rounded-md"
            >
              Live <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </footer>
      </div>
    </motion.article>
  );
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}
