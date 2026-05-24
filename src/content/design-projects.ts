import type { DesignProject } from "@/types/design-project";

/**
 * Design projects from Behance.
 * Add entries here — the Creative Portfolio section will render them automatically.
 * Cover images live in /public/design/.
 *
 * To add a new project:
 *   1. Drop the cover image into public/design/ (recommended: 1200x900 JPG, < 200KB)
 *   2. Add a new object to this array following the DesignProject interface
 *   3. Commit + push → Vercel will auto-deploy
 */
export const designProjects: readonly DesignProject[] = [
  // Entries will be added here as Humna shares them
] as const;

export const behanceProfileUrl = "https://www.behance.net/humnaawan";
