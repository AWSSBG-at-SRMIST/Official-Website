"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Briefcase } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { certifications, careerAchievements } from "@/data/achievementsData";

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
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed border-l-2 border-primary/40 pl-5">
              Certifications earned, internships landed, and offers secured by builders
              in this community — proof of what consistent practice compounds into.
            </p>
          </div>
        </section>

        {/* Certifications */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16 md:mb-20">
          <h2 className="font-label-sm text-sm uppercase tracking-[0.2em] text-primary mb-6 border-b-2 border-on-surface/10 pb-3">
            AWS Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="border-2 border-on-surface/10 hover:border-primary/40 transition-colors duration-300 p-6 bg-surface-container-lowest"
              >
                <BadgeCheck className="text-primary mb-4" size={28} />
                <h3 className="font-headline-md text-base text-on-surface font-bold leading-snug mb-2">
                  {cert.certTitle}
                </h3>
                <p className="text-sm text-on-surface-variant mb-1">{cert.memberName}</p>
                <p className="text-xs uppercase tracking-wide text-on-surface-variant/60">
                  {cert.issuer} &middot; {cert.date}
                </p>
              </motion.div>
            ))}
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

        {/* CTA */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16 md:mb-24">
          <div className="relative border-2 border-primary/40 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -top-2.5 -left-2.5 w-5 h-5 border-l-2 border-t-2 border-primary" />
            <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-r-2 border-b-2 border-primary" />
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="font-display text-2xl sm:text-3xl md:text-[40px] leading-tight tracking-tight mb-4 text-on-surface font-bold">
                Landed something worth sharing?
              </h2>
              <p className="text-body-lg text-sm sm:text-base text-on-surface-variant">
                Let us know about your certification, internship, or offer — we want this wall to stay current.
              </p>
            </div>
            <div className="relative z-10 shrink-0">
              <a
                className="inline-block bg-primary text-on-primary px-8 py-4 font-bold uppercase tracking-wide hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 duration-200 cursor-pointer"
                href="https://www.meetup.com/awssbg-srmist/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tell Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
