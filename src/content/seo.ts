import { profile } from "./profile";

export const seo = {
  title: profile.title,
  description: profile.bio,
  keywords: [
    "portfolio",
    "software engineer",
    "mobile developer",
    "react native",
    "flutter",
    "next.js",
    "AI",
    "machine learning",
    "FAST-NUCES",
  ],
  author: profile.name,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://humna.dev",
  ogImage: "/og/default.png",
};
