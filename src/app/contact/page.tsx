import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact AWS Student Builder Group at SRMIST",
  description:
    "Get in touch with AWS Student Builder Group at SRMIST for collaborations, sponsorships, or general queries. Reach the cloud computing community at SRM Kattankulathur.",
  alternates: { canonical: "https://awssbg-srmist.in/contact" },
  openGraph: { url: "https://awssbg-srmist.in/contact" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://awssbg-srmist.in" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://awssbg-srmist.in/contact" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactPageClient />
    </>
  );
}
