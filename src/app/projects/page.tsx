import { Footer } from "@/components/landing/Footer";

export default function ProjectsPage() {
  return (
    <>
      <main className="pt-24 pb-stack-lg min-h-screen flex items-center">
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
          <div className="relative border-2 border-primary/40 p-10 sm:p-16 text-center max-w-2xl mx-auto">
            <div className="absolute -top-2.5 -left-2.5 w-5 h-5 border-l-2 border-t-2 border-primary" />
            <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-r-2 border-b-2 border-primary" />
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Project Showcase</p>
            <h1 className="font-display text-[40px] sm:text-[56px] leading-[0.98] tracking-tight mb-4 text-on-surface font-bold">
              Coming Soon.
            </h1>
            <p className="text-label-md text-on-surface-variant">
              We&rsquo;re putting together the gallery of everything our community has built. Check back shortly.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
