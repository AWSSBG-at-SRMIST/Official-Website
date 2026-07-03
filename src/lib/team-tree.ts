import "server-only";
import { RawMember, MemberRole } from "./team-data";
import { HonoraryMember, HonoraryTag } from "./honorary-members";
import { DomainStructure, SubdomainGroup, TeamData, TeamLevel, TeamMember } from "@/types/team";
import { normalizeName } from "./team-photos";

const LEVEL_BY_ROLE: Record<MemberRole, TeamLevel> = {
  SBG_LEADER: "presidium",
  SECRETARY: "presidium",
  DIRECTOR: "director",
  MANAGER: "manager",
  ASSOCIATE: "associate",
  BUILDER: "builder",
};

// Fixed org structure: each domain has exactly one subdomain list, and each
// subdomain has at most one manager and one associate. Used as the canonical
// column order so every domain tab renders the same shape regardless of
// which slots are currently filled in the live roster.
const SUBDOMAIN_ORDER: Record<string, string[]> = {
  Technical: ["Software Development", "AI & Machine Learning", "Cloud & DevOps"],
  Corporate: ["Events & Operations", "PR & Marketing", "Sponsorship & Finance", "HR & Admin"],
  Creatives: ["Digital Design", "Media Production"],
};

import { initialsOf } from "./utils";

function humanizeRole(member: RawMember): string {
  const { role, domain, subdomain } = member;
  switch (role) {
    case "SBG_LEADER":
      return "SBG Leader";
    case "SECRETARY":
      return "Secretary";
    case "DIRECTOR":
      return domain ? `${domain} Director` : "Director";
    case "MANAGER":
      return subdomain ? `${subdomain} Manager` : domain ? `${domain} Manager` : "Manager";
    case "ASSOCIATE":
      return subdomain ? `${subdomain} Associate` : domain ? `${domain} Associate` : "Associate";
    case "BUILDER":
      return subdomain ? `${subdomain} Builder` : domain ? `${domain} Builder` : "Builder";
    default:
      return role;
  }
}

function toTeamMember(member: RawMember, photoMap: Record<string, string>): TeamMember {
  return {
    id: member.memberId,
    name: member.name,
    role: humanizeRole(member),
    image: photoMap[normalizeName(member.name)] ?? null,
    imageAlt: member.name,
    initials: initialsOf(member.name),
    domains: member.subdomain ? [member.subdomain] : member.domain ? [member.domain] : [],
    linkedinUrl: member.linkedin || undefined,
    githubUrl: member.github || undefined,
    instagramUrl: member.instagram || undefined,
    meetupUrl: member.meetup || undefined,
    builderUrl: member.builderId || undefined,
    portfolioUrl: member.portfolio || undefined,
    level: LEVEL_BY_ROLE[member.role],
  };
}

/**
 * Builds one domain's fixed org shape: a single director slot, and one
 * column per subdomain (canonical order, falling back to whatever subdomain
 * names appear in the data if a domain isn't in SUBDOMAIN_ORDER). Each
 * column carries exactly one manager slot and one associate slot — vacant
 * slots stay vacant (rendered explicitly by the UI) rather than being
 * silently dropped or promoted, since the real structure is a fixed
 * one-manager-one-associate-per-subdomain shape.
 */
function buildDomainStructure(domain: string, members: RawMember[], photoMap: Record<string, string>): DomainStructure {
  const director = members.find((m) => m.role === "DIRECTOR" && m.domain === domain);

  const discovered = Array.from(
    new Set(members.filter((m) => m.domain === domain && m.subdomain).map((m) => m.subdomain as string))
  );
  const canonical = SUBDOMAIN_ORDER[domain] ?? [];
  const orderedNames = [...canonical, ...discovered.filter((name) => !canonical.includes(name))];

  const groups: SubdomainGroup[] = orderedNames.map((name) => {
    const inSubdomain = members.filter((m) => m.domain === domain && m.subdomain === name);
    const manager = inSubdomain.find((m) => m.role === "MANAGER");
    const associate = inSubdomain.find((m) => m.role === "ASSOCIATE");

    return {
      name,
      manager: manager ? toTeamMember(manager, photoMap) : undefined,
      associate: associate ? toTeamMember(associate, photoMap) : undefined,
    };
  });

  return {
    director: director ? toTeamMember(director, photoMap) : undefined,
    groups,
  };
}

const HONORARY_ROLE_LABEL: Record<HonoraryTag, string> = {
  FACULTY_MENTOR: "Faculty Mentor",
  INDUSTRIAL_MENTOR: "Industrial Mentor",
  FOUNDING_MEMBER: "Founding Member",
  ADVISORY: "Advisory Committee",
};

const HONORARY_LEVEL: Record<HonoraryTag, TeamLevel> = {
  FACULTY_MENTOR: "mentor",
  INDUSTRIAL_MENTOR: "mentor",
  FOUNDING_MEMBER: "founding",
  ADVISORY: "mentor",
};

// Faculty/Industry mentors and founding members never log in to the
// dashboard, so they live in sbg-honorary-members (managed from the Internal
// Dashboard) rather than sbg-members — converted into the same TeamMember
// shape so the existing roster UI doesn't need to know the difference.
function toHonoraryTeamMember(member: HonoraryMember, photoMap: Record<string, string>): TeamMember {
  return {
    id: member.id,
    name: member.name,
    role: HONORARY_ROLE_LABEL[member.tag],
    image: member.photoUrl || photoMap[normalizeName(member.name)] || null,
    imageAlt: member.name,
    initials: initialsOf(member.name),
    linkedinUrl: member.linkedin || undefined,
    description: member.description || undefined,
    level: HONORARY_LEVEL[member.tag],
  };
}

export function buildTeamTree(
  members: RawMember[],
  honoraryMembers: HonoraryMember[] = [],
  photoMap: Record<string, string> = {}
): TeamData {
  const leader = members.find((m) => m.role === "SBG_LEADER");
  const secretary = members.find((m) => m.role === "SECRETARY");

  return {
    leader: leader ? toTeamMember(leader, photoMap) : undefined,
    secretary: secretary ? toTeamMember(secretary, photoMap) : undefined,
    technical: buildDomainStructure("Technical", members, photoMap),
    corporate: buildDomainStructure("Corporate", members, photoMap),
    creatives: buildDomainStructure("Creatives", members, photoMap),
    facultyMentors: honoraryMembers
      .filter((m) => m.tag === "FACULTY_MENTOR")
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      .map((m) => toHonoraryTeamMember(m, photoMap)),
    industrialMentors: honoraryMembers
      .filter((m) => m.tag === "INDUSTRIAL_MENTOR")
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      .map((m) => toHonoraryTeamMember(m, photoMap)),
    advisoryCommittee: honoraryMembers
      .filter((m) => m.tag === "ADVISORY")
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      .map((m) => toHonoraryTeamMember(m, photoMap)),
    foundingTeam: honoraryMembers
      .filter((m) => m.tag === "FOUNDING_MEMBER")
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      .map((m) => toHonoraryTeamMember(m, photoMap)),
  };
}
