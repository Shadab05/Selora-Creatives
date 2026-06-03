"use client";

import { useState, useEffect } from "react";
import { servicesData } from "@/data/mockData";
import { Check, ArrowRight, Sparkles, Zap, Package, Award } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const [isMobile, setIsMobile] = useState(false);

  // Auto-detect responsive viewport md breakpoint for layout offsets
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-heading font-bold mb-4">
            <Sparkles className="w-4 h-4 animate-pulse text-accent" />
            <span>Capabilities Blueprint</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight text-white mb-6">
            Our Creative Services
          </h1>
          <p className="text-studioGray-350 text-base md:text-lg font-light leading-relaxed">
            We deploy a dynamic blend of high-end design principles and custom generative AI models. This allows us to deliver stunning brand kits, interfaces, and commercial video campaigns.
          </p>
        </div>

        {/* Vertical Sticky Stack of Cards (Book Stack) */}
        <div className="flex flex-col gap-12 relative pb-12">
          {servicesData.map((service, index) => {
            const displayIndex = String(index + 1).padStart(2, '0');
            const features = isMobile ? service.features.slice(0, 3) : service.features;
            const deliverables = isMobile ? service.deliverables.slice(0, 3) : service.deliverables;

            return (
              <div
                key={service.id}
                style={{
                  top: isMobile ? `${64 + index * 10}px` : `${110 + index * 24}px`,
                  zIndex: 10 + index,
                }}
                className="sticky bg-[#0b0910]/95 border border-white/10 rounded-[24px] md:rounded-[32px] p-5 md:p-10 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:border-accent/30 group"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center h-full">
                  {/* Service visual cover */}
                  <div className="col-span-1 md:col-span-3 relative aspect-[21/9] md:aspect-[4/3] w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/5 shadow-lg select-none block">
                    <img
                      src={
                        service.id === "ai-ads" ? "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80" :
                        service.id === "web-design" ? "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80" :
                        service.id === "poster-design" ? "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=600&q=80" :
                        service.id === "logo-design" ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" :
                        "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=600&q=80"
                      }
                      alt={service.title}
                      className="w-full h-full object-cover brightness-[0.7] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>

                  {/* Copywriting / details */}
                  <div className="col-span-1 md:col-span-4 flex flex-col justify-center text-left">
                    <span className="font-heading text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-accent mb-1.5 block">
                      {displayIndex} — Service Tier
                    </span>
                    <h2 className="font-heading text-lg md:text-3xl font-extrabold mb-1.5 md:mb-3 text-white group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h2>
                    <p className="text-studioGray-350 text-xs md:text-sm leading-relaxed mb-4 md:mb-5 font-light">
                      {service.description}
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-bold text-studioGray-300 w-fit">
                      <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 text-accent animate-pulse" />
                      <span>Average Delivery: {service.duration}</span>
                    </div>
                  </div>

                  {/* Lists and CTA button */}
                  <div className="col-span-1 md:col-span-5 md:border-l border-white/5 md:pl-8 flex flex-col justify-between h-full py-1 text-left">
                    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                      <div>
                        <h3 className="font-heading text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white mb-2 md:mb-3 flex items-center gap-1.5">
                          <Award className="w-3 md:w-3.5 h-3 md:h-3.5 text-accent" />
                          Capabilities
                        </h3>
                        <ul className="flex flex-col gap-1.5 md:gap-2">
                          {features.map((feat, fi) => (
                            <li key={fi} className="flex items-start gap-1.5 text-[11px] md:text-xs text-studioGray-400 font-light leading-snug">
                              <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-heading text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white mb-2 md:mb-3 flex items-center gap-1.5">
                          <Package className="w-3 md:w-3.5 h-3 md:h-3.5 text-accent" />
                          Deliverables
                        </h3>
                        <ul className="flex flex-col gap-1.5 md:gap-2">
                          {deliverables.map((del, di) => (
                            <li key={di} className="text-[11px] md:text-xs text-studioGray-400 font-light flex items-start gap-1.5 leading-snug">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link
                      href={service.id === "namewise" ? "http://localhost:5173" : `/contact?service=${service.id}`}
                      target={service.id === "namewise" ? "_blank" : undefined}
                      rel={service.id === "namewise" ? "noopener noreferrer" : undefined}
                      className="w-full text-center py-2.5 bg-white hover:bg-accent text-black font-heading font-extrabold text-xs tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-accent/15 mt-2"
                    >
                      {service.id === "namewise" ? "Launch Namewise Platform" : "Quote This Project"} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
