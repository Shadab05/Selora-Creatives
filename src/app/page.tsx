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
  pricingServices,
  pricingPackages,
  pricingPlans, 
  faqData 
} from "@/data/mockData";
import confetti from "canvas-confetti";

export default function HomePage() {
  // Counter state for stats animation
  const [stats, setStats] = useState({ projects: 0, assets: 0, industries: 0, hours: 0 });
  const statsSectionRef = useRef<HTMLDivElement>(null);

  // Showreel playback state
  const [isPlayingReel, setIsPlayingReel] = useState(true);
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
  
  // FAQ active state
  const [activeFaq, setActiveFaq] = useState<number>(0);

  // Currency select state
  const [currency, setCurrency] = useState<"USD" | "INR" | "CAD">("USD");

  // Pricing Type (Services vs Packages) Tab State
  const [pricingType, setPricingType] = useState<"services" | "packages">("services");

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
      if (planId === "service-logo") return "₹3,999";
      if (planId === "service-poster") return "₹3,499";
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

  const getBudgetOptions = () => {
    if (currency === "INR") {
      return ["Under ₹10,000", "₹10,000 - ₹25,000", "₹25,000 - ₹60,000", "₹60,000+"];
    }
    if (currency === "CAD") {
      return ["Under C$300", "C$300 - C$750", "C$750 - C$2,000", "C$2,000+"];
    }
    return ["Under $200", "$200 - $500", "$500 - $1,500", "$1,500+"];
  };

  // Contact form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    projectType: "ai-ads",
    budget: "Under $200",
    message: ""
  });

  // Sync budget option default on currency switch
  useEffect(() => {
    setFormData((prev) => ({ ...prev, budget: getBudgetOptions()[1] }));
  }, [currency]);

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

    let width = 0;
    let height = 0;
    let animFrame: number;
    let time = 0;
    
    let currentMode = 0;
    let transitionGlitch = 0;

    // Interactive mouse rotation tracking
    let rotX = 0.35;
    let rotY = 0.45;
    let targetRotX = 0.35;
    let targetRotY = 0.45;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = mx * 1.2;
      targetRotX = my * 1.2;
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth || 800;
      height = canvas.clientHeight || 550;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const dpr = window.devicePixelRatio || 1;
        width = entry.contentRect.width || canvas.clientWidth || 800;
        height = entry.contentRect.height || canvas.clientHeight || 550;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
    });
    resizeObserver.observe(canvas);

    // 3D Matrix Rotations
    const rotateX = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x, y: y * cos - z * sin, z: y * sin + z * cos };
    };

    const rotateY = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: x * cos + z * sin, y, z: -x * sin + z * cos };
    };

    const project = (x: number, y: number, z: number) => {
      const fov = 480;
      let pt = rotateY(x, y, z, rotY + 0.785); // Isometric Y angle ~45 deg
      pt = rotateX(pt.x, pt.y, pt.z, rotX + 0.615); // Isometric X angle ~35.26 deg
      
      const scale = (fov / (fov + pt.z + 100)) * 2.4; // 2.4x scale multiplier for larger isometric rendering
      return {
        x: pt.x * scale + width / 2,
        y: pt.y * scale + height / 2 - 70, // Centered and raised to prevent bottom-edge cutoff
        scale: scale,
        visible: pt.z + 100 > 10
      };
    };

    // Helper: Draw 3D Isometric Box
    const drawIsoBox = (x: number, y: number, z: number, w: number, h: number, d: number, strokeColor: string, fillColor: string, drawGrid = false) => {
      const verts = [
        { x: x - w/2, y: y - h/2, z: z - d/2 }, // 0
        { x: x + w/2, y: y - h/2, z: z - d/2 }, // 1
        { x: x + w/2, y: y + h/2, z: z - d/2 }, // 2
        { x: x - w/2, y: y + h/2, z: z - d/2 }, // 3
        { x: x - w/2, y: y - h/2, z: z + d/2 }, // 4
        { x: x + w/2, y: y - h/2, z: z + d/2 }, // 5
        { x: x + w/2, y: y + h/2, z: z + d/2 }, // 6
        { x: x - w/2, y: y + h/2, z: z + d/2 }  // 7
      ];

      const pts = verts.map(v => project(v.x + glitchX, v.y + glitchY, v.z));

      const drawFace = (indices: number[], fill: string, stroke: string) => {
        if (indices.some(i => !pts[i].visible)) return;
        ctx.beginPath();
        ctx.moveTo(pts[indices[0]].x, pts[indices[0]].y);
        for (let i = 1; i < indices.length; i++) {
          ctx.lineTo(pts[indices[i]].x, pts[indices[i]].y);
        }
        ctx.closePath();
        if (fill) {
          ctx.fillStyle = fill;
          ctx.fill();
        }
        if (stroke) {
          ctx.strokeStyle = stroke;
          ctx.stroke();
        }
      };

      // Draw sides to form solid shape
      drawFace([0, 1, 2, 3], fillColor, strokeColor); // front
      drawFace([4, 5, 6, 7], fillColor, strokeColor); // back
      drawFace([0, 3, 7, 4], fillColor, strokeColor); // left
      drawFace([1, 2, 6, 5], fillColor, strokeColor); // right
      drawFace([0, 1, 5, 4], fillColor, strokeColor); // top
      drawFace([3, 2, 6, 7], fillColor, strokeColor); // bottom

      // Top surface grid
      if (drawGrid) {
        ctx.strokeStyle = "rgba(168, 85, 247, 0.15)";
        ctx.lineWidth = 0.8;
        const gridLines = 6;
        for (let i = 1; i < gridLines; i++) {
          const ratio = i / gridLines;
          const pX1 = project(verts[0].x + (verts[4].x - verts[0].x) * ratio + glitchX, verts[0].y + glitchY, verts[0].z + (verts[4].z - verts[0].z) * ratio);
          const pX2 = project(verts[1].x + (verts[5].x - verts[1].x) * ratio + glitchX, verts[1].y + glitchY, verts[1].z + (verts[5].z - verts[1].z) * ratio);
          if (pX1.visible && pX2.visible) {
            ctx.beginPath();
            ctx.moveTo(pX1.x, pX1.y);
            ctx.lineTo(pX2.x, pX2.y);
            ctx.stroke();
          }

          const pZ1 = project(verts[0].x + (verts[1].x - verts[0].x) * ratio + glitchX, verts[0].y + glitchY, verts[0].z + (verts[1].z - verts[0].z) * ratio);
          const pZ2 = project(verts[4].x + (verts[5].x - verts[4].x) * ratio + glitchX, verts[4].y + glitchY, verts[4].z + (verts[5].z - verts[4].z) * ratio);
          if (pZ1.visible && pZ2.visible) {
            ctx.beginPath();
            ctx.moveTo(pZ1.x, pZ1.y);
            ctx.lineTo(pZ2.x, pZ2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Helper: Draw text cube
    const drawFloatingTextCube = (x: number, y: number, z: number, size: number, text: string, color: string) => {
      drawIsoBox(x, y, z, size, size, size, "rgba(168, 85, 247, 0.5)", "rgba(168, 85, 247, 0.15)");
      
      const pt = project(x + glitchX, y + glitchY, z);
      if (pt.visible) {
        ctx.fillStyle = color || "#ffffff";
        ctx.font = `bold ${Math.max(8, Math.floor(10 * pt.scale / 2.4))}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, pt.x, pt.y);
      }
    };

    let glitchX = 0;
    let glitchY = 0;

    const drawShowreelMock = () => {
      // Clear canvas transparently
      ctx.clearRect(0, 0, width, height);

      time += isPlayingReel ? 1.0 : 0.25;

      // Sync React mode
      if (currentMode !== showreelModeRef.current) {
        currentMode = showreelModeRef.current;
        transitionGlitch = 12;
      }

      // Smooth cursor track
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      // Apply glitch offsets
      glitchX = 0;
      glitchY = 0;
      if (transitionGlitch > 0) {
        transitionGlitch--;
        if (Math.random() > 0.4) {
          glitchX = (Math.random() - 0.5) * 16;
          glitchY = (Math.random() - 0.5) * 6;
        }
      }

      // Bobbing Workbench Platform Y position
      const platformY = 50 + Math.sin(time * 0.02) * 8;

      // Draw active workbench platform
      drawIsoBox(0, platformY, 0, 260, 12, 180, "rgba(168, 85, 247, 0.55)", "rgba(15, 12, 35, 0.3)", true);

      // Add a slight glowing center shadow
      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(168, 85, 247, 0.5)";

      // MODE 0: WEBSITE DEV WORKSPACE
      if (currentMode === 0) {
        // Laptop base plate
        drawIsoBox(0, platformY - 9, 10, 110, 6, 80, "rgba(168, 85, 247, 0.6)", "rgba(20, 15, 30, 0.5)");

        // Slanted Screen frame
        const screenW = 95;
        const scrBL = project(-screenW/2, platformY - 12, -25);
        const scrBR = project(screenW/2, platformY - 12, -25);
        const scrTR = project(screenW/2, platformY - 67, -42);
        const scrTL = project(-screenW/2, platformY - 67, -42);

        if (scrBL.visible && scrBR.visible && scrTR.visible && scrTL.visible) {
          ctx.beginPath();
          ctx.moveTo(scrBL.x, scrBL.y);
          ctx.lineTo(scrBR.x, scrBR.y);
          ctx.lineTo(scrTR.x, scrTR.y);
          ctx.lineTo(scrTL.x, scrTL.y);
          ctx.closePath();
          ctx.fillStyle = "rgba(12, 8, 20, 0.6)";
          ctx.fill();
          ctx.strokeStyle = "rgba(168, 85, 247, 0.75)";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Code lines rendering on the screen face
          ctx.lineWidth = 1.5;
          const lineCount = 8;
          for (let i = 0; i < lineCount; i++) {
            const ratioY = 0.15 + (i / lineCount) * 0.7;
            const codeWidth = (screenW - 16) * (0.35 + 0.5 * Math.sin(i * 1.9 + time * 0.05));
            
            const ptL = project(-screenW/2 + 8, platformY - 12 + (-55) * ratioY, -25 + (-17) * ratioY);
            const ptR = project(-screenW/2 + 8 + Math.max(10, codeWidth), platformY - 12 + (-55) * ratioY, -25 + (-17) * ratioY);

            if (ptL.visible && ptR.visible) {
              ctx.beginPath();
              ctx.moveTo(ptL.x, ptL.y);
              ctx.lineTo(ptR.x, ptR.y);
              ctx.strokeStyle = i % 3 === 0 ? "rgba(168, 85, 247, 0.85)" : (i % 3 === 1 ? "rgba(255, 255, 255, 0.75)" : "rgba(192, 132, 252, 0.6)");
              ctx.stroke();
            }
          }
        }

        // Orbiting language cubes
        const orbitAngle = time * 0.015;
        const items = [
          { text: "JS", color: "#f7df1e", offset: 0 },
          { text: "TS", color: "#3178c6", offset: Math.PI / 2 },
          { text: "CSS", color: "#38bdf8", offset: Math.PI },
          { text: "JSX", color: "#61dafb", offset: 1.5 * Math.PI }
        ];

        items.forEach((item, index) => {
          const theta = orbitAngle + item.offset;
          const ox = Math.cos(theta) * 90;
          const oz = Math.sin(theta) * 90;
          const oy = platformY - 30 + Math.sin(time * 0.04 + index) * 12;

          drawFloatingTextCube(ox, oy, oz, 24, item.text, item.color);

          // Connection network lines
          const startPt = project(0, platformY - 30, -10);
          const endPt = project(ox, oy, oz);
          if (startPt.visible && endPt.visible) {
            ctx.beginPath();
            ctx.moveTo(startPt.x, startPt.y);
            ctx.lineTo(endPt.x, endPt.y);
            ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
            ctx.setLineDash([3, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }

      // MODE 1: AI ADS WORKSPACE (VERTICAL SCREEN & CAMERA DECK)
      else if (currentMode === 1) {
        // Vertical Smartphone base shell
        drawIsoBox(0, platformY - 48, 0, 52, 92, 8, "rgba(168, 85, 247, 0.6)", "rgba(20, 15, 30, 0.5)");

        // Inner vertical video face
        const phW = 44;
        const phBL = project(-phW/2, platformY - 6, -5);
        const phBR = project(phW/2, platformY - 6, -5);
        const phTR = project(phW/2, platformY - 90, -5);
        const phTL = project(-phW/2, platformY - 90, -5);

        if (phBL.visible && phBR.visible && phTR.visible && phTL.visible) {
          ctx.beginPath();
          ctx.moveTo(phBL.x, phBL.y);
          ctx.lineTo(phBR.x, phBR.y);
          ctx.lineTo(phTR.x, phTR.y);
          ctx.lineTo(phTL.x, phTL.y);
          ctx.closePath();
          ctx.fillStyle = "rgba(10, 5, 22, 0.6)";
          ctx.fill();
          ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
          ctx.stroke();

          // Play icon in the center
          const pCenter = project(0, platformY - 48, -6);
          if (pCenter.visible) {
            ctx.beginPath();
            const ps = 7;
            ctx.moveTo(pCenter.x - ps/2, pCenter.y - ps);
            ctx.lineTo(pCenter.x + ps, pCenter.y);
            ctx.lineTo(pCenter.x - ps/2, pCenter.y + ps);
            ctx.closePath();
            ctx.fillStyle = "rgba(168, 85, 247, 0.9)";
            ctx.fill();
          }

          // Sound wave bars at bottom
          ctx.strokeStyle = "rgba(168, 85, 247, 0.75)";
          ctx.lineWidth = 1.5;
          for (let i = 0; i < 5; i++) {
            const bx = -14 + i * 7;
            const bh = 10 + 15 * Math.sin(time * 0.08 + i) * Math.sin(time * 0.02);
            const p1 = project(bx, platformY - 14, -6);
            const p2 = project(bx, platformY - 14 - bh, -6);
            if (p1.visible && p2.visible) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Circular waves radiating outward on base
        ctx.strokeStyle = "rgba(168, 85, 247, 0.1)";
        ctx.lineWidth = 1;
        const ringCount = 3;
        for (let r = 0; r < ringCount; r++) {
          const scale = 1.2 + r * 0.5 + (time * 0.005) % 0.5;
          const rw = 52 * scale;
          const rd = 44 * scale;
          let prevRingPt = null;
          for (let i = 0; i <= 24; i++) {
            const theta = (i / 24) * Math.PI * 2;
            const pt = project(rw * Math.cos(theta), platformY, rd * Math.sin(theta));
            if (pt.visible) {
              if (prevRingPt) {
                ctx.beginPath();
                ctx.moveTo(prevRingPt.x, prevRingPt.y);
                ctx.lineTo(pt.x, pt.y);
                ctx.stroke();
              }
              prevRingPt = pt;
            }
          }
        }

        // Orbiting timeline tags
        const orbitAngle = time * 0.015;
        const items = [
          { text: "UGC", color: "#ffffff", offset: 0 },
          { text: "4K", color: "#c084fc", offset: Math.PI / 2 },
          { text: "REC", color: "#f87171", offset: Math.PI },
          { text: "PLAY", color: "#34d399", offset: 1.5 * Math.PI }
        ];

        items.forEach((item, index) => {
          const theta = orbitAngle + item.offset;
          const ox = Math.cos(theta) * 90;
          const oz = Math.sin(theta) * 90;
          const oy = platformY - 30 + Math.sin(time * 0.04 + index) * 12;

          drawFloatingTextCube(ox, oy, oz, 24, item.text, item.color);

          const startPt = project(0, platformY - 48, 0);
          const endPt = project(ox, oy, oz);
          if (startPt.visible && endPt.visible) {
            ctx.beginPath();
            ctx.moveTo(startPt.x, startPt.y);
            ctx.lineTo(endPt.x, endPt.y);
            ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
            ctx.setLineDash([3, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }

      // MODE 2: LOGO BEZIER GRID WORKSPACE
      else if (currentMode === 2) {
        // Flat drawing easel board
        drawIsoBox(0, platformY - 8, 10, 130, 4, 90, "rgba(168, 85, 247, 0.55)", "rgba(20, 15, 30, 0.5)");

        // Grid lines on the board
        ctx.strokeStyle = "rgba(168, 85, 247, 0.15)";
        ctx.lineWidth = 0.8;
        const boardY = platformY - 11;
        
        // Bezier curve vector drafting
        ctx.strokeStyle = "rgba(168, 85, 247, 0.8)";
        ctx.lineWidth = 2;
        let prevCurvePt = null;
        const steps = 30;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const x = -40 * Math.pow(1-t, 3) + 3 * (-15) * t * Math.pow(1-t, 2) + 3 * 15 * t*t * (1-t) + 40 * t*t*t;
          const z = -20 * Math.pow(1-t, 3) + 3 * 25 * t * Math.pow(1-t, 2) + 3 * (-25) * t*t * (1-t) + 20 * t*t*t;
          const pt = project(x, boardY, z);
          if (pt.visible) {
            if (prevCurvePt) {
              ctx.beginPath();
              ctx.moveTo(prevCurvePt.x, prevCurvePt.y);
              ctx.lineTo(pt.x, pt.y);
              ctx.stroke();
            }
            prevCurvePt = pt;
          }
        }

        // Draw handles on Bezier ends
        const controlPts = [
          { x: -40, z: -20 },
          { x: 40, z: 20 }
        ];
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "rgba(168, 85, 247, 1)";
        ctx.lineWidth = 1;
        controlPts.forEach(cp => {
          const pt = project(cp.x, boardY, cp.z);
          if (pt.visible) {
            const size = 5 * pt.scale;
            ctx.fillRect(pt.x - size/2, pt.y - size/2, size, size);
            ctx.strokeRect(pt.x - size/2, pt.y - size/2, size, size);
          }
        });

        // Rotating Wireframe octahedron above board
        const logoAngle = time * 0.02;
        const rawVerts = [
          { x: 0, y: -25, z: 0 },
          { x: 0, y: 25, z: 0 },
          { x: -25, y: 0, z: -25 },
          { x: 25, y: 0, z: -25 },
          { x: 25, y: 0, z: 25 },
          { x: -25, y: 0, z: 25 }
        ];
        const rotatedVerts = rawVerts.map(v => {
          const rot = rotateY(v.x, v.y, v.z, logoAngle);
          return { x: rot.x, y: rot.y + (platformY - 50), z: rot.z };
        });
        const logoPts = rotatedVerts.map(v => project(v.x, v.y, v.z));

        ctx.strokeStyle = "rgba(168, 85, 247, 0.85)";
        ctx.lineWidth = 1.5;
        const drawLogoEdge = (a: number, b: number) => {
          if (logoPts[a].visible && logoPts[b].visible) {
            ctx.beginPath();
            ctx.moveTo(logoPts[a].x, logoPts[a].y);
            ctx.lineTo(logoPts[b].x, logoPts[b].y);
            ctx.stroke();
          }
        };

        drawLogoEdge(0, 2); drawLogoEdge(0, 3); drawLogoEdge(0, 4); drawLogoEdge(0, 5);
        drawLogoEdge(1, 2); drawLogoEdge(1, 3); drawLogoEdge(1, 4); drawLogoEdge(1, 5);
        drawLogoEdge(2, 3); drawLogoEdge(3, 4); drawLogoEdge(4, 5); drawLogoEdge(5, 2);

        // Core glow dot
        const cPt = project(0, platformY - 50, 0);
        if (cPt.visible) {
          ctx.beginPath();
          ctx.arc(cPt.x, cPt.y, 4.5 * cPt.scale, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }

        // Orbiting logo cubes
        const orbitAngle = time * 0.015;
        const items = [
          { text: "GRID", color: "#c084fc", offset: 0 },
          { text: "NODE", color: "#ffffff", offset: Math.PI / 2 },
          { text: "SVG", color: "#fb923c", offset: Math.PI },
          { text: "PATH", color: "#60a5fa", offset: 1.5 * Math.PI }
        ];

        items.forEach((item, index) => {
          const theta = orbitAngle + item.offset;
          const ox = Math.cos(theta) * 90;
          const oz = Math.sin(theta) * 90;
          const oy = platformY - 35 + Math.sin(time * 0.04 + index) * 12;

          drawFloatingTextCube(ox, oy, oz, 24, item.text, item.color);

          const startPt = project(0, platformY - 50, 0);
          const endPt = project(ox, oy, oz);
          if (startPt.visible && endPt.visible) {
            ctx.beginPath();
            ctx.moveTo(startPt.x, startPt.y);
            ctx.lineTo(endPt.x, endPt.y);
            ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
            ctx.setLineDash([3, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }

      // MODE 3: POSTER COMPOSITION WORKSPACE
      else if (currentMode === 3) {
        // Exploded layered sheets
        const sheetW = 105;
        const sheetD = 135;
        
        // Draw layers (bottom, mid, top)
        drawIsoBox(0, platformY - 15, 0, sheetW, 2, sheetD, "rgba(168, 85, 247, 0.45)", "rgba(15, 10, 25, 0.25)");
        drawIsoBox(0, platformY - 45, 0, sheetW, 2, sheetD, "rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 0.02)");
        drawIsoBox(0, platformY - 75, 0, sheetW, 2, sheetD, "rgba(168, 85, 247, 0.65)", "rgba(168, 85, 247, 0.05)");

        // Details on Middle layer (Y = platformY - 45)
        let prevCirclePt = null;
        const midY = platformY - 46;
        for (let i = 0; i <= 24; i++) {
          const theta = (i / 24) * Math.PI * 2;
          const pt = project(32 * Math.cos(theta), midY, 32 * Math.sin(theta));
          if (pt.visible) {
            if (prevCirclePt) {
              ctx.beginPath();
              ctx.moveTo(prevCirclePt.x, prevCirclePt.y);
              ctx.lineTo(pt.x, pt.y);
              ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
              ctx.stroke();
            }
            prevCirclePt = pt;
          }
        }

        // Title header block on Top layer (Y = platformY - 75)
        drawIsoBox(0, platformY - 76, -42, 65, 1, 14, "rgba(255, 255, 255, 0.65)", "rgba(255, 255, 255, 0.1)");

        // Orbiting color swatches
        const orbitAngle = time * 0.015;
        const items = [
          { text: "#A855", color: "#c084fc", offset: 0 },
          { text: "#FFFF", color: "#ffffff", offset: Math.PI / 2 },
          { text: "#3B82", color: "#60a5fa", offset: Math.PI },
          { text: "#EF44", color: "#f87171", offset: 1.5 * Math.PI }
        ];

        items.forEach((item, index) => {
          const theta = orbitAngle + item.offset;
          const ox = Math.cos(theta) * 90;
          const oz = Math.sin(theta) * 90;
          const oy = platformY - 30 + Math.sin(time * 0.04 + index) * 12;

          drawFloatingTextCube(ox, oy, oz, 24, item.text, item.color);

          const startPt = project(0, platformY - 45, 0);
          const endPt = project(ox, oy, oz);
          if (startPt.visible && endPt.visible) {
            ctx.beginPath();
            ctx.moveTo(startPt.x, startPt.y);
            ctx.lineTo(endPt.x, endPt.y);
            ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
            ctx.setLineDash([3, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }

      ctx.shadowBlur = 0;
      animFrame = requestAnimationFrame(drawShowreelMock);
    };

    drawShowreelMock();

    return () => {
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animFrame);
    };
  }, [isPlayingReel]);
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
        projectType: "ai-ads",
        budget: getBudgetOptions()[1],
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
      <section className="py-24 px-6 relative bg-gradient-to-b from-black to-studioGray-950 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
              Watch Our Studio in Action
            </h2>
            <p className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
              Creative Engineering Blueprint
            </p>
          </div>

          {/* Interactive Service Action Blueprint Tabs */}
          <div className="flex justify-center mb-10 z-20">
            <div className="inline-flex bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-md">
              {[
                { id: 0, label: "Website Dev" },
                { id: 1, label: "AI Ads" },
                { id: 2, label: "Logo Design" },
                { id: 3, label: "Poster Design" }
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

          {/* Clean borderless floating 3D canvas container */}
          <div className="relative w-full max-w-4xl h-[550px] flex items-center justify-center">
            <canvas ref={showreelCanvasRef} className="w-full h-full block opacity-100 z-10" />
            
            {/* Background glowing ambient light orbs under the canvas */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[80px] pointer-events-none z-0" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
                { id: "luxury", label: "TV Spot Ads" }
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
              {activeAdCategory === "ugc" || activeAdCategory === "unboxing" || activeAdCategory === "luxury" ? (
                // Vertical smartphone format
                <div className="relative w-[280px] h-[560px] rounded-[40px] border-[6px] border-studioGray-800 bg-black overflow-hidden shadow-2xl ring-1 ring-white/15">
                  {/* Phone Speaker/Camera notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-studioGray-800 z-30 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black/40 ml-auto mr-1.5" />
                  </div>
                  
                  {/* Video Element (lazy-loaded when tab is active) */}
                  <video
                    key={activeAdCategory}
                    src={
                      activeAdCategory === "ugc" 
                        ? "/videos/perfume ad.mp4" 
                        : activeAdCategory === "unboxing"
                        ? "/videos/Cosmetic serum beauty ad.mp4"
                        : "/videos/Luxury bag ad.mp4"
                    }
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
                        {activeAdCategory === "ugc" ? "MD" : activeAdCategory === "unboxing" ? "VS" : "MA"}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white drop-shadow-md">
                          {activeAdCategory === "ugc" ? "Miss Dior Perfume" : activeAdCategory === "unboxing" ? "Velora Skin Lab" : "Maison Aurelle Luna Bag"}
                        </p>
                        <p className="text-[9px] text-accent font-bold drop-shadow-md">
                          {activeAdCategory === "ugc" ? "UGC Campaign" : activeAdCategory === "unboxing" ? "Unboxing + Demo" : "Luxury Fashion + Hypermotion"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-studioGray-200 line-clamp-2 leading-relaxed drop-shadow-md">
                      {activeAdCategory === "ugc"
                        ? "Miss Dior Eau de Parfum. Discover your signature scent. Luxury review."
                        : activeAdCategory === "unboxing"
                        ? "Velora Skin Radiance Repair Serum. Vitamin C + Peptides. Brightens • Hydrates • Smooths."
                        : "MAISON AURELLE LUNA BAG. Italian Leather • Handcrafted Luxury. High-fidelity product visuals."}
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
              ) : null}
            </div>

            {/* Right: Copywriting / details */}
            <div className="flex flex-col justify-center">
              <h3 className="font-heading text-2xl md:text-3xl font-extrabold mb-4">
                {activeAdCategory === "ugc" && "High-Converting UGC Perfume Ads"}
                {activeAdCategory === "hypermotion" && "Hypermotion Product Commercials"}
                {activeAdCategory === "unboxing" && "Skincare Unboxings & Product Demos"}
                {activeAdCategory === "luxury" && "Maison Aurelle: TV Spot Commercial"}
              </h3>
              <p className="text-studioGray-400 text-base leading-relaxed mb-6 font-light">
                {activeAdCategory === "ugc" && "Establish instant trust. We script organic, platform-native reviews, cast fitting creators, and render your luxury product into the video with photorealistic precision, just like our Miss Dior campaign."}
                {activeAdCategory === "hypermotion" && "Advanced camera paths and gravity simulations. Our Aroma Café commercial renders physical coffee beans and splash dynamics in 4K resolution at a fraction of traditional robotics cost."}
                {activeAdCategory === "unboxing" && "Visually demonstrate textures, ingredients, and application. The Velora Skin Radiance Repair showcase displays luxury packaging, pipettes, and fluid absorption detail. Perfect for beauty and skincare."}
                {activeAdCategory === "luxury" && "Maison Aurelle Luna Bag. We composite the handcrafted luxury, Italian leather textures, and stitch details of the Luna Bag with physics-based sunlight reflections and fluid hypermotion paths."}
              </p>

              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-sm text-studioGray-300">
                  <Check className="w-4 h-4 text-accent" />
                  <span>
                    {activeAdCategory === "ugc" && "Authentic, casual lifestyle lighting & review structure"}
                    {activeAdCategory === "hypermotion" && "Cinema-grade fluid, splash, and collision physics"}
                    {activeAdCategory === "unboxing" && "Macro zoom levels showcasing viscosity & absorption details"}
                    {activeAdCategory === "luxury" && "Studio lighting and environment reflections mapping"}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm text-studioGray-300">
                  <Check className="w-4 h-4 text-accent" />
                  <span>
                    {activeAdCategory === "ugc" && "Perfect hooks for TikTok, Instagram Reels, & Shorts"}
                    {activeAdCategory === "hypermotion" && "90% cheaper than high-end physical robotics setups"}
                    {activeAdCategory === "unboxing" && "Increases checkout intent by clarifying physical attributes"}
                    {activeAdCategory === "luxury" && "Advanced material physics representing grain and stitch detail"}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm text-studioGray-300">
                  <Check className="w-4 h-4 text-accent" />
                  <span>
                    {activeAdCategory === "ugc" && "3.4x higher Click-Through-Rates than traditional ads"}
                    {activeAdCategory === "hypermotion" && "High-impact visual retention for social campaigns"}
                    {activeAdCategory === "unboxing" && "Establishes product transparency and high trust metrics"}
                    {activeAdCategory === "luxury" && "Premium content format tailored for high-fashion audiences"}
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

          {/* Selectors Bar */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            {/* Currency Region Selector */}
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

          <div className={`grid grid-cols-1 md:grid-cols-2 ${pricingType === "services" ? "lg:grid-cols-4" : "lg:grid-cols-3 max-w-5xl mx-auto"} gap-8`}>
            {(pricingType === "services" ? pricingServices : pricingPackages).map((plan) => (
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
              FAQ
            </h2>
            <p className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
              Got Questions?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Technical Questions List */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {faqData.map((faq, index) => {
                const isActive = activeFaq === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveFaq(index)}
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      isActive
                        ? "bg-white/5 border-accent text-white shadow-lg shadow-accent/5"
                        : "bg-white/[0.02] border-white/5 text-studioGray-400 hover:border-white/20 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className={`font-mono text-xs font-bold shrink-0 ${isActive ? "text-accent" : "text-studioGray-500"}`}>
                      [ Q_0{index + 1} ]
                    </span>
                    <span className="font-heading text-sm font-bold flex-1 leading-snug">
                      {faq.question}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Diagnostic Answer Terminal */}
            <div className="lg:col-span-7 flex">
              <div className="w-full glass-card rounded-2xl border border-white/10 bg-[#07060b] flex flex-col overflow-hidden relative shadow-2xl min-h-[300px]">
                {/* Tech scan HUD grid background */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(168,85,247,0.06)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Terminal Header */}
                <div className="border-b border-white/10 px-5 py-3.5 bg-black/40 flex items-center justify-between z-10 select-none font-mono text-[10px] text-studioGray-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent/30 animate-pulse" />
                    <span>SYS_ANSWER_SOLVER.EXE</span>
                  </div>
                  <div className="flex gap-4">
                    <span>SECURE_CONN: OK</span>
                    <span className="text-accent animate-pulse font-bold">STATUS: 200</span>
                  </div>
                </div>

                {/* Terminal Content Screen */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFaq}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex-1 flex flex-col justify-start"
                    >
                      {/* Diagnostic logs */}
                      <div className="font-mono text-[9px] text-accent mb-6 flex flex-col gap-0.5 select-none leading-none opacity-60">
                        <span>&gt; INITIALIZING ENCRYPTED PACKET HANDSHAKE...</span>
                        <span>&gt; DATABASE QUERY SUCCESSFUL [BLOCK_ID: 94A2]</span>
                        <span>&gt; STREAMING RAW STRING BUFFER:</span>
                      </div>

                      {/* Answer content */}
                      <p className="text-studioGray-200 text-sm md:text-base leading-relaxed font-light mb-8">
                        {faqData[activeFaq]?.answer}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Terminal Footer details */}
                  <div className="border-t border-white/5 pt-6 mt-8 flex flex-wrap justify-between items-center gap-4 font-mono text-[9px] text-studioGray-500 select-none">
                    <div className="flex items-center gap-4">
                      <div>ENCODING: <span className="text-white">UTF-8</span></div>
                      <div>LATENCY: <span className="text-accent">4ms</span></div>
                    </div>
                    <div>COORDS: <span className="text-white">[FAQ_DB_{activeFaq + 1}]</span></div>
                  </div>
                </div>
              </div>
            </div>
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
