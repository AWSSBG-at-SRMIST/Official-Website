import "server-only";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./dynamodb";

export type HonoraryTag = "FACULTY_MENTOR" | "INDUSTRIAL_MENTOR" | "FOUNDING_MEMBER" | "ADVISORY";

export interface HonoraryMember {
  id: string;
  name: string;
  tag: HonoraryTag;
  description?: string;
  linkedin?: string;
  photoUrl?: string | null;
  order?: number;
}

/**
 * Scans the sbg-honorary-members DynamoDB table — Faculty/Industry mentors
 * and founding members, managed from the Internal Dashboard. Never throws —
 * on any AWS failure this returns an empty array so the team page can
 * render its existing empty-state instead of erroring out.
 */
export async function getHonoraryMembers(): Promise<HonoraryMember[]> {
  try {
    const result = await ddbDocClient.send(
      new ScanCommand({ TableName: "sbg-honorary-members" })
    );
    const items = (result.Items ?? []) as HonoraryMember[];
    // Industrial mentors are temporarily hidden from the public Team page —
    // the records themselves are untouched in DynamoDB, just filtered out
    // of what gets rendered. Remove this filter to bring them back.
    return items.filter((m) => m.tag !== "INDUSTRIAL_MENTOR");
  } catch (error) {
    console.error("Failed to fetch honorary members from DynamoDB.", error);
    return [];
  }
}
