import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Works & Portfolio | Selora Creatives",
  description: "Explore our gallery of award-winning design projects, branding campaigns, and immersive web experiences.",
  openGraph: {
    title: "Selected Works & Portfolio | Selora Creatives",
    description: "Explore our gallery of award-winning design projects, branding campaigns, and immersive web experiences.",
    url: "https://www.seloracreatives.com/work",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
