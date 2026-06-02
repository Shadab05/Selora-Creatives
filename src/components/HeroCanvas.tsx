"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = Math.min(120, Math.floor((width * height) / 12000));

    // Create particles in virtual 3D space (z ranging from 1 to 1000)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 1000 + 10,
        px: 0,
        py: 0,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        color: i % 5 === 0 ? "rgba(168, 85, 247, 0.4)" : "rgba(255, 255, 255, 0.15)",
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      mouse.current.targetX = (e.clientX - width / 2) / (width / 2);
      mouse.current.targetY = (e.clientY - height / 2) / (height / 2);
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Easing variables for mouse
    let mouseX = 0;
    let mouseY = 0;

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Smoothly interpolate mouse positioning
      mouseX += (mouse.current.targetX - mouseX) * 0.08;
      mouseY += (mouse.current.targetY - mouseY) * 0.08;

      // Draw subtle background ambient glow center
      const radialGlow = ctx.createRadialGradient(
        width / 2 + mouseX * 100,
        height / 2 + mouseY * 100 - scrollY.current * 0.3,
        50,
        width / 2 + mouseX * 100,
        height / 2 + mouseY * 100 - scrollY.current * 0.3,
        width * 0.4
      );
      radialGlow.addColorStop(0, "rgba(88, 28, 135, 0.08)");
      radialGlow.addColorStop(0.5, "rgba(168, 85, 247, 0.02)");
      radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      const fov = 400; // Projection factor

      // Update and draw particles
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Apply slight orbital drift based on mouse
        p.x += mouseX * 0.15;
        p.y += mouseY * 0.15;

        // Wrap around boundaries
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;

        // Decrease depth to create forward movement
        p.z -= 0.5;
        if (p.z <= 0) {
          p.z = 1000;
          p.x = Math.random() * width - width / 2;
          p.y = Math.random() * height - height / 2;
        }

        // Projection calculation
        const scale = fov / (fov + p.z);
        const projX = p.x * scale + width / 2;
        const projY = p.y * scale + height / 2 - scrollY.current * 0.25;

        p.px = projX;
        p.py = projY;

        // Draw particle if inside visible screen boundaries
        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          // Calculate dynamic alpha multiplier to fade out near bottom (prevent horizontal clipping line)
          let alphaMultiplier = 1;
          const fadeStart = height * 0.94;
          const fadeEnd = height * 0.99;
          if (projY > fadeStart) {
            alphaMultiplier = Math.max(0, 1 - (projY - fadeStart) / (fadeEnd - fadeStart));
          }
          if (projY < height * 0.1) {
            alphaMultiplier = Math.min(alphaMultiplier, Math.max(0, projY / (height * 0.1)));
          }

          ctx.beginPath();
          ctx.arc(projX, projY, p.radius * scale * 2, 0, Math.PI * 2);
          
          // Apply dynamic alpha multiplier to maintain smooth transitions
          const baseAlpha = p.color.includes("168") ? 0.4 : 0.15;
          ctx.fillStyle = p.color.includes("168")
            ? `rgba(168, 85, 247, ${baseAlpha * alphaMultiplier})`
            : `rgba(255, 255, 255, ${baseAlpha * alphaMultiplier})`;

          ctx.fill();
        }
      });

      // Draw connection lines between close particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if particles are close on 2D project grid
          if (dist < 90) {
            const avgY = (p1.py + p2.py) / 2;
            let lineAlphaMultiplier = 1;
            const fadeStart = height * 0.94;
            const fadeEnd = height * 0.99;
            if (avgY > fadeStart) {
              lineAlphaMultiplier = Math.max(0, 1 - (avgY - fadeStart) / (fadeEnd - fadeStart));
            }
            if (avgY < height * 0.1) {
              lineAlphaMultiplier = Math.min(lineAlphaMultiplier, Math.max(0, avgY / (height * 0.1)));
            }

            const alpha = (1 - dist / 90) * 0.08 * (fov / (fov + p1.z)) * lineAlphaMultiplier;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-black"
    />
  );
}
