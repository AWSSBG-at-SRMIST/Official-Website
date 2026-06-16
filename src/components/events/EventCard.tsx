"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Flame, Globe, Users } from "lucide-react";
import { Event } from "./types";

interface EventCardProps {
  event: Event;
  isSecondaryFeatured?: boolean;
}

export function EventCard({ event, isSecondaryFeatured = false }: EventCardProps) {
  // Helper to resolve category badge styles
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "certification-camp":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/50";
      case "workshop":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50";
      case "hackathon":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800/50";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <motion.article
      className={`relative w-full group cursor-pointer h-full ${isSecondaryFeatured ? "md:col-span-2" : "col-span-1"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={`flex h-full bg-white dark:bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${isSecondaryFeatured ? "flex-col md:flex-row" : "flex-col"}`}>
        <div className={`relative bg-surface-variant overflow-hidden ${isSecondaryFeatured ? "md:w-1/2 h-56 md:h-auto" : "h-56"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            alt={event.title}
            src={event.image}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-4 left-4 z-20">
            <span className={`px-3 py-1 font-semibold text-[10px] uppercase tracking-widest rounded-full shadow-sm border ${getCategoryStyles(event.category)}`}>
              {getCategoryLabel(event.category)}
            </span>
          </div>
          {event.isHighDemand && event.status === "upcoming" && (
            <div className="absolute top-4 right-4 z-20 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50 font-bold text-[10px] px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Flame size={12} />
              <span className="uppercase tracking-widest">Popular</span>
            </div>
          )}
        </div>

        <div className={`p-6 md:p-8 flex-grow flex flex-col justify-between ${isSecondaryFeatured ? "md:w-1/2" : ""}`}>
          <div>
            <div className="flex flex-wrap items-center gap-3 text-on-surface-variant text-[11px] font-bold uppercase tracking-widest mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-outline-variant/60" />
              <div className="flex items-center gap-1">
                {event.location.toLowerCase() === "virtual" ? (
                  <Globe size={14} className="text-primary" />
                ) : (
                  <MapPin size={14} className="text-primary" />
                )}
                <span>{event.location}</span>
              </div>
            </div>

            <h3 className="font-display text-xl lg:text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
              {event.title}
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">
              {event.description}
            </p>
          </div>

          <div className="mt-auto pt-5 border-t border-outline-variant/20 flex items-center justify-between gap-4">
            {/* Attendee pill — elevated from plain text */}
            {event.registrantsCount && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary">
                <Users size={12} strokeWidth={2.2} />
                <span className="text-[11px] font-bold tabular-nums">{event.registrantsCount}</span>
                <span className="text-[11px] font-medium text-on-surface-variant">attending</span>
              </div>
            )}

            {event.status === "upcoming" ? (
              <a
                href={event.detailsLink || "#"}
                className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all group/link"
              >
                Join Event <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
              </a>
            ) : (
              <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest px-2.5 py-1 border border-outline-variant/20 rounded">
                Past
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
