"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    const base = "transition-all duration-300 hover:-translate-y-0.5 inline-block py-1";
    if (isActive) {
      return `${base} text-primary font-semibold border-b-2 border-primary`;
    }
    return `${base} text-on-surface-variant hover:text-primary relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary hover:after:scale-x-100 after:transition-transform after:duration-300`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/30 shadow-sm">
      <div className="max-w-container-max mx-auto px-margin-desktop py-4 flex justify-between items-center">
        <Link
          className="font-headline-md text-headline-md font-bold text-on-surface transition-all duration-300 hover:opacity-80 hover:scale-105 inline-block"
          href="/"
        >
          AWS SBG SRMIST
        </Link>
        <div className="hidden md:flex items-center gap-stack-md font-body-md text-body-md">
          <Link className={getLinkClass("/")} href="/">
            Home
          </Link>
          <Link className={getLinkClass("/about")} href="/about">
            About
          </Link>
          <Link className={getLinkClass("/events")} href="/events">
            Events
          </Link>
          <Link className={getLinkClass("/projects")} href="/projects">
            Projects
          </Link>
          <Link className={getLinkClass("/team")} href="/team">
            Team
          </Link>
        </div>
        <Link href="/join" className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md transition-all active:scale-95 duration-200 hover:shadow-lg hover:-translate-y-1">
          Join Community
        </Link>
      </div>
    </nav>
  );
}
