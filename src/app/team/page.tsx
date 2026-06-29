import { Footer } from "@/components/landing/Footer";
import { TeamPageClient } from "@/components/team/TeamPageClient";
import { getTeamMembers } from "@/lib/team-data";
import { getHonoraryMembers } from "@/lib/honorary-members";
import { buildTeamTree } from "@/lib/team-tree";

// Team roster lives in DynamoDB and changes rarely — a short revalidation
// window keeps the page fresh without refetching on every request.
export const revalidate = 300;

export default async function TeamPage() {
  const [members, honoraryMembers] = await Promise.all([getTeamMembers(), getHonoraryMembers()]);
  const teamData = buildTeamTree(members, honoraryMembers);

  return (
    <>
      <TeamPageClient data={teamData} />
      <Footer />
    </>
  );
}
