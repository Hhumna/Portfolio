"use client";
import { motion } from "framer-motion";
import { Reveal } from "@/components/primitives/reveal";
import { GradientText } from "@/components/primitives/gradient-text";
import { profile } from "@/content/profile";
import { scaleIn, viewportOnce, easeOutExpo } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container">
        <Reveal>
          <p className="eyebrow mb-4">01 — About</p>
          <h2 className="font-display text-display-lg font-medium tracking-tight text-bone text-balance">
            Crafting experiences,{" "}
            <GradientText>not just code.</GradientText>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={scaleIn}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-xl"
          >
            {/* Subtle hover glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 0%, hsl(190 90% 55% / 0.06), transparent 50%)",
              }}
            />
            <p className="relative text-lg leading-relaxed text-bone-muted">
              {profile.bio[0]}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={scaleIn}
            transition={{ delay: 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-xl"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 0%, hsl(190 90% 55% / 0.06), transparent 50%)",
              }}
            />
            <p className="relative text-lg leading-relaxed text-bone-muted">
              {profile.bio[1]}
            </p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
          }}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { value: "3+", label: "Years building" },
            { value: "20+", label: "Projects shipped" },
            { value: "10+", label: "Technologies" },
            { value: profile.location, label: "Based in" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
              }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <p className="font-display text-2xl font-semibold text-bone">{stat.value}</p>
              <p className="mt-1 font-mono text-xs text-bone-dim">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
