import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Premium Typography - Google Fonts
const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MSME Cyber Shield | Free Website Risk Scanner",
  description: "Instant cybersecurity scanner built for Indian MSMEs. Free, instant risk score — no sign-up needed.",
  keywords: "cybersecurity, website scanner, MSME, India, security audit",
  openGraph: {
    title: "MSME Cyber Shield",
    description: "Free, instant risk score — no sign-up needed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}
        style={{
          "--font-display": "Syne, system-ui, sans-serif",
          "--font-body": "DM Sans, system-ui, sans-serif",
          "--font-mono": "JetBrains Mono, monospace",
        } as React.CSSProperties}
      >
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}