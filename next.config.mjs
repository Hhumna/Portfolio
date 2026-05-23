import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,             // remove "X-Powered-By: Next.js" — minor info leak
  compress: true,
  productionBrowserSourceMaps: false, // smaller bundles, harder to reverse-engineer

  // Modern output for smaller bundles & faster cold starts on Vercel
  output: "standalone",

  experimental: {
    // Tree-shake icons + UI libs aggressively — saves ~80KB on this stack
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-separator",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
    ],
    // Restrict generated sizes — fewer cached variants = faster, cheaper
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  async headers() {
    const securityHeaders = [
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
      // CSP is intentionally permissive for Vercel/GitHub avatars/inline styles
      // from Tailwind. Tighten further only after measuring what breaks.
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' va.vercel-scripts.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https:",
          "font-src 'self' data:",
          "connect-src 'self' https://api.github.com https://vitals.vercel-insights.com",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; "),
      },
    ];

    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        // Long-cache hashed assets — they're immutable by definition
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Fonts: long cache, CORS open
        source: "/fonts/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Keep this here as the canonical place for vanity redirects
      { source: "/cv", destination: "/resume.pdf", permanent: false },
      { source: "/gh", destination: "https://github.com/Hhumna", permanent: false },
      { source: "/li", destination: "https://www.linkedin.com/in/humna-sadia-936b11315/", permanent: false },
    ];
  },

  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
