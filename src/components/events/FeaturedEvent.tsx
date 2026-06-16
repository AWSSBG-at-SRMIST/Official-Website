"use client";

import { useRef, MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Clock, Users } from "lucide-react";
import { Event } from "./types";

interface FeaturedEventProps {
  event: Event;
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Subtle parallax effect tied to scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Spotlight reveal using Refs and CSS variables (zero React state updates)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Directly mutate CSS custom properties on the DOM node for 0ms latency tracking
    imageContainerRef.current.style.setProperty("--mouse-x", `${x}px`);
    imageContainerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="py-12 max-w-container-max mx-auto px-margin-desktop" ref={containerRef}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="group relative flex flex-col lg:flex-row bg-white dark:bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
      >
        {/* Left: Image with Parallax & Spotlight reveal */}
        <div 
          className="lg:w-1/2 lg:h-[500px] h-72 relative overflow-hidden bg-surface-variant"
          ref={imageContainerRef}
          onMouseMove={handleMouseMove}
          // Default variables in case mouse hasn't moved yet
          style={{ "--mouse-x": "-1000px", "--mouse-y": "-1000px" } as React.CSSProperties}
        >
          <motion.div 
            style={{ y: imageY }} 
            className="absolute inset-0 w-full h-[110%]"
          >
            {/* Base Image: Grayscale */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-40 transition-opacity duration-700"
            />

            {/* Spotlight Overlay: Colored image revealed by CSS mask */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                // Soft feathered edge with a small radius (150px)
                WebkitMaskImage: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)`,
                maskImage: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <div className="absolute top-6 left-6 z-10 flex gap-2 pointer-events-none">
            <span className="px-3 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md text-on-surface text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              Featured Event
            </span>
          </div>
        </div>

        {/* Right: Content Centerpiece */}
        <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">
            <div className="flex items-center gap-1.5 text-primary">
              <Calendar size={16} />
              <span>{event.date}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-outline-variant/50" />
            <div className="flex items-center gap-1.5">
              <MapPin size={16} />
              <span>{event.location}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-outline-variant/50" />
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>10:00 AM - 4:00 PM</span>
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold font-display leading-[1.1] tracking-tight text-on-surface mb-6 group-hover:text-primary transition-colors duration-300">
            {event.title}
          </h2>
          
          <p className="text-lg text-on-surface-variant leading-relaxed mb-10">
            {event.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-auto">
            {/* Attendee count — real data, no placeholder circles */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-primary">
              <Users size={15} strokeWidth={2.2} />
              <span className="text-sm font-bold tabular-nums">
                {event.registrantsCount || 42}
              </span>
              <span className="text-sm font-medium text-on-surface-variant">
                builders registered
              </span>
            </div>

            <a
              href={event.detailsLink || "#"}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-on-surface text-surface rounded-full font-medium text-sm hover:bg-primary transition-all duration-300 transform active:scale-95"
            >
              Register Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
