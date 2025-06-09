import React from 'react'
import type { Metadata } from "next";
import Navbar from '@/components/Navbar'
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
  title: "GKSS - UNISA | Code Challenges Platform",
  description: "Code Challenges Platform built by GKSS for UNISA students to practice coding skills & display score points.",
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
        <Navbar />
        <main className='absolute top-[100] w-full'>{children}</main>
      </body>
    </html>
  );
}
