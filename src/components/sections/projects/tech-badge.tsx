import { cn } from "@/lib/utils";

/**
 * Color tokens for known languages/frameworks. Anything not listed
 * falls back to a neutral badge — no broken colors, no `undefined`.
 */
const PALETTE: Record<string, { bg: string; text: string; dot: string }> = {
  typescript:    { bg: "bg-[#3178C6]/10", text: "text-[#9BCBFF]", dot: "bg-[#3178C6]" },
  javascript:    { bg: "bg-[#F7DF1E]/10", text: "text-[#F7DF1E]", dot: "bg-[#F7DF1E]" },
  python:        { bg: "bg-[#3776AB]/10", text: "text-[#9BC4E2]", dot: "bg-[#3776AB]" },
  "c++":         { bg: "bg-[#F34B7D]/10", text: "text-[#F8A4BC]", dot: "bg-[#F34B7D]" },
  c:             { bg: "bg-[#A8B9CC]/10", text: "text-[#D7DCE3]", dot: "bg-[#A8B9CC]" },
  java:          { bg: "bg-[#E76F00]/10", text: "text-[#FFB778]", dot: "bg-[#E76F00]" },
  dart:          { bg: "bg-[#0175C2]/10", text: "text-[#7FC0EA]", dot: "bg-[#0175C2]" },
  rust:          { bg: "bg-[#DEA584]/10", text: "text-[#EFCCB4]", dot: "bg-[#DEA584]" },
  go:            { bg: "bg-[#00ADD8]/10", text: "text-[#7FD6EC]", dot: "bg-[#00ADD8]" },
  html:          { bg: "bg-[#E34F26]/10", text: "text-[#F09A82]", dot: "bg-[#E34F26]" },
  css:           { bg: "bg-[#1572B6]/10", text: "text-[#86B5DA]", dot: "bg-[#1572B6]" },
  cuda:          { bg: "bg-[#76B900]/10", text: "text-[#B5DC7F]", dot: "bg-[#76B900]" },
  react:         { bg: "bg-[#61DAFB]/10", text: "text-[#B0ECFD]", dot: "bg-[#61DAFB]" },
  "react-native":{ bg: "bg-[#61DAFB]/10", text: "text-[#B0ECFD]", dot: "bg-[#61DAFB]" },
  flutter:       { bg: "bg-[#02569B]/10", text: "text-[#7FAACD]", dot: "bg-[#02569B]" },
  firebase:      { bg: "bg-[#FFCA28]/10", text: "text-[#FFE493]", dot: "bg-[#FFCA28]" },
  nextjs:        { bg: "bg-white/5",      text: "text-bone",      dot: "bg-white" },
  "node.js":     { bg: "bg-[#339933]/10", text: "text-[#99C499]", dot: "bg-[#339933]" },
  streamlit:     { bg: "bg-[#FF4B4B]/10", text: "text-[#FFA5A5]", dot: "bg-[#FF4B4B]" },
};

interface TechBadgeProps {
  label: string;
  /** Show a colored dot prefix — good for primary language */
  variant?: "default" | "dot";
  className?: string;
}

export function TechBadge({ label, variant = "default", className }: TechBadgeProps) {
  const key = label.toLowerCase();
  const palette = PALETTE[key] ?? {
    bg: "bg-white/[0.04]",
    text: "text-bone-muted",
    dot: "bg-bone-dim",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] px-2.5 py-1",
        "font-mono text-[0.7rem] uppercase tracking-wider",
        palette.bg,
        palette.text,
        className,
      )}
    >
      {variant === "dot" && <span className={cn("h-1.5 w-1.5 rounded-full", palette.dot)} />}
      {label}
    </span>
  );
}
