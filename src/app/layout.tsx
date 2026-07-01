import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BackgroundNetwork } from "@/components/layout/BackgroundNetwork";
import { Loader } from "@/components/layout/Loader";
import { Navbar } from "@/components/landing/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const BASE_URL = "https://awssbg-srmist.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "AWS Student Builder Group at SRMIST | Cloud Computing Community",
    template: "%s | AWS SBG at SRMIST",
  },
  description:
    "AWS Student Builder Group (AWS SBG) at SRMIST is the official cloud computing student community at SRM Kattankulathur, Tamil Nadu. Build real AWS projects, get AWS certified, and launch your cloud career.",
  keywords: [
    "AWS Student Builder Group SRMIST",
    "AWS SBG SRMIST",
    "cloud computing club SRMIST",
    "AWS club SRM",
    "AWS student community India",
    "cloud computing student group SRM Kattankulathur",
    "AWS certification students SRMIST",
    "tech club SRMIST",
    "SRMIST student tech community",
    "AWS student builder group India",
  ],
  authors: [{ name: "AWS Student Builder Group at SRMIST", url: BASE_URL }],
  creator: "AWS Student Builder Group at SRMIST",
  publisher: "AWS Student Builder Group at SRMIST",
  openGraph: {
    siteName: "AWS Student Builder Group at SRMIST",
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    title: "AWS Student Builder Group at SRMIST | Cloud Computing Community",
    description:
      "Official cloud computing student community at SRMIST, Kattankulathur. Build on AWS, get certified, and join India's top student cloud community.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AWS Student Builder Group at SRMIST — Cloud Computing Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Student Builder Group at SRMIST | Cloud Computing Community",
    description:
      "Official cloud computing student community at SRMIST, Kattankulathur. Build on AWS, get certified, and join India's top student cloud community.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AWS Student Builder Group at SRMIST",
  alternateName: ["AWS SBG SRMIST", "AWSSBG SRMIST", "AWS SBG at SRM"],
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "AWS Student Builder Group (AWS SBG) at SRMIST is the official student-led cloud computing community at SRM Institute of Science and Technology, Kattankulathur, Tamil Nadu. Focused on hands-on AWS learning, certifications, and real-world cloud projects.",
  foundingDate: "2025",
  location: {
    "@type": "Place",
    name: "SRM Institute of Science and Technology",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kattankulathur",
      addressRegion: "Tamil Nadu",
      postalCode: "603203",
      addressCountry: "IN",
    },
  },
  sameAs: [
    "https://www.instagram.com/awssbg.srmist/",
    "https://in.linkedin.com/company/awssbg-srmist",
    "https://www.meetup.com/awssbg-srmist/",
    "https://github.com/AWSSBG-at-SRMIST",
  ],
  memberOf: {
    "@type": "CollegeOrUniversity",
    name: "SRM Institute of Science and Technology",
    url: "https://www.srmist.edu.in",
  },
  knowsAbout: [
    "Amazon Web Services",
    "Cloud Computing",
    "AWS Certification",
    "Cloud Architecture",
    "DevOps",
    "Serverless Computing",
    "Infrastructure as Code",
    "Container Orchestration",
    "Cloud Security",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AWS Student Builder Group at SRMIST",
  url: BASE_URL,
  description:
    "Official website of AWS Student Builder Group at SRMIST — cloud computing community for students at SRM KTR, Kattankulathur, Tamil Nadu.",
  publisher: {
    "@type": "Organization",
    name: "AWS Student Builder Group at SRMIST",
    url: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${geist.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Loader />
        <BackgroundNetwork />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
