"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, Github, Instagram, Cloud, Globe, Users } from "lucide-react";
import { TeamCategoryScroller } from "./TeamCategoryScroller";
import { DomainStructure, SubdomainGroup, TeamData, TeamMember } from "@/types/team";

const categories = [
  { id: "mentors", name: "Mentors" },
  { id: "presidium", name: "Leadership" },
  { id: "technical", name: "Technical" },
  { id: "corporate", name: "Corporate" },
  { id: "creatives", name: "Creatives" },
  { id: "founding", name: "Founding Team" },
];

type DomainCategoryId = "technical" | "corporate" | "creatives";

const LINKS: Array<{ key: keyof TeamMember; icon: typeof Linkedin; label: string }> = [
  { key: "linkedinUrl", icon: Linkedin, label: "LinkedIn" },
  { key: "githubUrl", icon: Github, label: "GitHub" },
  { key: "instagramUrl", icon: Instagram, label: "Instagram" },
  { key: "meetupUrl", icon: Users, label: "Meetup" },
  { key: "builderUrl", icon: Cloud, label: "AWS Builder Profile" },
  { key: "portfolioUrl", icon: Globe, label: "Portfolio" },
];

function LinkRow({ member }: { member: TeamMember }) {
  const links = LINKS.filter((l) => member[l.key]);
  if (links.length === 0) return null;
  return (
    <div className="flex gap-1.5">
      {links.map(({ key, icon: Icon, label }) => (
        <a
          key={key}
          href={member[key] as string}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on ${label}`}
          className="w-9 h-9 flex items-center justify-center border border-on-surface/15 text-on-surface-variant hover:border-primary hover:text-primary transition-colors shrink-0"
        >
          <Icon size={12} />
        </a>
      ))}
    </div>
  );
}

// No real photos exist yet (Google Drive lookup isn't wired in), so each
// member gets a deterministic gradient — hashed from their id, kept inside
// the brand's violet-to-fuchsia range — instead of a flat initials tile.
// This reads as an actual avatar placeholder and will be replaced in-place
// once `image` is populated, with no layout change needed.
function avatarGradient(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (Math.imul(31, hash) + id.charCodeAt(i)) | 0;
  const h1 = 260 + (Math.abs(hash) % 70);
  const h2 = (h1 + 35) % 360;
  return `linear-gradient(135deg, hsl(${h1} 70% 38%), hsl(${h2} 75% 55%))`;
}

function InitialsSwatch({ member, size = "md" }: { member: TeamMember; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "w-24 h-24 text-3xl" : "w-16 h-16 text-xl";
  return (
    <div
      className={`${dim} shrink-0 flex items-center justify-center text-white font-display font-bold overflow-hidden border-2 border-on-surface/10`}
      style={member.image ? undefined : { background: avatarGradient(member.id) }}
    >
      {member.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={member.imageAlt} src={member.image} className="w-full h-full object-cover" />
      ) : (
        member.initials
      )}
    </div>
  );
}

function VacantSwatch({ size = "md" }: { size?: "md" | "lg" }) {
  const dim = size === "lg" ? "w-24 h-24 text-sm" : "w-16 h-16 text-xs";
  return (
    <div className={`${dim} shrink-0 border-2 border-dashed border-on-surface/20 flex items-center justify-center text-on-surface-variant/40`}>
      —
    </div>
  );
}

function EmptyState({
  message = "Team data is temporarily unavailable. Please check back shortly.",
}: {
  message?: string;
}) {
  return <div className="py-16 text-center text-on-surface-variant">{message}</div>;
}

/* ---------- Leadership: vertical command spine ---------- */

function SpineTier({ index, label, children }: { index: string; label: string; children: ReactNode }) {
  return (
    <div className="relative">
      <span className="absolute -left-6 sm:-left-8 top-2 w-6 sm:w-8 h-px bg-primary" />
      <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
        <span className="font-display">{index}</span>
        {label}
      </p>
      {children}
    </div>
  );
}

function SpineMember({ member, size = "lg" }: { member: TeamMember; size?: "lg" | "md" }) {
  return (
    <div className="flex items-start gap-4">
      <InitialsSwatch member={member} size={size === "lg" ? "lg" : "md"} />
      <div className="flex-1 min-w-0 pt-0.5">
        <p
          className={`font-display font-bold leading-tight text-on-surface truncate ${
            size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
          }`}
        >
          {member.name}
        </p>
        <div className="mt-2">
          <LinkRow member={member} />
        </div>
      </div>
    </div>
  );
}

function SpineVacant({ label, size = "lg" }: { label: string; size?: "lg" | "md" }) {
  return (
    <div className="flex items-center gap-4">
      <VacantSwatch size={size === "lg" ? "lg" : "md"} />
      <p
        className={`font-display font-bold text-on-surface-variant/40 ${
          size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
        }`}
      >
        Vacant
      </p>
      <span className="text-[10px] uppercase tracking-wide text-on-surface-variant/40">{label}</span>
    </div>
  );
}

function LeadershipSpine({ data }: { data: TeamData }) {
  const directors: Array<{ domain: string; member?: TeamMember }> = [
    { domain: "Technical", member: data.technical.director },
    { domain: "Corporate", member: data.corporate.director },
    { domain: "Creatives", member: data.creatives.director },
  ];

  return (
    <div className="relative pl-6 sm:pl-8">
      <div className="absolute left-0 top-2 bottom-2 w-px bg-primary/30" />
      <div className="flex flex-col gap-12">
        <SpineTier index="01" label="SBG Leader">
          {data.leader ? <SpineMember member={data.leader} /> : <SpineVacant label="SBG Leader" />}
        </SpineTier>

        <SpineTier index="02" label="Secretary">
          {data.secretary ? <SpineMember member={data.secretary} /> : <SpineVacant label="Secretary" />}
        </SpineTier>

        <SpineTier index="03" label="Board of Directors">
          <div className="flex flex-col gap-7">
            {directors.map(({ domain, member }) => (
              <div key={domain} className="flex flex-col gap-1.5">
                <p className="text-[10px] uppercase tracking-wide text-on-surface-variant/50">{domain}</p>
                {member ? (
                  <SpineMember member={member} size="md" />
                ) : (
                  <SpineVacant label={`${domain} Director`} size="md" />
                )}
              </div>
            ))}
          </div>
        </SpineTier>
      </div>
    </div>
  );
}

/* ---------- Domain tabs: roster ledger ---------- */

function LedgerPersonRow({ roleLabel, member }: { roleLabel: string; member?: TeamMember }) {
  return (
    <div className="flex items-center gap-4">
      {member ? <InitialsSwatch member={member} /> : <VacantSwatch />}
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant/50 mb-0.5">
          {roleLabel}
        </p>
        {member ? (
          <>
            <p className="font-bold text-base sm:text-lg text-on-surface truncate">{member.name}</p>
            <div className="mt-1.5">
              <LinkRow member={member} />
            </div>
          </>
        ) : (
          <p className="text-sm text-on-surface-variant/40 uppercase tracking-wide">Vacant</p>
        )}
      </div>
    </div>
  );
}

function LedgerRow({ group, index }: { group: SubdomainGroup; index: string }) {
  return (
    <div className="border-b-2 border-on-surface/10 py-6">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-display text-xs text-primary tracking-[0.2em]">{index}</span>
        <h3 className="text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-on-surface">
          {group.name}
        </h3>
      </div>
      <div className="flex flex-col gap-5 sm:pl-8">
        <LedgerPersonRow roleLabel="Manager" member={group.manager} />
        <LedgerPersonRow roleLabel="Associate" member={group.associate} />
      </div>
    </div>
  );
}

function DomainSection({ domain }: { domain: DomainStructure }) {
  return (
    <div>
      <div className="pb-6 border-b-2 border-on-surface/10 mb-2">
        <p className="text-sm text-on-surface-variant">
          Directed by{" "}
          <span className="font-bold text-on-surface">
            {domain.director ? domain.director.name : "Vacant"}
          </span>
        </p>
      </div>
      <div>
        {domain.groups.map((group, idx) => (
          <LedgerRow key={group.name} group={group} index={String(idx + 1).padStart(2, "0")} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Flat roster: Mentors / Founding Team ---------- */

function RosterCard({ member, index }: { member: TeamMember; index: string }) {
  return (
    <div className="border-2 border-on-surface/10 hover:border-primary/40 transition-colors duration-300 p-6 flex items-center gap-4">
      <InitialsSwatch member={member} />
      <div className="min-w-0">
        <span className="font-display text-[10px] text-primary tracking-[0.2em]">{index}</span>
        <p className="font-bold text-base sm:text-lg text-on-surface truncate">{member.name}</p>
        <p className="text-xs text-on-surface-variant/60 uppercase tracking-wide mb-1.5">{member.role}</p>
        {member.description && (
          <p className="text-sm text-on-surface-variant mb-1.5 line-clamp-2">{member.description}</p>
        )}
        <LinkRow member={member} />
      </div>
    </div>
  );
}

function RosterGrid({ members, emptyMessage }: { members: TeamMember[]; emptyMessage: string }) {
  if (members.length === 0) return <EmptyState message={emptyMessage} />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {members.map((member, idx) => (
        <RosterCard key={member.id} member={member} index={String(idx + 1).padStart(2, "0")} />
      ))}
    </div>
  );
}

function MentorsSection({ data }: { data: TeamData }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-4 border-b-2 border-on-surface/10 pb-3">
          Advisory Committee
        </h3>
        <RosterGrid members={data.advisoryCommittee} emptyMessage="Advisory committee details coming soon." />
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-4 border-b-2 border-on-surface/10 pb-3">
          Faculty Mentor
        </h3>
        <RosterGrid members={data.facultyMentors} emptyMessage="Faculty mentor details coming soon." />
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-4 border-b-2 border-on-surface/10 pb-3">
          Industrial Mentor
        </h3>
        <RosterGrid members={data.industrialMentors} emptyMessage="Industrial mentor details coming soon." />
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export function TeamPageClient({ data }: { data: TeamData }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const activeCategoryId = categories[activeCategory].id;

  const hasLeadership = Boolean(
    data.leader || data.secretary || data.technical.director || data.corporate.director || data.creatives.director
  );

  const renderActiveCategory = () => {
    if (activeCategoryId === "presidium") {
      return hasLeadership ? <LeadershipSpine data={data} /> : <EmptyState />;
    }
    if (activeCategoryId === "mentors") {
      return <MentorsSection data={data} />;
    }
    if (activeCategoryId === "founding") {
      return <RosterGrid members={data.foundingTeam} emptyMessage="Founding team details coming soon." />;
    }
    return <DomainSection domain={data[activeCategoryId as DomainCategoryId]} />;
  };

  return (
    <main className="pt-24 pb-stack-lg">
      {/* Hero Section */}
      <header className="mb-12 md:mb-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-gutter items-end">
            <div className="md:col-span-8">
              <h1 className="font-display text-[40px] sm:text-[64px] md:text-[80px] mb-4 tracking-tight leading-[0.95] font-bold text-on-surface">
                The Builders.
              </h1>
              <p className="text-label-md text-on-surface-variant max-w-2xl">
                The minds driving cloud innovation at SRMIST. We are a collective of
                builders, engineers, and designers pushing the boundaries of what&rsquo;s
                possible on AWS.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end pb-4">
              <div className="w-16 h-1" style={{ backgroundColor: "var(--brand-primary)" }} />
            </div>
          </div>
        </div>
      </header>

      {/* Directory Section */}
      <section className="relative w-full py-8 md:py-12 px-margin-mobile md:px-margin-desktop border-y-2 border-on-surface/10 mx-auto max-w-container-max bg-surface-container-lowest">
        <div className="flex flex-col gap-10 items-center w-full">
          <div className="w-full">
            <TeamCategoryScroller
              categories={categories}
              activeIndex={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderActiveCategory()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
