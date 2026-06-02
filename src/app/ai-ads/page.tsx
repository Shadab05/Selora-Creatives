"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Smartphone, 
  Tv, 
  Users, 
  Play, 
  Check, 
  ArrowUpRight, 
  Compass, 
  Cpu,
  X
} from "lucide-react";
import Link from "next/link";

export default function AIAdsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const adsCategories = [
    {
      id: "ugc-miss-dior",
      title: "Miss Dior Perfume",
      category: "AI UGC Ad",
      format: "9:16 Vertical",
      metric: "+45% CTR",
      tagline: "Discover your signature scent.",
      description: "Organic, platform-native creator review featuring Miss Dior Eau de Parfum. Combines authentic home lighting with hyper-realistic product placements.",
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80",
      videoUrl: "/videos/perfume ad.mp4"
    },
    {
      id: "hypermotion-coffee",
      title: "Aroma Café Blend",
      category: "Hypermotion Commercial",
      format: "16:9 Landscape",
      metric: "3.4x Higher ROAS",
      tagline: "Classic strong blend, premium Arabica.",
      description: "High-octane coffee bean and splash physics simulated at 60fps. Crafted to launch gourmet roasted beans without physical camera rig overhead.",
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80",
      videoUrl: "/videos/coffee ad.mp4"
    },
    {
      id: "unboxing-velora",
      title: "Velora Skin Serum",
      category: "Unboxing & Demo",
      format: "9:16 Vertical",
      metric: "+55% Conversion",
      tagline: "Brightens • Hydrates • Smooths.",
      description: "Macro skincare application showcase showing unboxing dynamics, pipette viscosity, and skin absorption texture.",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80",
      videoUrl: "/videos/Cosmetic serum beauty ad.mp4"
    }
  ];

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

        {/* Showcase items */}
        <div className="flex flex-col gap-12">
          <h2 className="font-heading text-xl font-extrabold text-white border-b border-white/5 pb-4">
            Recent Campaign Creatives
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {adsCategories.map((ad) => (
              <div 
                key={ad.id} 
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-white/5 group"
              >
                <div>
                  <div 
                    onClick={() => setActiveVideoUrl(ad.videoUrl)}
                    className="relative aspect-[4/5] overflow-hidden bg-black border-b border-white/5 cursor-pointer"
                  >
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Format Badge */}
                    <span className="absolute top-4 left-4 bg-black/70 border border-white/10 px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider text-accent">
                      {ad.format}
                    </span>

                    {/* Metric Highlight */}
                    <span className="absolute top-4 right-4 bg-accent text-black px-3 py-1 rounded-full text-[10px] font-heading font-extrabold uppercase tracking-wider">
                      {ad.metric}
                    </span>

                    {/* Simulation Play Trigger overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {/* Floating Info inside Image */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-[10px] uppercase font-heading font-bold text-accent tracking-widest block mb-1">
                        {ad.category}
                      </span>
                      <h3 className="font-heading text-lg font-extrabold text-white">
                        {ad.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-studioGray-300 text-xs font-bold font-heading mb-2">
                      {ad.tagline}
                    </p>
                    <p className="text-studioGray-400 text-xs leading-relaxed font-light">
                      {ad.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-white/5 flex">
                  <Link
                    href={`/contact?service=ai-ads&campaign=${ad.id}`}
                    className="w-full text-center py-2.5 glass-button text-white font-heading font-bold text-xs tracking-wider rounded-lg flex items-center justify-center gap-1.5"
                  >
                    Build Similar Ad Campaign <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal (optimized aspect ratio sizing) */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveVideoUrl(null)} />
          <div className="relative w-full max-w-4xl bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-10 flex flex-col">
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-accent border border-white/10 flex items-center justify-center text-white hover:text-black transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className={activeVideoUrl.includes("coffee") ? "aspect-video w-full" : "aspect-[9/16] max-h-[80vh] mx-auto w-auto relative"}>
              <video
                src={activeVideoUrl}
                autoPlay
                controls
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


