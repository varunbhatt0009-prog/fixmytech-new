import Script from "next/script";
import type { Metadata } from "next";
// @ts-ignore
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Practical Tech Fixes & Guides`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,

  verification: {
    google: "_1MtFGOYxfGgWIuR1TRlJAAMPY2Xx9VopWHehrHyU54",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: `${siteConfig.name} | Practical Tech Fixes & Guides`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Practical Tech Fixes & Guides`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-ink antialiased">

        {/* ✅ AdSense Script (SAFE WAY) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3240884443002821"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

      </body>
    </html>
  );
}