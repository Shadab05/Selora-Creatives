"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { blogData } from "@/data/mockData";
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface BlogDetailsProps {
  params: { slug: string };
}

export default function BlogDetailsPage({ params }: BlogDetailsProps) {
  const post = blogData.find((b) => b.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 bg-black">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Link */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-studioGray-400 hover:text-white transition-colors duration-300 group"
          >
            <span className="p-2.5 rounded-full bg-white/5 group-hover:bg-accent group-hover:text-black transition-all duration-300">
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
            Back to Insights
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12 border-b border-white/5 pb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-accent mb-6 font-heading uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> {post.category}
          </span>

          <h1 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-8 leading-tight text-white">
            {post.title}
          </h1>

          {/* Author and Date Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-white/10"
              />
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">{post.author.name}</h4>
                <p className="text-[10px] text-studioGray-400 font-bold uppercase">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-studioGray-400 font-bold uppercase">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-accent" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Content body with premium article layouts */}
        <article className="prose prose-invert max-w-none text-studioGray-300 font-light text-base md:text-lg leading-relaxed space-y-6">
          {/* Inject content */}
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            className="article-content space-y-6"
          />
        </article>

        {/* Custom global style for nested dangerouslySetInnerHTML content */}
        <style jsx global>{`
          .article-content h2 {
            font-family: var(--font-heading), sans-serif;
            font-size: 1.75rem;
            font-weight: 800;
            color: #ffffff;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            letter-spacing: -0.025em;
          }
          .article-content h3 {
            font-family: var(--font-heading), sans-serif;
            font-size: 1.35rem;
            font-weight: 700;
            color: #ffffff;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          .article-content p {
            margin-bottom: 1.5rem;
          }
          .article-content blockquote {
            font-family: var(--font-heading), sans-serif;
            border-left: 3px solid #a855f7;
            padding-left: 1.5rem;
            font-style: italic;
            font-size: 1.25rem;
            color: #e9d5ff;
            margin: 2.5rem 0;
            line-height: 1.6;
          }
          .article-content ul {
            list-style-type: none;
            padding-left: 0;
            margin: 1.5rem 0;
          }
          .article-content li {
            position: relative;
            padding-left: 1.75rem;
            margin-bottom: 0.75rem;
          }
          .article-content li::before {
            content: "";
            position: absolute;
            left: 0.25rem;
            top: 0.65rem;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #a855f7;
          }
          .article-content strong {
            font-weight: 700;
            color: #ffffff;
          }
        `}</style>
      </div>
    </div>
  );
}
