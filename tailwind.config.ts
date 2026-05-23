import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" }, // intentionally narrow — editorial, not dashboard
    },
    extend: {
      colors: {
        // All values reference CSS vars defined in globals.css
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        // Semantic surfaces
        obsidian: {
          950: "#0A0A0B",
          900: "#101013",
          800: "#16161B",
          700: "#1F1F26",
          600: "#2A2A33",
        },
        bone: { DEFAULT: "#EDEAE3", muted: "#A8A39A", dim: "#6B6760" },
        lume: { 50: "#E0F7FE", 300: "#7DD3FC", 500: "#22D3EE", 700: "#0E7490" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Fluid type — clamp(min, preferred, max). Tied to viewport, capped at desktop.
        "display-xl": ["clamp(3.5rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "eyebrow": ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      backgroundImage: {
        "grain": "url('/grain.png')",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 0%, hsl(var(--accent) / 0.18) 0%, transparent 70%)",
        "mesh":
          "radial-gradient(at 20% 10%, hsl(190 90% 50% / 0.10) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(220 80% 55% / 0.08) 0px, transparent 50%), radial-gradient(at 0% 80%, hsl(170 70% 50% / 0.06) 0px, transparent 50%)",
      },
      boxShadow: {
        "glass": "inset 0 1px 0 0 hsl(0 0% 100% / 0.06), 0 1px 1px 0 hsl(0 0% 0% / 0.4), 0 8px 32px -8px hsl(0 0% 0% / 0.5)",
        "glow": "0 0 0 1px hsl(var(--accent) / 0.3), 0 0 32px -4px hsl(var(--accent) / 0.4)",
      },
      transitionTimingFunction: {
        // Tuned curves — these matter more than the values
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "orb-drift": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(2%, -2%) scale(1.05)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s var(--ease-out-expo, cubic-bezier(0.16,1,0.3,1)) forwards",
        "shimmer": "shimmer 8s linear infinite",
        "orb-drift": "orb-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [animate, typography],
};

export default config;