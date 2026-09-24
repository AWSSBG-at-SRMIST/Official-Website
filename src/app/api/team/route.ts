// Public JSON roster — the live team + honorary members from DynamoDB, the
// same people the /team page shows. Exists so the chatbot's knowledge-base
// generator (scripts/generate-knowledge-base.ts) can read the roster without
// AWS credentials of its own: this runs on the deployed server, which already
// has them.
//
// Only the fields the chatbot needs are returned. A DynamoDB Scan returns
// every attribute stored on an item, so never pass the raw items through.

import { getTeamMembers } from "@/lib/team-data";
import { getHonoraryMembers } from "@/lib/honorary-members";

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  const [members, honorary] = await Promise.all([
    getTeamMembers(),
    getHonoraryMembers(),
  ]);

  return Response.json(
    {
      members: members.map(({ name, role, domain, subdomain }) => ({ name, role, domain, subdomain })),
      honorary: honorary.map(({ name, tag, description }) => ({ name, tag, description })),
    },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
