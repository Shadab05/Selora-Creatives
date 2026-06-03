"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/ai-ads", label: "AI Ads" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile navigation drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full transition-all duration-500 z-50 ${
          isScrolled
            ? "glass-navbar py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-heading font-extrabold text-2xl tracking-widest text-white group-hover:text-accent transition-colors duration-300">
            SELORA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-heading text-sm font-semibold tracking-wider transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-studioGray-300 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent rounded-full text-glow" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="glass-button px-5 py-2.5 rounded-full font-heading text-sm font-bold flex items-center gap-1.5 text-white"
          >
            Start a Project <ArrowUpRight className="w-4 h-4 text-accent" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-accent transition-colors duration-300 relative z-50"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>

    {/* Mobile Menu Panel outside header to bypass transition containing block context */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 w-screen h-screen bg-black/98 backdrop-blur-xl z-40 flex flex-col px-8 pt-28 pb-12 md:hidden overflow-y-auto"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    className={`font-heading text-2xl font-bold tracking-wider py-2 border-b border-white/5 block ${
                      isActive ? "text-accent" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.04, duration: 0.3 }}
            >
              <Link
                href="/contact"
                className="mt-6 w-full text-center py-4 bg-accent hover:bg-accent-hover text-black font-heading font-extrabold tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start a Project <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
