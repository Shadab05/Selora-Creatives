import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Subscription & Pricing | Selora Creatives",
  description: "Flexible, simple monthly creative subscriptions for branding, web design, front-end development, and AI-powered production.",
  openGraph: {
    title: "Creative Subscription & Pricing | Selora Creatives",
    description: "Flexible, simple monthly creative subscriptions for branding, web design, front-end development, and AI-powered production.",
    url: "https://www.seloracreatives.com/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
