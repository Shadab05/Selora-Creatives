"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "@/data/mockData";
import { 
  Smartphone, 
  Tv, 
  Users, 
  Play, 
  Cpu,
  X,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default function AIAdsPage() {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6">
      {/* Ambient background highlight */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-heading font-bold mb-4"
          >
            <Cpu className="w-4 h-4 text-accent animate-pulse" />
            <span>AI-Powered Ad Production</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading font-extrabold text-4xl md:text-7xl tracking-tight mb-6"
          >
            AI Advertising
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-studioGray-300 text-lg md:text-xl font-light leading-relaxed"
          >
            Say goodbye to expensive camera hires, studio setups, and months of waiting. We build cinematic product commercials and synthetic UGC videos optimized for performance metrics.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-card p-8 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-6">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold mb-2">Cinematic Physics</h3>
            <p className="text-studioGray-400 text-xs leading-relaxed font-light">
              We render product placements and environments with 3D dynamics that resemble Hollywood studio backdrops.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-6">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold mb-2">Synthetic Creators</h3>
            <p className="text-studioGray-400 text-xs leading-relaxed font-light">
              Our AI UGC avatars deliver scripts with photorealistic movements and synthetic voices in 30+ languages.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-6">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold mb-2">Massive Scale</h3>
            <p className="text-studioGray-400 text-xs leading-relaxed font-light">
              Generate 50+ variations of a single video concepts in days to test layouts, backgrounds, hooks, and targeting.
            </p>
          </div>
        </div>

        {/* Showcase items — same cinematic card style as homepage */}
        <div className="flex flex-col gap-12">
          <h2 className="font-heading text-xl font-extrabold text-white border-b border-white/5 pb-4">
            Recent Campaign Creatives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setActiveVideoUrl(project.videoUrl || null)}
                className={`group relative ${
                  project.aspect === "16:9"
                    ? "md:col-span-2 aspect-[16/9]"
                    : "aspect-[9/16]"
                } rounded-3xl overflow-hidden border border-white/10 bg-studioGray-950 cursor-pointer shadow-2xl hover:border-accent/40 hover:shadow-accent/5 transition-all duration-500`}
              >
                {/* Image Cover */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500 brightness-75 z-10"
                />

                {/* Hover Video Preview */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black">
                  <video
                    src={project.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={project.image}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 pointer-events-none z-20" />

                {/* Card Info */}
                <div className="absolute inset-x-6 bottom-6 z-30 flex flex-col justify-end text-left transition-transform duration-500 group-hover:translate-y-[-8px]">
                  <span className="text-[10px] uppercase tracking-widest font-heading font-extrabold text-accent mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-studioGray-300 text-xs font-light leading-relaxed mb-4 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {project.tagline}
                  </p>

                  {/* Metrics Row */}
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    {project.metrics.slice(0, 2).map((metric, mi) => (
                      <div key={mi} className="flex flex-col">
                        <span className="font-heading text-sm font-extrabold text-white">
                          {metric.value}
                        </span>
                        <span className="text-[8px] uppercase tracking-wider font-heading font-bold text-studioGray-500">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Build Similar Ad Campaign CTA */}
                <div className="absolute bottom-0 inset-x-0 z-40 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <Link
                    href={`/contact?service=ai-ads&campaign=${project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-black/70 border-t border-white/10 backdrop-blur-md text-white font-heading font-bold text-xs tracking-wider hover:bg-accent hover:text-black hover:border-accent transition-all duration-300"
                  >
                    Build Similar Ad Campaign <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {activeVideoUrl && (() => {
        const activeProj = projectsData.find((p) => p.videoUrl === activeVideoUrl);
        const isLandscape = activeProj?.aspect === "16:9";
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveVideoUrl(null)} />
            <div className={`relative w-full ${isLandscape ? "max-w-4xl" : "max-w-sm"} bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-10 flex flex-col`}>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-accent border border-white/10 flex items-center justify-center text-white hover:text-black transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className={`${isLandscape ? "aspect-[16/9]" : "aspect-[9/16]"} w-full max-h-[82vh] relative`}>
                <video
                  src={activeVideoUrl}
                  autoPlay
                  controls
                  preload="auto"
                  poster={activeProj?.image}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}


