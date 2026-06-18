import { Footer } from "@/components/landing/Footer";
import { TeamPageClient } from "@/components/team/TeamPageClient";
import { getTeamMembers } from "@/lib/team-data";
import { buildTeamTree } from "@/lib/team-tree";

// Team roster lives in DynamoDB and changes rarely — a short revalidation
// window keeps the page fresh without refetching on every request.
export const revalidate = 300;

export default async function TeamPage() {
  const members = await getTeamMembers();
  const teamData = buildTeamTree(members);

  return (
    <>
      <TeamPageClient data={teamData} />
      <Footer />
    </>
  );
}
