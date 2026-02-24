import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://spacedout.vercel.app"
  ),
  title: {
    default: "SpacedOut — Live Space Intelligence",
    template: "%s | SpacedOut",
  },
  description:
    "A live space intelligence interface aggregating data from NASA, ESA, SpaceX, ISRO, and JAXA.",
  keywords: [
    "space",
    "NASA",
    "SpaceX",
    "ISS",
    "launches",
    "missions",
    "solar system",
  ],
  openGraph: {
    type: "website",
    siteName: "SpacedOut",
    title: "SpacedOut — Live Space Intelligence",
    description:
      "Real-time data aggregated from NASA, ESA, SpaceX, ISRO, and JAXA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpacedOut — Live Space Intelligence",
    description:
      "Real-time data aggregated from NASA, ESA, SpaceX, ISRO, and JAXA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
