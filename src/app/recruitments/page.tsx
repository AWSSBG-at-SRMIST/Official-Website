import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Join AWS Student Builder Group at SRMIST | Recruitments",
  description:
    "Apply to join AWS Student Builder Group (AWS SBG) at SRMIST — open to all departments, all years. No prior cloud experience required. Applications opening soon.",
  alternates: { canonical: "https://awssbg-srmist.in/recruitments" },
  openGraph: { url: "https://awssbg-srmist.in/recruitments" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://awssbg-srmist.in" },
    { "@type": "ListItem", position: 2, name: "Recruitments", item: "https://awssbg-srmist.in/recruitments" },
  ],
};

export default function RecruitmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ComingSoonPage
        category="Recruitments"
        heading="We'll start recruitments soon."
        description="Applications for the next cohort of AWS SBG at SRMIST will open shortly. Stay tuned."
      />
    </>
  );
}
