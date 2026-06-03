"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { pricingServices, pricingPackages } from "@/data/mockData";
import { Check, ArrowRight, DollarSign, HelpCircle, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  // Currency Region State
  const [currency, setCurrency] = useState<"USD" | "INR" | "CAD">("USD");
  
  // Pricing Type (Services vs Packages) Tab State
  const [pricingType, setPricingType] = useState<"services" | "packages">("services");

  // Auto-detect timezone on mount
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.includes("Asia/Calcutta") || tz.includes("Asia/Kolkata") || tz.includes("India")) {
        setCurrency("INR");
      } else if (tz.includes("America/Toronto") || tz.includes("America/Vancouver") || tz.includes("Canada")) {
        setCurrency("CAD");
      }
    } catch (e) {
      console.warn("Could not auto-detect timezone for regional pricing", e);
    }
  }, []);

  const getPlanPrice = (planId: string) => {
    if (currency === "INR") {
      if (planId === "service-logo") return "₹1,999";
      if (planId === "service-poster") return "₹2,499";
      if (planId === "service-web") return "₹12,499";
      if (planId === "service-ads") return "₹5,999";
      if (planId === "package-basic") return "₹19,999";
      if (planId === "package-growth") return "₹39,999";
      return "Custom";
    }
    if (currency === "CAD") {
      if (planId === "service-logo") return "C$110";
      if (planId === "service-poster") return "C$95";
      if (planId === "service-web") return "C$350";
      if (planId === "service-ads") return "C$160";
      if (planId === "package-basic") return "C$550";
      if (planId === "package-growth") return "C$1,100";
      return "Custom";
    }
    // Default USD
    if (planId === "service-logo") return "$80";
    if (planId === "service-poster") return "$70";
    if (planId === "service-web") return "$250";
    if (planId === "service-ads") return "$120";
    if (planId === "package-basic") return "$399";
    if (planId === "package-growth") return "$799";
    return "Custom";
  };

  const getCalculatorRates = () => {
    if (currency === "INR") {
      return {
        logo: 1999,
        poster: 2499,
        web: 12499,
        ad: 5999,
        retainer: 25000,
        symbol: "₹",
      };
    }
    if (currency === "CAD") {
      return {
        logo: 110,
        poster: 95,
        web: 350,
        ad: 160,
        retainer: 680,
        symbol: "C$",
      };
    }
    return {
      logo: 80,
      poster: 70,
      web: 250,
      ad: 120,
      retainer: 500,
      symbol: "$",
    };
  };

  const rates = getCalculatorRates();

  // Calculator State
  const [hasLogo, setHasLogo] = useState(false);
  const [hasPoster, setHasPoster] = useState(false);
  const [hasWeb, setHasWeb] = useState(false);
  const [numAds, setNumAds] = useState(0);
  const [retainerMonths, setRetainerMonths] = useState(0);

  // Compute pricing
  const calculateTotal = () => {
    let total = 0;
    if (hasLogo) total += rates.logo;
    if (hasPoster) total += rates.poster;
    if (hasWeb) total += rates.web;
    total += numAds * rates.ad;
    total += retainerMonths * rates.retainer;
    return total;
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-heading font-bold mb-4"
          >
            <DollarSign className="w-4 h-4 text-accent animate-pulse" />
            <span>Investment Blueprint</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading font-extrabold text-4xl md:text-7xl tracking-tight mb-6"
          >
            Pricing & Retainers
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-studioGray-300 text-lg md:text-xl font-light leading-relaxed"
          >
            Choose a fixed package that matches your scope, or build your own custom production plan using our interactive builder below.
          </motion.p>
        </div>

        {/* Selectors Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16 border-b border-white/5 pb-8">
          {/* Currency Region Selector */}
          <div className="inline-flex bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
            {(["USD", "INR", "CAD"] as const).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCurrency(curr)}
                className={`px-5 py-2.5 rounded-full font-heading text-xs font-bold tracking-wider transition-all duration-300 ${
                  currency === curr
                    ? "bg-accent text-black font-extrabold shadow-md"
                    : "text-studioGray-300 hover:text-white"
                }`}
              >
                {curr === "USD" && "USD ($)"}
                {curr === "INR" && "INR (₹)"}
                {curr === "CAD" && "CAD (C$)"}
              </button>
            ))}
          </div>

          {/* Service/Package Type Tab Selector */}
          <div className="inline-flex bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
            {(["services", "packages"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPricingType(type)}
                className={`px-5 py-2.5 rounded-full font-heading text-xs font-bold tracking-wider transition-all duration-300 ${
                  pricingType === type
                    ? "bg-accent text-black font-extrabold shadow-md"
                    : "text-studioGray-300 hover:text-white"
                }`}
              >
                {type === "services" ? "Individual Services" : "Package Bundles"}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${pricingType === "services" ? "lg:grid-cols-4" : "lg:grid-cols-3 max-w-5xl mx-auto"} gap-8 mb-24`}>
          {(pricingType === "services" ? pricingServices : pricingPackages).map((plan) => (
            <div 
              key={plan.id}
              className={`glass-card p-8 rounded-3xl flex flex-col justify-between relative ${
                plan.popular ? "border-accent/40 shadow-xl shadow-accent/5" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-black font-heading text-[10px] uppercase font-extrabold px-3.5 py-1 rounded-full tracking-wider">
                  Recommended
                </span>
              )}

              <div>
                <h3 className="font-heading text-lg font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-heading text-3xl md:text-4xl font-extrabold">{getPlanPrice(plan.id)}</span>
                  <span className="text-[10px] text-studioGray-500 uppercase tracking-widest">/ {plan.billing}</span>
                </div>
                <p className="text-studioGray-400 text-xs leading-relaxed mb-6 font-light">
                  {plan.description}
                </p>
                
                <ul className="flex flex-col gap-3.5 mb-8 border-t border-white/5 pt-6">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-xs text-studioGray-300">
                      <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/contact?plan=${plan.id}&currency=${currency}`}
                className={`w-full text-center py-3.5 rounded-full font-heading text-xs font-bold transition-all duration-300 ${
                  plan.popular
                    ? "bg-accent hover:bg-accent-hover text-black"
                    : "glass-button text-white hover:border-accent hover:text-accent"
                }`}
              >
                {plan.ctaText}
              </Link>
            </div>
          ))}
        </div>

        {/* ========================================== */}
        {/* INTERACTIVE BUDGET CALCULATOR */}
        {/* ========================================== */}
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-3xl pointer-events-none rounded-full" />
          
          <div className="max-w-xl mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-accent mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Dynamic Calculator
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white mb-3">
              Build a Custom Scope
            </h2>
            <p className="text-studioGray-400 text-xs leading-relaxed font-light">
              Toggle specific deliverables below to calculate an estimated project cost and launch scope dynamically.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Options Panel */}
            <div className="lg:col-span-7 space-y-6">
              {/* Option 1: Logo */}
              <div 
                onClick={() => setHasLogo(!hasLogo)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  hasLogo 
                    ? "bg-accent/5 border-accent text-white" 
                    : "bg-white/5 border-white/5 text-studioGray-300 hover:border-white/20"
                }`}
              >
                <div>
                  <h4 className="font-heading text-sm font-bold">Logo & Brand Identity Pack</h4>
                  <p className="text-[10.5px] text-studioGray-400 font-light mt-1">Vector guidelines, typography selections, and color palettes.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-heading font-extrabold block text-white">+{rates.symbol}{rates.logo.toLocaleString()}</span>
                  <span className="text-[9px] text-accent uppercase font-bold">{hasLogo ? "Added" : "Add Service"}</span>
                </div>
              </div>

              {/* Option 1.5: Poster */}
              <div 
                onClick={() => setHasPoster(!hasPoster)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  hasPoster 
                    ? "bg-accent/5 border-accent text-white" 
                    : "bg-white/5 border-white/5 text-studioGray-300 hover:border-white/20"
                }`}
              >
                <div>
                  <h4 className="font-heading text-sm font-bold">Poster & Graphic Design</h4>
                  <p className="text-[10.5px] text-studioGray-400 font-light mt-1">Cinematic print and digital posters, graphics, and crop sizes.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-heading font-extrabold block text-white">+{rates.symbol}{rates.poster.toLocaleString()}</span>
                  <span className="text-[9px] text-accent uppercase font-bold">{hasPoster ? "Added" : "Add Service"}</span>
                </div>
              </div>

              {/* Option 2: Web */}
              <div 
                onClick={() => setHasWeb(!hasWeb)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  hasWeb 
                    ? "bg-accent/5 border-accent text-white" 
                    : "bg-white/5 border-white/5 text-studioGray-300 hover:border-white/20"
                }`}
              >
                <div>
                  <h4 className="font-heading text-sm font-bold">Custom React/Next.js App</h4>
                  <p className="text-[10.5px] text-studioGray-400 font-light mt-1">Responsive layout, custom particle scripts, and CMS integrations.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-heading font-extrabold block text-white">+{rates.symbol}{rates.web.toLocaleString()}</span>
                  <span className="text-[9px] text-accent uppercase font-bold">{hasWeb ? "Added" : "Add Service"}</span>
                </div>
              </div>

              {/* Slider 1: AI Video ads */}
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-heading text-sm font-bold text-white">AI Video Ads & UGC Spots</h4>
                    <p className="text-[10.5px] text-studioGray-400 font-light mt-1">4K product commercials or synthetic creator scripts.</p>
                  </div>
                  <span className="text-xs font-heading font-extrabold text-white">
                    {numAds} Ads (+{rates.symbol}{(numAds * rates.ad).toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={numAds}
                  onChange={(e) => setNumAds(parseInt(e.target.value))}
                  className="w-full h-1 bg-studioGray-800 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[9px] text-studioGray-500 font-bold uppercase mt-1">
                  <span>0 Ads</span>
                  <span>15 Ads</span>
                </div>
              </div>

              {/* Slider 2: Retainer Months */}
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-heading text-sm font-bold text-white">Monthly Content Retainer</h4>
                    <p className="text-[10.5px] text-studioGray-400 font-light mt-1">Unlimited graphic changes & ongoing social assets updates.</p>
                  </div>
                  <span className="text-xs font-heading font-extrabold text-white">
                    {retainerMonths} Months (+{rates.symbol}{(retainerMonths * rates.retainer).toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={retainerMonths}
                  onChange={(e) => setRetainerMonths(parseInt(e.target.value))}
                  className="w-full h-1 bg-studioGray-800 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[9px] text-studioGray-500 font-bold uppercase mt-1">
                  <span>No Retainer</span>
                  <span>12 Months</span>
                </div>
              </div>
            </div>

            {/* Total Budget Output Display */}
            <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col justify-between h-full text-center">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-studioGray-400 block mb-2 font-heading">
                  Estimated Project Cost
                </span>
                <span className="font-heading text-5xl md:text-6xl font-extrabold text-white text-glow block">
                  {rates.symbol}{calculateTotal().toLocaleString()}
                </span>
                <p className="text-[10.5px] text-studioGray-400 leading-relaxed font-light mt-4">
                  {calculateTotal() === 0
                    ? "Select options on the left to estimate your customized studio scope budget."
                    : "Estimated budget calculation. Includes 2 revision rounds and high-fidelity output source files."}
                </p>
              </div>

              {calculateTotal() > 0 && (
                <div className="mt-8 pt-6 border-t border-white/5">
                  <Link
                    href={`/contact?budget=${calculateTotal()}&currency=${currency}&logo=${hasLogo}&poster=${hasPoster}&web=${hasWeb}&ads=${numAds}&retainer=${retainerMonths}`}
                    className="w-full py-3.5 bg-accent hover:bg-accent-hover text-black font-heading font-extrabold text-xs tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Submit Calculator Brief <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
