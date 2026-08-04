"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, GitFork, ExternalLink, Globe } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { GitHubRepo } from "./types";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  React: "#61dafb",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
};

interface ProjectCardProps {
  repo: GitHubRepo;
}

export function ProjectCard({ repo }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const langColor = repo.language ? (languageColors[repo.language] || "#a1a1aa") : "#a1a1aa";
  
  // Target URL for live screenshot
  const targetUrl = (repo.homepage && repo.homepage.startsWith("http")) 
    ? repo.homepage 
    : repo.html_url;

  const screenshotSrc = `https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}&screenshot=true&embed=screenshot.url`;

  return (
    <a 
      href={targetUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block h-full outline-none"
    >
      <div className="h-full rounded-2xl border-2 border-on-surface/15 bg-surface-container glass-panel overflow-hidden card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_12px_35px_rgba(168,85,247,0.18)] flex flex-col justify-between cursor-pointer">
        
        <div>
          {/* Top Browser-Style Window Header & Screenshot Preview */}
          <div className="relative w-full h-44 sm:h-48 bg-surface-container-low overflow-hidden border-b border-on-surface/10 flex flex-col">
            {/* Fake browser bar */}
            <div className="h-7 px-3 bg-surface-container-high/90 backdrop-blur-md flex items-center justify-between z-10 border-b border-on-surface/10 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="text-[11px] font-mono text-on-surface-variant/80 truncate max-w-[180px] sm:max-w-[220px]">
                {targetUrl.replace(/^https?:\/\//, '')}
              </div>
              <ExternalLink className="h-3 w-3 text-on-surface-variant/60" />
            </div>

            {/* Screenshot Display Image */}
            <div className="relative flex-grow w-full h-full">
              {!imgError ? (
                <Image
                  src={screenshotSrc}
                  alt={`Screenshot preview of ${repo.name}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-surface-container flex flex-col items-center justify-center p-4 text-center">
                  <Globe className="h-8 w-8 text-primary/50 mb-2" />
                  <span className="text-label-sm font-mono text-on-surface-variant font-bold">{repo.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card Details */}
          <div className="p-6">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                  <SiGithub className="h-4 w-4" />
                </div>
                <h3 className="text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                  {repo.name}
                </h3>
              </div>
            </div>

            <p className="text-body-md text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">
              {repo.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Card Footer Meta */}
        <div className="px-6 pb-6 pt-0 mt-auto flex items-center justify-between gap-4 border-t border-on-surface/10 pt-4 font-mono">
          <div className="flex items-center gap-4 text-label-md text-on-surface-variant">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span 
                  className="h-2.5 w-2.5 rounded-full" 
                  style={{ backgroundColor: langColor }}
                />
                <span className="text-label-sm font-mono font-semibold">{repo.language}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1 hover:text-on-surface transition-colors text-label-sm font-mono">
              <Star className="h-3.5 w-3.5" />
              <span>{repo.stargazers_count}</span>
            </div>
            
            <div className="flex items-center gap-1 hover:text-on-surface transition-colors text-label-sm font-mono">
              <GitFork className="h-3.5 w-3.5" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
        </div>

      </div>
    </a>
  );
}
