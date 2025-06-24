import * as React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GKSS - UNISA | Code Challenges Leaderboard",
  description: "A leaderboard for the Code Challenges set up by GKSS - UNISA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} antialiased`}>
        <Navbar />
        <main
          className="w-full min-h-[calc(100vh-96px)] mt-6 bg-background"
          data-testid="main__container"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
