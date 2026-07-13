import type { Metadata } from "next";
import { Urbanist, DM_Sans, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LayoutClient } from "@/components/layout/LayoutClient";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Games N Tech — Premium Digital Marketplace",
  description:
    "Gaming. Software. Gift Cards. AI Tools. Delivered instantly. Africa's most premium digital marketplace.",
  openGraph: {
    title: "Games N Tech — Power Your Digital World",
    description: "Premium digital products delivered instantly across Africa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <div className="noise-overlay" />
        <LayoutClient>{children}</LayoutClient>
        <SpeedInsights />
      </body>
    </html>
  );
}
