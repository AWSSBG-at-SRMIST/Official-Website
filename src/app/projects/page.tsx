import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore the open-source software built by the AWS Student Builder Group at SRMIST community.",
  robots: { index: false, follow: false },
};

export default function ProjectsPage() {
  return (
    <>
    <main className="pt-24 pb-stack-lg min-h-screen">
      {/* Hero */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-12 md:mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
          Open Source Software
        </p>
        <h1 className="font-display text-[40px] sm:text-[56px] md:text-[72px] leading-[0.98] tracking-tight mb-4 text-on-surface font-bold">
          Projects.
        </h1>
        <p className="text-label-md text-on-surface-variant leading-relaxed max-w-2xl border-l-2 border-primary/40 pl-5">
          Cloud software built and open-sourced by AWS Student Builder Group at
          SRMIST — pulled live from our GitHub organization.
        </p>
      </section>

      {/* Coming Soon */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16 md:mb-20">
        <div className="border-2 border-on-surface/10 p-12 text-center bg-surface-container-lowest">
          <p className="font-display text-2xl font-bold text-on-surface">Coming Soon.</p>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
