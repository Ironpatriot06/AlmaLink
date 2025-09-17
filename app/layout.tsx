import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

// client components
import { AuthProvider } from "@/contexts/AuthContext";
// import { Header } from "../components/header";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AlmaLink - Reconnect. Mentor. Give back.",
  description:
    "Bring your alumni network into one secure place: searchable profiles, mentor matching, events, and donations — all in one click.",
  generator: "v0.app",
  icons: {
    icon: "./favicon.ico", 
    shortcut: "./favicon.ico",
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
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} ${dmSans.variable}`}
      >
        <Suspense fallback={null}>
          {/* AuthProvider is a client component that subscribes to Supabase auth state.
              Header is also a client component and will update based on auth. */}
          <AuthProvider>
            {/* <Header /> */}
            <main>{children}</main>
          </AuthProvider>

          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
