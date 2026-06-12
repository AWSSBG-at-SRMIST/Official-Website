"use client";

import { motion } from "framer-motion";
import { GlobeAnimation } from "./GlobeAnimation";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 22 },
  },
};

export function Hero() {
  return (
    <section className="relative max-w-container-max mx-auto px-margin-desktop mb-stack-lg min-h-[85vh] flex items-center">
      {/* Globe — allowed to bleed right beyond section bounds (no overflow-hidden on parent) */}
      <GlobeAnimation />

      {/* Text stack occupies left portion; globe fills right portion naturally */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center z-10 w-full relative"
      >
        <div className="lg:col-span-6 xl:col-span-5 space-y-stack-md relative z-20">
          {/* Calm status badge — no pulse */}
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary font-label-sm font-semibold rounded-full border border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            AWS Student Builders · SRMIST
          </motion.span>

          {/* Headline — current scale, tightened letter-spacing */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-display leading-[1.05] tracking-[-0.04em] drop-shadow-sm"
          >
            Think Big.
            <br />
            <span className="text-primary-container drop-shadow-md">
              Build Bigger.
            </span>
          </motion.h1>

          {/* Description — plain, no card box */}
          <motion.p
            variants={itemVariants}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-md leading-relaxed"
          >
            Empowering the next generation of cloud architects, engineers, and
            founders at SRMIST. A community defined by practical excellence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-stack-sm pt-2"
          >
            <Link
              href="/join"
              className="bg-primary text-on-primary px-7 py-3.5 rounded-xl font-headline-md text-body-md hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 inline-block text-center"
            >
              Join Community
            </Link>
            <Link
              href="/events"
              className="border border-outline-variant text-on-surface px-7 py-3.5 rounded-xl font-headline-md text-body-md hover:bg-surface-container-low hover:border-primary/50 transition-all duration-300 inline-block text-center hover:-translate-y-0.5"
            >
              Explore Events
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
