"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  BookOpen, 
  Award, 
  Users, 
  FileCode, 
  CheckCircle2, 
  Copy, 
  Check, 
  Network, 
  BarChart3, 
  FileText
} from "lucide-react";
import type { ResearchPaper } from "./types";

interface ResearchCardProps {
  paper: ResearchPaper;
}

type TabType = "overview" | "pipeline" | "benchmarks" | "citation";

export function ResearchCard({ paper }: ResearchCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyBibtex = () => {
    if (paper.bibtex) {
      navigator.clipboard.writeText(paper.bibtex);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="group rounded-2xl border-2 border-on-surface/15 bg-surface-container glass-panel overflow-hidden card-shadow transition-all duration-300 hover:border-primary/60 hover:shadow-[0_12px_40px_rgba(168,85,247,0.2)] flex flex-col">
      {/* Top Interactive Header & Badge Bar */}
      <div className="p-6 md:p-8 bg-surface-container-low border-b border-on-surface/15 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md text-label-sm font-mono font-bold bg-primary text-primary-foreground shadow-md uppercase tracking-wider">
            <Award className="h-3.5 w-3.5" />
            IEEE Published
          </span>
          <span className="text-label-sm font-mono text-primary font-bold">
            DOI: {paper.doi || paper.id}
          </span>
          <span className="inline-flex items-center gap-1 text-label-sm font-mono text-emerald-400 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Peer-Reviewed
          </span>
        </div>

        <a
          href={paper.ieeeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-label-md hover:bg-brand-primary-light transition-all shadow-md hover:shadow-primary/30"
        >
          <span>IEEE Xplore Paper</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Main Details Body */}
      <div className="p-6 md:p-8 flex flex-col gap-6">
        <div>
          {/* Venue & Date */}
          <div className="flex flex-wrap items-center gap-2 mb-3 text-label-sm font-mono text-primary font-semibold">
            <BookOpen className="h-4 w-4 shrink-0" />
            <span>{paper.publication}</span>
            <span>•</span>
            <span className="text-on-surface-variant">{paper.publicationDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-headline-md md:text-headline-lg font-extrabold text-on-surface group-hover:text-primary transition-colors mb-4 leading-tight">
            {paper.title}
          </h3>

          {/* Authors List */}
          <div className="flex items-start gap-2.5 text-label-md text-on-surface-variant mb-6 p-3.5 rounded-xl border border-on-surface/10 bg-surface-container-low/60">
            <Users className="h-4 w-4 shrink-0 text-primary mt-0.5" />
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-bold block mb-0.5">Authors</span>
              <span className="text-on-surface font-medium">{paper.authors.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Interactive Tab Navigator */}
        <div className="flex flex-wrap gap-2 border-b border-on-surface/15 pb-2 font-mono text-label-sm">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === "overview"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Abstract &amp; Summary</span>
          </button>

          {paper.pipeline && (
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === "pipeline"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <Network className="h-4 w-4" />
              <span>Methodology &amp; Pipeline</span>
            </button>
          )}

          {paper.benchmarks && (
            <button
              onClick={() => setActiveTab("benchmarks")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === "benchmarks"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Model Benchmarks</span>
            </button>
          )}

          {paper.bibtex && (
            <button
              onClick={() => setActiveTab("citation")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                activeTab === "citation"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <FileCode className="h-4 w-4" />
              <span>BibTeX Citation</span>
            </button>
          )}
        </div>

        {/* Tab Content Display Area */}
        <div className="min-h-[160px] p-5 rounded-xl border border-on-surface/10 bg-surface/70 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <p className="text-body-md text-on-surface leading-relaxed">
                  {paper.abstract}
                </p>

                {paper.keywords && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {paper.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2.5 py-1 rounded-md text-label-sm font-mono bg-surface-container-high border border-on-surface/10 text-on-surface-variant"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "pipeline" && paper.pipeline && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <div className="text-label-sm font-mono text-primary font-bold uppercase tracking-wider mb-1">
                  Architecture &amp; Data Pipeline Flow:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paper.pipeline.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-on-surface/10 bg-surface-container-low flex items-center gap-3">
                      <div className="flex h-6 w-6 rounded-full bg-primary/20 text-primary font-mono font-bold text-xs items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-body-md text-on-surface font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "benchmarks" && paper.benchmarks && (
              <motion.div
                key="benchmarks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <div className="text-label-sm font-mono text-primary font-bold uppercase tracking-wider mb-1">
                  Evaluated Classification Model Accuracies:
                </div>
                <div className="flex flex-col gap-3">
                  {paper.benchmarks.map((bm) => (
                    <div key={bm.modelName} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-label-md">
                        <span className="font-semibold text-on-surface">
                          {bm.modelName} {bm.isPrimary && <span className="text-primary font-mono text-xs">(Primary Model)</span>}
                        </span>
                        <span className="font-mono font-bold text-primary">{bm.accuracy}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full ${bm.isPrimary ? 'bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'bg-primary/50'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${bm.accuracy}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "citation" && paper.bibtex && (
              <motion.div
                key="citation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-label-sm font-mono text-primary font-bold uppercase tracking-wider">
                    BibTeX Citation:
                  </span>
                  <button
                    onClick={handleCopyBibtex}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-label-sm font-mono font-bold bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy BibTeX</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-lg bg-surface-container-low border border-on-surface/10 font-mono text-xs text-on-surface-variant overflow-x-auto whitespace-pre-wrap">
                  {paper.bibtex}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
