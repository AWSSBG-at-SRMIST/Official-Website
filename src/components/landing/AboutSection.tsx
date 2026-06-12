"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Active Members" },
  { value: "12+",  label: "Events Hosted" },
  { value: "3",    label: "AWS Domains" },
];

export function AboutSection() {
  return (
    <section className="py-stack-lg max-w-container-max mx-auto px-margin-desktop reveal" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-stack-md"
        >
          {/* Credibility stats */}
          <div className="flex gap-8 mb-2">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-3xl font-bold text-primary leading-none">
                  {stat.value}
                </span>
                <span className="text-label-sm text-on-surface-variant mt-1 uppercase tracking-widest font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <h2 className="font-headline-lg text-headline-lg">Built for Builders</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            At AWS SBG SRMIST, we believe the best way to learn is by getting
            your hands dirty. Our community is structured to give students
            real-world problems and the modern toolsets required to solve them.
          </p>

          <div className="grid grid-cols-2 gap-stack-md py-4">
            <div className="space-y-2">
              <h4 className="font-headline-md text-primary">Practical Learning</h4>
              <p className="text-label-md text-on-surface-variant">
                Move beyond documentation with guided project-based workshops.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-headline-md text-primary">Global Network</h4>
              <p className="text-label-md text-on-surface-variant">
                Connect with AWS experts and builders from chapters worldwide.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
          className="bg-surface-container-low rounded-3xl relative overflow-hidden h-[420px] group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover rounded-2xl shadow-sm transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            alt="AWS Student Builders collaborating"
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl" />
        </motion.div>

      </div>
    </section>
  );
}
