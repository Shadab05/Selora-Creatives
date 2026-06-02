"use client";

import { motion } from "framer-motion";
import { Sparkles, Globe, Compass, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-heading font-bold mb-4"
          >
            <Compass className="w-4 h-4 text-accent animate-pulse" />
            <span>The Studio Manifesto</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading font-extrabold text-4xl md:text-7xl tracking-tight mb-8 leading-tight"
          >
            Building Brands Beyond Templates
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-studioGray-300 text-lg md:text-2xl font-light leading-relaxed"
          >
            We help brands create premium visual experiences through design, technology, and AI-powered creativity. We believe that standard templates make brands look invisible. We build the visible future.
          </motion.p>
        </div>

        {/* Narrative columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="space-y-6 text-studioGray-300 font-light text-base leading-relaxed">
            <p>
              Selora Creatives was founded by a hybrid group of design directors, web developers, and artificial intelligence researchers who grew tired of standard, cookie-cutter agency structures. 
            </p>
            <p>
              Traditional agencies are slow, heavy, and prohibitively expensive for fast-moving startups. Conversely, automated self-serve design tools yield cheap templates that lack emotional impact and brand distinctiveness. We built Selora to be the solution.
            </p>
            <p>
              By combining classic artistic principles—color theory, high-end typography, kinetic alignment—with custom trained generative AI systems, we execute projects with 10x output capacities. We pass these efficiencies straight to our clients, shipping award-winning assets in days instead of quarters.
            </p>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden border border-white/5">
            <h3 className="font-heading text-lg font-bold text-white mb-6">Our Hybrid Workflow</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0 font-heading font-extrabold text-xs">
                  1
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white mb-1">Human Direction</h4>
                  <p className="text-studioGray-400 text-xs leading-relaxed font-light">
                    Every project is curated by an experienced creative director. We establish the moodboards, scripting, typography, and logo geometries manually.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0 font-heading font-extrabold text-xs">
                  2
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white mb-1">AI Execution</h4>
                  <p className="text-studioGray-400 text-xs leading-relaxed font-light">
                    We scale creative concepts using custom video and image diffusion networks, generating hundreds of high-res variations for testing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0 font-heading font-extrabold text-xs">
                  3
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white mb-1">Engineering Precision</h4>
                  <p className="text-studioGray-400 text-xs leading-relaxed font-light">
                    Our developers package assets into fast, responsive Next.js apps and cinematic video splits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="border-t border-white/5 pt-16">
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white mb-12 text-center">
            Our Studio Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">Artistry First</h3>
              <p className="text-studioGray-400 text-xs leading-relaxed font-light">
                AI is an accelerator, not a replacement. We prioritize meticulous alignment, colors, typography, and timing in every file we ship.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-6">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">Speed & Agility</h3>
              <p className="text-studioGray-400 text-xs leading-relaxed font-light">
                We design in days, not months. We ship initial drafts quickly to allow real-world data and user interactions to guide refinements.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">Client Transparency</h3>
              <p className="text-studioGray-400 text-xs leading-relaxed font-light">
                No black boxes or hidden fees. We work alongside our clients in shared Slack workspaces, aligning on scopes and revisions dynamically.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-black font-heading font-extrabold tracking-wider rounded-xl transition-all duration-300"
          >
            Work With Selora Studio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
