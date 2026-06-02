"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Mail, MapPin, Send, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    projectType: "branding",
    budget: "$2,500 - $5,000",
    message: ""
  });

  // Pre-fill form from query params
  useEffect(() => {
    const plan = searchParams.get("plan");
    const service = searchParams.get("service");
    const budgetParam = searchParams.get("budget");
    const currencyParam = searchParams.get("currency") || "USD";
    const logoParam = searchParams.get("logo") === "true";
    const webParam = searchParams.get("web") === "true";
    const adsParam = parseInt(searchParams.get("ads") || "0");
    const retainerParam = parseInt(searchParams.get("retainer") || "0");

    let updatedType = "branding";
    let updatedBudget = "$2,500 - $5,000";
    let updatedMsg = "";

    const symbol = currencyParam === "INR" ? "₹" : currencyParam === "CAD" ? "C$" : "$";

    if (plan) {
      if (plan === "starter") {
        updatedType = "branding";
        updatedBudget = currencyParam === "INR" ? "Under ₹1,99,000" : currencyParam === "CAD" ? "Under C$3,350" : "Under $2,500";
      } else if (plan === "growth") {
        updatedType = "website";
        updatedBudget = currencyParam === "INR" ? "₹1,99,000 - ₹3,99,000" : currencyParam === "CAD" ? "C$3,350 - C$6,650" : "$2,500 - $5,000";
      } else if (plan === "premium") {
        updatedType = "website";
        updatedBudget = currencyParam === "INR" ? "₹3,99,000 - ₹7,49,000" : currencyParam === "CAD" ? "C$6,650 - C$12,250" : "$5,000 - $10,000";
      } else {
        updatedType = "retainer";
        updatedBudget = "Core Retainer Contract";
      }
      updatedMsg = `Hi Selora, I would like to inquire about the ${plan.toUpperCase()} project plan package (currency: ${currencyParam}).`;
    } else if (service) {
      updatedType = service;
      updatedMsg = `Hi Selora, I am interested in your ${service.toUpperCase()} capabilities.`;
    } else if (budgetParam) {
      const budgetNum = parseFloat(budgetParam);
      
      if (currencyParam === "INR") {
        if (budgetNum < 200000) updatedBudget = "Under ₹1,99,000";
        else if (budgetNum <= 400000) updatedBudget = "₹1,99,000 - ₹3,99,000";
        else if (budgetNum <= 800000) updatedBudget = "₹3,99,000 - ₹7,49,000";
        else updatedBudget = "₹7,49,000+";
      } else if (currencyParam === "CAD") {
        if (budgetNum < 3500) updatedBudget = "Under C$3,350";
        else if (budgetNum <= 7000) updatedBudget = "C$3,350 - C$6,650";
        else if (budgetNum <= 13000) updatedBudget = "C$6,650 - C$12,250";
        else updatedBudget = "C$12,250+";
      } else {
        if (budgetNum < 2500) updatedBudget = "Under $2,500";
        else if (budgetNum <= 5000) updatedBudget = "$2,500 - $5,000";
        else if (budgetNum <= 10000) updatedBudget = "$5,000 - $10,000";
        else updatedBudget = "10,000+";
      }

      const selectedServices = [];
      if (logoParam) selectedServices.push("Logo & Brand Identity");
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
        projectType: "branding",
        budget: "$2,500 - $5,000",
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
              <a href="mailto:hello@seloracreatives.com" className="text-sm font-bold text-white hover:text-accent transition-colors">
                hello@seloracreatives.com
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
                Tokyo, JP / Global Operations
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

              <div className="md:col-span-2">
                <label className="text-xs uppercase font-bold tracking-wider text-studioGray-400 mb-2 block font-heading">Estimated Budget</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Under $2,500", "$2,500 - $5,000", "$5,000 - $10,000", "$10,000+"].map((bud) => (
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
