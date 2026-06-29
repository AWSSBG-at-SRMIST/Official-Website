import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { TeamPageClient } from "@/components/team/TeamPageClient";
import { getTeamMembers } from "@/lib/team-data";
import { getHonoraryMembers } from "@/lib/honorary-members";
import { buildTeamTree } from "@/lib/team-tree";

export const metadata: Metadata = {
  title: "Team | AWS Student Builder Group at SRMIST",
  description:
    "Meet the student builders, leads, and mentors behind AWS Student Builder Group at SRMIST — the cloud computing community at SRM Kattankulathur, Tamil Nadu.",
  alternates: { canonical: "https://awssbg-srmist.in/team" },
  openGraph: { url: "https://awssbg-srmist.in/team" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://awssbg-srmist.in" },
    { "@type": "ListItem", position: 2, name: "Team", item: "https://awssbg-srmist.in/team" },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TeamPageClient data={teamData} />
      <Footer />
    </>
  );
}
