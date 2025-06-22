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
  console.log(process.env.DATABASE_URL);
  console.log(process.env.BETTER_AUTH_SECRET);
  console.log(process.env.BETTER_AUTH_URL);
  console.log(process.env.BETTER_AUTH_COOKIE_NAME);
  console.log(process.env.API_KEY_HEADER_NAME);
  console.log(process.env.POINTS_INCREMENT);

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} antialiased`}>
        <Navbar />
        <main
          className="w-full min-h-[calc(100vh-96px)] mt-6"
          data-testid="main__container"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
