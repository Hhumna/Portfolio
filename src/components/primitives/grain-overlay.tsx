import { cn } from "@/lib/utils";

/**
 * Film-grain overlay. Sits above background, below content.
 * Uses an SVG turbulence filter — no PNG dependency, scales infinitely,
 * and weighs ~1KB instead of a 300KB texture.
 */
export function GrainOverlay({ className, opacity = 0.06 }: { className?: string; opacity?: number }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-[1] mix-blend-overlay", className)}
      style={{ opacity }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}