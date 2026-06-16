"use client";

import { GlobeAnimation } from "./GlobeAnimation";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative max-w-container-max mx-auto px-margin-desktop mb-stack-lg reveal min-h-[80vh] flex items-center">
      {/* Background Globe Animation */}
      <GlobeAnimation />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center z-10 w-full relative">
        <div className="lg:col-span-7 xl:col-span-6 space-y-stack-md relative z-20">
          {/* <span className="inline-block px-3 py-1 bg-surface-container text-primary font-label-sm rounded-full backdrop-blur-sm bg-white/50 border border-primary/20 shadow-sm animate-pulse">
            ESTABLISHED 2026
          </span> */}
          <h1 className="font-display text-display leading-tight drop-shadow-sm">
            Think Big.<br />
            <span className="text-primary-container drop-shadow-md">Build Bigger.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-outline-variant/30">
            Empowering the next generation of software engineers, cloud
            architects, and tech founders at SRMIST. We are a community of
            dedicated builders focused on practical excellence.
          </p>
          <div className="flex flex-wrap gap-stack-sm pt-4">
            <Link href="https://www.meetup.com/awssbg-srmist/" target="_blank" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-md text-body-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 inline-block text-center shadow-primary/30">
              Join Community
            </Link>
            <Link href="/events" className="border border-outline-variant text-on-surface px-8 py-4 rounded-xl font-headline-md text-body-md hover:bg-surface-container-low hover:border-primary/50 transition-all duration-300 backdrop-blur-sm bg-white/20 inline-block text-center hover:-translate-y-1">
              Explore Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
