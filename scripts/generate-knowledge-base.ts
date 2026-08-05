// Regenerates src/data/knowledge-base.json — the content the chatbot's
// system prompt is built from. Pulls the live member roster and honorary
// members from DynamoDB, the static projects list, and a hand-maintained
// block of org info (about/mission/domains/recruitment/contact) that
// changes rarely enough not to need scraping.
//
// Usage:
//   npm run generate:knowledge-base
//
// Run on a schedule by .github/workflows/update-knowledge-base.yml so the
// chatbot's knowledge stays in sync with the live member roster.

import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { projectsData } from "../src/data/projectsData";

// `src/lib/team-data.ts` and `src/lib/honorary-members.ts` are guarded with
// `import "server-only"`, which throws unconditionally outside a Next.js
// server bundle — so this script queries DynamoDB directly instead of
// importing them, same as scripts/import-honorary-members.mjs does.

type MemberRole = "SBG_LEADER" | "SECRETARY" | "DIRECTOR" | "MANAGER" | "ASSOCIATE" | "BUILDER";
type HonoraryTag = "FACULTY_MENTOR" | "INDUSTRIAL_MENTOR" | "FOUNDING_MEMBER" | "ADVISORY";

interface RawMember {
  memberId: string;
  name: string;
  role: MemberRole;
  domain?: string;
  subdomain?: string;
  isActive?: boolean;
}

interface HonoraryMember {
  id: string;
  name: string;
  tag: HonoraryTag;
  description?: string;
}

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

async function getTeamMembers(): Promise<RawMember[]> {
  try {
    const result = await ddbDocClient.send(
      new ScanCommand({
        TableName: "sbg-members",
        FilterExpression: "isActive = :active",
        ExpressionAttributeValues: { ":active": true },
      })
    );
    return (result.Items ?? []) as RawMember[];
  } catch (error) {
    console.error("Failed to fetch team members from DynamoDB.", error);
    return [];
  }
}

async function getHonoraryMembers(): Promise<HonoraryMember[]> {
  try {
    const result = await ddbDocClient.send(new ScanCommand({ TableName: "sbg-honorary-members" }));
    return (result.Items ?? []) as HonoraryMember[];
  } catch (error) {
    console.error("Failed to fetch honorary members from DynamoDB.", error);
    return [];
  }
}

const OUTPUT_PATH = resolve(import.meta.dirname, "../src/data/knowledge-base.json");

const ROLE_LABELS: Record<MemberRole, string> = {
  SBG_LEADER: "SBG Leader",
  SECRETARY: "Secretary",
  DIRECTOR: "Director",
  MANAGER: "Manager",
  ASSOCIATE: "Associate",
  BUILDER: "Builder",
};

const HONORARY_TAG_LABELS: Record<HonoraryTag, string> = {
  FACULTY_MENTOR: "Faculty Mentor",
  INDUSTRIAL_MENTOR: "Industry Mentor",
  FOUNDING_MEMBER: "Founding Member",
  ADVISORY: "Advisory",
};

const ROLE_ORDER: MemberRole[] = ["SBG_LEADER", "SECRETARY", "DIRECTOR", "MANAGER", "ASSOCIATE", "BUILDER"];

const STATIC_CLUB_INFO = `
## ABOUT AWS STUDENT BUILDER GROUP AT SRMIST

Website: https://awssbg-srmist.in

AWS Student Builder Group at SRMIST (AWS SBG at SRMIST) is the official student-led AWS cloud computing community at SRM Institute of Science and Technology, Kattankulathur (SRM KTR). Founded 2025. Operates under the Department of Computing Technologies, School of Computing, SRMIST — KTR, but run by students, for students.

SRMIST has clubs for AI, robotics, IoT, and general software — but none built specifically around the cloud, where most of that software actually has to run. AWS SBG at SRMIST exists to close that gap: a community for people who want to stop reading about infrastructure and start operating it.

Open to every department, every year — no prior cloud experience required.

## VISION

A campus where the next AWS-certified engineer, the next cloud founder, and the next open-source maintainer all got their start in the same room.

## MISSION

1. Hands-On Learning — Labs and live deployments, not slideware.
2. Certification Pathways — Structured prep toward AWS certifications that actually mean something on a resume.
3. Real Projects, Real Stakes — Production-grade builds, not toy demos.
4. Career Runway — Direct prep for Cloud, DevOps, and Platform roles — interviews, resumes, referrals.
5. A Network, Not Just a Club — Ties to AWS Community Builders, AWS Heroes, and other university chapters that outlast your time here.
6. Leadership Experience — Run real teams and own real outcomes — manager and associate roles across every domain.

## WHY AWS SBG AT SRMIST?

Most existing technical clubs at SRMIST concentrate on general software development, AI, robotics, or IoT. Cloud computing, when covered, is usually treated as a supporting tool rather than a core discipline. This club is built on the belief that cloud skills must be learned through consistent practice, not isolated sessions.

AWS SBG at SRMIST combines hands-on practice, industry alignment, and community engagement to prepare students for modern cloud-driven careers.

## DOMAINS

### 1. Technical
Build real software, train ML models, and ship cloud infrastructure — the engineering core of everything SBG makes.
Sub-domains: Software Development, AI & Machine Learning, Cloud & DevOps.

### 2. Corporate
Run the club like an organization — planning events, managing partnerships, and growing the SBG brand.
Sub-domains: Events & Operations, PR & Marketing, Sponsorship & Finance, HR & Admin.

### 3. Creatives
Shape how SBG looks and sounds — design systems, visual identity, and every piece of content we publish.
Sub-domains: Digital Design, Media Production.

## RECRUITMENTS

Recruitments are not currently open. Applications for the next cohort will open shortly — check the Recruitments page on the website (https://awssbg-srmist.in/recruitments) or follow our social media for announcements. No prior experience is required to apply. Open to every department and every year.

## EVENTS & ACHIEVEMENTS

The Events and Achievements pages are still being built out — no events or achievements are published on the website yet. Direct visitors to check back on https://awssbg-srmist.in/events and https://awssbg-srmist.in/achievements, or follow social media for updates.

## CONTACT

- General queries: awssbg.srmist@gmail.com
- Sponsorships & partnerships: sponsorship.awssbg.srmist@gmail.com
- Contact form: https://awssbg-srmist.in/contact
- Located at: Department of Computing Technologies, School of Computing, SRM Institute of Science and Technology, Kattankulathur, Tamil Nadu, India.

## SOCIAL MEDIA

- Instagram: https://www.instagram.com/awssbg.srmist/
- LinkedIn: https://in.linkedin.com/company/awssbg-srmist
- Meetup: https://www.meetup.com/awssbg-srmist/
- GitHub: https://github.com/AWSSBG-at-SRMIST
- WhatsApp Community: https://chat.whatsapp.com/Ckmq15FNNjVIGftTJhIlgZ
`.trim();

function formatMember(m: RawMember): string {
  const parts = [`- **${m.name}** — ${ROLE_LABELS[m.role] ?? m.role}`];
  if (m.domain) parts.push(m.domain + (m.subdomain ? ` / ${m.subdomain}` : ""));
  return parts.join(", ");
}

function buildTeamSection(members: RawMember[], honorary: HonoraryMember[]): string {
  if (members.length === 0 && honorary.length === 0) {
    return "## TEAM\n\nTeam roster is not currently available.";
  }

  const byRole = new Map<MemberRole, RawMember[]>();
  for (const role of ROLE_ORDER) byRole.set(role, []);
  for (const m of members) {
    if (!byRole.has(m.role)) byRole.set(m.role, []);
    byRole.get(m.role)!.push(m);
  }

  const sections: string[] = ["## TEAM"];

  for (const role of byRole.keys()) {
    const list = byRole.get(role)!;
    if (list.length === 0) continue;
    sections.push(`\n### ${ROLE_LABELS[role] ?? role}s\n${list.map(formatMember).join("\n")}`);
  }

  if (honorary.length > 0) {
    const byTag = new Map<HonoraryTag, HonoraryMember[]>();
    for (const h of honorary) {
      if (!byTag.has(h.tag)) byTag.set(h.tag, []);
      byTag.get(h.tag)!.push(h);
    }
    for (const [tag, list] of byTag) {
      sections.push(
        `\n### ${HONORARY_TAG_LABELS[tag] ?? tag}s\n${list
          .map((h) => `- **${h.name}**${h.description ? ` — ${h.description}` : ""}`)
          .join("\n")}`
      );
    }
  }

  return sections.join("\n");
}

function buildProjectsSection(): string {
  if (projectsData.length === 0) {
    return "## PROJECTS\n\nNo projects published yet.";
  }
  const items = projectsData.map((p) => {
    const contributors = p.contributors.map((c) => c.name).join(", ");
    return `- **${p.title}** (${p.status}) — ${p.description} Tags: ${p.tags.join(", ")}. Contributors: ${contributors}. GitHub: ${p.githubUrl}${p.demoUrl ? ` · Demo: ${p.demoUrl}` : ""}`;
  });
  return `## PROJECTS\n\n${items.join("\n")}`;
}

async function main() {
  console.log("Fetching team members from DynamoDB...");
  const [members, honorary] = await Promise.all([getTeamMembers(), getHonoraryMembers()]);
  console.log(`  ${members.length} active members, ${honorary.length} honorary members.`);

  const content = [STATIC_CLUB_INFO, buildTeamSection(members, honorary), buildProjectsSection()].join("\n\n---\n\n");

  const output = {
    generatedAt: new Date().toISOString(),
    content,
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Failed to generate knowledge base:", err);
  process.exit(1);
});
