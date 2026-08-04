// Regenerates src/data/knowledge-base.json — the content the chatbot's
// system prompt is built from. Pulls everything from LIVE public sources,
// so it needs no AWS credentials of its own:
//
//   • Team + mentors  ← {SITE}/api/team          (deployed server reads DynamoDB)
//   • Projects        ← GitHub org repos          (api.github.com, public)
//   • Events          ← {SITE}/api/meetup/past-events (Meetup, via the site)
//   • Org info        ← STATIC_CLUB_INFO below     (hand-maintained, rarely changes)
//
// Because the roster/events come off the deployed site and projects off
// GitHub, this can run at build time (see the `prebuild` script) — no cron
// and no secrets required. Override the site it reads with KB_SITE_URL.
//
// Usage:
//   npm run generate:knowledge-base

import { writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE = (process.env.KB_SITE_URL ?? "https://www.awssbg-srmist.in").replace(/\/$/, "");
const GITHUB_ORG = process.env.KB_GITHUB_ORG ?? "AWSSBG-at-SRMIST";
// Infra/meta repos that aren't member "projects" — kept out of the chatbot's project list.
const EXCLUDE_REPOS = new Set(["Official-Website", "Internal-Dashboard", ".github"]);

const OUTPUT_PATH = resolve(import.meta.dirname, "../src/data/knowledge-base.json");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
}

// ---------------------------------------------------------------------------
// Labels / ordering
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Static, hand-maintained org info
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Live fetchers — each returns a safe fallback on any failure so a single
// dead source never blocks regeneration of the rest.
// ---------------------------------------------------------------------------

async function fetchJson(url: string, init?: RequestInit): Promise<unknown> {
  const res = await fetch(url, {
    ...init,
    headers: { "User-Agent": "awssbg-kb-generator", Accept: "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function getTeam(): Promise<{ members: RawMember[]; honorary: HonoraryMember[] }> {
  try {
    const data = (await fetchJson(`${SITE}/api/team`)) as {
      members?: RawMember[];
      honorary?: HonoraryMember[];
    };
    return { members: data.members ?? [], honorary: data.honorary ?? [] };
  } catch (error) {
    console.error(`Failed to fetch team from ${SITE}/api/team:`, (error as Error).message);
    return { members: [], honorary: [] };
  }
}

async function getRepos(): Promise<Repo[]> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const repos = (await fetchJson(
      `https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100&sort=updated`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    )) as Repo[];
    return repos
      .filter((r) => !r.fork && !r.archived && !EXCLUDE_REPOS.has(r.name))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", (error as Error).message);
    return [];
  }
}

interface EventNode {
  title?: string;
  dateTime?: string;
  eventUrl?: string;
  description?: string;
  going?: { totalCount?: number };
  status?: string;
}

interface EventEntry {
  title: string;
  dateTime?: string;
  url?: string;
  description?: string;
  going?: number;
}

function parseEventEdges(payload: unknown): EventEntry[] {
  // Meetup's getPastGroupEvents response — dig out event nodes defensively
  // since the exact shape can shift. Current shape: groupByUrlname.events.edges;
  // an older one used pastEvents.edges.
  const group =
    (payload as { data?: { groupByUrlname?: Record<string, { edges?: unknown }> } })?.data
      ?.groupByUrlname ?? {};
  const rawEdges = group.events?.edges ?? group.pastEvents?.edges ?? [];
  if (!Array.isArray(rawEdges)) return [];
  return rawEdges
    .map((e: { node?: EventNode }) => e?.node)
    .filter((n): n is EventNode => !!n?.title)
    .map((n) => ({
      title: n.title!,
      dateTime: n.dateTime,
      url: n.eventUrl,
      description: n.description,
      going: n.going?.totalCount,
    }));
}

async function getEvents(): Promise<EventEntry[]> {
  const token = process.env.MEETUP_API_TOKEN;
  const urlname = process.env.MEETUP_URLNAME ?? "awssbg-srmist";

  // Preferred: hit Meetup's GraphQL directly with the persisted-query hash, so
  // KB events don't depend on the deployed site's env being configured.
  if (token) {
    try {
      const res = await fetch("https://www.meetup.com/gql2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0",
        },
        body: JSON.stringify({
          operationName: "getPastGroupEvents",
          variables: { urlname, beforeDateTime: new Date().toISOString() },
          extensions: { persistedQuery: { version: 1, sha256Hash: token } },
        }),
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      if (data?.errors) throw new Error(JSON.stringify(data.errors).slice(0, 200));
      return parseEventEdges(data);
    } catch (error) {
      console.error("Direct Meetup fetch failed, falling back to site route:", (error as Error).message);
    }
  }

  // Fallback: the deployed site's proxy route (needs MEETUP_API_TOKEN on the site).
  try {
    return parseEventEdges(await fetchJson(`${SITE}/api/meetup/past-events`));
  } catch (error) {
    console.error("Failed to fetch Meetup events:", (error as Error).message);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Section builders
// ---------------------------------------------------------------------------

function formatMember(m: RawMember): string {
  const parts = [`- **${m.name}** — ${ROLE_LABELS[m.role] ?? m.role}`];
  if (m.domain) parts.push(m.domain + (m.subdomain ? ` / ${m.subdomain}` : ""));
  return parts.join(", ");
}

function buildTeamSection(members: RawMember[], honorary: HonoraryMember[]): string {
  if (members.length === 0 && honorary.length === 0) {
    return "## TEAM\n\nTeam roster is not currently available. See https://awssbg-srmist.in/team.";
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

function buildProjectsSection(repos: Repo[]): string {
  if (repos.length === 0) {
    return "## PROJECTS\n\nNo public projects have been published to the club's GitHub yet. See https://github.com/AWSSBG-at-SRMIST.";
  }
  const items = repos.map((r) => {
    const bits = [`- **${r.name}**`];
    if (r.language) bits[0] += ` (${r.language})`;
    if (r.description) bits.push(` — ${r.description}`);
    const meta: string[] = [];
    if (r.topics?.length) meta.push(`Tags: ${r.topics.join(", ")}`);
    if (r.stargazers_count) meta.push(`Stars: ${r.stargazers_count}`);
    meta.push(`GitHub: ${r.html_url}`);
    if (r.homepage) meta.push(`Demo: ${r.homepage}`);
    return bits.join("") + ". " + meta.join(". ") + ".";
  });
  return `## PROJECTS\n\n${items.join("\n")}`;
}

function buildEventsSection(events: EventEntry[]): string {
  if (events.length === 0) {
    return "## EVENTS & ACHIEVEMENTS\n\nNo events are published yet. Check https://awssbg-srmist.in/events and https://www.meetup.com/awssbg-srmist/, or follow our social media for updates.";
  }
  const items = events.map((e) => {
    const when = e.dateTime ? new Date(e.dateTime).toISOString().slice(0, 10) : null;
    const head = `- **${e.title}**${when ? ` (${when})` : ""}${e.going ? ` · ${e.going} attended` : ""}`;
    const desc = e.description
      ? " — " + e.description.replace(/\s+/g, " ").trim().slice(0, 200)
      : "";
    const link = e.url ? ` (${e.url})` : "";
    return head + desc + link;
  });
  return `## EVENTS\n\nPast events hosted by AWS SBG at SRMIST:\n${items.join("\n")}`;
}

// ---------------------------------------------------------------------------

async function main() {
  console.log(`Generating knowledge base from live sources (site: ${SITE})...`);
  const [{ members, honorary }, repos, events] = await Promise.all([getTeam(), getRepos(), getEvents()]);
  console.log(
    `  ${members.length} members, ${honorary.length} honorary, ${repos.length} projects, ${events.length} events.`
  );

  // Per-section resilience: if a single live source came back empty (deploy
  // lag before /api/team is up, GitHub rate-limit, a Meetup hiccup) reuse that
  // section from the previous knowledge base instead of regressing to an
  // empty-state placeholder. A source only wins when it actually returns data.
  const prior = existsSync(OUTPUT_PATH)
    ? (JSON.parse(readFileSync(OUTPUT_PATH, "utf-8")).content as string) ?? ""
    : "";
  const priorBlock = (header: string): string | null => {
    const block = prior.split("\n\n---\n\n").find((b) => b.trimStart().startsWith(header));
    return block ? block.trim() : null;
  };
  const keepIfEmpty = (empty: boolean, header: string, fresh: string): string =>
    empty ? priorBlock(header) ?? fresh : fresh;

  const teamSection = keepIfEmpty(
    members.length === 0 && honorary.length === 0,
    "## TEAM",
    buildTeamSection(members, honorary)
  );
  const projectsSection = keepIfEmpty(repos.length === 0, "## PROJECTS", buildProjectsSection(repos));
  const eventsSection = keepIfEmpty(events.length === 0, "## EVENTS", buildEventsSection(events));

  const content = [STATIC_CLUB_INFO, teamSection, projectsSection, eventsSection].join("\n\n---\n\n");

  const output = { generatedAt: new Date().toISOString(), content };

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Failed to generate knowledge base:", err);
  process.exit(1);
});
