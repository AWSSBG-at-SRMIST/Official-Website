import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "AWS Student Builder Group at SRMIST",
    template: "%s | AWS SBG at SRMIST",
  },
  description: "Official website of the AWS Student Builder Group at SRMIST — a community of cloud builders, engineers, and founders.",
  metadataBase: new URL("https://awssbg-srmist.in"),
  openGraph: {
    siteName: "AWS SBG at SRMIST",
    type: "website",
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
        <Loader />
        <BackgroundNetwork />
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
