"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";

export default function Footer() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to HH:MM:SS AM/PM
      const formatted = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-studioGray-300 hover:text-accent hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-studioGray-300 hover:text-accent hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-studioGray-300 hover:text-accent hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a
                href="https://youtube.com"
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

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-white mb-6">
              Stay Creative
            </h3>
            <p className="text-studioGray-400 text-sm mb-4">
              Get our monthly design assets and advertising trends briefing.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-accent hover:bg-accent-hover text-black rounded font-bold text-xs transition-colors flex items-center justify-center"
              >
                <Mail className="w-3.5 h-3.5" />
              </button>
            </form>
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
