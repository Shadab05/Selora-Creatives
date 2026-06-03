import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Advertising & Video Production | Selora Creatives",
  description: "Drive higher conversions and lower production costs with our high-end, studio-grade AI product videos, mockups, and UGC ads.",
  openGraph: {
    title: "AI Advertising & Video Production | Selora Creatives",
    description: "Drive higher conversions and lower production costs with our high-end, studio-grade AI product videos, mockups, and UGC ads.",
    url: "https://www.seloracreatives.com/ai-ads",
  },
};

export default function AIAdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
