"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/primitives/glow-orb";
import { GradientText } from "@/components/primitives/gradient-text";
import { Magnetic } from "@/components/primitives/magnetic";
import { profile } from "@/content/profile";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-40">
      {/* Ambient atmosphere */}
      <GlowOrb
        className="left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        size={900}
        duration={22}
      />

      {/* Subtle radial vignette to keep content readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 30%, hsl(240 6% 4% / 0.7) 100%)",
        }}
      />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.p variants={fadeUp} className="eyebrow mb-6">
            06 — Get In Touch
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display text-display-lg font-medium tracking-tight text-balance"
          >
            Let&apos;s build something{" "}
            <GradientText>remarkable.</GradientText>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-lg text-bone-muted text-pretty"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center gap-4">
            <Magnetic strength={0.2}>
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full px-8 focus-lume"
              >
                <a href={`mailto:${profile.socials.email}`}>
                  Get in Touch
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/10 bg-white/[0.02] px-8 backdrop-blur-xl hover:bg-white/[0.05] focus-lume"
              >
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 font-mono text-xs text-bone-dim">
            {profile.socials.email}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
