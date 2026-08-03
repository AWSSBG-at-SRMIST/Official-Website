"use client";

import Image from "next/image";
import { ExternalLink, Github, Sparkles, Terminal } from "lucide-react";
import type { FeaturedProject } from "./types";

interface FeaturedProjectCardProps {
  project: FeaturedProject;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <div className="group h-full rounded-2xl border-2 border-on-surface/15 bg-surface-container glass-panel overflow-hidden card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_12px_40px_rgba(168,85,247,0.2)] flex flex-col justify-between">
      <div>
        {/* Browser Top Frame Bar */}
        <div className="h-8 px-4 bg-surface-container-high border-b border-on-surface/10 flex items-center justify-between font-mono text-[11px] text-on-surface-variant/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="truncate max-w-[200px]">
            {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '') : project.title.toLowerCase()}
          </span>
          <Terminal className="h-3.5 w-3.5 opacity-50" />
        </div>

        {/* Screenshot Image Container */}
        <div className="relative w-full h-56 sm:h-64 bg-surface-container-low overflow-hidden border-b border-on-surface/10">
          <Image
            src={project.coverImage}
            alt={`${project.title} Screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            priority
          />

          {project.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-label-sm font-mono font-bold bg-primary text-primary-foreground shadow-lg border border-white/20 uppercase tracking-wide">
                <Sparkles className="h-3.5 w-3.5" />
                {project.badge}
              </span>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6 md:p-8">
          <h3 className="text-headline-md font-extrabold text-on-surface group-hover:text-primary transition-colors mb-1.5">
            {project.title}
          </h3>
          <p className="text-label-md font-mono text-primary font-semibold mb-4">
            {project.tagline}
          </p>
          <p className="text-body-md text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md text-label-sm font-mono bg-surface-container-high border border-on-surface/15 text-on-surface"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 flex items-center gap-3 mt-auto">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-label-md hover:bg-brand-primary-light transition-all shadow-lg hover:shadow-primary/30"
          >
            <span>Launch Platform</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-3 rounded-xl border-2 border-on-surface/20 text-on-surface hover:border-primary hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label={`GitHub Repository for ${project.title}`}
          >
            <Github className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}
