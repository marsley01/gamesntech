import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LayoutClient } from "@/components/layout/LayoutClient";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
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
      className={`${bebas.variable} ${inter.variable} ${space.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <div className="noise-overlay" />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
