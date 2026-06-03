import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selora Insights & Blog | Selora Creatives",
  description: "Deep dives and insights into generative advertising strategies, immersive web development architectures, and creative design.",
  openGraph: {
    title: "Selora Insights & Blog | Selora Creatives",
    description: "Deep dives and insights into generative advertising strategies, immersive web development architectures, and creative design.",
    url: "https://www.seloracreatives.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
