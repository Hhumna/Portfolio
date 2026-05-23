"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal } from "@/components/primitives/reveal";
import { experience } from "@/content/experience";
import { formatDateRange } from "@/lib/utils";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 30%"],
  });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container">
        <Reveal>
          <p className="eyebrow mb-4">03 — Journey</p>
          <h2 className="font-display text-display-lg font-medium tracking-tight text-bone text-balance">
            Where I&apos;ve worked.
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative mt-16 pl-8 md:pl-14">
          {/* Timeline track */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.05]">
            {/* Animated fill line */}
            <motion.div
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                scaleY: lineScaleY,
                height: "100%",
                background: "linear-gradient(to bottom, hsl(190 90% 55%), hsl(190 90% 55% / 0.4), transparent)",
              }}
            />
          </div>

          <div className="space-y-10">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: i * 0.06 }}
                className="relative"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.06 + 0.2 }}
                  className="absolute -left-[1.875rem] top-[1.35rem] h-2.5 w-2.5 rounded-full border-2 border-lume-500 bg-background md:-left-[3.375rem]"
                  style={{ boxShadow: "0 0 8px hsl(190 90% 55% / 0.5)" }}
                />

                <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-white/[0.10] hover:bg-white/[0.04]">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-bone">
                        {exp.position}
                      </h3>
                      <p className="mt-1 font-mono text-sm text-lume-300">{exp.company}</p>
                    </div>
                    <time className="shrink-0 font-mono text-xs text-bone-dim">
                      {formatDateRange(exp.duration.start, exp.duration.end)}
                    </time>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-bone-muted">{exp.description}</p>

                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm text-bone-muted"
                      >
                        <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-lume-500/50" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
