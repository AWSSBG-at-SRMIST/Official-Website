"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutGrid, ExternalLink } from "lucide-react";

const projects = [
  {
    slug: "sentry-sentinel",
    title: "Sentry Sentinel",
    description:
      "Autonomous cloud security auditing tool that monitors S3 buckets for public access in real-time.",
    tags: ["AWS Lambda", "Next.js"],
    live: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoiWxctn6ULzX31P4M3jC6SWoAaVyZRhM0vtqMftxrwMVvDkj9ihn3ciUE6JxfsCiOF9b-wWLImtYPtXdD-iR8eU2yGqoh-FX0VPLAsI-OBtUP3cgVA07kPLmeffrOkw4CgcATF6TAw4rWay3As8_r8vO4lflxFHM1uy3_xD-3ZqsHa-kduuEtEiEjBIU7eWreMfFFqIT016PZ3-vnWygYqaEFjRUHYIIrUnfpTvqM4PdbsLuxhOgzEsL3Ua4AhUFld8pU1QPNLCk",
  },
  {
    slug: "edulens-ai",
    title: "EduLens AI",
    description:
      "A personalized learning assistant that generates custom curriculum based on student performance.",
    tags: ["PyTorch", "SageMaker"],
    live: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfpGDpOUja5EnW2H_JuM7ENQc3ePlxdPl_qop5Z4Ly1LOHKkpBaemWHGhv3nCBtJpk38o2DYas4z1vMY2IQsJ3BzKKOxNwyHsDwIMtmyr6n5vY5MrApUZMmHpnc9D24qxvdezp5h3Bv0_WAwHDPn7H5VOaKZx6Nlqhvy4A9ftj6RsxHEy-ozwNrGamutWg3QLNFa50GFQAqNJGogowVS46-nwq3bZ4WcySdBfyhQGt3G8b7Gc7ToP0pYmLdnAd-ridi-0wKL0cXFA",
  },
  {
    slug: "pulse-dash",
    title: "Pulse Dash",
    description:
      "Real-time collaboration dashboard for remote engineering teams to manage deployment pipelines.",
    tags: ["React", "AppSync"],
    live: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzsT7qi20ZIQPUUjKiZGY5ztkUQSdBM3D5utWBCca_rZFLuRo2pzbRAgoBUAVo088M6mHohWxSiC1P0ynxLHUnxAsA6lfgPHpZOeB_PvpYhFGMI7u_7ju3SIXvLQAkma5dwsUHIR_JihicHL0wSESDgp9NNJ-9jhbxBQbZXgJ7EWsKY3iBA9KS1DHZvHRhnfTvmvHJzwRXCZhU7dS5eY5H6dyTu6KjmjHc9PhUQVroWYrr0jgD1ULngI8GpLo3_pEgPtYBNkvJ8nQ",
  },
];

export function ProjectShowcase() {
  return (
    <section className="py-stack-lg max-w-container-max mx-auto px-margin-desktop" id="projects">
      <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg">
        <div className="max-w-xl">
          <h2 className="font-display font-bold text-[32px] sm:text-[44px] leading-[1.05] tracking-tight mb-4">
            Project Showcase
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Exceptional products built by our community members using modern cloud
            stacks.
          </p>
        </div>
        <Link href="/projects" className="hidden md:flex items-center gap-2 text-primary font-bold uppercase tracking-wide text-sm">
          View All Projects
          <LayoutGrid size={20} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {projects.map((project, idx) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group bg-surface-container-lowest border-2 border-on-surface/10 hover:border-primary/40 transition-colors duration-300"
          >
            <div className="h-48 bg-surface-variant relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover grayscale-[15%]"
                alt={`Project ${project.title}`}
                src={project.image}
              />
              {project.live && (
                <div className="absolute top-4 right-4 bg-surface-container-lowest border border-on-surface/10 px-3 py-1 text-label-sm font-bold flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="w-2 h-2 bg-green-500" /> Live
                </div>
              )}
            </div>
            <div className="p-8 space-y-4">
              <div className="flex gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-primary/30 text-primary text-[10px] font-bold px-2 py-0.5 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="font-headline-md text-headline-md">{project.title}</h4>
              <p className="text-body-md text-on-surface-variant line-clamp-2">{project.description}</p>
              <div className="pt-4 flex justify-end items-center border-t border-on-surface/10">
                <Link
                  className="text-on-surface hover:text-primary transition-colors hover:translate-x-1"
                  href={`/projects/${project.slug}`}
                >
                  <ExternalLink size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
