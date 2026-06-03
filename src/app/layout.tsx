import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.seloracreatives.com"),
  title: "Selora Creatives — Creative Studio for the AI Era",
  description: "A world-class premium creative studio offering Branding, Graphic Design, Web Design, Motion Graphics, and AI-powered Advertising.",
  keywords: ["Creative Agency", "AI Design", "AI Advertising", "Motion Graphics", "Branding", "Web Development", "Awwwards Design"],
  authors: [{ name: "Selora Creatives" }],
  openGraph: {
    title: "Selora Creatives — Creative Studio for the AI Era",
    description: "Future-ready creative studio delivering premium visual experiences through design, technology, and AI production.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selora Creatives — Creative Studio for the AI Era",
    description: "Future-ready creative studio delivering premium visual experiences through design, technology, and AI production.",
  },
  verification: {
    // If you prefer to verify using HTML meta tag, replace the placeholder below
    google: "google-site-verification-placeholder",
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
        className={`${headingFont.variable} ${bodyFont.variable} font-body antialiased bg-black text-white relative`}
      >
        <div className="noise-overlay" />
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
