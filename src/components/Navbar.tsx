"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, VolumeX } from "lucide-react";
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

  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hasPlayedRef = useRef(false);

  // Load local intro audio and WebSpeech voices into refs
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio("/audio/intro.mp3");
    audio.onplay = () => setIsVoicePlaying(true);
    audio.onended = () => setIsVoicePlaying(false);
    audio.onpause = () => setIsVoicePlaying(false);
    audioRef.current = audio;

    if (window.speechSynthesis) {
      // Pre-load voices list
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
      }
    }

    return () => {
      audio.pause();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakWithSynth = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const text = "Welcome to Selora. We engineer world-class visual assets and digital interfaces for future-focused brands. Discover our creative campaigns and launch your next high-converting production.";
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    const voices = window.speechSynthesis.getVoices();
    const targetVoices = [
      "Google US English",
      "Microsoft Zira",
      "Samantha",
      "Hazel",
      "Victoria",
      "Google UK English Female",
      "en-US-SMTLocal",
      "female"
    ];

    let chosenVoice = null;
    for (const name of targetVoices) {
      chosenVoice = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
      if (chosenVoice) break;
    }
    if (!chosenVoice) {
      chosenVoice = voices.find(v => v.name.toLowerCase().includes("female"));
    }
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.pitch = 1.05;
    utterance.rate = 0.90;
    utterance.onstart = () => setIsVoicePlaying(true);
    utterance.onend = () => setIsVoicePlaying(false);
    utterance.onerror = () => setIsVoicePlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  // Always reads from refs — no stale closure issue
  const playVoiceIntroRef = useRef(() => {});
  playVoiceIntroRef.current = () => {
    if (typeof window === "undefined") return;
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play()
        .then(() => setIsVoicePlaying(true))
        .catch(() => speakWithSynth());
    } else {
      speakWithSynth();
    }
  };

  const stopVoice = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsVoicePlaying(false);
  };

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVoicePlaying) {
      stopVoice();
      localStorage.setItem("selora_voice_muted", "true");
    } else {
      localStorage.removeItem("selora_voice_muted");
      playVoiceIntroRef.current();
    }
  };

  // Autoplay on first interaction every page load — empty [] so it attaches fresh on every mount/reload
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleFirstInteraction = () => {
      const isMuted = localStorage.getItem("selora_voice_muted");
      if (!isMuted && !hasPlayedRef.current) {
        hasPlayedRef.current = true;
        playVoiceIntroRef.current();
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => cleanupListeners();
  }, []);


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

        {/* Desktop CTA & Voice Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleToggleVoice}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-heading font-extrabold uppercase tracking-wider transition-all duration-300 ${
              isVoicePlaying
                ? "bg-accent/10 border-accent/40 text-accent hover:bg-accent/15"
                : "bg-white/5 border-white/10 text-studioGray-300 hover:text-white hover:border-white/20"
            }`}
            aria-label="Toggle Voice Intro"
          >
            {isVoicePlaying ? (
              <>
                <div className="flex gap-0.5 items-end h-3 w-4">
                  <span className="w-[2px] bg-accent rounded-full animate-soundwave-1" />
                  <span className="w-[2px] bg-accent rounded-full animate-soundwave-2" />
                  <span className="w-[2px] bg-accent rounded-full animate-soundwave-3" />
                  <span className="w-[2px] bg-accent rounded-full animate-soundwave-4" />
                </div>
                <span>Playing Intro</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-studioGray-450" />
                <span>Voice Intro</span>
              </>
            )}
          </button>

          <Link
            href="/contact"
            className="glass-button px-5 py-2.5 rounded-full font-heading text-sm font-bold flex items-center gap-1.5 text-white"
          >
            Start a Project <ArrowUpRight className="w-4 h-4 text-accent" />
          </Link>
        </div>

        {/* Mobile controls: Voice Toggle & Hamburger Menu */}
        <div className="flex md:hidden items-center gap-3 relative z-50">
          <button
            onClick={handleToggleVoice}
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${
              isVoicePlaying
                ? "bg-accent/15 border-accent text-accent"
                : "bg-white/5 border-white/10 text-studioGray-300"
            }`}
            aria-label="Toggle Voice Intro"
          >
            {isVoicePlaying ? (
              <div className="flex gap-0.5 items-end h-2.5 w-3">
                <span className="w-[1.5px] bg-accent rounded-full animate-soundwave-1" />
                <span className="w-[1.5px] bg-accent rounded-full animate-soundwave-2" />
                <span className="w-[1.5px] bg-accent rounded-full animate-soundwave-3" />
              </div>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-accent transition-colors duration-350"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
