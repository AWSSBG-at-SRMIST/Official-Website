export type TeamLevel = "presidium" | "director" | "manager" | "associate" | "builder" | "mentor" | "founding";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string | null;
  imageAlt: string;
  domains?: string[];
  initials?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
  meetupUrl?: string;
  builderUrl?: string;
  portfolioUrl?: string;
  level?: TeamLevel;
}

export interface SubdomainGroup {
  name: string;
  manager?: TeamMember;
  associate?: TeamMember;
}

export interface DomainStructure {
  director?: TeamMember;
  groups: SubdomainGroup[];
}

export interface TeamData {
  leader?: TeamMember;
  secretary?: TeamMember;
  technical: DomainStructure;
  corporate: DomainStructure;
  creatives: DomainStructure;
  facultyMentors: TeamMember[];
  industrialMentors: TeamMember[];
  foundingTeam: TeamMember[];
}
