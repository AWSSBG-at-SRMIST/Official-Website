"use client";

import { motion } from "framer-motion";

// Using authentic-feeling workshop/community Unsplash photos
// Replace src values here when real SBG SRMIST photos become available
const photos = [
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    alt: "Builders at a workshop session",
    caption: "AWS Bootcamp · Oct 2024",
    // Top-left card, slight counter-clockwise tilt
    style: {
      top: "6%",
      left: "0%",
      rotate: "-3deg",
      zIndex: 10,
    },
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    alt: "Team collaborating on a hackathon build",
    caption: "Cloud Clash Hackathon · Mar 2025",
    // Center card, slight clockwise tilt, on top
    style: {
      top: "22%",
      left: "22%",
      rotate: "2deg",
      zIndex: 30,
    },
  },
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
    alt: "Community networking and mixer event",
    caption: "Builder Mixer · Jan 2025",
    // Bottom-right card, slight counter-clockwise tilt
    style: {
      top: "40%",
      right: "0%",
      rotate: "-1deg",
      zIndex: 20,
    },
  },
];

export function BuildersInAction() {
  return (
    <section className="py-32 max-w-container-max mx-auto px-margin-desktop">
      <div className="flex flex-col lg:flex-row items-center gap-16">

        {/* Left: Text */}
        <div className="lg:w-1/2 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">
              Community
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-on-surface leading-[1.1] tracking-tight mb-6"
          >
            Real builders.
            <br />
            Real impact.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-on-surface-variant leading-relaxed max-w-md mb-8"
          >
            AWS Student Builders SRMIST is more than events — it is a community
            of engineers, creators, and problem solvers shaping the next era of
            cloud computing.
          </motion.p>
        </div>

        {/* Right: Pinboard photo collage — explicit absolute positions per card */}
        <div className="lg:w-1/2 relative h-[520px] w-full flex-shrink-0">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.65,
                delay: index * 0.14,
                type: "spring",
                stiffness: 70,
                damping: 18,
              }}
              whileHover={{ scale: 1.04, zIndex: 50, transition: { duration: 0.25 } }}
              className="absolute p-2.5 pb-10 bg-white dark:bg-surface-container-highest rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.14)] border border-black/5 cursor-default group"
              style={{
                ...photo.style,
                rotate: photo.style.rotate,
              }}
            >
              <div className="relative w-44 sm:w-56 h-52 sm:h-64 overflow-hidden rounded-md bg-surface-variant">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
              {/* Caption in the Polaroid white space */}
              <p className="absolute bottom-2.5 left-0 w-full text-center text-[11px] font-medium text-on-surface/60 tracking-wide px-3 truncate">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
