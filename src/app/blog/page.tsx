"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { blogData } from "@/data/mockData";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Articles" },
    { id: "ai advertising", label: "AI Advertising" },
    { id: "website design", label: "Website Design" },
  ];

  const filteredPosts = blogData.filter((post) => {
    if (selectedCategory === "all") return true;
    return post.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-heading font-bold mb-4"
          >
            <BookOpen className="w-4 h-4 text-accent animate-pulse" />
            <span>Creative Briefings</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading font-extrabold text-4xl md:text-7xl tracking-tight mb-6"
          >
            Selora Insights
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-studioGray-300 text-lg md:text-xl font-light leading-relaxed"
          >
            Stay up to date with generative advertising strategies, web development architectures, branding practices, and creative insights.
          </motion.p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-accent text-black"
                  : "bg-white/5 border border-white/10 text-studioGray-300 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Post List Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between group hover:translate-y-[-4px] transition-all duration-300"
            >
              <div>
                <span className="text-[10px] uppercase font-heading font-bold text-accent tracking-widest block mb-4">
                  {post.category}
                </span>
                
                <Link href={`/blog/${post.slug}`} className="block group-hover:text-accent transition-colors duration-300">
                  <h2 className="font-heading text-xl font-extrabold mb-3 leading-snug">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-studioGray-400 text-xs leading-relaxed mb-6 font-light">
                  {post.excerpt}
                </p>
              </div>

              <div>
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[10.5px] text-studioGray-500 font-bold uppercase border-t border-white/5 pt-4 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{post.author.name}</h4>
                      <p className="text-[9px] text-studioGray-500 font-bold uppercase">{post.author.role}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="p-2 rounded-full bg-white/5 group-hover:bg-accent group-hover:text-black transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
