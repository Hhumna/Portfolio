"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import type { Project, ProjectCategory } from "@/types/github";
import { cn } from "@/lib/utils";

import { ProjectCard } from "./project-card";

const CATEGORIES: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all",     label: "All" },
  { id: "web",     label: "Web" },
  { id: "mobile",  label: "Mobile" },
  { id: "ai-ml",   label: "AI / ML" },
  { id: "systems", label: "Systems" },
  { id: "game",    label: "Games" },
  { id: "other",   label: "Other" },
];

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const deferredQuery = useDeferredValue(query); // keeps input responsive on large lists

  // Only show category chips that actually have projects — avoids dead filters
  const availableCategories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return CATEGORIES.filter((c) => c.id === "all" || present.has(c.id));
  }, [projects]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      // Match: name, description, language, topics
      return (
        p.displayName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.primaryLanguage?.toLowerCase().includes(q) ||
        p.topics.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, deferredQuery, category]);

  return (
    <div className="space-y-8">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone-dim"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, languages, topics…"
            aria-label="Search projects"
            className={cn(
              "h-11 w-full rounded-full border border-white/[0.06] bg-white/[0.02] pl-11 pr-10",
              "font-mono text-sm text-bone placeholder:text-bone-dim",
              "backdrop-blur-xl transition-colors",
              "focus:border-lume-500/40 focus:outline-none focus:ring-2 focus:ring-lume-500/20",
            )}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-bone-dim hover:text-bone focus-lume"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-1.5">
          {availableCategories.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 focus-lume",
                  active
                    ? "border border-lume-500/40 bg-lume-500/10 text-lume-300"
                    : "border border-white/[0.06] bg-white/[0.02] text-bone-muted hover:border-white/[0.12] hover:text-bone",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count — quiet metadata */}
      <p className="font-mono text-xs text-bone-dim" aria-live="polite">
        {filtered.length === projects.length
          ? `${projects.length} projects`
          : `${filtered.length} of ${projects.length} projects`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState onClear={() => { setQuery(""); setCategory("all"); }} />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/[0.08] py-16 text-center">
      <p className="font-display text-xl text-bone">No projects match.</p>
      <p className="font-mono text-xs text-bone-dim">Try a different search or category.</p>
      <button
        onClick={onClear}
        className="mt-2 rounded-full border border-white/[0.08] px-4 py-1.5 font-mono text-xs text-bone-muted hover:text-bone focus-lume"
      >
        Clear filters
      </button>
    </div>
  );
}
