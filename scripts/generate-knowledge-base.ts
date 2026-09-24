// Regenerates src/data/knowledge-base.json — the content the chatbot's
// system prompt is built from. Every live section comes from the same place
// the website itself reads it, so the chatbot never drifts from the site:
//
//   • Club info       ← src/data/club-info.md     (hand-maintained — edit this)
//   • Team + mentors  ← {SITE}/api/team           (deployed server reads DynamoDB)
//   • Projects        ← getOrgRepos()             (GitHub org, same as /projects)
//   • Events          ← Meetup GraphQL            (same query as /events)
//
// None of these need AWS credentials. GITHUB_TOKEN is optional and only lifts
// the GitHub API rate limit. Override the site it reads with KB_SITE_URL.
//
// Run every 12h by .github/workflows/update-knowledge-base.yml. The chatbot
// imports knowledge-base.json at build time, so the workflow's commit is what
// gets new data live (via the Vercel redeploy it triggers).
//
// Usage:
//   npm run generate:knowledge-base

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getOrgRepos, type GitHubRepo } from "../src/lib/github";
import { MEETUP_GQL_URL, pastEventsRequestInit } from "./meetup-events-query";

const SITE = (process.env.KB_SITE_URL ?? "https://www.awssbg-srmist.in").replace(/\/$/, "");

const CLUB_INFO_PATH = resolve(import.meta.dirname, "../src/data/club-info.md");
const OUTPUT_PATH = resolve(import.meta.dirname, "../src/data/knowledge-base.json");

const SECTION_SEPARATOR = "\n\n---\n\n";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MemberRole = "SBG_LEADER" | "SECRETARY" | "DIRECTOR" | "MANAGER" | "ASSOCIATE" | "BUILDER";
type HonoraryTag = "FACULTY_MENTOR" | "INDUSTRIAL_MENTOR" | "FOUNDING_MEMBER" | "ADVISORY";

interface Member {
  name: string;
  role: MemberRole;
  domain?: string;
  subdomain?: string;
}

interface HonoraryMember {
  name: string;
  tag: HonoraryTag;
  description?: string;
}

interface EventNode {
  title?: string;
  dateTime?: string;
  eventUrl?: string;
  eventType?: string;
  description?: string;
  going?: { totalCount?: number };
}

// ---------------------------------------------------------------------------
// Labels / ordering
// ---------------------------------------------------------------------------

const ROLE_LABELS: Record<MemberRole, { one: string; many: string }> = {
  SBG_LEADER: { one: "SBG Leader", many: "SBG Leaders" },
  SECRETARY: { one: "Secretary", many: "Secretaries" },
  DIRECTOR: { one: "Director", many: "Directors" },
  MANAGER: { one: "Manager", many: "Managers" },
  ASSOCIATE: { one: "Associate", many: "Associates" },
  BUILDER: { one: "Builder", many: "Builders" },
};

const HONORARY_TAG_LABELS: Record<HonoraryTag, string> = {
  ADVISORY: "Advisors",
  FACULTY_MENTOR: "Faculty Mentors",
  INDUSTRIAL_MENTOR: "Industry Mentors",
  FOUNDING_MEMBER: "Founding Members",
};

const ROLE_ORDER: MemberRole[] = ["SBG_LEADER", "SECRETARY", "DIRECTOR", "MANAGER", "ASSOCIATE", "BUILDER"];

// ---------------------------------------------------------------------------
// Sources — each returns [] on failure so one dead source never blocks the
// rest; main() then keeps that section from the previous knowledge base.
// ---------------------------------------------------------------------------

function readClubInfo(): string {
  // Strip the leading HTML comment (editing notes for humans, not for Bob).
  return readFileSync(CLUB_INFO_PATH, "utf-8").replace(/^\s*<!--[\s\S]*?-->\s*/, "").trim();
}

async function getTeam(): Promise<{ members: Member[]; honorary: HonoraryMember[] }> {
  try {
    const res = await fetch(`${SITE}/api/team`, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = (await res.json()) as { members?: Member[]; honorary?: HonoraryMember[] };
    return { members: data.members ?? [], honorary: data.honorary ?? [] };
  } catch (error) {
    console.error(`Failed to fetch team from ${SITE}/api/team:`, (error as Error).message);
    return { members: [], honorary: [] };
  }
}

async function getEvents(): Promise<EventNode[]> {
  try {
    const res = await fetch(MEETUP_GQL_URL, pastEventsRequestInit());
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    if (data?.errors) throw new Error(JSON.stringify(data.errors).slice(0, 300));
    const edges: { node?: EventNode }[] = data?.data?.groupByUrlname?.events?.edges ?? [];
    return edges.map((e) => e.node).filter((n): n is EventNode => !!n?.title);
  } catch (error) {
    console.error("Failed to fetch Meetup events:", (error as Error).message);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Section builders
// ---------------------------------------------------------------------------

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)).replace(/[\s,.;:—-]+$/, "") + "…";
}

function formatMember(m: Member): string {
  let line = `- **${m.name}** — ${ROLE_LABELS[m.role]?.one ?? m.role}`;
  if (m.domain) line += `, ${m.domain}${m.subdomain ? ` / ${m.subdomain}` : ""}`;
  return line;
}

function buildTeamSection(members: Member[], honorary: HonoraryMember[]): string {
  const sections: string[] = ["## TEAM"];

  const byRole = new Map<MemberRole, Member[]>(ROLE_ORDER.map((r) => [r, []]));
  for (const m of members) {
    if (!byRole.has(m.role)) byRole.set(m.role, []);
    byRole.get(m.role)!.push(m);
  }
  for (const [role, list] of byRole) {
    if (list.length === 0) continue;
    sections.push(`### ${ROLE_LABELS[role]?.many ?? role}\n${list.map(formatMember).join("\n")}`);
  }

  const byTag = new Map<HonoraryTag, HonoraryMember[]>();
  for (const h of honorary) {
    if (!byTag.has(h.tag)) byTag.set(h.tag, []);
    byTag.get(h.tag)!.push(h);
  }
  for (const [tag, list] of byTag) {
    sections.push(
      `### ${HONORARY_TAG_LABELS[tag] ?? tag}\n${list
        .map((h) => `- **${h.name}**${h.description ? ` — ${h.description}` : ""}`)
        .join("\n")}`
    );
  }

  return sections.join("\n\n");
}

function buildProjectsSection(repos: GitHubRepo[]): string {
  const intro =
    "Everything we ship lives on our GitHub organization — built by our members on AWS and open for the world to use. See https://awssbg-srmist.in/projects or https://github.com/AWSSBG-at-SRMIST.";
  const items = repos.map((r) => {
    let line = `- **${r.name}**${r.language ? ` (${r.language})` : ""}`;
    if (r.description) line += ` — ${r.description.trim().replace(/\.+$/, "")}`;
    const meta: string[] = [];
    if (r.topics?.length) meta.push(`Tags: ${r.topics.join(", ")}`);
    if (r.stargazers_count) meta.push(`Stars: ${r.stargazers_count}`);
    meta.push(`GitHub: ${r.html_url}`);
    if (r.homepage) meta.push(`Demo: ${r.homepage}`);
    return `${line}. ${meta.join(". ")}.`;
  });
  return `## PROJECTS\n\n${intro}\n\n${items.join("\n")}`;
}

function buildEventsSection(events: EventNode[]): string {
  const intro =
    "AWS SBG at SRMIST runs workshops, hackathons, and meetups — all hosted and RSVP'd through our Meetup group (https://www.meetup.com/awssbg-at-srmist/), in both online and physical formats. See https://awssbg-srmist.in/events.";
  const items = events.map((e) => {
    const when = e.dateTime ? e.dateTime.slice(0, 10) : null;
    const facts = [when, e.eventType?.toLowerCase(), e.going?.totalCount ? `${e.going.totalCount} attended` : null]
      .filter(Boolean)
      .join(", ");
    const desc = e.description ? ` — ${truncate(e.description.replace(/[*_#>]/g, "").replace(/\s+/g, " ").trim(), 200)}` : "";
    return `- **${e.title}**${facts ? ` (${facts})` : ""}${desc}${e.eventUrl ? ` ${e.eventUrl}` : ""}`;
  });
  return `## EVENTS\n\n${intro}\n\nPast events, most recent first:\n${items.join("\n")}`;
}

// ---------------------------------------------------------------------------

async function main() {
  console.log(`Generating knowledge base (site: ${SITE})...`);
  const [{ members, honorary }, repos, events] = await Promise.all([getTeam(), getOrgRepos(), getEvents()]);
  console.log(
    `  ${members.length} members, ${honorary.length} honorary, ${repos.length} projects, ${events.length} events.`
  );

  const prior: { generatedAt?: string; content?: string } = existsSync(OUTPUT_PATH)
    ? JSON.parse(readFileSync(OUTPUT_PATH, "utf-8"))
    : {};
  const priorSections = (prior.content ?? "").split(SECTION_SEPARATOR);

  // If a source came back empty (/api/team not deployed yet, GitHub rate
  // limit, a Meetup hiccup) keep that section from the previous knowledge
  // base rather than telling visitors the club has no team/projects/events.
  const section = (empty: boolean, header: string, build: () => string): string | null => {
    if (!empty) return build();
    const kept = priorSections.find((s) => s.trimStart().startsWith(header));
    console.warn(`  ${header}: source returned nothing — ${kept ? "keeping previous section" : "omitting"}.`);
    return kept?.trim() ?? null;
  };

  const content = [
    readClubInfo(),
    section(members.length === 0 && honorary.length === 0, "## TEAM", () => buildTeamSection(members, honorary)),
    section(repos.length === 0, "## PROJECTS", () => buildProjectsSection(repos)),
    section(events.length === 0, "## EVENTS", () => buildEventsSection(events)),
  ]
    .filter((s): s is string => !!s)
    .join(SECTION_SEPARATOR);

  // Leave the file (and its timestamp) alone when nothing changed, so the
  // workflow doesn't commit — and trigger a redeploy — every 12 hours.
  if (content === prior.content) {
    console.log("No changes — knowledge base is already up to date.");
    return;
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), content }, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Failed to generate knowledge base:", err);
  process.exit(1);
});
