import type { Metadata } from "next";
import { Source_Serif_4, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "@/styles/globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Engineering Atlas",
    template: "%s | Engineering Atlas",
  },
  description:
    "Curriculum-driven engineering platform with a shared core, specialization tracks, and interactive labs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} bg-background text-foreground antialiased`}
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
