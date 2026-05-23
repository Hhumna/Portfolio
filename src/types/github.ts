/**
 * Subset of GitHub REST API responses we actually consume.
 * Full schemas are huge — we pick only fields the UI renders.
 */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  updated_at: string;
  created_at: string;
  archived: boolean;
  fork: boolean;
  default_branch: string;
}

/** Languages endpoint returns { "TypeScript": 12345, "CSS": 678 } */
export type GitHubLanguages = Record<string, number>;

/**
 * Normalized shape the UI consumes. Decouples components from the raw API
 * so we can switch providers (GitLab, custom backend) later without touching UI.
 */
export interface Project {
  id: number;
  slug: string;
  name: string;
  displayName: string;       // Title-cased, hyphens replaced
  description: string;
  url: string;
  liveUrl: string | null;
  stars: number;
  forks: number;
  primaryLanguage: string | null;
  languages: LanguageBreakdown[];
  topics: string[];
  category: ProjectCategory;
  pushedAt: string;          // ISO
  updatedAt: string;
  isArchived: boolean;
}

export interface LanguageBreakdown {
  name: string;
  percentage: number;
  bytes: number;
}

/** Derived from topics — see deriveCategory() in lib/github.ts */
export type ProjectCategory =
  | "web"
  | "mobile"
  | "ai-ml"
  | "systems"
  | "game"
  | "other";

export interface GitHubFetchError {
  status: number;
  message: string;
}
