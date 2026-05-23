import { Suspense } from "react";
import { AlertCircle } from "lucide-react";

import { GitHubError, getFeaturedProjects } from "@/lib/github";
import { Reveal } from "@/components/primitives/reveal";

import { ProjectCardSkeleton } from "./project-card-skeleton";
import { ProjectExplorer } from "./project-explorer";

export async function Projects() {
  return (
    <section id="projects" aria-label="Selected work" className="relative py-32 md:py-40">
      <div className="container mx-auto px-6">
        {/* Section header — consistent with the design system */}
        <Reveal>
          <p className="eyebrow mb-4">04 — Selected Work</p>
          <h2 className="font-display text-display-lg font-medium tracking-tight text-bone text-balance">
            Things I&apos;ve built.
          </h2>
          <p className="mt-4 max-w-xl text-bone-muted text-pretty">
            Pulled live from GitHub — projects tagged{" "}
            <code className="font-mono text-xs text-lume-300">#portfolio</code> appear here
            automatically. Updated on every push.
          </p>
        </Reveal>

        <div className="mt-16">
          <Suspense fallback={<ProjectsGridSkeleton />}>
            <ProjectsContent />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

/**
 * Separate async component so Suspense actually has something to suspend on.
 * Errors are caught here and rendered inline — they don't take down the page.
 */
async function ProjectsContent() {
  try {
    const projects = await getFeaturedProjects();

    if (projects.length === 0) {
      return (
        <div className="rounded-2xl border border-dashed border-white/[0.08] py-16 text-center">
          <p className="font-display text-xl text-bone">No featured projects yet.</p>
          <p className="mt-2 font-mono text-xs text-bone-dim">
            Add the <code className="text-lume-300">portfolio</code> topic to a GitHub repo to feature it.
          </p>
        </div>
      );
    }

    return <ProjectExplorer projects={projects} />;
  } catch (err) {
    return <ProjectsError error={err} />;
  }
}

function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

function ProjectsError({ error }: { error: unknown }) {
  const isGh = error instanceof GitHubError;
  const isRateLimit = isGh && error.status === 403;

  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.03] py-12 text-center"
    >
      <AlertCircle className="h-6 w-6 text-red-400" />
      <p className="font-display text-lg text-bone">
        {isRateLimit ? "GitHub rate limit reached." : "Couldn't reach GitHub right now."}
      </p>
      <p className="max-w-md font-mono text-xs text-bone-dim">
        {isRateLimit
          ? "Try again in an hour, or set GITHUB_TOKEN to raise the limit from 60 to 5000 req/hr."
          : "The portfolio will retry automatically on the next revalidation."}
      </p>
    </div>
  );
}
