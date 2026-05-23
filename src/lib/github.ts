import "server-only"; // hard guarantee: never bundled into client code

import type {
  GitHubRepo,
  GitHubLanguages,
  Project,
  LanguageBreakdown,
  ProjectCategory,
} from "@/types/github";

const GITHUB_API = "https://api.github.com";

const USERNAME = process.env.GITHUB_USERNAME!;
const TOKEN = process.env.GITHUB_TOKEN;
const FEATURED_TOPICS = (process.env.GITHUB_FEATURED_TOPICS ?? "portfolio,featured")
  .split(",")
  .map((t) => t.trim().toLowerCase())
  .filter(Boolean);
const REVALIDATE = Number(process.env.GITHUB_REVALIDATE_SECONDS ?? 3600);

/* ────────────────────────────────────────────────────────────
 * Shared fetch wrapper — auth, ISR, error normalization, tags
 * ──────────────────────────────────────────────────────────── */

interface GhFetchOptions {
  /** Additional cache tags for revalidateTag() */
  tags?: string[];
  /** Override revalidation window (seconds) */
  revalidate?: number;
}

async function gh<T>(path: string, opts: GhFetchOptions = {}): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(`${GITHUB_API}${path}`, {
    headers,
    next: {
      revalidate: opts.revalidate ?? REVALIDATE,
      tags: ["github", ...(opts.tags ?? [])],
    },
  });

  if (!res.ok) {
    // Surface rate-limit info specifically — it's the most common failure
    const remaining = res.headers.get("x-ratelimit-remaining");
    const reset = res.headers.get("x-ratelimit-reset");
    const detail =
      res.status === 403 && remaining === "0"
        ? `Rate limit exhausted. Resets at ${reset ? new Date(Number(reset) * 1000).toISOString() : "unknown"}.`
        : await res.text().catch(() => res.statusText);

    throw new GitHubError(res.status, `GitHub ${path} failed: ${detail}`);
  }

  return res.json() as Promise<T>;
}

export class GitHubError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "GitHubError";
  }
}

/* ────────────────────────────────────────────────────────────
 * Public API
 * ──────────────────────────────────────────────────────────── */

/**
 * Fetch all public repos for the configured user, then filter to featured.
 * Featured = repo contains at least one configured topic (default: portfolio, featured).
 *
 * Returns repos sorted by pushed_at desc so the most recently active work shows first.
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const repos = await gh<GitHubRepo[]>(
    `/users/${USERNAME}/repos?per_page=100&sort=pushed&type=owner`,
    { tags: ["github:repos"] },
  );

  const featured = repos.filter(
    (r) => !r.archived && !r.fork && r.topics.some((t) => FEATURED_TOPICS.includes(t.toLowerCase())),
  );

  // Fetch languages in parallel — capped to avoid burning the rate limit
  const withLanguages = await Promise.all(
    featured.map(async (repo) => {
      const languages = await getLanguagesForRepo(repo.name).catch(() => ({}));
      return normalizeProject(repo, languages);
    }),
  );

  return withLanguages.sort(
    (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime(),
  );
}

export async function getLanguagesForRepo(repoName: string): Promise<GitHubLanguages> {
  return gh<GitHubLanguages>(`/repos/${USERNAME}/${repoName}/languages`, {
    tags: [`github:languages:${repoName}`],
  });
}

/**
 * README is fetched lazily — only when a card is expanded or the
 * project detail route is visited. Returns null on 404 (no README).
 */
export async function getReadmeForRepo(repoName: string): Promise<string | null> {
  try {
    const data = await gh<{ content: string; encoding: string }>(
      `/repos/${USERNAME}/${repoName}/readme`,
      { tags: [`github:readme:${repoName}`] },
    );
    if (data.encoding !== "base64") return null;
    // Server-side decode — Buffer is available in Node runtime
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch (err) {
    if (err instanceof GitHubError && err.status === 404) return null;
    throw err;
  }
}

/* ────────────────────────────────────────────────────────────
 * Normalization — raw repo → UI-friendly Project
 * ──────────────────────────────────────────────────────────── */

function normalizeProject(repo: GitHubRepo, languages: GitHubLanguages): Project {
  const totalBytes = Object.values(languages).reduce((sum, b) => sum + b, 0);
  const languageBreakdown: LanguageBreakdown[] = Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6); // cap badges per card

  return {
    id: repo.id,
    slug: repo.name,
    name: repo.name,
    displayName: prettifyName(repo.name),
    description: repo.description?.trim() || "No description provided.",
    url: repo.html_url,
    liveUrl: sanitizeHomepage(repo.homepage),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    primaryLanguage: repo.language,
    languages: languageBreakdown,
    topics: repo.topics.filter((t) => !FEATURED_TOPICS.includes(t.toLowerCase())),
    category: deriveCategory(repo),
    pushedAt: repo.pushed_at,
    updatedAt: repo.updated_at,
    isArchived: repo.archived,
  };
}

function prettifyName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bPos\b/g, "POS")
    .replace(/\bApi\b/g, "API")
    .replace(/\bUi\b/g, "UI")
    .replace(/\bAi\b/g, "AI");
}

function sanitizeHomepage(url: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (!/^https?:\/\//.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

/**
 * Category derivation: explicit topic > language heuristic > fallback.
 * Add `category:web`, `category:mobile`, etc. topics on GitHub for full control.
 */
function deriveCategory(repo: GitHubRepo): ProjectCategory {
  const topics = repo.topics.map((t) => t.toLowerCase());

  // Explicit override via `category:*` topic
  for (const t of topics) {
    if (t.startsWith("category:")) {
      const cat = t.slice(9) as ProjectCategory;
      if (["web", "mobile", "ai-ml", "systems", "game", "other"].includes(cat)) return cat;
    }
  }

  // Topic heuristics
  if (topics.some((t) => /react-native|flutter|android|ios|mobile/.test(t))) return "mobile";
  if (topics.some((t) => /machine-learning|ml|ai|deep-learning|nlp|cv/.test(t))) return "ai-ml";
  if (topics.some((t) => /cuda|systems|os|kernel|ipc|concurrency/.test(t))) return "systems";
  if (topics.some((t) => /game|unity|godot/.test(t))) return "game";
  if (topics.some((t) => /next|react|vue|svelte|web/.test(t))) return "web";

  // Language fallback
  const lang = repo.language?.toLowerCase();
  if (lang === "dart" || lang === "swift" || lang === "kotlin") return "mobile";
  if (lang === "c++" || lang === "c" || lang === "rust" || lang === "cuda") return "systems";
  if (lang === "python") return "ai-ml";
  if (lang === "javascript" || lang === "typescript") return "web";

  return "other";
}
