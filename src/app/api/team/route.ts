// Public JSON roster — the live team + honorary members straight from
// DynamoDB. Exists so the knowledge-base generator (and any other external
// tool) can pull the roster without needing AWS credentials of its own:
// this runs on the deployed server, which already holds the creds. Same
// data the /team page renders, just as machine-readable JSON.

import { getTeamMembers } from "@/lib/team-data";
import { getHonoraryMembers } from "@/lib/honorary-members";

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  const [members, honorary] = await Promise.all([
    getTeamMembers(),
    getHonoraryMembers(),
  ]);

  return Response.json(
    { members, honorary },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
