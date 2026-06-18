"use client";

import { Hero } from "@/components/landing/Hero";
import { CommunityMarquee } from "@/components/landing/CommunityMarquee";
import { AboutSection } from "@/components/landing/AboutSection";
import { ProjectShowcase } from "@/components/landing/ProjectShowcase";
import { ExploreDomains } from "@/components/landing/ExploreDomains";
import { BuildTogetherCta } from "@/components/landing/BuildTogetherCta";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <main className="pt-24 min-h-screen">
        <Hero />
        <CommunityMarquee />
        <AboutSection />
        <ExploreDomains />
        <ProjectShowcase />
      </main>
      <BuildTogetherCta />
      <Footer />
    </>
  );
}
