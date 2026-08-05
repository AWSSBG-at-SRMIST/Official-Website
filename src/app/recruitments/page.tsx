import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Recruitments",
  description:
    "Apply to join AWS Student Builder Group at SRMIST — open to all departments, all years. No prior experience required. Build on AWS, AI, data, and more.",
  alternates: { canonical: "https://awssbg-srmist.in/recruitments" },
  openGraph: { url: "https://awssbg-srmist.in/recruitments" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://awssbg-srmist.in" },
    { "@type": "ListItem", position: 2, name: "Recruitments", item: "https://awssbg-srmist.in/recruitments" },
  ],
};

export default function RecruitmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="pt-24 pb-stack-lg min-h-screen">
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">

          {/* Header */}
          <div className="mb-10 md:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Recruitments</p>
            <h1 className="font-display text-[40px] sm:text-[56px] md:text-[72px] leading-[0.95] tracking-tight text-on-surface font-bold mb-5">
              We&apos;ll start<br className="hidden sm:block" /> recruitments soon.
            </h1>
            <p className="text-label-md text-on-surface-variant leading-relaxed max-w-xl border-l-2 border-primary/40 pl-5">
              Applications for the next cohort of AWS SBG at SRMIST will open shortly.
              Watch the video to see what we&apos;re building — then stay tuned.
            </p>
          </div>

          {/* Grid: video + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Video */}
            <div className="lg:col-span-8">
              <div className="relative">
                {/* HUD corner brackets */}
                <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-primary z-10 pointer-events-none" />
                <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-primary z-10 pointer-events-none" />
                <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-primary z-10 pointer-events-none" />
                <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-primary z-10 pointer-events-none" />

                {/* Google Drive iframe — works reliably for large files */}
                <div className="relative border-2 border-primary/25 bg-surface-container-lowest overflow-hidden">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src="https://drive.google.com/file/d/1Vuqk1fP4r13lrJrwrMdXkHdII6olxHXk/preview"
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay"
                      title="What is AWS SBG at SRMIST?"
                    />
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/50">
                What is AWS SBG at SRMIST? — Club Overview
              </p>
            </div>

            {/* Sidebar info cards */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="border-2 border-on-surface/10 bg-surface-container-lowest p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2">Open To</p>
                <p className="font-display font-bold text-2xl text-on-surface leading-tight">
                  Every branch.<br />Every year.
                </p>
              </div>

              <div className="border-2 border-on-surface/10 bg-surface-container-lowest p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2">Experience</p>
                <p className="font-bold text-on-surface text-base">None required.</p>
                <p className="text-on-surface-variant text-sm mt-1">We build from zero, together.</p>
              </div>

              <div className="border-2 border-on-surface/10 bg-surface-container-lowest p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary mb-3">Domains</p>
                <div className="flex flex-col gap-2 text-sm font-bold text-on-surface">
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-px bg-primary inline-block" />Technical
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-px bg-primary inline-block" />Corporate
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-px bg-primary inline-block" />Creatives
                  </span>
                </div>
              </div>

              <div className="border-2 border-primary/40 bg-surface-container-lowest p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2">Status</p>
                <p className="font-bold text-on-surface text-base">Opening shortly.</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Follow <span className="text-primary">@awssbg.at.srmist</span> for the announcement.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
