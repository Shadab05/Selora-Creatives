"use client";

import { motion } from "framer-motion";
import { servicesData } from "@/data/mockData";
import { Check, ArrowRight, Sparkles, Zap, Package, Award } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-heading font-bold mb-4"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Capabilities Blueprint</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading font-extrabold text-4xl md:text-7xl tracking-tight mb-6"
          >
            Our Creative Services
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-studioGray-300 text-lg md:text-xl font-light leading-relaxed"
          >
            We deploy a dynamic blend of high-end design principles and custom generative AI models. This allows us to deliver stunning brand kits, interfaces, and commercial video campaigns.
          </motion.p>
        </div>

        {/* Detailed Service Blocks */}
        <div className="flex flex-col gap-16">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden"
            >
              {/* Top ambient highlight line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                {/* Column 1: Themed Brand/Service Image */}
                <div className="lg:col-span-3 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/5 group-hover:border-accent/20 transition-all duration-500 shadow-lg shadow-black/50">
                  <img
                    src={
                      service.id === "ai-ads" ? "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80" :
                      service.id === "web-design" ? "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80" :
                      service.id === "poster-design" ? "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=600&q=80" :
                      service.id === "logo-design" ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" :
                      "https://images.unsplash.com/photo-1553484771-047a44eee27f?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={service.title}
                    className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.9] group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* Column 2: Title and Summary */}
                <div className="lg:col-span-4">
                  <span className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3 block">
                    0{idx + 1} — Service Tier
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-extrabold mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h2>
                  <p className="text-studioGray-400 text-xs md:text-sm leading-relaxed mb-5 font-light">
                    {service.description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-studioGray-300">
                    <Zap className="w-3 h-3 text-accent" />
                    <span>Average Delivery: {service.duration}</span>
                  </div>
                </div>

                {/* Column 3: Capabilities, Deliverables & Call to Action */}
                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between h-full gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-accent" />
                        Capabilities
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {service.features.map((feat, fi) => (
                          <li key={fi} className="flex items-start gap-1.5 text-[11px] text-studioGray-400 font-light leading-snug">
                            <Check className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-accent" />
                        Deliverables
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {service.deliverables.map((del, di) => (
                          <li key={di} className="text-[11px] text-studioGray-400 font-light flex items-center gap-1.5 leading-snug">
                            <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
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
                    className="w-full text-center py-2.5 bg-white hover:bg-accent text-black font-heading font-extrabold text-xs tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-accent/10"
                  >
                    {service.id === "namewise" ? "Launch Namewise Platform" : "Quote This Project"} <ArrowRight className="w-3.5 h-3.5" />
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
