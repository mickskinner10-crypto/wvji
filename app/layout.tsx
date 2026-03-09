import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vert Ranking — Global Vertical Jump Leaderboard",
  description: "The world's only unified vertical jump leaderboard. Compare verified vertical jumps from athletes across basketball, volleyball, track & field, and dunking. Submit your jump and get ranked globally.",
  keywords: "vertical jump ranking, vertical jump leaderboard, highest vertical jump, dunking rankings, vert ranking, global vertical jump",
  openGraph: {
    title: "Vert Ranking — Global Vertical Jump Leaderboard",
    description: "The world's only unified vertical jump leaderboard. Submit your jump and get ranked globally.",
    url: "https://vertranking.com",
    siteName: "Vert Ranking",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vert Ranking — Global Vertical Jump Leaderboard",
    description: "The world's only unified vertical jump leaderboard. Submit your jump and get ranked globally.",
  },
  verification: {
    google: "f27YYu8MgASzNYbId-XxvkLvHuf5XKtTvkwsoou9EA8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
