"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/mockData";
import { ArrowUpRight, Check, RefreshCw } from "lucide-react";

export default function WorkPage() {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "branding", label: "Branding" },
    { id: "3d web", label: "3D Web & Dev" },
    { id: "ai ads", label: "AI Ads & UGC" },
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (filter === "all") return true;
    return project.category.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading font-extrabold text-4xl md:text-7xl tracking-tight mb-6"
          >
            Selected Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-studioGray-300 text-lg md:text-xl font-light leading-relaxed"
          >
            Explore our curated gallery of case studies. We deliver agency-grade brand structures, interactive web platforms, and generative advertising assets.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-16 border-b border-white/5 pb-8">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2.5 rounded-full font-heading text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                filter === cat.id
                  ? "bg-accent text-black"
                  : "bg-white/5 border border-white/10 text-studioGray-300 hover:text-white"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/5"
              >
                <div>
                  {/* Image wrapper */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    
                    <span className="absolute top-4 left-4 bg-black/75 border border-white/10 px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider text-accent backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Core details */}
                  <div className="p-8">
                    <h2 className="font-heading text-2xl md:text-3xl font-extrabold mb-3">
                      {project.title}
                    </h2>
                    <p className="text-studioGray-300 text-sm leading-relaxed mb-6 font-light">
                      {project.tagline}
                    </p>

                    {/* Challenge and Solution */}
                    <div className="space-y-4 mb-6 border-t border-white/5 pt-6">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-heading block mb-1">
                          The Challenge
                        </span>
                        <p className="text-studioGray-400 text-xs leading-relaxed font-light">
                          {project.challenge}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white font-heading block mb-1">
                          The Solution
                        </span>
                        <p className="text-studioGray-400 text-xs leading-relaxed font-light">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Results bullet checklist */}
                    <div className="border-t border-white/5 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white font-heading block mb-3">
                        Key Performance Metrics
                      </span>
                      <ul className="flex flex-col gap-2">
                        {project.results.map((res, ri) => (
                          <li key={ri} className="flex items-start gap-2.5 text-xs text-studioGray-300 font-light">
                            <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Metrics Summary footer */}
                <div className="bg-white/[0.02] border-t border-white/5 p-8 grid grid-cols-3 gap-4">
                  {project.metrics.map((metric, mi) => (
                    <div key={mi}>
                      <span className="font-heading text-xl md:text-2xl font-extrabold text-white block">
                        {metric.value}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-heading font-extrabold text-studioGray-500">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
