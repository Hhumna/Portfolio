export interface DesignProject {
  /** Unique slug — used as React key and image filename basis */
  slug: string;
  /** Display title */
  title: string;
  /** Short category label, e.g. "Brand Identity", "Marketing", "Social Media" */
  category: string;
  /** 1-2 line description */
  description: string;
  /** Path relative to /public, e.g. "/design/brand-x-cover.jpg" */
  coverImage: string;
  /** Image alt text for accessibility */
  alt: string;
  /** Direct Behance project URL */
  behanceUrl: string;
  /** Year as string (e.g. "2024") — optional */
  year?: string;
  /** Aspect ratio of cover image — affects grid layout. Default "4/3". */
  aspectRatio?: "4/3" | "1/1" | "3/4" | "16/9";
}
