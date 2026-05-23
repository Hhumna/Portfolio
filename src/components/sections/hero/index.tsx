"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/primitives/glow-orb";
import { GradientText } from "@/components/primitives/gradient-text";
import { GrainOverlay } from "@/components/primitives/grain-overlay";
import { Magnetic } from "@/components/primitives/magnetic";
import { profile } from "@/content/profile";
import { easeOutExpo } from "@/lib/motion";

import { Particles } from "./particles";
import { ScrollIndicator } from "./scroll-indicator";
import { Spotlight } from "./spotlight";
import { TypingHeadline } from "./typing-headline";

const choreography = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUpBlur = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export function Hero() {
  const { scrollY } = useScroll();
  const shouldReduce = useReducedMotion();
  const bgParallax = useTransform(scrollY, [0, 700], [0, shouldReduce ? 0 : -80]);
  const contentParallax = useTransform(scrollY, [0, 700], [0, shouldReduce ? 0 : -30]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* ── Atmosphere layers (parallax on scroll) ───────────── */}
      <motion.div
        aria-hidden
        style={{ y: bgParallax }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Gradient mesh background */}
        <div
          className="absolute inset-0 bg-mesh"
          style={{
            maskImage: "radial-gradient(ellipse 100% 80% at 50% 40%, black, transparent)",
          }}
        />

        {/* Ambient drifting orbs */}
        <GlowOrb className="left-[-15%] top-[10%]" size={700} duration={20} />
        <GlowOrb
          className="right-[-10%] top-[50%]"
          size={500}
          duration={24}
          color="hsl(220 80% 55%)"
        />
      </motion.div>

      {/* Canvas particles */}
      <Particles count={40} />

      {/* Mouse-following spotlight (desktop only, handled inside) */}
      <Spotlight />

      {/* Grain — sits above orbs/particles, below content */}
      <GrainOverlay className="z-[3]" opacity={0.05} />

      {/* Top + bottom vignette fades for cinematic framing */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-32 bg-gradient-to-b from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-40 bg-gradient-to-t from-background to-transparent"
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={choreography}
        style={{ y: contentParallax }}
        className="container relative z-10 grid grid-cols-12 gap-y-8 py-32 md:py-40"
      >
        <div className="col-span-12 lg:col-span-9">
          {/* Eyebrow line — metadata vibe */}
          <motion.div
            variants={fadeUpBlur}
            className="mb-8 flex items-center gap-3 font-mono text-eyebrow uppercase text-muted-foreground"
          >
            <span
              className="relative inline-block h-2 w-2 rounded-full bg-lume-500"
              aria-hidden
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-lume-500/60" />
            </span>
            <span>Available for select engagements · {profile.location}</span>
          </motion.div>

          {/* Name — the anchor */}
          <motion.h1
            variants={fadeUpBlur}
            className="font-display text-display-xl font-medium tracking-tight text-balance"
          >
            <span className="block text-bone">{profile.firstName}</span>
            <span className="block">
              <GradientText>{profile.lastName}.</GradientText>
            </span>
          </motion.h1>

          {/* Rotating role — typing animation */}
          <motion.div
            variants={fadeUpBlur}
            className="mt-8 flex items-center gap-3 font-mono text-sm text-muted-foreground sm:text-base"
          >
            <span className="text-bone-dim">{">"}</span>
            <TypingHeadline phrases={[...profile.rotatingRoles]} className="text-bone" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUpBlur}
            className="mt-10 max-w-xl font-sans text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpBlur}
            className="mt-12 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.2}>
              <Button asChild size="lg" className="group h-12 rounded-full px-6 focus-lume">
                <Link href="#projects">
                  View Work
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/10 bg-white/[0.02] px-6 backdrop-blur-xl hover:bg-white/[0.05] focus-lume"
              >
                <a href={profile.resumeUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="h-12 rounded-full px-6 text-muted-foreground hover:bg-white/[0.04] hover:text-bone focus-lume"
              >
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          {/* Social row — quiet metadata */}
          <motion.div
            variants={fadeUpBlur}
            className="mt-16 flex items-center gap-6 text-bone-dim"
          >
            <span className="eyebrow text-[0.65rem]">Elsewhere</span>
            <div className="h-px w-12 bg-border" />
            <SocialIcon href={profile.socials.linkedin} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={profile.socials.twitter} label="Twitter">
              <Twitter className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={profile.socials.email} label="Email">
              <Mail className="h-4 w-4" />
            </SocialIcon>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — bottom center */}
      <ScrollIndicator className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" />
    </section>
  );
}

/* ─── Small local component for social icons ─── */
function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="rounded-full p-2 text-bone-dim transition-colors duration-300 hover:text-lume-300 focus-lume"
    >
      {children}
    </a>
  );
}

function Twitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}