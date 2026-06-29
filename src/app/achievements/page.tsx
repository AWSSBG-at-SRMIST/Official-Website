"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { careerAchievements } from "@/data/achievementsData";

const TYPE_STYLE: Record<string, string> = {
  Internship: "border-primary/40 text-primary",
  PPO: "border-yellow-500/50 text-yellow-500",
  Placement: "border-green-500/50 text-green-500",
};

export default function AchievementsPage() {
  return (
    <>
      <main className="pt-24 pb-stack-lg min-h-screen">
        {/* Hero */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-12 md:mb-16">
          <div className="max-w-3xl">
            <h1 className="font-display text-[40px] sm:text-[56px] md:text-[72px] leading-[0.98] tracking-tight mb-4 text-on-surface font-bold">
              Wall of Achievements.
            </h1>
            <p className="text-label-md text-on-surface-variant leading-relaxed border-l-2 border-primary/40 pl-5">
              Internships landed and offers secured by builders in this community —
              proof of what consistent practice compounds into.
            </p>
          </div>
        </section>

        {/* Internships & Placements */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16 md:mb-24">
          <h2 className="font-label-sm text-sm uppercase tracking-[0.2em] text-primary mb-6 border-b-2 border-on-surface/10 pb-3">
            Internships &amp; Placements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {careerAchievements.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="border-2 border-on-surface/10 hover:border-primary/40 transition-colors duration-300 p-6 bg-surface-container-lowest"
              >
                <div className="flex items-start justify-between mb-4">
                  <Briefcase className="text-primary" size={28} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border ${TYPE_STYLE[item.type]}`}>
                    {item.type}
                  </span>
                </div>
                <h3 className="font-headline-md text-lg text-on-surface font-bold leading-snug mb-1">
                  {item.company}
                </h3>
                <p className="text-sm text-on-surface-variant mb-1">{item.role} &middot; {item.memberName}</p>
                <p className="text-xs uppercase tracking-wide text-on-surface-variant/60">{item.date}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
