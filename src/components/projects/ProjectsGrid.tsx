"use client";

import { motion, Variants } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import type { GitHubRepo } from "./types";

interface ProjectsGridProps {
  repos: GitHubRepo[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function ProjectsGrid({ repos }: ProjectsGridProps) {
  if (repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-body-lg text-on-surface-variant">No public repositories found for this organization.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {repos.map((repo) => (
        <motion.div key={repo.id} variants={itemVariants}>
          <ProjectCard repo={repo} />
        </motion.div>
      ))}
    </motion.div>
  );
}
