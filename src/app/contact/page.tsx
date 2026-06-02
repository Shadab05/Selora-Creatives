"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Mail, MapPin, Send, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "INR" | "CAD">("USD");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    projectType: "ai-ads",
    budget: "Under $200",
    message: ""
  });

  const getBudgetOptions = () => {
    if (currency === "INR") {
      return ["Under ₹10,000", "₹10,000 - ₹25,000", "₹25,000 - ₹60,000", "₹60,000+"];
    }
    if (currency === "CAD") {
      return ["Under C$300", "C$300 - C$750", "C$750 - C$2,000", "C$2,000+"];
    }
    return ["Under $200", "$200 - $500", "$500 - $1,500", "$1,500+"];
  };

  // Sync budget option default on currency switch (only if not pre-filled)
  useEffect(() => {
    const isPrefilled = searchParams.get("budget") || searchParams.get("plan");
    if (!isPrefilled) {
      setFormData((prev) => ({ ...prev, budget: getBudgetOptions()[1] }));
    }
  }, [currency]);

  // Pre-fill form from query params
  useEffect(() => {
    const plan = searchParams.get("plan");
    const service = searchParams.get("service");
    const budgetParam = searchParams.get("budget");
    const currencyParam = (searchParams.get("currency") as "USD" | "INR" | "CAD") || "USD";
    const logoParam = searchParams.get("logo") === "true";
    const posterParam = searchParams.get("poster") === "true";
    const webParam = searchParams.get("web") === "true";
    const adsParam = parseInt(searchParams.get("ads") || "0");
    const retainerParam = parseInt(searchParams.get("retainer") || "0");

    if (currencyParam && ["USD", "INR", "CAD"].includes(currencyParam)) {
      setCurrency(currencyParam);
    }

    let updatedType = "ai-ads";
    let updatedBudget = "Under $200";
    let updatedMsg = "";

    const symbol = currencyParam === "INR" ? "₹" : currencyParam === "CAD" ? "C$" : "$";

    if (plan) {
      if (plan === "service-logo") {
        updatedType = "logo-design";
        updatedBudget = currencyParam === "INR" ? "Under ₹10,000" : currencyParam === "CAD" ? "Under C$300" : "Under $200";
      } else if (plan === "service-poster") {
        updatedType = "poster-design";
        updatedBudget = currencyParam === "INR" ? "Under ₹10,000" : currencyParam === "CAD" ? "Under C$300" : "Under $200";
      } else if (plan === "service-web") {
        updatedType = "web-design";
        updatedBudget = currencyParam === "INR" ? "₹10,000 - ₹25,000" : currencyParam === "CAD" ? "C$300 - C$750" : "$200 - $500";
      } else if (plan === "service-ads") {
        updatedType = "ai-ads";
        updatedBudget = currencyParam === "INR" ? "Under ₹10,000" : currencyParam === "CAD" ? "Under C$300" : "Under $200";
      } else if (plan === "package-basic") {
        updatedType = "ai-ads";
        updatedBudget = currencyParam === "INR" ? "₹10,000 - ₹25,000" : currencyParam === "CAD" ? "C$300 - C$750" : "$200 - $500";
      } else if (plan === "package-growth") {
        updatedType = "web-design";
        updatedBudget = currencyParam === "INR" ? "₹25,000 - ₹60,000" : currencyParam === "CAD" ? "C$750 - C$2,000" : "$500 - $1,500";
      } else {
        updatedType = "namewise";
        updatedBudget = "Custom";
      }
      updatedMsg = `Hi Selora, I would like to inquire about the ${plan.toUpperCase()} plan (currency: ${currencyParam}).`;
    } else if (service) {
      updatedType = service;
      updatedMsg = `Hi Selora, I am interested in your ${service.toUpperCase()} capabilities.`;
    } else if (budgetParam) {
      const budgetNum = parseFloat(budgetParam);
      
      if (currencyParam === "INR") {
        if (budgetNum < 10000) updatedBudget = "Under ₹10,000";
        else if (budgetNum <= 25000) updatedBudget = "₹10,000 - ₹25,000";
        else if (budgetNum <= 60000) updatedBudget = "₹25,000 - ₹60,000";
        else updatedBudget = "₹60,000+";
      } else if (currencyParam === "CAD") {
        if (budgetNum < 300) updatedBudget = "Under C$300";
        else if (budgetNum <= 750) updatedBudget = "C$300 - C$750";
        else if (budgetNum <= 2000) updatedBudget = "C$750 - C$2,000";
        else updatedBudget = "C$2,000+";
      } else {
        if (budgetNum < 200) updatedBudget = "Under $200";
        else if (budgetNum <= 500) updatedBudget = "$200 - $500";
        else if (budgetNum <= 1500) updatedBudget = "$500 - $1,500";
        else updatedBudget = "$1,500+";
      }

      const selectedServices = [];
      if (logoParam) selectedServices.push("Logo & Brand Identity");
      if (posterParam) selectedServices.push("Poster & Graphic Design");
      if (webParam) selectedServices.push("Custom Next.js App");
      if (adsParam > 0) selectedServices.push(`${adsParam} AI Video Ads`);
      if (retainerParam > 0) selectedServices.push(`${retainerParam} Months Retainer Support`);

      updatedMsg = `Calculated custom scope total: ${symbol}${budgetNum.toLocaleString()}.\nScope breakdown:\n- ${selectedServices.join("\n- ")}`;
    }

    setFormData((prev) => ({
      ...prev,
      projectType: updatedType,
      budget: updatedBudget,
      message: updatedMsg || prev.message
    }));
  }, [searchParams]);

  // Initial timezone-based currency detection
  useEffect(() => {
    try {
      const isPrefilled = searchParams.get("currency");
      if (isPrefilled) return; // let URL param override timezone
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.includes("Asia/Calcutta") || tz.includes("Asia/Kolkata") || tz.includes("India")) {
        setCurrency("INR");
      } else if (tz.includes("America/Toronto") || tz.includes("America/Vancouver") || tz.includes("Canada")) {
        setCurrency("CAD");
      }
    } catch (e) {
      console.warn("Could not auto-detect timezone for regional pricing", e);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#c084fc", "#ffffff"]
    });

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        businessName: "",
        projectType: "ai-ads",
        budget: getBudgetOptions()[1],
        message: ""
      });
    }, 5000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* Sidebar Info */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-accent text-xs uppercase tracking-widest font-heading font-bold mb-6"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Creative Consultation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight mb-8 text-glow"
          >
            Let's build something remarkable.
          </motion.h1>

          <p className="text-studioGray-300 text-sm leading-relaxed mb-8 font-light max-w-sm">
            Have a project in mind? Submit your specs or build a custom calculator brief. Our lead developer and creative director will reply in 24 hours.
          </p>
        </div>

        {/* Contact details */}
        <div className="space-y-6 border-t border-white/5 pt-8 mt-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-studioGray-400 font-heading">Direct Email</p>
              <a href="mailto:seloracreatives@gmail.com" className="text-sm font-bold text-white hover:text-accent transition-colors">
                seloracreatives@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-studioGray-400 font-heading">Studio Location</p>
              <p className="text-sm font-bold text-white">
                Bhopal, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="lg:col-span-7">
        <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden border border-white/5">
          {formSubmitted ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-accent/25 border border-accent flex items-center justify-center text-accent mb-6 animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3">Submission Received!</h3>
              <p className="text-studioGray-400 text-xs max-w-sm leading-relaxed font-light">
                Thank you <span className="text-accent font-bold">{formData.name}</span>. We've received your business brief for <span className="text-white font-bold">{formData.businessName || "your brand"}</span>. We will review details and reply to <span className="text-white font-bold">{formData.email}</span> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-studioGray-400 mb-2 block font-heading">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-studioGray-400 mb-2 block font-heading">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-studioGray-400 mb-2 block font-heading">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Company name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-studioGray-400 mb-2 block font-heading">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-studioGray-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent text-white transition-colors"
                >
                  <option value="ai-ads">AI Ads Production</option>
                  <option value="web-design">Website Dev & Landing Pages</option>
                  <option value="poster-design">Poster Design</option>
                  <option value="logo-design">Logo & Brand Design</option>
                  <option value="namewise">Brand Name Decisions (Namewise)</option>
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-studioGray-400 block font-heading">Estimated Budget</label>
                  
                  {/* Small Currency Toggle */}
                  <div className="inline-flex bg-white/5 border border-white/10 p-0.5 rounded-full backdrop-blur-md">
                    {(["USD", "INR", "CAD"] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`px-3 py-1 rounded-full font-heading text-[10px] font-bold tracking-wider transition-all duration-300 ${
                          currency === curr
                            ? "bg-accent text-black font-extrabold"
                            : "text-studioGray-300 hover:text-white"
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {getBudgetOptions().map((bud) => (
                    <button
                      key={bud}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: bud })}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                        formData.budget === bud
                          ? "bg-accent border-accent text-black"
                          : "bg-white/5 border-white/10 text-white hover:border-white/30"
                      }`}
                    >
                      {bud}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs uppercase font-bold tracking-wider text-studioGray-400 mb-2 block font-heading">Project Brief</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your design challenge or marketing goals..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none transition-colors"
                />
              </div>

              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-accent hover:bg-accent-hover text-black font-heading font-extrabold tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Send Brief Request <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 bg-black">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Suspense fallback={<div className="text-center py-20 text-studioGray-400 font-heading">Loading Client Intake Workspace...</div>}>
          <ContactFormContent />
        </Suspense>
      </div>
    </div>
  );
}
