import { Footer } from "@/components/landing/Footer";

interface ComingSoonPageProps {
  category: string;
  heading: string;
  description: string;
}

export function ComingSoonPage({ category, heading, description }: ComingSoonPageProps) {
  return (
    <>
      <main className="pt-24 pb-stack-lg min-h-screen flex flex-col">
        <section className="flex-1 flex items-center justify-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
          <div className="max-w-2xl w-full border-l-2 border-primary/40 pl-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">{category}</p>
            <h1 className="font-display text-[40px] sm:text-[56px] md:text-[72px] leading-[0.95] tracking-tight text-on-surface font-bold mb-6">
              {heading}
            </h1>
            <p className="text-label-md text-on-surface-variant leading-relaxed">{description}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
