import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Projects | AWS SBG at SRMIST",
  description: "Projects built by the AWS Student Builder Group at SRMIST — coming soon.",
  robots: { index: false, follow: false },
};

export default function ProjectsPage() {
  return (
    <ComingSoonPage
      category="Project Showcase"
      heading="Coming Soon."
      description="We're putting together the gallery of everything our community has built. Check back shortly."
    />
  );
}
