import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | AWS SBG at SRMIST",
  description: "Get in touch with AWS SBG at SRMIST for collaborations, sponsorships, or general queries.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
