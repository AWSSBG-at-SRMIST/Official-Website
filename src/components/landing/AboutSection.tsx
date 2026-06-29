"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import builders from "../../../public/builders.png";

const pillars = [
  {
    index: "01",
    title: "Practical Learning",
    description: "Move beyond documentation with guided project-based workshops.",
  },
  {
    index: "02",
    title: "Global Network",
    description: "Connect with AWS experts and builders from chapters worldwide.",
  },
];

export function AboutSection() {
  return (
    <section className="py-stack-lg max-w-container-max mx-auto px-margin-desktop" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <h2 className="font-display font-bold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.02] tracking-tight">
            Built for Builders.
          </h2>
          <p className="text-label-md text-on-surface-variant max-w-lg">
            AWS Student Builder Group at SRMIST believes the best way to learn is by
            getting your hands dirty. We structure the community around
            real-world problems and the modern toolsets needed to solve them.
          </p>
          <div className="grid grid-cols-2 gap-0 border-t border-l border-on-surface/10">
            {pillars.map((pillar) => (
              <div key={pillar.index} className="p-6 border-r border-b border-on-surface/10">
                <div className="font-display text-xs text-primary tracking-[0.2em] mb-3">
                  {pillar.index}
                </div>
                <h4 className="font-headline-md text-on-surface mb-2">{pillar.title}</h4>
                <p className="text-label-md text-on-surface-variant">{pillar.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[420px] border-2 border-on-surface/10"
        >
          <div className="absolute -top-2.5 -left-2.5 w-5 h-5 border-l-2 border-t-2 border-primary" />
          <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-r-2 border-b-2 border-primary" />
          <Image
            src={builders}
            alt="An illustrated wireframe builder character assembling a project"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
