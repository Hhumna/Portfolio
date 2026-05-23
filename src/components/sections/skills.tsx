"use client";
import { motion } from "framer-motion";
import { Reveal } from "@/components/primitives/reveal";
import { skills } from "@/content/skills";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container">
        <Reveal>
          <p className="eyebrow mb-4">02 — Capabilities</p>
          <h2 className="font-display text-display-lg font-medium tracking-tight text-bone text-balance">
            What I work with.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {skills.map((skillGroup, i) => (
            <motion.div
              key={skillGroup.category}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.04, delayChildren: i * 0.08 } },
              }}
              className="space-y-5"
            >
              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: easeOutExpo } },
                }}
                className="font-display text-lg font-semibold text-bone"
              >
                {skillGroup.category}
              </motion.h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0.88, filter: "blur(4px)" },
                      show: {
                        opacity: 1, scale: 1, filter: "blur(0px)",
                        transition: { duration: 0.5, ease: easeOutExpo },
                      },
                    }}
                    whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                    className="cursor-default rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-xs text-bone-muted transition-colors duration-300 hover:border-lume-500/30 hover:bg-lume-500/[0.04] hover:text-bone"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
