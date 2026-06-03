"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const footerCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = footerCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 200;
    let height = 200;
    let animFrame: number;
    let time = 0;

    // Interactive mouse rotation tracking
    let rotX = 0.35;
    let rotY = 0.45;
    let targetRotX = 0.35;
    let targetRotY = 0.45;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = mx * 1.5;
      targetRotX = my * 1.5;
    };

    const handleMouseLeave = () => {
      targetRotX = 0.35;
      targetRotY = 0.45;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

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
      const fov = 200;
      let pt = rotateY(x, y, z, rotY + 0.785);
      pt = rotateX(pt.x, pt.y, pt.z, rotX + 0.615);

      const scale = (fov / (fov + pt.z + 100)) * 2.2;
      return {
        x: pt.x * scale + width / 2,
        y: pt.y * scale + height / 2,
        scale: scale,
        visible: pt.z + 100 > 10,
        z: pt.z
      };
    };

    // Particles system
    interface ExplodingParticle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }
    let particles: ExplodingParticle[] = [];
    let clickPulse = 0;
    interface Ripple {
      radius: number;
      maxRadius: number;
      opacity: number;
    }
    let ripples: Ripple[] = [];

    const handleCanvasClick = () => {
      clickPulse = 20;
      ripples.push({ radius: 10, maxRadius: 80, opacity: 1.0 });

      const particleColors = ["#a855f7", "#f472b6", "#ffffff", "#e9d5ff", "#c084fc"];
      // Explode from current center
      for (let i = 0; i < 35; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const speed = 1.2 + Math.random() * 2.8;

        particles.push({
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6,
          z: (Math.random() - 0.5) * 6,
          vx: Math.sin(phi) * Math.cos(theta) * speed,
          vy: Math.sin(phi) * Math.sin(theta) * speed,
          vz: Math.cos(phi) * speed,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          size: 1.2 + Math.random() * 2.0
        });
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth || 200;
      height = canvas.clientHeight || 200;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const drawGenerativeCore = (time: number, centerY: number) => {
      clickPulse *= 0.93;

      const latSteps = 8;
      const lonSteps = 16;
      const vertices: { px: number; py: number; pz: number; visible: boolean; scale: number }[][] = [];
      const R0 = 24; // Base core radius

      for (let i = 0; i <= latSteps; i++) {
        const phi = (i / latSteps) * Math.PI - Math.PI / 2; // -pi/2 to pi/2
        vertices[i] = [];
        for (let j = 0; j <= lonSteps; j++) {
          const theta = (j / lonSteps) * Math.PI * 2; // 0 to 2pi

          // Generative noise wobbly wave simulation
          const wobble = 4.0 * Math.sin(2.0 * theta + time * 0.045) * Math.cos(2.0 * phi + time * 0.035)
                       + 1.8 * Math.cos(4.0 * theta - time * 0.06);

          const r = R0 + wobble + clickPulse * 0.35;

          const cx = r * Math.cos(phi) * Math.sin(theta);
          const cy = r * Math.sin(phi);
          const cz = r * Math.cos(phi) * Math.cos(theta);

          const pt = project(cx, cy + centerY, cz);
          vertices[i].push({
            px: pt.x,
            py: pt.y,
            pz: pt.z,
            visible: pt.visible,
            scale: pt.scale
          });
        }
      }

      // Separate wireframe segments into Back (pz > 0) and Front (pz <= 0) for depth layering
      interface WireSegment {
        p1: { px: number; py: number; pz: number; visible: boolean };
        p2: { px: number; py: number; pz: number; visible: boolean };
      }
      const backSegments: WireSegment[] = [];
      const frontSegments: WireSegment[] = [];

      for (let i = 0; i <= latSteps; i++) {
        for (let j = 0; j < lonSteps; j++) {
          const p1 = vertices[i][j];
          const p2 = vertices[i][j + 1];
          const isBackLon = (p1.pz + p2.pz) / 2 > 0;
          const segLon = { p1, p2 };

          if (isBackLon) backSegments.push(segLon);
          else frontSegments.push(segLon);

          if (i < latSteps) {
            const p3 = vertices[i + 1][j];
            const isBackLat = (p1.pz + p3.pz) / 2 > 0;
            const segLat = { p1, p2: p3 };

            if (isBackLat) backSegments.push(segLat);
            else frontSegments.push(segLat);
          }
        }
      }

      // Draw Back Wireframe (behind the core)
      ctx.lineWidth = 0.55;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.09)";
      ctx.beginPath();
      backSegments.forEach(seg => {
        if (seg.p1.visible && seg.p2.visible) {
          ctx.moveTo(seg.p1.px, seg.p1.py);
          ctx.lineTo(seg.p2.px, seg.p2.py);
        }
      });
      ctx.stroke();

      // Draw Orbiting Rings (Viewfinder focus circles)
      const drawOrbitRing = (radius: number, angleOffset: number, tilt: number, opacity: number) => {
        const ringPoints: { x: number; y: number; z: number; pz: number }[] = [];
        const ringSteps = 36;
        for (let k = 0; k <= ringSteps; k++) {
          const angle = (k / ringSteps) * Math.PI * 2 + time * 0.012 + angleOffset;
          const rx = radius * Math.cos(angle);
          const ry = radius * Math.sin(angle) * Math.sin(tilt);
          const rz = radius * Math.sin(angle) * Math.cos(tilt);

          const pt = project(rx, ry + centerY, rz);
          ringPoints.push({ x: pt.x, y: pt.y, z: pt.z, pz: pt.z });
        }

        ctx.lineWidth = 0.85;
        for (let k = 0; k < ringSteps; k++) {
          const pt1 = ringPoints[k];
          const pt2 = ringPoints[k + 1];
          const isBack = (pt1.pz + pt2.pz) / 2 > 0;
          ctx.strokeStyle = isBack 
            ? `rgba(168, 85, 247, ${opacity * 0.12})`
            : `rgba(244, 114, 182, ${opacity * 0.65})`;
          
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        }
      };

      drawOrbitRing(42, 0, 0.45, 0.7);
      drawOrbitRing(50, Math.PI / 2, -0.6, 0.55);

      // Draw Central Specular Core Disc
      const ptCore = project(0, centerY, 0);
      if (ptCore.visible) {
        const baseCoreR = 14 + 1.8 * Math.sin(time * 0.04) + clickPulse * 0.25;
        const coreR = baseCoreR * ptCore.scale;

        ctx.beginPath();
        ctx.arc(ptCore.x, ptCore.y, coreR, 0, Math.PI * 2);

        const grad = ctx.createRadialGradient(
          ptCore.x - coreR * 0.35, ptCore.y - coreR * 0.35, coreR * 0.05,
          ptCore.x, ptCore.y, coreR
        );
        grad.addColorStop(0, "#ffffff"); // specular shine
        grad.addColorStop(0.2, "#f472b6"); // pink center highlight
        grad.addColorStop(0.65, "#a855f7"); // brand purple core
        grad.addColorStop(1, "#3b0764"); // deep shadow boundary

        ctx.fillStyle = grad;
        ctx.fill();

        // Core soft glowing ring outline
        ctx.shadowBlur = 16;
        ctx.shadowColor = "rgba(168, 85, 247, 0.45)";
        ctx.strokeStyle = "rgba(244, 114, 182, 0.2)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      }

      // Draw Front Wireframe segments
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.42)";
      ctx.beginPath();
      frontSegments.forEach(seg => {
        if (seg.p1.visible && seg.p2.visible) {
          ctx.moveTo(seg.p1.px, seg.p1.py);
          ctx.lineTo(seg.p2.px, seg.p2.py);
        }
      });
      ctx.stroke();

      // Draw glowing dots at front intersections
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i <= latSteps; i++) {
        for (let j = 0; j < lonSteps; j++) {
          const pt = vertices[i][j];
          if (pt.visible && pt.pz <= 0) {
            const dotSize = 0.85 * pt.scale;
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const drawFooterCanvas = () => {
      ctx.clearRect(0, 0, width, height);

      time += 1.0;

      // Smooth cursor track
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const logoY = Math.sin(time * 0.035) * 3;

      // Draw wobbly wireframe orb & orbit rings
      drawGenerativeCore(time, logoY);

      // Draw & Update particles
      particles = particles.filter(p => {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vz *= 0.96;

        const pt = project(p.x, p.y + logoY, p.z);
        if (pt.visible) {
          const progress = p.life / p.maxLife;
          const alpha = Math.max(0, 1 - progress);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * pt.scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0; // reset
        }

        return p.life < p.maxLife;
      });

      // Draw & Update ripples (3D shockwaves on X-Z plane)
      ripples = ripples.filter(r => {
        r.radius += 2.2;
        r.opacity = Math.max(0, 1 - r.radius / r.maxRadius);

        ctx.strokeStyle = `rgba(244, 114, 182, ${r.opacity * 0.45})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        
        const rippleSteps = 36;
        for (let k = 0; k <= rippleSteps; k++) {
          const theta = (k / rippleSteps) * Math.PI * 2;
          const rx = r.radius * Math.cos(theta);
          const rz = r.radius * Math.sin(theta);
          const pt = project(rx, logoY, rz);
          if (pt.visible) {
            if (k === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
        return r.radius < r.maxRadius;
      });

      animFrame = requestAnimationFrame(drawFooterCanvas);
    };

    drawFooterCanvas();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleCanvasClick);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to HH:MM:SS AM/PM explicitly for Bhopal timezone
      const formatted = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      });
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-studioGray-950 border-t border-white/5 pt-20 pb-10 z-20 overflow-hidden">
      {/* Glow orb */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Intro */}
          <div className="md:col-span-2">
            <h2 className="font-heading font-extrabold text-4xl tracking-widest text-white mb-4">
              SELORA<span className="text-accent font-light">.</span>
            </h2>
            <p className="text-studioGray-400 text-base max-w-sm mb-6 leading-relaxed">
              We engineer world-class visual assets and digital interfaces for future-focused companies in the AI age.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/seloracreatives/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-studioGray-300 hover:text-accent hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://www.instagram.com/seloracreatives/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-studioGray-300 hover:text-accent hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a
                href="https://www.instagram.com/seloracreatives/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-studioGray-300 hover:text-accent hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a
                href="https://www.instagram.com/seloracreatives/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-studioGray-300 hover:text-accent hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-white mb-6">
              Studio Routes
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/work" className="text-studioGray-400 hover:text-accent transition-colors duration-300 text-sm">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-studioGray-400 hover:text-accent transition-colors duration-300 text-sm">
                  Agency Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-studioGray-400 hover:text-accent transition-colors duration-300 text-sm">
                  Our Manifesto
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-studioGray-400 hover:text-accent transition-colors duration-300 text-sm">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-studioGray-400 hover:text-accent transition-colors duration-300 text-sm">
                  Creative Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Interactive Logo (Border/Label Removed) */}
          <div className="flex items-center justify-center md:justify-start">
            <canvas ref={footerCanvasRef} className="w-[200px] h-[200px] block cursor-pointer select-none" />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs text-studioGray-500">
            <span>© {new Date().getFullYear()} Selora Creatives. All rights reserved.</span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              HQ Time: {localTime || "00:00:00 AM"}
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-studioGray-400 hover:text-white transition-colors duration-300"
          >
            Back to Top
            <span className="p-2 rounded-full bg-white/5 group-hover:bg-accent group-hover:text-black transition-all duration-300">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
