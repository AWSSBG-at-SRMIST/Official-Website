import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Achievements | AWS SBG at SRMIST",
  description: "Achievements and milestones of the AWS Student Builder Group at SRMIST.",
  robots: { index: false, follow: false },
};

export default function AchievementsPage() {
  return (
    <ComingSoonPage
      category="Achievements"
      heading="Coming Soon."
      description="The wall of achievements is being built. Check back soon to see what our builders have accomplished."
    />
  );
}
