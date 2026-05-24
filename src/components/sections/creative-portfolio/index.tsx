import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/primitives/reveal";
import { designProjects, behanceProfileUrl } from "@/content/design-projects";

import { DesignCard } from "./design-card";

export function CreativePortfolio() {
  // Don't render the section at all if there are no projects yet
  if (designProjects.length === 0) return null;

  return (
    <section
      id="creative"
      aria-label="Creative portfolio"
      className="relative py-32 md:py-40"
    >
      <div className="container">
        {/* Header */}
        <Reveal>
          <p className="eyebrow mb-4">05 — Creative Portfolio</p>
          <h2 className="font-display text-display-lg font-medium tracking-tight text-bone text-balance">
            Design work.
          </h2>
          <p className="mt-4 max-w-xl text-bone-muted text-pretty">
            Visual design, brand identity, and marketing graphics for clients across
            Pakistan and beyond. Selected work — full portfolio on Behance.
          </p>
        </Reveal>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {designProjects.map((project, i) => (
            <DesignCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Footer — link to full Behance profile */}
        <div className="mt-12 flex justify-end">
          <a
            href={behanceProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-bone-muted transition-colors hover:text-lume-300 focus-lume rounded-md"
          >
            View all on Behance
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
