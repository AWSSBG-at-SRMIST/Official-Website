"use client";

import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

// Tech stack tag with brand-appropriate color token
function TechTag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
      style={{ color: color, borderColor: `${color}33`, background: `${color}12` }}
    >
      {label}
    </span>
  );
}

const projects = [
  {
    id: "sentry-sentinel",
    title: "Sentry Sentinel",
    description:
      "Autonomous cloud security auditing tool that monitors S3 buckets and IAM policies for misconfiguration in real-time.",
    // Real-feeling code/terminal screenshot from Unsplash
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    status: "live" as const,
    contributors: 2,
    stack: [
      { label: "AWS Lambda", color: "#FF9900" },
      { label: "Next.js", color: "#000000" },
      { label: "DynamoDB", color: "#4053D6" },
    ],
    href: "/projects/sentry-sentinel",
  },
  {
    id: "edulens-ai",
    title: "EduLens AI",
    description:
      "Personalised learning assistant that generates adaptive curriculum using SageMaker inference endpoints and student performance telemetry.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
    status: "live" as const,
    contributors: 3,
    stack: [
      { label: "SageMaker", color: "#FF9900" },
      { label: "PyTorch", color: "#EE4C2C" },
      { label: "FastAPI", color: "#009688" },
    ],
    href: "/projects/edulens-ai",
  },
  {
    id: "pulse-dash",
    title: "Pulse Dash",
    description:
      "Real-time collaboration dashboard for distributed engineering teams — deployment pipeline visibility powered by AppSync subscriptions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    status: "in-progress" as const,
    contributors: 2,
    stack: [
      { label: "AppSync", color: "#FF9900" },
      { label: "React", color: "#61DAFB" },
      { label: "Node.js", color: "#339933" },
    ],
    href: "/projects/pulse-dash",
  },
];

export function ProjectShowcase() {
  return (
    <section
      className="py-stack-lg max-w-container-max mx-auto px-margin-desktop reveal"
      id="projects"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg">
        <div className="max-w-xl">
          <h2 className="font-headline-lg text-headline-lg mb-4">
            Built by Our Community
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Real products shipped by AWS Student Builders using modern cloud
            stacks and open-source tooling.
          </p>
        </div>
        <Link
          href="/projects"
          className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
        >
          View All Projects
          <ExternalLink size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden card-shadow hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Project preview image */}
            <div className="h-48 bg-surface-variant relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={project.title}
                src={project.image}
                loading="lazy"
              />
              {/* Status badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-label-sm font-bold flex items-center gap-1.5 shadow-sm">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.status === "live" ? "bg-green-500" : "bg-amber-400"
                  }`}
                />
                {project.status === "live" ? "Live" : "In Progress"}
              </div>
              {/* Dark overlay on hover for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-8 flex flex-col flex-1 space-y-4">
              {/* Tech stack — makes the project feel real immediately */}
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <TechTag key={tech.label} label={tech.label} color={tech.color} />
                ))}
              </div>

              <h4 className="font-headline-md text-headline-md group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h4>
              <p className="text-body-md text-on-surface-variant line-clamp-2 flex-1">
                {project.description}
              </p>

              {/* Footer row: contributor count + link */}
              <div className="pt-4 flex justify-between items-center border-t border-outline-variant/20">
                {/* Contributor count with icon — no fake circles */}
                <div className="flex items-center gap-1.5 text-on-surface-variant text-label-sm">
                  <Github size={14} className="opacity-60" />
                  <span>{project.contributors} contributor{project.contributors !== 1 ? "s" : ""}</span>
                </div>
                <Link
                  className="text-on-surface hover:text-primary transition-colors"
                  href={project.href}
                  aria-label={`View ${project.title}`}
                >
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
