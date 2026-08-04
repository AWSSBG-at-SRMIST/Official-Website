import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { ResearchCard } from "@/components/projects/ResearchCard";
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { AnimatedSection } from "@/components/projects/AnimatedSection";
import { Footer } from "@/components/landing/Footer";
import { researchPapersData, featuredProjectsData } from "@/components/projects/data";
import type { GitHubRepo } from "@/components/projects/types";
import { BookOpenText, Code2, Layers, Cloud, Sparkles, ArrowDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Research",
  description: "Explore the open-source software, research publications, and AI products built by the AWS Student Builder Group at SRMIST community.",
  robots: { index: true, follow: true },
};

async function getOrganizationRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch('https://api.github.com/users/AWSSBG-at-SRMIST/repos?per_page=100&sort=updated', {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error("Failed to fetch GitHub repos:", res.status, res.statusText);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();
    
    // Filter out .github internal repo and dot-prefix configuration repos
    const filteredRepos = repos.filter(
      (repo) => repo.name.toLowerCase() !== ".github" && !repo.name.startsWith(".")
    );

    return filteredRepos.sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const repos = await getOrganizationRepos();

  return (
    <>
    <main className="min-h-screen py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-16 md:gap-24">
      {/* Editorial Hero Banner */}
      <AnimatedSection className="flex flex-col gap-8 border-b-2 border-on-surface/10 pb-12">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-label-sm font-mono font-semibold border-2 border-primary/40 bg-primary/10 text-primary shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            [ PROJECTS &amp; RESEARCH ]
          </div>
          
          <h1 className="text-display font-extrabold text-on-surface tracking-tight leading-[1.05]">
            <span className="bg-gradient-to-r from-primary via-brand-primary-light to-white bg-clip-text text-transparent">BUILD.</span>{" "}
            RESEARCH.{" "}
            <span className="bg-gradient-to-r from-white via-brand-primary-light to-primary bg-clip-text text-transparent">DEPLOY.</span>
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-3xl leading-relaxed font-medium">
            The official showcase of <span className="text-on-surface font-semibold">AWS Student Builder Group at SRMIST</span>. Explore our community platforms, peer-reviewed research papers, and open-source cloud software.
          </p>
        </div>

        {/* Global Community Overview Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-on-surface/10">
          <a href="#featured-apps" className="p-4 rounded-xl border border-on-surface/10 bg-surface-container/60 hover:border-primary/50 transition-colors flex flex-col gap-1 group">
            <div className="flex items-center gap-2 text-primary font-mono text-label-sm">
              <Layers className="h-4 w-4" />
              <span>Applications</span>
            </div>
            <div className="text-headline-md font-bold text-on-surface group-hover:text-primary transition-colors flex items-center justify-between">
              <span>Live Products</span>
              <ArrowDown className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>

          <a href="#research-papers" className="p-4 rounded-xl border border-on-surface/10 bg-surface-container/60 hover:border-primary/50 transition-colors flex flex-col gap-1 group">
            <div className="flex items-center gap-2 text-primary font-mono text-label-sm">
              <BookOpenText className="h-4 w-4" />
              <span>Publications</span>
            </div>
            <div className="text-headline-md font-bold text-on-surface group-hover:text-primary transition-colors flex items-center justify-between">
              <span>IEEE Papers</span>
              <ArrowDown className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>

          <a href="#open-source" className="p-4 rounded-xl border border-on-surface/10 bg-surface-container/60 hover:border-primary/50 transition-colors flex flex-col gap-1 group">
            <div className="flex items-center gap-2 text-primary font-mono text-label-sm">
              <Code2 className="h-4 w-4" />
              <span>Open Source</span>
            </div>
            <div className="text-headline-md font-bold text-on-surface group-hover:text-primary transition-colors flex items-center justify-between">
              <span>{repos.length} Repositories</span>
              <ArrowDown className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>

          <div className="p-4 rounded-xl border border-on-surface/10 bg-surface-container/60 backdrop-blur-sm flex flex-col gap-1">
            <div className="flex items-center gap-2 text-primary font-mono text-label-sm">
              <Cloud className="h-4 w-4" />
              <span>Infrastructure</span>
            </div>
            <div className="text-headline-md font-bold text-on-surface">AWS &amp; AI</div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 1: Featured Projects */}
      <AnimatedSection id="featured-apps" className="flex flex-col gap-8 scroll-mt-24">
        <div className="flex items-center justify-between gap-4 border-l-4 border-primary pl-4 py-1">
          <div>
            <div className="text-label-sm font-mono text-primary uppercase tracking-widest mb-1">
              {"// 01 FEATURED LABS"}
            </div>
            <h2 className="text-headline-lg font-bold text-on-surface">
              Featured Applications
            </h2>
          </div>
          <Sparkles className="h-6 w-6 text-primary hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjectsData.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>
      </AnimatedSection>

      {/* Section 2: Research Papers */}
      <AnimatedSection id="research-papers" className="flex flex-col gap-8 scroll-mt-24">
        <div className="flex items-center justify-between gap-4 border-l-4 border-primary pl-4 py-1">
          <div>
            <div className="text-label-sm font-mono text-primary uppercase tracking-widest mb-1">
              {"// 02 IEEE PUBLICATIONS"}
            </div>
            <h2 className="text-headline-lg font-bold text-on-surface">
              Research &amp; Scientific Papers
            </h2>
          </div>
          <BookOpenText className="h-6 w-6 text-primary hidden sm:block" />
        </div>

        <div className="flex flex-col gap-8">
          {researchPapersData.map((paper) => (
            <ResearchCard key={paper.id} paper={paper} />
          ))}
        </div>
      </AnimatedSection>

      {/* Section 3: Open Source Repositories */}
      <AnimatedSection id="open-source" className="flex flex-col gap-8 scroll-mt-24">
        <div className="flex items-center justify-between gap-4 border-l-4 border-primary pl-4 py-1">
          <div>
            <div className="text-label-sm font-mono text-primary uppercase tracking-widest mb-1">
              {"// 03 OPEN REPOSITORIES"}
            </div>
            <h2 className="text-headline-lg font-bold text-on-surface">
              Open Source Core
            </h2>
          </div>
        </div>

        <ProjectsGrid repos={repos} />
      </AnimatedSection>
    </main>
    <Footer />
    </>
  );
}
