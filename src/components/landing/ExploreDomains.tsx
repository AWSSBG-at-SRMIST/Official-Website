"use client";

import { motion } from "framer-motion";
import { Terminal, Building2, Lightbulb } from "lucide-react";

const domains = [
  {
    icon: Terminal,
    index: "01",
    title: "Technical",
    description:
      "Build real software, train ML models, and ship cloud infrastructure — the engineering core of everything SBG makes.",
    subDomains: ["Software Development", "AI & Machine Learning", "Cloud & DevOps"],
  },
  {
    icon: Building2,
    index: "02",
    title: "Corporate",
    description:
      "Run the club like an organization — planning events, managing partnerships, and growing the SBG brand.",
    subDomains: ["Events & Operations", "PR & Marketing", "Sponsorship & Finance", "HR & Admin"],
  },
  {
    icon: Lightbulb,
    index: "03",
    title: "Creatives",
    description:
      "Shape how SBG looks and sounds — design systems, visual identity, and every piece of content we publish.",
    subDomains: ["Digital Design", "Media Production"],
  },
];

export function ExploreDomains() {
  return (
    <section className="py-stack-lg max-w-container-max mx-auto px-margin-desktop">
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-on-surface/10">
        {domains.map((domain, idx) => {
          const Icon = domain.icon;
          return (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="border-r border-b border-on-surface/10 p-8 group hover:bg-surface-container-lowest transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <Icon size={32} className="text-primary" />
                <span className="font-display text-xs text-on-surface-variant tracking-[0.2em]">
                  {domain.index}
                </span>
              </div>

              <h3 className="font-headline-md text-headline-md mb-3">{domain.title}</h3>

              <p className="text-label-md text-on-surface-variant mb-8">{domain.description}</p>

              <div className="flex flex-wrap gap-2">
                {domain.subDomains.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1 text-label-sm font-medium border border-on-surface/15 text-on-surface-variant group-hover:border-primary/40 group-hover:text-primary transition-colors duration-300"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
