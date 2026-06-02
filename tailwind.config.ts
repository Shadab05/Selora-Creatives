import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        cardBg: "rgba(10, 10, 14, 0.7)",
        cardBorder: "rgba(255, 255, 255, 0.06)",
        accent: {
          DEFAULT: "#a855f7", // Electric Purple
          glow: "rgba(168, 85, 247, 0.15)",
          hover: "#c084fc",
          light: "#e9d5ff",
          dark: "#7e22ce"
        },
        studioGray: {
          50: "#f9f9fb",
          100: "#f1f1f4",
          200: "#e2e2e9",
          300: "#c7c7d4",
          400: "#a3a3bc",
          500: "#7f7f9e",
          600: "#60607d",
          700: "#444459",
          800: "#22222a",
          900: "#0b0b0f",
          950: "#050507",
        }
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "glow": "glow 8s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.4" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        }
      },
    },
  },
  plugins: [],
};
export default config;
