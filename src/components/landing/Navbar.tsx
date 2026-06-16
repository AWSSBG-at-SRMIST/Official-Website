"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/../public/logo-nobg.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setActiveHash(window.location.hash);

    const onHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    // Track #about section visibility on the home page via scroll
    const aboutEl = document.getElementById("about");
    let observer: IntersectionObserver | null = null;
    if (aboutEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveHash("#about");
          } else if (window.scrollY < aboutEl.offsetTop - 100) {
            setActiveHash("");
          }
        },
        { rootMargin: "-100px 0px -60% 0px" }
      );
      observer.observe(aboutEl);
    }

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      observer?.disconnect();
    };
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && activeHash !== "#about";
    }
    if (href === "/#about") {
      return pathname === "/" && activeHash === "#about";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  const linkClass = (href: string) =>
    isLinkActive(href)
      ? "text-primary font-semibold border-b-2 border-primary transition-all duration-300 hover:-translate-y-0.5 inline-block"
      : "text-on-surface-variant hover:text-primary transition-all duration-300 hover:-translate-y-0.5 inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary hover:after:scale-x-100 after:transition-transform after:duration-300";

  const mobileLinkClass = (href: string) =>
    isLinkActive(href)
      ? "text-primary font-semibold"
      : "text-on-surface-variant hover:text-primary transition-colors duration-300";

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
      <div className="max-w-container-max mx-auto px-margin-desktop py-3 grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center">
        <Link
          className="font-headline-md text-headline-md font-bold text-on-surface transition-all duration-300 hover:opacity-80 hover:scale-105 flex justify-start items-center"
          href="/"
        >
          <Image src={Logo} alt="AWSSBG SRMIST" className="h-16 w-16" />
          <span className="hidden md:block">AWS SBG SRMIST</span>
        </Link>

        <div className="hidden md:flex items-center justify-center gap-stack-md font-body-md text-body-md">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex justify-end items-center">
          <Link
            href="https://www.meetup.com/awssbg-srmist/"
            target="_blank"
            className="hidden md:inline-block bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md transition-all active:scale-95 duration-200 hover:shadow-lg hover:-translate-y-1"
          >
            Join Community
          </Link>

          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden text-on-surface p-2"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-outline-variant/30 bg-surface/95 backdrop-blur-md"
          >
            <div className="flex flex-col px-margin-desktop py-4 gap-4 font-body-md text-body-md">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClass(link.href)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://www.meetup.com/awssbg-srmist/"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-center transition-all active:scale-95 duration-200"
              >
                Join Community
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}