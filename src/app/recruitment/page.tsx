import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Recruitment | AWS SBG at SRMIST",
  description: "Join the AWS Student Builder Group at SRMIST. Applications opening soon.",
};

export default function RecruitmentPage() {
  return (
    <ComingSoonPage
      category="Recruitment"
      heading="We'll start recruitment soon."
      description="Applications for the next cohort of AWS SBG at SRMIST will open shortly. Stay tuned."
    />
  );
}
