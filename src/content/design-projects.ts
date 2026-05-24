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
  {
    slug: "cs-farewell-final-chapter",
    title: "The Final Chapter",
    category: "Event Branding",
    description: "Identity, ticket, and standee design for FAST-NUCES Computer Science Farewell 2025.",
    coverImage: "/design/cs-farewell-final-chapter.jpg",
    alt: "The Final Chapter — black and silver event branding featuring a ticket and standee design for the FAST-NUCES CS farewell party.",
    behanceUrl: "https://www.behance.net/gallery/249303959/CS-Farewell",
    year: "2025",
    aspectRatio: "16/9",
  },
] as const;

export const behanceProfileUrl = "https://www.behance.net/humnaawan";
