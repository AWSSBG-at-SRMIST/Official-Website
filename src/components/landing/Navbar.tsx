"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/logo-nobg.png"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
      <div className="max-w-container-max mx-auto px-margin-desktop py-0 flex justify-between items-center">
        <Link
          className="font-headline-md text-headline-md font-bold text-on-surface transition-all duration-300 hover:opacity-80 hover:scale-105 flex justify-center items-center"
          href="/"
        >
          <Image src={Logo} alt="AWSSBG SRMIST" className="h-16 w-16"/>
          <span className="hidden md:block">AWS SBG SRMIST</span>
        </Link>
        <div className="hidden md:flex items-center gap-stack-md font-body-md text-body-md">
          <Link
            className="text-primary font-semibold border-b-2 border-primary transition-all duration-300 hover:-translate-y-0.5 inline-block"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-all duration-300 hover:-translate-y-0.5 inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary hover:after:scale-x-100 after:transition-transform after:duration-300"
            href="/#about"
          >
            About
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-all duration-300 hover:-translate-y-0.5 inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary hover:after:scale-x-100 after:transition-transform after:duration-300"
            href="/events"
          >
            Events
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-all duration-300 hover:-translate-y-0.5 inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary hover:after:scale-x-100 after:transition-transform after:duration-300"
            href="/projects"
          >
            Projects
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-all duration-300 hover:-translate-y-0.5 inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary hover:after:scale-x-100 after:transition-transform after:duration-300"
            href="/team"
          >
            Team
          </Link>
        </div>
        <Link href="https://www.meetup.com/awssbg-srmist/" target="_blank" className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md transition-all active:scale-95 duration-200 hover:shadow-lg hover:-translate-y-1">
          Join Community
        </Link>
      </div>
    </nav>
  );
}
