'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, Github, Rocket, Star, ArrowRight, Zap, Users } from 'lucide-react';
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { projectsData, projectCategories } from "@/data/projectsData";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredProjects = projectsData.filter(project => {
    if (activeCategory === 'All Projects') return true;
    return project.categories.includes(activeCategory);
  });

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-stack-lg min-h-screen">
        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-10 md:mb-16">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl md:text-[64px] leading-tight tracking-tight mb-4 text-on-surface font-bold">
              Built by our Community.
            </h1>
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed">
              A gallery of high-impact products, open-source contributions, and technical experiments developed by student builders at SRMIST.
            </p>
          </div>
        </section>

        {/* Filters & Categories */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-10 md:mb-12 py-4 border-b border-outline-variant/10">
          <div className="flex items-center w-full overflow-x-auto no-scrollbar scroll-smooth">
            <span className="font-label-md text-on-surface-variant mr-4 whitespace-nowrap shrink-0">Filter by:</span>
            <div className="flex gap-2.5">
              {projectCategories.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full border text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'border-outline-variant bg-surface text-on-surface hover:bg-primary hover:text-white hover:border-primary'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Project Grid */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16">
          {isMounted && (
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => {
                  if (project.featured) {
                    return (
                      <motion.article
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="lg:col-span-8 group bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col md:flex-row"
                      >
                        {/* Left Half: Image */}
                        <div className="md:w-1/2 relative overflow-hidden h-60 md:h-auto min-h-[220px]">
                          <img
                            alt={project.imageAlt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={project.image}
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-md">
                              Featured
                            </span>
                          </div>
                        </div>

                        {/* Right Half: Details */}
                        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-4 gap-2">
                              <h3 className="font-headline-md text-xl md:text-2xl text-on-surface font-bold leading-snug">
                                {project.title}
                              </h3>
                              <span className="bg-surface-container-high text-primary font-semibold text-xs px-3 py-1 rounded-full shrink-0">
                                {project.statusLabel || project.status}
                              </span>
                            </div>
                            <p className="text-on-surface-variant mb-6 leading-relaxed text-sm">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tags.map(tag => (
                                <span key={tag} className="bg-surface-container text-on-surface-variant text-xs font-semibold px-2.5 py-1 rounded-md">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                            <div className="flex -space-x-2">
                              {project.contributors.map((c, i) => (
                                <img
                                  key={i}
                                  alt={c.name}
                                  title={c.name}
                                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover"
                                  src={c.avatar}
                                />
                              ))}
                            </div>
                            <div className="flex gap-4">
                              <a
                                className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-semibold text-xs transition-colors"
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="w-4 h-4" />
                                <span>GitHub</span>
                              </a>
                              {project.demoUrl && (
                                <a
                                  className="flex items-center gap-1.5 text-primary hover:opacity-80 font-bold text-xs transition-opacity"
                                  href={project.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>Demo</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  }

                  return (
                    <motion.article
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out group flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-48 relative overflow-hidden">
                          <img
                            alt={project.imageAlt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={project.image}
                          />
                          <div className="absolute bottom-3 right-3">
                            <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-bold text-xs px-2.5 py-1 rounded flex items-center gap-1">
                              {project.stars !== undefined && (
                                <>
                                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                  <span>{project.stars}</span>
                                </>
                              )}
                              {project.status === 'Active' && (
                                <>
                                  <Zap className="w-3.5 h-3.5 text-primary fill-primary animate-pulse" />
                                  <span>Active</span>
                                </>
                              )}
                              {project.contributorsCount !== undefined && (
                                <>
                                  <Users className="w-3.5 h-3.5 text-primary" />
                                  <span>{project.contributorsCount} Contributors</span>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3 gap-2">
                            <h3 className="font-headline-md text-lg text-on-surface font-bold leading-snug">
                              {project.title}
                            </h3>
                            <span className="text-on-surface-variant text-[11px] font-semibold border border-outline-variant px-2.5 py-1 rounded-full shrink-0">
                              {project.statusLabel || project.status}
                            </span>
                          </div>
                          <p className="text-on-surface-variant mb-6 text-sm leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(tag => (
                              <span key={tag} className="bg-surface-container text-on-surface-variant text-xs font-semibold px-2.5 py-1 rounded-md">
                                  {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 flex items-center justify-between border-t border-outline-variant/30 mt-auto">
                        <div className="flex items-center gap-2">
                          {project.contributors.length > 0 && (
                            <>
                              <img
                                alt={project.contributors[0].name}
                                className="w-6 h-6 rounded-full object-cover"
                                src={project.contributors[0].avatar}
                              />
                              <span className="text-xs text-on-surface-variant">by {project.contributors[0].name}</span>
                            </>
                          )}
                        </div>
                        <a
                          className="text-on-surface-variant hover:text-primary transition-colors flex items-center"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </div>
                    </motion.article>
                  );
                })}

                {/* Submit Project CTA Card (Always visible at the correct position) */}
                <motion.div
                  layout
                  className="lg:col-span-4 bg-primary text-on-primary rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col justify-center items-center text-center relative overflow-hidden"
                >
                  <Rocket className="w-12 h-12 mb-4 text-white" />
                  <h4 className="font-headline-md text-xl text-white font-bold mb-2">24+ Active Projects</h4>
                  <p className="opacity-80 text-sm mb-6 max-w-xs text-white/90">
                    Current cycle of student-led innovation across all technical domains.
                  </p>
                  <button className="bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-surface-container hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
                    Submit a Project
                  </button>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* Stats Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop my-12 md:my-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-outline-variant/30">
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl md:text-[40px] text-primary font-bold mb-2">12.4k</div>
              <div className="font-label-md text-xs sm:text-sm text-on-surface-variant uppercase tracking-widest font-semibold">Commits This Year</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl md:text-[40px] text-primary font-bold mb-2">15</div>
              <div className="font-label-md text-xs sm:text-sm text-on-surface-variant uppercase tracking-widest font-semibold">Open Source Repos</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl md:text-[40px] text-primary font-bold mb-2">850+</div>
              <div className="font-label-md text-xs sm:text-sm text-on-surface-variant uppercase tracking-widest font-semibold">Students Reached</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl md:text-[40px] text-primary font-bold mb-2">5</div>
              <div className="font-label-md text-xs sm:text-sm text-on-surface-variant uppercase tracking-widest font-semibold">Global Competitions</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16 md:mb-24">
          <div className="relative bg-surface-container-high rounded-3xl p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-[40px] leading-tight tracking-tight mb-4 text-on-surface font-bold">
                Have a project in mind?
              </h2>
              <p className="text-body-lg text-sm sm:text-base text-on-surface-variant">
                We provide the resources, mentorship, and cloud credits to help you scale your idea from a prototype to a product.
              </p>
            </div>
            <div className="relative z-10 shrink-0">
              <a
                className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 hover:scale-105 duration-200 cursor-pointer"
                href="#"
              >
                Get Started Today
              </a>
            </div>
            {/* Subtle decorative background element */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}