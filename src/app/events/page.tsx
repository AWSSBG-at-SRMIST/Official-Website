import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Events | AWS SBG at SRMIST",
  description: "Upcoming workshops, hackathons, and events from the AWS Student Builder Group at SRMIST.",
  robots: { index: false, follow: false },
};

export default function EventsPage() {
  return (
    <ComingSoonPage
      category="Events"
      heading="Coming Soon."
      description="Our events page is on its way. Stay tuned for workshops, hackathons, and more from AWS SBG at SRMIST."
    />
  );
}
