"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 reveal">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-on-surface text-surface rounded-[3rem] p-12 md:p-20 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-2xl"
        >
          {/* Subtle blue glow layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-primary/10 opacity-30 pointer-events-none" />

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-5 tracking-tight relative z-10">
            Ready to start building?
          </h2>
          <p className="text-lg text-surface/70 max-w-xl mb-10 relative z-10 leading-relaxed">
            Join AWS Student Builders SRMIST. Get access to exclusive workshops,
            AWS credits, and a community of dedicated engineers.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-full font-bold text-base hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Join the Community <ArrowRight size={18} />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-4 bg-surface/10 text-surface rounded-full font-bold text-base border border-surface/20 hover:bg-surface/20 transition-all duration-300 active:scale-95"
            >
              Explore Events
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
