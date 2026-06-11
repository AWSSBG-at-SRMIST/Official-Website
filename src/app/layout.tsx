import type { Metadata } from "next";
import { Syne, Outfit, Inter, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { BackgroundNetwork } from "@/components/layout/BackgroundNetwork";
import { Loader } from "@/components/layout/Loader";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWS Student Builder Group SRMIST",
  description: "Official Website of the AWS Student Builder group SRMIST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Loader />
        <CustomCursor />
        <BackgroundNetwork />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
