"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { projectsData } from "@/data/mockData";
import { ArrowRight, Play, X, Check } from "lucide-react";

export default function WorkPage() {
  const [filter, setFilter] = useState("all");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Works" },
    { id: "ugc", label: "UGC Ads" },
    { id: "hypermotion", label: "Hypermotion" },
    { id: "unboxing", label: "Unboxings" },
    { id: "tv-spot", label: "TV Spot" },
  ];

  // Filter projects based on selected tag
  const filteredProjects = projectsData.filter((project) => {
    if (filter === "all") return true;
    return project.category.toLowerCase().includes(filter.toLowerCase()) || 
           project.id.toLowerCase().includes(filter.toLowerCase());
  });

  // Scroll target for vertical-to-horizontal conversion
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
  });

  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth);
      }
      setViewportWidth(window.innerWidth);
    };

    // Small delay to ensure browser paint is complete
    const timer = setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [filteredProjects]);

  // Translate track by exactly the overflow width (plus side padding offset)
  const overflow = Math.max(0, trackWidth - viewportWidth + 120);
  const isOverflowing = overflow > 0;

  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -overflow]);
  const x = useSpring(xTransform, { stiffness: 100, damping: 20 });

  return (
    <div ref={scrollTargetRef} className={`relative bg-black ${isOverflowing ? "h-[220vh]" : "h-auto"}`}>
      {/* Sticky Screen Viewport Wrapper */}
      <div className={`${isOverflowing ? "sticky top-0 h-screen" : "relative min-h-[90vh] py-12"} w-full overflow-hidden flex flex-col justify-between pt-28 pb-10 bg-black`}>
        {/* Background radial highlight */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[130px] pointer-events-none" />

        {/* Top Header Row (Title & Filters) */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6 z-20">
          <div>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl tracking-tight mb-2">
              Selected Works
            </h1>
            <p className="text-studioGray-400 text-xs md:text-sm font-light">
              {isOverflowing 
                ? "Scroll down to navigate our vertical advertising showcase horizontally."
                : "Explore our premium vertical advertising showcase."
              }
            </p>
          </div>

          {/* Interactive Tag Filters */}
          <div className="flex gap-2 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-full font-heading text-[10px] sm:text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  filter === cat.id
                    ? "bg-accent text-black"
                    : "text-studioGray-300 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Row: Sticky Horizontal Scroll Track */}
        <div className="flex-1 flex items-center relative z-10 w-full overflow-hidden">
          <motion.div 
            ref={trackRef}
            style={{ x: isOverflowing ? x : 0 }} 
            className="flex gap-8 md:gap-12 items-center px-6 md:px-12 flex-nowrap w-fit"
          >
            {/* Intro text slide */}
            <div className="w-[280px] md:w-[320px] shrink-0 text-left pr-4 select-none">
              <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block animate-pulse">
                Swipe or Scroll
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Generative Video Productions
              </h2>
              <p className="text-studioGray-400 text-xs md:text-sm font-light leading-relaxed">
                Hover over any glowing card to preview the ad clip. Click to expand into a fullscreen portrait cinema experience.
              </p>
            </div>

            {/* Project Cards mapping */}
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setActiveVideoUrl(project.videoUrl || null)}
                  className={`group relative ${project.aspect === "16:9" ? "aspect-[16/9] shrink-0" : "aspect-[9/16] shrink-0"} h-[55vh] md:h-[62vh] min-h-[380px] rounded-3xl overflow-hidden border border-white/10 bg-studioGray-950 cursor-pointer shadow-2xl hover:border-accent/40 hover:shadow-accent/5 transition-all duration-500 flex flex-col justify-end`}
                >
                  {/* Background Image Preview */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500 brightness-75 z-10"
                  />

                  {/* Inline Hover Video preview */}
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

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85 pointer-events-none z-20" />

                  {/* Card Info Overlay */}
                  <div className="absolute inset-x-6 bottom-6 z-30 flex flex-col text-left transition-transform duration-500 group-hover:translate-y-[-8px]">
                    <span className="text-[9px] uppercase tracking-widest font-heading font-extrabold text-accent mb-1.5 block">
                      {project.category}
                    </span>
                    <h3 className="font-heading text-lg md:text-xl font-extrabold text-white mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-studioGray-300 text-[10px] md:text-xs font-light leading-relaxed mb-4 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {project.tagline}
                    </p>

                    {/* Small clean metric badges inside card */}
                    <div className="flex gap-4 pt-3.5 border-t border-white/10">
                      {project.metrics.slice(0, 2).map((metric, mi) => (
                        <div key={mi} className="flex flex-col">
                          <span className="font-heading text-xs md:text-sm font-extrabold text-white">
                            {metric.value}
                          </span>
                          <span className="text-[8px] uppercase tracking-wider font-heading font-bold text-studioGray-500">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-xl">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom Status bar */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex justify-between items-center text-[10px] font-mono text-studioGray-500 z-20 select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>SCROLL_TRACK: HORIZ_PROJ</span>
          </div>
          <div>SELORA CREATIVES PORTFOLIO</div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {activeVideoUrl && (() => {
          const activeProj = projectsData.find((p) => p.videoUrl === activeVideoUrl);
          const isLandscape = activeProj?.aspect === "16:9";
          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            >
              <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveVideoUrl(null)} />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className={`relative w-full ${isLandscape ? "max-w-4xl" : "max-w-sm"} bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-10 flex flex-col`}
              >
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
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
