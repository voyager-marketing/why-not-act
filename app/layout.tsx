import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "@/lib/posthog";
import PostHogPageView from "@/lib/posthog-pageview";
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
  title: "WhyNotAct - Unite America Through Immigration Reform",
  description: "Discover your political perspective on immigration and find common ground with Americans across the spectrum. 5 minutes. Your values. Real solutions.",
  keywords: ["immigration reform", "political perspective", "bipartisan solutions", "immigration policy", "political engagement", "civic action"],
  authors: [{name: "WhyNotAct"}],
  creator: "WhyNotAct",
  publisher: "WhyNotAct",
  metadataBase: new URL('https://why-not-act.vercel.app'),
  openGraph: {
    title: "WhyNotAct - What if immigration reform could unite America?",
    description: "Explore immigration through your values, discover surprising common ground, and take meaningful action. All perspectives welcome.",
    url: 'https://why-not-act.vercel.app',
    siteName: 'WhyNotAct',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WhyNotAct - Immigration Reform Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "WhyNotAct - What if immigration reform could unite America?",
    description: "5 minutes. Your perspective. Real solutions. Join thousands exploring immigration reform.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
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
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          {children}
        </PostHogProvider>
      </body>
      <GoogleAnalytics gaId="G-F79851CR6C" />
    </html>
  );
}
