"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { pricingPlans } from "@/data/mockData";
import { Check, ArrowRight, DollarSign, HelpCircle, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  // Currency Region State
  const [currency, setCurrency] = useState<"USD" | "INR" | "CAD">("USD");

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
      if (planId === "starter") return "₹39,999";
      if (planId === "growth") return "₹99,999";
      if (planId === "premium") return "₹2,49,999";
      return "Custom";
    }
    if (currency === "CAD") {
      if (planId === "starter") return "C$699";
      if (planId === "growth") return "C$1,799";
      if (planId === "premium") return "C$4,199";
      return "Custom";
    }
    // Default USD
    if (planId === "starter") return "$499";
    if (planId === "growth") return "$1,299";
    if (planId === "premium") return "$2,999";
    return "Custom";
  };

  const getCalculatorRates = () => {
    if (currency === "INR") {
      return {
        logo: 24999,
        web: 79999,
        ad: 7999,
        retainer: 49999,
        symbol: "₹",
      };
    }
    if (currency === "CAD") {
      return {
        logo: 399,
        web: 1399,
        ad: 139,
        retainer: 819,
        symbol: "C$",
      };
    }
    return {
      logo: 299,
      web: 999,
      ad: 99,
      retainer: 599,
      symbol: "$",
    };
  };

  const rates = getCalculatorRates();

  // Calculator State
  const [hasLogo, setHasLogo] = useState(false);
  const [hasWeb, setHasWeb] = useState(false);
  const [numAds, setNumAds] = useState(0);
  const [retainerMonths, setRetainerMonths] = useState(0);

  // Compute pricing
  const calculateTotal = () => {
    let total = 0;
    if (hasLogo) total += rates.logo;
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

        {/* Currency Region Selector */}
        <div className="flex justify-start mb-16 border-b border-white/5 pb-8">
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
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {pricingPlans.map((plan) => (
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
              {/* Option 1 */}
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

              {/* Option 2 */}
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
                    href={`/contact?budget=${calculateTotal()}&currency=${currency}&logo=${hasLogo}&web=${hasWeb}&ads=${numAds}&retainer=${retainerMonths}`}
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
