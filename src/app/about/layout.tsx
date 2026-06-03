import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Studio | Selora Creatives — Creative Studio",
  description: "Learn about Selora Creatives, a multidisciplinary creative studio blending design, technology, and AI to craft award-winning digital experiences.",
  openGraph: {
    title: "About Our Studio | Selora Creatives — Creative Studio",
    description: "Learn about Selora Creatives, a multidisciplinary creative studio blending design, technology, and AI to craft award-winning digital experiences.",
    url: "https://www.seloracreatives.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
