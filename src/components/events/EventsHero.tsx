"use client";

import { motion } from "framer-motion";
import { mockEvents } from "./mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export function EventsHero() {
  const upcomingCount = mockEvents.filter(e => e.status === "upcoming").length;
  const pastCount = mockEvents.filter(e => e.status === "past").length;
  const totalRegistrants = mockEvents.reduce((sum, e) => sum + (e.registrantsCount || 0), 0);

  const stats = [
    { value: `${upcomingCount}`, label: "Upcoming Events" },
    { value: `${totalRegistrants}+`, label: "Total Registrations" },
    { value: `${pastCount}`, label: "Past Events" },
  ];

  return (
    <section className="relative pt-24 pb-6 lg:pt-32 lg:pb-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle dot grid — slightly more visible */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, currentColor 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-4xl mx-auto px-margin-desktop relative z-10 w-full text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-6"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
            variants={itemVariants}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Events &amp; Workshops
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl lg:text-7xl font-bold text-on-surface leading-[1.05] tracking-tight"
            variants={itemVariants}
          >
            This is where builders gather.
          </motion.h1>

          <motion.p
            className="text-lg text-on-surface-variant max-w-2xl leading-relaxed mx-auto"
            variants={itemVariants}
          >
            Expert-led bootcamps, hands-on workshops, and 48-hour hackathons.
            Elevate your engineering alongside a community of elite cloud builders.
          </motion.p>

          {/* Stat strip — anchors credibility */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-8 md:gap-12 pt-4"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8 md:gap-12">
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-on-surface tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8 bg-outline-variant/40" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
