import Link from "next/link";
import { ExternalLink, Terminal, Building2, Lightbulb } from "lucide-react";

const domains = [
  {
    icon: Terminal,
    title: "Technical",
    description:
      "Deep dive into serverless applications, full-stack development, modern DevOps, and scalable architecture.",
    subDomains: ["Development", "AI / ML", "Cloud & DevOps"],
    href: "/domains/technical",
  },
  {
    icon: Building2,
    title: "Corporate & Events",
    description:
      "Master enterprise cloud architecture, security compliance, project management, and system reliability.",
    subDomains: ["Events", "Public Relations", "Sponsorship", "HR & Admin"],
    href: "/domains/corporate",
  },
  {
    icon: Lightbulb,
    title: "Creatives",
    description:
      "Explore the boundary-pushing realms of Generative AI, UX Engineering, and Product Design thinking.",
    subDomains: ["Digital Design", "Media"],
    href: "/domains/creative",
  },
];

export function ExploreDomains() {
  return (
    <section className="py-stack-lg max-w-container-max mx-auto px-margin-desktop reveal">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {domains.map((domain) => {
          const Icon = domain.icon;
          return (
            <div key={domain.title} className="md:col-span-4">
              <div className="bg-white/75 backdrop-blur-md p-8 rounded-[2rem] border border-outline-variant/20 hover:border-primary/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-primary/5 hover:scale-[1.02] overflow-hidden relative h-full flex flex-col">
                {/* Corner glow orb */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700 ease-out" />

                {/* Icon */}
                <div className="bg-primary/10 text-primary p-4 rounded-2xl w-fit mb-6 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300 relative z-10">
                  <Icon size={32} />
                </div>

                {/* Title */}
                <h3 className="font-headline-md text-headline-md mb-3 relative z-10">
                  {domain.title}
                </h3>

                {/* Description */}
                <p className="text-body-md text-on-surface-variant mb-6 relative z-10">
                  {domain.description}
                </p>

                {/* Sub-domain pill labels */}
                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                  {domain.subDomains.map((sub) => (
                    <span
                      key={sub}
                      className="px-3 py-1 rounded-full text-label-sm font-medium bg-primary/8 text-primary border border-primary/15 group-hover:bg-primary/12 group-hover:border-primary/25 transition-colors duration-300"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Explore link — pushed to bottom */}
                <div className="mt-auto relative z-10">
                  <Link
                    href={domain.href}
                    className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
                  >
                    Explore Domain <ExternalLink size={18} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
