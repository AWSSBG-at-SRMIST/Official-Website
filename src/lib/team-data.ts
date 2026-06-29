import "server-only";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./dynamodb";

export type MemberRole =
  | "SBG_LEADER"
  | "SECRETARY"
  | "DIRECTOR"
  | "MANAGER"
  | "ASSOCIATE"
  | "BUILDER";

export interface RawMember {
  memberId: string;
  name: string;
  role: MemberRole;
  domain?: string;
  subdomain?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  meetup?: string;
  builderId?: string;
  portfolio?: string;
  isActive?: boolean;
}

/**
 * Scans the sbg-members DynamoDB table for the live, active roster.
 * Never throws — on any AWS failure this returns an empty array so the
 * team page can render an empty-state instead of erroring out.
 */
export async function getTeamMembers(): Promise<RawMember[]> {
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
    console.error("Failed to fetch team members from DynamoDB:", error);
    return [];
  }
}
