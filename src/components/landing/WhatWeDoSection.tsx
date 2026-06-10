"use client";

import { motion } from "framer-motion";
import { Terminal, Blocks, BadgeCheck, Mic2, ArrowRight } from "lucide-react";
import Link from "next/link";

const cardVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: { duration: 0.35, ease: "easeInOut" as const },
  },
  hover: {
    scale: 1.025,
    y: -8,
    boxShadow:
      "0 24px 48px rgba(37, 99, 235, 0.18), 0 4px 12px rgba(37,99,235,0.10)",
    transition: { duration: 0.35, ease: "easeInOut" as const },
  },
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.18, rotate: -6, transition: { type: "spring" as const, stiffness: 300, damping: 15 } },
};

const arrowVariants = {
  rest: { x: 0, opacity: 0.7 },
  hover: { x: 6, opacity: 1, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
};

const primaryCardVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
    transition: { duration: 0.35, ease: "easeInOut" as const },
  },
  hover: {
    scale: 1.03,
    y: -10,
    boxShadow:
      "0 32px 64px rgba(37,99,235,0.40), 0 8px 24px rgba(37,99,235,0.30)",
    transition: { duration: 0.35, ease: "easeInOut" as const },
  },
};

export const WhatWeDoSection = () => {
  return (
    <section className="py-32 reveal">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="mb-stack-lg text-center max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-headline-lg mb-4">
            Cultivating Excellence
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            We offer a spectrum of opportunities designed to accelerate your
            growth as a developer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Workshops & Labs — Wide card */}
          <div className="md:col-span-2">
            <motion.div
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              className="bg-white/75 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-primary/10 cursor-pointer h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <motion.div
                  variants={iconVariants}
                  className="bg-primary/10 text-primary p-4 rounded-2xl"
                >
                  <Terminal size={32} />
                </motion.div>
                <span className="font-label-sm font-bold tracking-wider text-on-surface-variant">
                  SIGNATURE FORMAT
                </span>
              </div>
              <h3 className="font-headline-lg text-headline-lg font-bold mb-4 text-on-surface">
                Workshops &amp; Labs
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-12">
                Weekly technical deep-dives covering AWS services, full-stack
                development, and system architecture.
              </p>
              <motion.div variants={arrowVariants} className="inline-flex items-center gap-2 font-label-md font-bold text-primary">
                <Link
                  className="inline-flex items-center gap-2 font-label-md font-bold text-primary"
                  href="/workshops/syllabus"
                >
                  Explore Syllabus <ArrowRight size={20} />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Hackathons — Primary color card */}
          <div>
            <motion.div
              variants={primaryCardVariants}
              initial="rest"
              whileHover="hover"
              className="bg-primary text-on-primary rounded-[2rem] p-8 md:p-12 cursor-pointer h-full relative overflow-hidden"
            >
              {/* Animated glow orb inside card */}
              <motion.div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                variants={iconVariants}
                className="bg-white/10 p-4 rounded-2xl inline-block mb-8"
              >
                <Blocks size={32} />
              </motion.div>
              <h3 className="font-headline-md text-headline-md font-bold mb-4">
                Hackathons
              </h3>
              <p className="font-body-md text-body-md text-on-primary/80 mb-12">
                48-hour sprints to build innovative solutions for global challenges.
              </p>
              <div className="mt-auto">
                <motion.div variants={arrowVariants} className="inline-flex">
                  <Link
                    href="/hacksrm"
                    className="text-on-primary/70 font-label-sm hover:text-on-primary transition-colors flex items-center gap-2"
                  >
                    Registering for HackSRM 2026 <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Certifications */}
          <div>
            <motion.div
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              className="bg-white/75 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-primary/10 cursor-pointer h-full flex flex-col justify-between"
            >
              <div>
                <motion.div
                  variants={iconVariants}
                  className="bg-primary/10 text-primary p-4 rounded-2xl inline-block mb-8"
                >
                  <BadgeCheck size={32} />
                </motion.div>
                <h3 className="font-headline-md text-headline-md font-bold mb-4 text-on-surface">
                  Certs
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Structured study groups and vouchers for AWS Cloud Practitioner
                  and Associate exams.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/30">
                <motion.div variants={arrowVariants} className="inline-flex">
                  <Link
                    href="/certs"
                    className="text-on-surface-variant font-label-md hover:text-primary transition-colors flex items-center gap-2"
                  >
                    Learn more <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Speaker Series — Wide card */}
          <div className="md:col-span-2">
            <motion.div
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              className="bg-white/75 backdrop-blur-md rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-between border border-primary/10 cursor-pointer h-full"
            >
              <div className="max-w-sm">
                <motion.div
                  variants={iconVariants}
                  className="bg-primary/10 text-primary p-4 rounded-2xl inline-block mb-6"
                >
                  <Mic2 size={32} />
                </motion.div>
                <h3 className="font-headline-md text-headline-md font-bold mb-4 text-on-surface">
                  Speaker Series
                </h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                  Direct access to industry leads from Amazon, Meta, and Google
                  for career insights.
                </p>
                <motion.div variants={arrowVariants} className="inline-flex">
                  <Link
                    href="/speakers"
                    className="inline-flex items-center gap-2 font-label-md font-bold text-primary"
                  >
                    View Schedule <ArrowRight size={20} />
                  </Link>
                </motion.div>
              </div>
              {/* Decorative speaker cards that lift on hover */}
              <div className="flex gap-4 flex-shrink-0">
                <motion.div
                  className="w-24 h-24 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center"
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ delay: 0.05, type: "spring", stiffness: 300 }}
                >
                  <Mic2 size={28} className="text-primary/50" />
                </motion.div>
                <motion.div
                  className="w-24 h-24 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center"
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                >
                  <Mic2 size={28} className="text-primary/30" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
