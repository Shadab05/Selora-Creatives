"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Play, 
  Pause, 
  Layers, 
  Sparkles, 
  Tv, 
  Smartphone, 
  Users, 
  Clock, 
  Check, 
  ChevronDown, 
  Send,
  X
} from "lucide-react";
import HeroCanvas from "@/components/HeroCanvas";
import { 
  projectsData, 
  servicesData, 
  testimonialsData, 
  pricingPlans, 
  faqData 
} from "@/data/mockData";
import confetti from "canvas-confetti";

export default function HomePage() {
  // Counter state for stats animation
  const [stats, setStats] = useState({ projects: 0, assets: 0, industries: 0, hours: 0 });
  const statsSectionRef = useRef<HTMLDivElement>(null);

  // Showreel playback state
  const [isPlayingReel, setIsPlayingReel] = useState(false);
  const showreelCanvasRef = useRef<HTMLCanvasElement>(null);
  const [showreelMode, setShowreelMode] = useState(0);
  const showreelModeRef = useRef(0);

  useEffect(() => {
    showreelModeRef.current = showreelMode;
  }, [showreelMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowreelMode((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // AI Ad Showcase state
  const [activeAdCategory, setActiveAdCategory] = useState("ugc");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  
  // FAQ accordion active state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Currency select state
  const [currency, setCurrency] = useState<"USD" | "INR" | "CAD">("USD");

  // Auto-detect timezone region on load
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.includes("Asia/Calcutta") || tz.includes("Asia/Kolkata") || tz.includes("India")) {
        setCurrency("INR");
      } else if (tz.includes("America/Toronto") || tz.includes("America/Vancouver") || tz.includes("Canada")) {
        setCurrency("CAD");
      }
    } catch (e) {
      console.warn("Could not auto-detect timezone for currency setting", e);
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

  // Contact form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    projectType: "branding",
    budget: "$2,500 - $5,000",
    message: ""
  });

  // Handle stats counter animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          let start = 0;
          const endProjects = 150;
          const endAssets = 10000;
          const endIndustries = 15;
          const endHours = 2500;
          const duration = 2000;
          const steps = 50;
          const stepTime = duration / steps;
          
          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            setStats({
              projects: Math.floor((endProjects / steps) * currentStep),
              assets: Math.floor((endAssets / steps) * currentStep),
              industries: Math.floor((endIndustries / steps) * currentStep),
              hours: Math.floor((endHours / steps) * currentStep),
            });

            if (currentStep >= steps) {
              clearInterval(timer);
              setStats({
                projects: endProjects,
                assets: endAssets,
                industries: endIndustries,
                hours: endHours
              });
            }
          }, stepTime);
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Showreel canvas animation
  useEffect(() => {
    const canvas = showreelCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);
    let animFrame: number;
    let time = 0;
    
    let currentMode = 0;
    let modeTimer = 0;
    let transitionGlitch = 0;

    const drawShowreelMock = () => {
      // Clear canvas
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, width, height);

      time += isPlayingReel ? 1.2 : 0.3;

      // Sync with React state mode and trigger glitch on change
      if (currentMode !== showreelModeRef.current) {
        currentMode = showreelModeRef.current;
        transitionGlitch = 15; // 15 frames of cyber-glitch transition
      }

      // Draw grid background
      ctx.strokeStyle = "rgba(168, 85, 247, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // Vector glow settings
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(168, 85, 247, 0.35)";

      // Apply glitch offsets
      let glitchX = 0;
      let glitchY = 0;
      if (transitionGlitch > 0) {
        transitionGlitch--;
        if (Math.random() > 0.45) {
          glitchX = (Math.random() - 0.5) * 22;
          glitchY = (Math.random() - 0.5) * 8;
          ctx.fillStyle = "rgba(168, 85, 247, 0.12)";
          ctx.fillRect(0, Math.random() * height, width, Math.random() * 40);
        }
      }

      // Mode 0: WEBSITE WIREFRAME DRAWING
      if (currentMode === 0) {
        ctx.strokeStyle = "rgba(168, 85, 247, 0.5)";
        ctx.lineWidth = 1.5;

        const wWidth = Math.min(500, width * 0.75);
        const wHeight = Math.min(280, height * 0.65);
        const rx = centerX - wWidth / 2 + glitchX;
        const ry = centerY - wHeight / 2 + glitchY;

        // Window Outline
        ctx.strokeRect(rx, ry, wWidth, wHeight);

        // Header separator line
        ctx.beginPath();
        ctx.moveTo(rx, ry + 28);
        ctx.lineTo(rx + wWidth, ry + 28);
        ctx.stroke();

        // Header Dots
        ctx.fillStyle = "rgba(168, 85, 247, 0.3)";
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(rx + 12 + i * 14, ry + 14, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Content Box Left (Image mock)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.strokeRect(rx + 20, ry + 44, wWidth * 0.38, wHeight * 0.4);
        ctx.beginPath();
        ctx.moveTo(rx + 20, ry + 44);
        ctx.lineTo(rx + 20 + wWidth * 0.38, ry + 44 + wHeight * 0.4);
        ctx.moveTo(rx + 20 + wWidth * 0.38, ry + 44);
        ctx.lineTo(rx + 20, ry + 44 + wHeight * 0.4);
        ctx.stroke();

        // Content Lines Right (Text mock)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        for (let i = 0; i < 3; i++) {
          const lineLen = wWidth * 0.42 - i * 35;
          ctx.beginPath();
          ctx.moveTo(rx + 20 + wWidth * 0.42, ry + 54 + i * 16);
          ctx.lineTo(rx + 20 + wWidth * 0.42 + lineLen, ry + 54 + i * 16);
          ctx.stroke();
        }

        // Bottom Section Cards
        const progress = (time % 80) / 80;
        ctx.strokeStyle = "rgba(168, 85, 247, 0.35)";
        for (let i = 0; i < 3; i++) {
          const cardX = rx + 20 + i * (wWidth * 0.31);
          const cardY = ry + wHeight * 0.58;
          const cardW = wWidth * 0.27;
          const cardH = wHeight * 0.32;
          const scaleY = Math.max(0.08, Math.min(1, (progress * 3.5) - i));
          ctx.strokeRect(cardX, cardY, cardW, cardH * scaleY);
        }

        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        ctx.font = "bold 9px monospace";
        ctx.fillText("MODE_01: WEBSITE_DEV_LANDING_PAGES", rx + wWidth - 210, ry + 18);
        ctx.fillText(`RENDERING GRID COMPONENTS... ${Math.floor(progress * 100)}%`, rx + 20, ry + wHeight - 10);
      }
      // Mode 1: VECTOR LOGO DESIGN MOCKUP
      else if (currentMode === 1) {
        ctx.strokeStyle = "rgba(168, 85, 247, 0.5)";
        ctx.lineWidth = 1.5;

        const baseRad = 70;
        const pulseRad = baseRad + Math.sin(time * 0.04) * 8;

        // Golden circles
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.beginPath();
        ctx.arc(centerX + glitchX, centerY + glitchY, baseRad, 0, Math.PI * 2);
        ctx.arc(centerX + glitchX, centerY + glitchY, baseRad * 1.618, 0, Math.PI * 2);
        ctx.stroke();

        // Drafting lines
        ctx.beginPath();
        ctx.moveTo(centerX - 140 + glitchX, centerY + glitchY);
        ctx.lineTo(centerX + 140 + glitchX, centerY + glitchY);
        ctx.moveTo(centerX + glitchX, centerY - 140 + glitchY);
        ctx.lineTo(centerX + glitchX, centerY + 140 + glitchY);
        ctx.stroke();

        // Geometric Initial Logo "S" curve
        ctx.strokeStyle = "rgba(168, 85, 247, 0.75)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(centerX + glitchX, centerY - 22 + glitchY, 32, Math.PI * 1.25, Math.PI * 0.25);
        ctx.arc(centerX + glitchX, centerY + 22 + glitchY, 32, Math.PI * 0.25, Math.PI * 1.25, true);
        ctx.stroke();

        // Bezier Handles
        const anchors = [
          { x: centerX, y: centerY - 54 },
          { x: centerX + 32, y: centerY - 22 },
          { x: centerX - 32, y: centerY + 22 },
          { x: centerX, y: centerY + 54 }
        ];

        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "rgba(168, 85, 247, 1)";
        ctx.lineWidth = 1;
        anchors.forEach((pt) => {
          const px = pt.x + glitchX;
          const py = pt.y + glitchY;
          ctx.fillRect(px - 3, py - 3, 6, 6);
          ctx.strokeRect(px - 3, py - 3, 6, 6);

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.cos(time * 0.04) * 18, py + Math.sin(time * 0.04) * 8);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(px + Math.cos(time * 0.04) * 18, py + Math.sin(time * 0.04) * 8, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        ctx.font = "bold 9px monospace";
        ctx.fillText("MODE_02: LOGO_BRANDING_IDENTITY", centerX - 180, centerY - 100);
        ctx.fillText(`BEZIER_MATH: R=${Math.floor(pulseRad)}px`, centerX - 180, centerY + 110);
      }
      // Mode 2: POSTER GRAPHIC DESIGN LAYERS
      else if (currentMode === 2) {
        const pWidth = Math.min(200, width * 0.45);
        const pHeight = Math.min(270, height * 0.65);
        const rx = centerX - pWidth / 2 + glitchX;
        const ry = centerY - pHeight / 2 + glitchY;

        // Grid alignment bounds
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.strokeRect(rx - 8, ry - 8, pWidth + 16, pHeight + 16);

        // Poster border
        ctx.strokeStyle = "rgba(168, 85, 247, 0.5)";
        ctx.lineWidth = 2;
        ctx.strokeRect(rx, ry, pWidth, pHeight);

        // Rule of thirds grids
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.beginPath();
        for (let i = 1; i <= 2; i++) {
          ctx.moveTo(rx + (pWidth / 3) * i, ry);
          ctx.lineTo(rx + (pWidth / 3) * i, ry + pHeight);
          ctx.moveTo(rx, ry + (pHeight / 3) * i);
          ctx.lineTo(rx + pWidth, ry + (pHeight / 3) * i);
        }
        ctx.stroke();

        // Shape/Layer 1 (Parallax float)
        const floatY = Math.sin(time * 0.035) * 12;
        const floatX = Math.cos(time * 0.03) * 8;

        ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
        ctx.strokeRect(rx + 15 + floatX, ry + 30 + floatY, pWidth - 30, pHeight * 0.42);
        ctx.beginPath();
        ctx.moveTo(rx + 15 + floatX, ry + 30 + floatY);
        ctx.lineTo(rx + pWidth - 15 + floatX, ry + 30 + pHeight * 0.42 + floatY);
        ctx.stroke();

        // Typography box layer
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.strokeRect(rx + 25 - floatX * 0.4, ry + pHeight * 0.55 - floatY * 0.4, pWidth - 50, 36);

        ctx.strokeStyle = "rgba(168, 85, 247, 0.7)";
        ctx.beginPath();
        ctx.moveTo(rx + 35 - floatX * 0.4, ry + pHeight * 0.55 + 18 - floatY * 0.4);
        ctx.lineTo(rx + pWidth - 35 - floatX * 0.4, ry + pHeight * 0.55 + 18 - floatY * 0.4);
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        ctx.font = "bold 9px monospace";
        ctx.fillText("MODE_03: POSTER_GRAPHIC_DESIGN", rx, ry - 22);
        ctx.fillText("CANVAS_RATIO: 3:4", rx, ry + pHeight + 18);
        ctx.fillText("LAYERS: 03", rx + pWidth - 75, ry + pHeight + 18);
      }
      // Mode 3: AI ADS PLAYBACK TIMELINE
      else if (currentMode === 3) {
        ctx.strokeStyle = "rgba(168, 85, 247, 0.5)";
        ctx.lineWidth = 2;

        const pWidth = 130;
        const pHeight = 240;
        const rx = centerX - pWidth / 2 + glitchX;
        const ry = centerY - pHeight / 2 - 10 + glitchY;

        // Phone container
        ctx.strokeRect(rx, ry, pWidth, pHeight);

        // Dynamic Island
        ctx.fillStyle = "rgba(168, 85, 247, 0.3)";
        ctx.fillRect(rx + pWidth / 2 - 20, ry + 5, 40, 8);

        // Mock Play button
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.beginPath();
        ctx.moveTo(centerX - 8 + glitchX, centerY - 8 - 10 + glitchY);
        ctx.lineTo(centerX + 12 + glitchX, centerY - 10 + glitchY);
        ctx.lineTo(centerX - 8 + glitchX, centerY + 8 - 10 + glitchY);
        ctx.closePath();
        ctx.stroke();

        // Play progress bar
        const barX = rx + 12;
        const barY = ry + pHeight - 35;
        const barW = pWidth - 24;
        ctx.strokeRect(barX, barY, barW, 4);

        const knobX = barX + ((time * 0.4) % barW);
        ctx.fillStyle = "rgba(168, 85, 247, 1)";
        ctx.beginPath();
        ctx.arc(knobX, barY + 2, 4, 0, Math.PI * 2);
        ctx.fill();

        // Audio waveforms below phone
        ctx.strokeStyle = "rgba(168, 85, 247, 0.45)";
        ctx.lineWidth = 1.5;
        const waveY = centerY + 130 + glitchY;
        const waveW = 280;
        ctx.beginPath();
        for (let i = 0; i < waveW; i += 6) {
          const amp = Math.sin(i * 0.06 + time * 0.12) * 12 * Math.sin(i * 0.012 + time * 0.015);
          ctx.moveTo(centerX - waveW / 2 + i + glitchX, waveY - amp);
          ctx.lineTo(centerX - waveW / 2 + i + glitchX, waveY + amp);
        }
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        ctx.font = "bold 9px monospace";
        ctx.fillText("MODE_04: AI_ADS_PRODUCTION", centerX - 160, centerY - 140);
        ctx.fillText("RENDERING MOTION VECTORS...", centerX - 160, centerY - 126);
      }

      ctx.shadowBlur = 0;
      animFrame = requestAnimationFrame(drawShowreelMock);
    };

    drawShowreelMock();

    return () => cancelAnimationFrame(animFrame);
  }, [isPlayingReel]);

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#c084fc", "#ffffff"]
    });

    // Reset after 4 seconds
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
    }, 4000);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Particles Canvas */}
      <HeroCanvas />

      {/* ============================================================== */}
      {/* SECTION 1 — HERO EXPERIENCE */}
      {/* ============================================================== */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 overflow-hidden">
        <div className="max-w-7xl w-full text-center relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-heading font-bold text-studioGray-200">
              Creative Studio for the AI Era
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-heading font-extrabold text-5xl md:text-8xl lg:text-[10rem] tracking-tight leading-none mb-6 text-glow select-none"
          >
            SELORA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl text-lg md:text-xl text-studioGray-300 mb-12 font-light leading-relaxed"
          >
            We combine world-class design, motion, and generative AI production to build digital-first brands beyond templates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/work"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-heading font-bold rounded-full tracking-wider hover:bg-accent hover:text-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-white/5"
            >
              View Work <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 glass-button text-white font-heading font-bold rounded-full tracking-wider flex items-center justify-center gap-2"
            >
              Start a Project <ArrowUpRight className="w-4 h-4 text-accent" />
            </Link>
          </motion.div>

          {/* Scroll Indicator (Middle Right Floating) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-30 hidden sm:flex flex-col items-center gap-6 cursor-pointer group"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <span className="text-[10px] uppercase tracking-widest font-heading font-extrabold text-white/50 group-hover:text-accent transition-colors duration-300 select-none rotate-90 origin-center whitespace-nowrap mb-6 translate-y-[-10px]">
              Scroll Down
            </span>
            <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden mt-4">
              <motion.div
                animate={{ y: [-16, 64, -16] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-4 bg-accent"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Seamless transition gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </section>


      {/* ============================================================== */}
      {/* SECTION 2 — SHOWREEL */}
      {/* ============================================================== */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-black to-studioGray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
              Cinematic Showreel
            </h2>
            <p className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
              Watch Our Studio in Action
            </p>
          </div>

          {/* Interactive Service Action Blueprint Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
              {[
                { id: 0, label: "Website Dev" },
                { id: 1, label: "Logo Bezier Grid" },
                { id: 2, label: "Poster Design" },
                { id: 3, label: "AI Ads Production" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setShowreelMode(tab.id)}
                  className={`px-5 py-2.5 rounded-full font-heading text-[10px] sm:text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    showreelMode === tab.id
                      ? "bg-accent text-black font-extrabold"
                      : "text-studioGray-300 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-2xl border border-white/10 overflow-hidden shadow-2xl group max-w-5xl mx-auto bg-black">
            <canvas ref={showreelCanvasRef} className="absolute inset-0 w-full h-full object-cover" />
            
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Simulated overlay details when playing */}
            {isPlayingReel && (
              <div className="absolute inset-x-6 top-6 flex justify-between items-start text-xs font-heading font-bold text-white/50 pointer-events-none">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  STUDIO_REEL_2026.RAW
                </span>
                <span>REC 4K HDR 60fps</span>
              </div>
            )}

            {/* Click to play overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlayingReel(!isPlayingReel)}
                className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-black hover:scale-110 transition-all duration-500 clickable shadow-xl shadow-black/40"
                aria-label={isPlayingReel ? "Pause Showreel" : "Play Showreel"}
              >
                {isPlayingReel ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current translate-x-0.5" />}
              </button>
            </div>

            <div className="absolute bottom-6 left-6 text-left pointer-events-none z-20">
              <p className="font-heading text-xs uppercase tracking-widest font-bold text-accent mb-1">
                {showreelMode === 0 && "Website Making (Next.js)"}
                {showreelMode === 1 && "Logo Making (Bezier Curve)"}
                {showreelMode === 2 && "Poster Making (Composition)"}
                {showreelMode === 3 && "AI Ads Making (Timeline)"}
              </p>
              <h3 className="font-heading text-lg font-extrabold text-white">
                {isPlayingReel ? "Simulating active workbench vectors..." : "Vector blueprint visualization"}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3 — ABOUT THE STUDIO */}
      {/* ============================================================== */}
      <section ref={statsSectionRef} className="py-24 px-6 relative bg-studioGray-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-4">
              About Selora
            </h2>
            <h3 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              We help brands create premium visual experiences.
            </h3>
            <p className="text-studioGray-300 text-lg leading-relaxed mb-8 font-light">
              Selora Creatives stands at the intersection of design, technology, and AI-powered production workflows. We build hyper-focused digital products and video advertising assets that deliver agency-grade performance without traditional high-production cost-stretches.
            </p>
            <div className="flex">
              <Link href="/about" className="glass-button px-6 py-3.5 rounded-full font-heading text-sm font-bold flex items-center gap-2 text-white">
                Read Our Full Story <ArrowUpRight className="w-4 h-4 text-accent" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-center">
              <span className="font-heading text-4xl md:text-5xl font-extrabold text-accent mb-2">
                {stats.projects}+
              </span>
              <span className="text-xs uppercase tracking-wider font-heading font-bold text-studioGray-400">
                Projects Shipped
              </span>
            </div>
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-center">
              <span className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-2">
                {stats.assets.toLocaleString()}+
              </span>
              <span className="text-xs uppercase tracking-wider font-heading font-bold text-studioGray-400">
                Creative Assets
              </span>
            </div>
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-center">
              <span className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-2">
                {stats.industries}+
              </span>
              <span className="text-xs uppercase tracking-wider font-heading font-bold text-studioGray-400">
                Industries Served
              </span>
            </div>
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-center">
              <span className="font-heading text-4xl md:text-5xl font-extrabold text-accent mb-2">
                {stats.hours.toLocaleString()}h+
              </span>
              <span className="text-xs uppercase tracking-wider font-heading font-bold text-studioGray-400">
                Hours Saved via AI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4 — SERVICES */}
      {/* ============================================================== */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-studioGray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
              Capabilities
            </h2>
            <p className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
              Our Core Creative Services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <Link
                key={service.id}
                href={service.id === "namewise" ? "http://localhost:5173" : `/services`}
                target={service.id === "namewise" ? "_blank" : undefined}
                rel={service.id === "namewise" ? "noopener noreferrer" : undefined}
                className="glass-card p-8 rounded-2xl flex flex-col justify-between group cursor-pointer relative overflow-hidden block"
              >
                {/* Glow overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl group-hover:bg-accent/15 transition-all duration-500 rounded-full" />
                
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                    {service.id === "ai-ads" && <Tv className="w-5 h-5" />}
                    {service.id === "web-design" && <Smartphone className="w-5 h-5" />}
                    {service.id === "poster-design" && <Sparkles className="w-5 h-5" />}
                    {service.id === "logo-design" && <Layers className="w-5 h-5" />}
                    {service.id === "namewise" && <Clock className="w-5 h-5" />}
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-studioGray-400 text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs">
                  <span className="text-studioGray-500">Duration: {service.duration}</span>
                  <span className="text-accent group-hover:translate-x-1.5 transition-transform duration-300 font-bold uppercase tracking-wider flex items-center gap-1">
                    {service.id === "namewise" ? "Launch Platform" : "Explore"} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5 — FEATURED WORK */}
      {/* ============================================================== */}
      <section className="py-24 px-6 relative bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
                Selected Projects
              </h2>
              <p className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
                Featured Case Studies
              </p>
            </div>
            <Link
              href="/work"
              className="glass-button px-6 py-3 rounded-full font-heading text-sm font-bold flex items-center gap-2 text-white"
            >
              Browse All Work <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projectsData.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onClick={() => setActiveVideoUrl(project.videoUrl || null)}
                className="group relative aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 bg-studioGray-950 cursor-pointer shadow-2xl hover:border-accent/40 hover:shadow-accent/5 transition-all duration-500"
              >
                {/* Image Cover Preview */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500 brightness-75 z-10"
                />
                
                {/* Inline Hover Video */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black">
                  <video
                    src={project.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 pointer-events-none z-20" />

                {/* Floating UI Elements */}
                <div className="absolute inset-x-6 bottom-6 z-30 flex flex-col justify-end text-left transition-transform duration-500 group-hover:translate-y-[-8px]">
                  <span className="text-[10px] uppercase tracking-widest font-heading font-extrabold text-accent mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-studioGray-300 text-xs font-light leading-relaxed mb-4 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {project.tagline}
                  </p>
                  
                  {/* Small clean metric badges inside card */}
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    {project.metrics.slice(0, 2).map((metric, mi) => (
                      <div key={mi} className="flex flex-col">
                        <span className="font-heading text-sm font-extrabold text-white">
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
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6 — AI AD SHOWCASE */}
      {/* ============================================================== */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-black to-studioGray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
              AI Ads Showcase
            </h2>
            <p className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
              Generative Commercials & UGC
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/5 border border-white/10 p-1.5 rounded-full">
              {[
                { id: "ugc", label: "UGC Ads" },
                { id: "hypermotion", label: "Hypermotion Ads" },
                { id: "unboxing", label: "Unboxing Ads" },
                { id: "tryon", label: "Try-on Ads" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdCategory(tab.id)}
                  className={`px-6 py-2.5 rounded-full font-heading text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    activeAdCategory === tab.id
                      ? "bg-accent text-black font-extrabold"
                      : "text-studioGray-300 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Media Showcase display grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            {/* Left: Device Mockup */}
            <div className="flex justify-center">
              {activeAdCategory === "ugc" || activeAdCategory === "unboxing" ? (
                // Vertical smartphone format
                <div className="relative w-[280px] h-[560px] rounded-[40px] border-[6px] border-studioGray-800 bg-black overflow-hidden shadow-2xl ring-1 ring-white/15">
                  {/* Phone Speaker/Camera notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-studioGray-800 z-30 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black/40 ml-auto mr-1.5" />
                  </div>
                  
                  {/* Video Element (lazy-loaded when tab is active) */}
                  <video
                    key={activeAdCategory}
                    src={activeAdCategory === "ugc" ? "/videos/perfume ad.mp4" : "/videos/Cosmetic serum beauty ad.mp4"}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none z-10" />

                  {/* HUD Info */}
                  <div className="absolute bottom-6 inset-x-5 z-20 text-left pointer-events-none">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 flex items-center justify-center font-heading font-extrabold text-[10px] text-accent">
                        {activeAdCategory === "ugc" ? "MD" : "VS"}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white drop-shadow-md">
                          {activeAdCategory === "ugc" ? "Miss Dior Perfume" : "Velora Skin Lab"}
                        </p>
                        <p className="text-[9px] text-accent font-bold drop-shadow-md">
                          {activeAdCategory === "ugc" ? "UGC Campaign" : "Unboxing + Demo"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-studioGray-200 line-clamp-2 leading-relaxed drop-shadow-md">
                      {activeAdCategory === "ugc"
                        ? "Miss Dior Eau de Parfum. Discover your signature scent. Luxury review."
                        : "Velora Skin Radiance Repair Serum. Vitamin C + Peptides. Brightens • Hydrates • Smooths."}
                    </p>
                  </div>
                </div>
              ) : activeAdCategory === "hypermotion" ? (
                // Laptop Mockup showing Vertical Video in the center
                <div className="flex flex-col items-center justify-center w-full max-w-[480px] px-4">
                  {/* Laptop Screen */}
                  <div className="relative w-full aspect-[16/10] bg-[#07060b] border-[4px] border-studioGray-800 rounded-t-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex">
                    {/* Left Workbench Panel: Physics Parameters */}
                    <div className="w-[28%] border-r border-white/5 bg-black/40 p-3 flex flex-col justify-between text-left font-mono text-[7px] md:text-[8px] text-studioGray-400 select-none">
                      <div className="flex flex-col gap-2">
                        <p className="text-accent font-bold border-b border-white/5 pb-1 uppercase tracking-wider">PHYSICS SIM</p>
                        <div>
                          <p>DENSITY: <span className="text-white">1.18 g/cm³</span></p>
                          <div className="w-full bg-white/10 h-1 rounded overflow-hidden mt-0.5"><div className="bg-accent h-full w-[80%]" /></div>
                        </div>
                        <div>
                          <p>GRAVITY: <span className="text-white">-9.81 m/s²</span></p>
                          <div className="w-full bg-white/10 h-1 rounded overflow-hidden mt-0.5"><div className="bg-accent h-full w-[98%]" /></div>
                        </div>
                        <div>
                          <p>VISCOSITY: <span className="text-white">0.082 Pa·s</span></p>
                          <div className="w-full bg-white/10 h-1 rounded overflow-hidden mt-0.5"><div className="bg-accent h-full w-[45%]" /></div>
                        </div>
                      </div>
                      <div className="border-t border-white/5 pt-1 text-[6px]">
                        <p className="text-accent animate-pulse font-bold">PHYS_ACTIVE</p>
                        <p className="line-clamp-1">COLLISION_MESH: OK</p>
                      </div>
                    </div>

                    {/* Center Screen: Vertical Video */}
                    <div className="flex-1 bg-black relative border-r border-white/5 flex items-center justify-center">
                      <video
                        key={activeAdCategory}
                        src="/videos/coffee ad.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-auto max-h-full object-contain mx-auto"
                      />
                      {/* Ambient screen reflection vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10 pointer-events-none z-10" />
                    </div>

                    {/* Right Workbench Panel: Render Settings */}
                    <div className="w-[28%] bg-black/40 p-3 flex flex-col justify-between text-left font-mono text-[7px] md:text-[8px] text-studioGray-400 select-none">
                      <div className="flex flex-col gap-2">
                        <p className="text-accent font-bold border-b border-white/5 pb-1 uppercase tracking-wider">RENDER HUB</p>
                        <p>FORMAT: <span className="text-white">9:16 Vertical</span></p>
                        <p>CODEC: <span className="text-white">H.264 HEVC</span></p>
                        <p>BITRATE: <span className="text-white">45 Mbps</span></p>
                        <p>RESOLUTION: <span className="text-white">4K UHD</span></p>
                      </div>
                      <div className="border-t border-white/5 pt-1 text-[6px]">
                        <p>QUEUE: <span className="text-accent">RENDERING</span></p>
                        <p>PROGRESS: <span className="text-white">100%</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Laptop Base */}
                  <div className="relative w-[108%] h-3 bg-studioGray-800 rounded-b-2xl shadow-xl z-20 flex justify-center">
                    <div className="w-16 h-1 bg-studioGray-900 rounded-b-md absolute top-0" />
                  </div>
                </div>
              ) : (
                // Try-on AR Scanner representation (Interactive wireframe grid layout)
                <div className="relative w-[280px] h-[560px] rounded-[40px] border-[6px] border-studioGray-800 bg-[#07060a] overflow-hidden shadow-2xl ring-1 ring-white/15 flex flex-col items-center justify-center p-6 text-center">
                  {/* Phone Speaker/Camera notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-studioGray-800 z-30 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black/40 ml-auto mr-1.5" />
                  </div>
                  
                  {/* Scanning UI Grid overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(168,85,247,0.15)_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                  {/* Scanning laser line animation */}
                  <motion.div
                    animate={{ y: [0, 560, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent z-20 shadow-[0_0_10px_#a855f7]"
                  />

                  {/* Tech scan HUD graphics */}
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    {/* Target scanning circle */}
                    <div className="relative w-36 h-36 rounded-full border border-dashed border-accent/40 flex items-center justify-center animate-spin-slow mb-4">
                      <div className="w-28 h-28 rounded-full border border-accent/20 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center border border-accent">
                          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                        </div>
                      </div>
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
                    </div>

                    <span className="text-[10px] text-accent font-bold uppercase tracking-widest animate-pulse">
                      AR Tracking Active
                    </span>
                    <h4 className="font-heading text-lg font-extrabold text-white">
                      Virtual AR Try-On
                    </h4>
                    <p className="text-[11px] text-studioGray-400 max-w-[200px] leading-relaxed">
                      Fitting room camera simulation. Tracking facial keypoints, eyewear, and apparel coords.
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-left w-full max-w-[180px] border-t border-white/10 pt-4 font-mono text-[8px] text-studioGray-400">
                      <div>FPS: <span className="text-white">60.0</span></div>
                      <div>LATENCY: <span className="text-white">8ms</span></div>
                      <div>POINTS: <span className="text-white">468 (3D)</span></div>
                      <div>FIT RATE: <span className="text-accent">99.8%</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Copywriting / details */}
            <div className="flex flex-col justify-center">
              <h3 className="font-heading text-2xl md:text-3xl font-extrabold mb-4">
                {activeAdCategory === "ugc" && "High-Converting UGC Perfume Ads"}
                {activeAdCategory === "hypermotion" && "Hypermotion Product Commercials"}
                {activeAdCategory === "unboxing" && "Skincare Unboxings & Product Demos"}
                {activeAdCategory === "tryon" && "Interactive Virtual AR Try-On campaigns"}
              </h3>
              <p className="text-studioGray-400 text-base leading-relaxed mb-6 font-light">
                {activeAdCategory === "ugc" && "Establish instant trust. We script organic, platform-native reviews, cast fitting creators, and render your luxury product into the video with photorealistic precision, just like our Miss Dior campaign."}
                {activeAdCategory === "hypermotion" && "Advanced camera paths and gravity simulations. Our Aroma Café commercial renders physical coffee beans and splash dynamics in 4K resolution at a fraction of traditional robotics cost."}
                {activeAdCategory === "unboxing" && "Visually demonstrate textures, ingredients, and application. The Velora Skin Radiance Repair showcase displays luxury packaging, pipettes, and fluid absorption detail. Perfect for beauty and skincare."}
                {activeAdCategory === "tryon" && "Enable customers to try on apparel, designer glasses, jewelry, or makeup right from their mobile browser. Custom WebGL face & body filters that boost customer confidence."}
              </p>

              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-sm text-studioGray-300">
                  <Check className="w-4 h-4 text-accent" />
                  <span>
                    {activeAdCategory === "ugc" && "Authentic, casual lifestyle lighting & review structure"}
                    {activeAdCategory === "hypermotion" && "Cinema-grade fluid, splash, and collision physics"}
                    {activeAdCategory === "unboxing" && "Macro zoom levels showcasing viscosity & absorption details"}
                    {activeAdCategory === "tryon" && "Dynamic 3D geometry alignment with 468 facial landmark mesh"}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm text-studioGray-300">
                  <Check className="w-4 h-4 text-accent" />
                  <span>
                    {activeAdCategory === "ugc" && "Perfect hooks for TikTok, Instagram Reels, & Shorts"}
                    {activeAdCategory === "hypermotion" && "90% cheaper than high-end physical robotics setups"}
                    {activeAdCategory === "unboxing" && "Increases checkout intent by clarifying physical attributes"}
                    {activeAdCategory === "tryon" && "Fully responsive browser-based experience (no app download)"}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm text-studioGray-300">
                  <Check className="w-4 h-4 text-accent" />
                  <span>
                    {activeAdCategory === "ugc" && "3.4x higher Click-Through-Rates than traditional ads"}
                    {activeAdCategory === "hypermotion" && "High-impact visual retention for social campaigns"}
                    {activeAdCategory === "unboxing" && "Establishes product transparency and high trust metrics"}
                    {activeAdCategory === "tryon" && "Lowers e-commerce return rates by an average of 35%"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7 — CREATIVE PROCESS */}
      {/* ============================================================== */}
      <section className="py-24 px-6 relative bg-studioGray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
              How We Work
            </h2>
            <p className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
              Our Modern Production Flow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We deep dive into your product specs, audience demographics, and core brand tone assets." },
              { step: "02", title: "Strategy", desc: "We map out visual narratives, scripting concepts, and creative media placements." },
              { step: "03", title: "Creative Direction", desc: "We pitch custom styleframes, 3D geometry references, and color boards." },
              { step: "04", title: "AI Production", desc: "We render assets using our high-fidelity custom video and graphics diffusion pipelines." },
              { step: "05", title: "Review", desc: "We iterate based on your feedback with speed, polishing textures and transitions." },
              { step: "06", title: "Launch", desc: "We deliver full-res cinematic exports and deploy custom web/code applications." }
            ].map((proc, index) => (
              <div 
                key={proc.step}
                className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300"
              >
                <span className="font-heading text-6xl font-extrabold text-white/5 absolute right-4 top-2 select-none group-hover:text-accent/10 transition-colors">
                  {proc.step}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent mb-6 block" />
                <h3 className="font-heading text-xl font-bold mb-3">{proc.title}</h3>
                <p className="text-studioGray-400 text-sm leading-relaxed font-light">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 8 — TESTIMONIALS */}
      {/* ============================================================== */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-studioGray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
              Client Reviews
            </h2>
            <p className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
              Trusted by Innovators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((test) => (
              <div key={test.id} className="glass-card p-8 rounded-2xl flex flex-col justify-between relative">
                <p className="text-studioGray-300 text-sm italic leading-relaxed mb-8">
                  "{test.content}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="font-heading text-sm font-bold text-white">{test.name}</h4>
                    <p className="text-[10px] uppercase tracking-wider text-accent font-bold">
                      {test.role}, {test.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 9 — PRICING */}
      {/* ============================================================== */}
      <section className="py-24 px-6 relative bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
              Investment Tiers
            </h2>
            <p className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Transparent Project Pricing
            </p>
          </div>

          {/* Currency Region Selector */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
              {(["USD", "INR", "CAD"] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-5 py-2.5 rounded-full font-heading text-xs font-extrabold tracking-wider transition-all duration-300 ${
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`glass-card p-8 rounded-2xl flex flex-col justify-between relative ${
                  plan.popular ? "border-accent/40 shadow-xl shadow-accent/5" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-black font-heading text-[10px] uppercase font-extrabold px-3 py-1 rounded-full">
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
                  
                  <ul className="flex flex-col gap-3 mb-8 border-t border-white/5 pt-6">
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
                  className={`w-full text-center py-3 rounded-full font-heading text-xs font-bold transition-all duration-300 ${
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
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 10 — FAQ */}
      {/* ============================================================== */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-black to-studioGray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
              FAQ
            </h2>
            <p className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
              Got Questions?
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqData.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="glass-card rounded-xl overflow-hidden border border-white/5"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 transition-colors hover:bg-white/5"
                  >
                    <span className="font-heading text-base md:text-lg font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 pt-0 text-studioGray-400 text-sm leading-relaxed border-t border-white/5 font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 11 — CONTACT EXPERIENCE */}
      {/* ============================================================== */}
      <section className="py-24 px-6 relative bg-black overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
              Start Project
            </h2>
            <p className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Let's Build Something Remarkable
            </p>
            <p className="text-studioGray-400 text-sm font-light">
              Submit your project details and we will get back to you with custom concept drafts in 24 hours.
            </p>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-3xl">
            {formSubmitted ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent mb-6 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3">Intake Form Submitted!</h3>
                <p className="text-studioGray-400 text-sm max-w-md leading-relaxed">
                  Thank you, <span className="text-accent font-bold">{formData.name}</span>. Our design director is reviewing your project details. We will email you at <span className="text-white font-bold">{formData.email}</span> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="Company or Brand name"
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
                  <label className="text-xs uppercase font-bold tracking-wider text-studioGray-400 mb-2 block font-heading">Project Budget</label>
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
                  <label className="text-xs uppercase font-bold tracking-wider text-studioGray-400 mb-2 block font-heading">Your Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your brand challenge, campaign, or what you would like to design..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none transition-colors"
                  />
                </div>

                <div className="md:col-span-2 mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-black font-heading font-extrabold tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Submit Intake Brief <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Fullscreen Portrait Video Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveVideoUrl(null)} />
          <div className="relative w-full max-w-sm bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-10 flex flex-col">
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-accent border border-white/10 flex items-center justify-center text-white hover:text-black transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="aspect-[9/16] w-full max-h-[82vh] relative">
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
