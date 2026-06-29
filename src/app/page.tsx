import type { Metadata } from "next";
import { Hero } from "@/components/landing/Hero";
import { CommunityMarquee } from "@/components/landing/CommunityMarquee";
import { AboutSection } from "@/components/landing/AboutSection";
import { ProjectsTeaser } from "@/components/landing/ProjectsTeaser";
import { ExploreDomains } from "@/components/landing/ExploreDomains";
import { BuildTogetherCta } from "@/components/landing/BuildTogetherCta";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "AWS Student Builder Group at SRMIST | Cloud Computing Community",
  description:
    "AWS Student Builder Group (AWS SBG) at SRMIST is the official cloud computing student community at SRM Kattankulathur, Tamil Nadu. Build real AWS projects, get AWS certified, and launch your cloud career.",
  alternates: {
    canonical: "https://awssbg-srmist.in",
  },
  openGraph: {
    url: "https://awssbg-srmist.in",
  },
};

export default function Home() {
  return (
    <>
      <main className="pt-24 min-h-screen">
        <Hero />
        <CommunityMarquee />
        <AboutSection />
        <ExploreDomains />
        <ProjectsTeaser />
      </main>
      <BuildTogetherCta />
      <Footer />
    </>
  );
}
