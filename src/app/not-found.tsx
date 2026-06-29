import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { CornerBrackets } from "@/components/ui/CornerBrackets";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <>
      <main className="pt-24 pb-stack-lg min-h-screen flex flex-col">
        <section className="flex-1 flex items-center justify-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
          <div className="relative border-2 border-primary/40 p-10 sm:p-16 max-w-2xl w-full">
            <CornerBrackets />
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">404</p>
            <h1 className="font-display text-[40px] sm:text-[56px] md:text-[72px] leading-[0.95] tracking-tight text-on-surface font-bold mb-6">
              Lost in the cloud.
            </h1>
            <p className="text-label-md text-on-surface-variant leading-relaxed mb-10">
              This page doesn&rsquo;t exist — or it moved. Head back home and try from there.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary text-on-primary px-8 py-4 font-bold uppercase tracking-wide text-sm hover:bg-primary/90 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
