"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { CommunityMarquee } from "@/components/landing/CommunityMarquee";
import { AboutSection } from "@/components/landing/AboutSection";
import { WhatWeDoSection } from "@/components/landing/WhatWeDoSection";
import { ProjectShowcase } from "@/components/landing/ProjectShowcase";
import { ExploreDomains } from "@/components/landing/ExploreDomains";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  // Setup intersection observer for reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active", "active");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-32 min-h-screen">
        <Hero />
        <CommunityMarquee />
        <AboutSection />
        <WhatWeDoSection />
        <ProjectShowcase />
        <ExploreDomains />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
