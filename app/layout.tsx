import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "MSM Bharat Solar systems | Solar panels, inverters and batteries, supplied and installed",
  description:
    "MSM Bharat Solar systems supplies and installs solar panels, hybrid inverters, battery storage and mounting kits for homes, businesses and small factories.",
  openGraph: {
    title: "MSM Bharat Solar systems",
    description: "Solar panels, inverters and batteries, supplied and installed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <ChatWidget />
      </body>
    </html>
  );
}
