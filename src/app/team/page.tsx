import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { TeamPageClient } from "@/components/team/TeamPageClient";
import { getTeamMembers } from "@/lib/team-data";
import { getHonoraryMembers } from "@/lib/honorary-members";
import { buildTeamTree } from "@/lib/team-tree";

export const metadata: Metadata = {
  title: "Team | AWS SBG at SRMIST",
  description: "Meet the builders, leaders, and mentors behind the AWS Student Builder Group at SRMIST.",
};

// Team roster lives in DynamoDB and changes rarely — a short revalidation
// window keeps the page fresh without refetching on every request.
export const revalidate = 300;

export default async function TeamPage() {
  const [members, honoraryMembers] = await Promise.all([getTeamMembers(), getHonoraryMembers()]);

  let teamData;
  try {
    teamData = buildTeamTree(members, honoraryMembers);
  } catch {
    teamData = buildTeamTree([], []);
  }

  return (
    <>
      <TeamPageClient data={teamData} />
      <Footer />
    </>
  );
}
