import type { Metadata } from "next";
import { blogData } from "@/data/mockData";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogData.find((b) => b.slug === params.slug);
  if (!post) {
    return {
      title: "Article Not Found | Selora Creatives",
    };
  }

  return {
    title: `${post.title} | Selora Insights`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Selora Insights`,
      description: post.excerpt,
      url: `https://www.seloracreatives.com/blog/${params.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Selora Insights`,
      description: post.excerpt,
    },
  };
}

export default function BlogDetailsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
