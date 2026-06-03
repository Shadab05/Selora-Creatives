export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  videoUrl?: string;
  aspect?: "9:16" | "16:9";
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  features: string[];
  deliverables: string[];
  duration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billing: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  content: string;
  author: { name: string; avatar: string; role: string };
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ----------------------------------------------------
// Mock Data Catalog
// ----------------------------------------------------

export const projectsData: Project[] = [
  {
    id: "ugc-miss-dior",
    title: "Miss Dior Perfume",
    category: "AI UGC Campaign",
    tagline: "Luxury perfume UGC video ad featuring Dior Eau de Parfum. Discover your signature scent.",
    image: "/images/perfume.jpg",
    challenge: "Traditional luxury branding relies on high-budget studio photography, making rapid testing of creator content cost-prohibitive. Miss Dior needed a casual review style UGC ad that retains luxury product accuracy.",
    solution: "We engineered a generative pipeline to overlay a photorealistic bottle of Miss Dior Eau de Parfum with dynamic lighting into a casual creator-style setting, driving immediate trust.",
    results: [
      "95% brand styling accuracy on the rendered product.",
      "12-day creative turnaround down to 48 hours.",
      "3.4x higher Click-Through-Rate (CTR) on social platforms."
    ],
    metrics: [
      { label: "Production Cost Saved", value: "92%" },
      { label: "CTR Boost", value: "+45%" },
      { label: "Ad Impressions", value: "3.2M" }
    ],
    videoUrl: "/videos/perfume ad.mp4",
    aspect: "9:16"
  },
  {
    id: "hypermotion-aroma-cafe",
    title: "Aroma Café Blend",
    category: "Hypermotion Commercial",
    tagline: "Cinema-grade fluid and bean physics coffee commercial. Classic strong blend.",
    image: "/images/coffee.jpg",
    challenge: "Aroma Café wanted to showcase a premium Arabica coffee blend. Traditional production with robotic camera rigs and fluid simulation studios was quoted at $60k.",
    solution: "Using custom physics-based diffusions, we rendered high-speed camera paths, liquid coffee splashes, and roasting bean collisions in cinematic 4K quality.",
    results: [
      "Delivered production asset in 3 business days.",
      "90% cheaper than physical studio production.",
      "3.4x higher Click-Through-Rate on Instagram campaigns."
    ],
    metrics: [
      { label: "ROAS Increase", value: "3.4x" },
      { label: "Render Quality", value: "4K 60fps" },
      { label: "Production Speed", value: "3 Days" }
    ],
    videoUrl: "/videos/coffee ad.mp4",
    aspect: "9:16"
  },
  {
    id: "unboxing-velora-skin",
    title: "Velora Skin Serum",
    category: "Unboxing & Product Demo",
    tagline: "Velora Skin Radiance Repair — Vitamin C + Peptides. Brightens • Hydrates • Smooths.",
    image: "/images/serum.jpg",
    challenge: "Skincare brands require detailed close-ups to demonstrate texture and unboxing appeal. Velocity and viscosity need to look natural to build checkout confidence.",
    solution: "Produced an organic unboxing demo showing texture viscosity, pipette application, and rapid skin absorption details using high-conversion scripting.",
    results: [
      "Cart abandonment rates dropped by 18% on product page.",
      "Average user session length increased by 120s.",
      "Nominated for outstanding AI marketing execution."
    ],
    metrics: [
      { label: "Conversion Rate", value: "+55%" },
      { label: "CAC Reduction", value: "-38%" },
      { label: "Views Generated", value: "2.5M" }
    ],
    videoUrl: "/videos/Cosmetic serum beauty ad.mp4",
    aspect: "9:16"
  },
  {
    id: "luxury-bag-ad",
    title: "Maison Aurelle Luna Bag",
    category: "Luxury Fashion Commercial",
    tagline: "Maison Aurelle Luna Bag. Italian Leather • Handcrafted Luxury.",
    image: "/images/bag.jpg",
    challenge: "High-end fashion commercial production requires expensive set designs, location permits, styling crews, and model bookings.",
    solution: "We generated a cinematic hypermotion sequence blending Italian leather folds of the Luna Bag with natural outdoor environment physics and motion tracking.",
    results: [
      "Production costs reduced by over 88%.",
      "Creative execution completed in 4 business days.",
      "2.8x higher CTR on premium fashion channels."
    ],
    metrics: [
      { label: "Cost Saved", value: "88%" },
      { label: "CTR Boost", value: "2.8x" },
      { label: "Production Time", value: "4 Days" }
    ],
    videoUrl: "/videos/Luxury bag ad.mp4",
    aspect: "9:16"
  },
  {
    id: "tv-spot-aureva",
    title: "AUREVA: Wear Your Story",
    category: "TV Spot + Fashion Commercial",
    tagline: "Widescreen 16:9 fashion commercial highlighting clean lines and high-fashion aesthetics.",
    image: "/images/clothing.jpg",
    challenge: "Producing high-fidelity fashion commercials for TV spots requires massive budgets, extensive location bookings, casting agencies, and months of post-production editing.",
    solution: "We engineered a cinematic 16:9 widescreen fashion commercial utilizing advanced diffusion networks, blending custom textile physics with high-fashion designs.",
    results: [
      "Delivered a full cinema-grade 16:9 TV spot commercial in 48 hours.",
      "Saved over 94% on traditional camera crew and location rental fees.",
      "Engineered ultra-high fabric fidelity under customized digital lighting paths."
    ],
    metrics: [
      { label: "Production Saved", value: "94%" },
      { label: "CTR Boost", value: "+58%" },
      { label: "Aspect Ratio", value: "16:9 TV" }
    ],
    videoUrl: "/videos/Clothing brand TV spot Ad.mp4",
    aspect: "16:9"
  }
];

export const servicesData: ServiceDetail[] = [
  {
    id: "ai-ads",
    title: "AI Ads Production",
    description: "Cinematic, high-converting product videos, synthetic UGC creators, and interactive virtual try-on advertisements rendered in days.",
    features: [
      "High-impact UGC perfume & beauty video ads",
      "Hypermotion coffee & beverage commercials",
      "Skincare unboxings & texture product demos",
      "Interactive virtual AR apparel try-on campaigns"
    ],
    deliverables: [
      "Optimized vertical (9:16) & landscape (16:9) formats",
      "Ultra-realistic 4K AI video files",
      "AI narrator voices & scripts in 30+ languages",
      "High-converting social ad creative splits"
    ],
    duration: "3-5 Days"
  },
  {
    id: "web-design",
    title: "Website Dev & Landing Pages",
    description: "Custom, responsive Awwwards-quality websites engineered with performance and micro-animations.",
    features: [
      "Custom responsive Next.js & React architectures",
      "Modern Framer Motion & GSAP animations",
      "Integrated Headless CMS for simple management",
      "Advanced SEO setup & ultra-fast load times"
    ],
    deliverables: [
      "Production-ready GitHub code repo",
      "Responsive web framework configuration",
      "SEO meta structures",
      "1-Month post-launch engineering support"
    ],
    duration: "3-5 Weeks"
  },
  {
    id: "poster-design",
    title: "Poster Design",
    description: "Premium visual assets designed to capture attention and communicate brand authority across digital and print.",
    features: [
      "Cinematic digital & print posters",
      "Social media campaign graphics",
      "Marketing banners & display designs",
      "Advanced image synthesis & compositions"
    ],
    deliverables: [
      "Ready-to-print high-res vector files",
      "Social media asset package kits",
      "Editable design source files",
      "Multiple standard crop variations"
    ],
    duration: "3-5 Days"
  },
  {
    id: "logo-design",
    title: "Logo & Brand Design",
    description: "Memorable, modern visual identity, logo marks, and branding guidelines that command authority.",
    features: [
      "Unique vector logo marks & visual systems",
      "Curated brand typography & color systems",
      "Comprehensive brand identity books",
      "Interactive logo animation files"
    ],
    deliverables: [
      "Vector & raster source files (.SVG, .AI, .PNG)",
      "Digital brand guidelines & styling sheets",
      "Custom favicon & social avatars package",
      "Corporate identity design files"
    ],
    duration: "1-2 Weeks"
  },
  {
    id: "namewise",
    title: "Brand Name Decisions",
    description: "Generate premium brand names, check domain availability, analyze social handles, calculate brand scores, and test trademark risk via our Namewise platform.",
    features: [
      "AI-powered brand name generator",
      "Live domain availability & price checks",
      "Social handle username availability scanner",
      "Brand scoring & trademark risk scan"
    ],
    deliverables: [
      "Instant brand scorecard report",
      "Registered handle verification files",
      "Custom SVG Logo workbench downloads",
      "Direct redirection to Namewise platform"
    ],
    duration: "Instant via Namewise"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Marcus Vance",
    role: "VP of Product",
    company: "Lumina Labs",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    content: "Selora Creatives completely overhauled our marketing production. By generating photorealistic video assets through AI, we saved tens of thousands of dollars and launched our product launch 3 weeks ahead of schedule."
  },
  {
    id: "test-2",
    name: "Elara Sterling",
    role: "Founder & Creative Director",
    company: "Aether Wear",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    content: "The Next.js website they built feels less like an ecommerce page and more like an digital museum. The interactions are fluid, the performance on mobile is outstanding, and we are converting visitors at a rate we've never seen before."
  },
  {
    id: "test-3",
    name: "Devon Reynolds",
    role: "Growth Director",
    company: "Velocity Drink Co.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    content: "We launched 50 targeted AI ad variations inside a week. Our customer acquisition cost dropped by almost 40%. Their understanding of AI, editing, and ad strategy is unmatched."
  }
];

export const pricingServices: PricingPlan[] = [
  {
    id: "service-logo",
    name: "Logo & Brand Design",
    price: "$80",
    billing: "per brand",
    description: "Memorable, modern visual identity, logo marks, and branding guidelines that command authority.",
    features: [
      "Custom unique vector logo marks",
      "Curated brand typography & color system",
      "High-res source files (.SVG, .AI, .PNG)",
      "Favicon & social avatars package",
      "3 business days turnaround"
    ],
    ctaText: "Order Logo Design"
  },
  {
    id: "service-poster",
    name: "Poster Design",
    price: "$70",
    billing: "per design",
    description: "Premium visual assets designed to capture attention and communicate brand authority across digital and print.",
    features: [
      "Cinematic digital & print posters",
      "Social media campaign graphics",
      "Marketing banners & display designs",
      "Multiple standard crop variations",
      "3 business days turnaround"
    ],
    ctaText: "Order Poster Design"
  },
  {
    id: "service-web",
    name: "Website Dev & Landing Pages",
    price: "$250",
    billing: "per project",
    description: "Custom, responsive Awwwards-quality websites engineered with performance and micro-animations.",
    features: [
      "Custom responsive Next.js layout",
      "Modern Framer Motion micro-interactions",
      "Headless CMS integration option",
      "Advanced SEO & fast speed load times",
      "1-Month post-launch engineering support"
    ],
    ctaText: "Order Website Dev"
  },
  {
    id: "service-ads",
    name: "AI Ads Production",
    price: "$120",
    billing: "per video ad",
    description: "Cinematic, high-converting product videos and synthetic UGC creator advertisements.",
    features: [
      "Ultra-realistic 4K generative AI video",
      "Narrator voiceovers in 30+ languages",
      "Vertical (9:16) & Landscape (16:9) formats",
      "Social media optimized ad splits",
      "3 business days turnaround"
    ],
    ctaText: "Order AI Video Ad"
  }
];

export const pricingPackages: PricingPlan[] = [
  {
    id: "package-basic",
    name: "Basic Package",
    price: "$399",
    billing: "per project",
    description: "A comprehensive starter bundle containing 1 of each of our core design and production services.",
    features: [
      "1 Custom Logo & Brand Identity System",
      "1 High-res Digital Poster Design",
      "1 Custom responsive Next.js Landing Page",
      "1 Cinematic 4K AI Video Ad / UGC asset",
      "7 business days turnaround"
    ],
    ctaText: "Choose Basic Package"
  },
  {
    id: "package-growth",
    name: "Growth Suite",
    price: "$799",
    billing: "per project",
    description: "Scale your design presence with multiple creative variants and full platform assets.",
    features: [
      "2 Custom Logo Identity Options",
      "3 Poster / Marketing Banner layouts",
      "Multi-page Next.js web application",
      "3 Cinematic AI Video Ads / UGC spots",
      "14 business days turnaround"
    ],
    ctaText: "Choose Growth Suite",
    popular: true
  },
  {
    id: "package-custom",
    name: "Enterprise Custom",
    price: "Custom",
    billing: "tailored scope",
    description: "Retainer-based and custom production contracts for corporations and agencies.",
    features: [
      "Custom dedicated creative design pipelines",
      "Full API integrations for generative systems",
      "White-label design and web delivery options",
      "24/7 Priority support and custom SLAs",
      "Long term monthly retainer agreements"
    ],
    ctaText: "Contact for Pricing"
  }
];

export const pricingPlans = pricingPackages;

export const faqData: FAQItem[] = [
  {
    question: "How long does a project take?",
    answer: "Branding and design assets generally take 1-2 weeks. Standard landing pages take 2-3 weeks, and complex multi-page Next.js web applications take 3-5 weeks. AI-generated video campaigns can be completed in as little as 3-5 days."
  },
  {
    question: "What AI tools are used?",
    answer: "We utilize advanced diffusion networks (Midjourney, Stable Diffusion, Flux) for artwork generation, proprietary Large Language Models for copywriting, runway/Luma/Pika for frame-interpolation and video diffusion, and custom generative upscaling pipelines to render cinematic 4K assets."
  },
  {
    question: "How many revisions are included?",
    answer: "All project packages include two complete rounds of feedback and revisions. We align very closely during the creative direction and moodboarding phases to ensure that our first deliverables are extremely close to your vision."
  },
  {
    question: "Do you offer monthly retainers?",
    answer: "Yes, we offer ongoing monthly retainer services for brands needing consistent flows of social media content, AI ads, and ongoing graphic updates. Retainers start at $3,500/month."
  },
  {
    question: "Do you build websites?",
    answer: "Absolutely. We build custom Next.js, React, and TypeScript web applications that are responsive, blazing fast, optimized for search engines, and integrated with headless content management systems (like Sanity) or custom databases."
  }
];

export const blogData: BlogPost[] = [
  {
    slug: "redefining-ad-creatives-with-generative-ai",
    title: "Redefining Ad Creatives with Generative AI",
    date: "May 28, 2026",
    category: "AI Advertising",
    excerpt: "How generative diffusion models are helping startups slash high-production studio costs while driving higher click-through rates.",
    readTime: "5 min read",
    author: {
      name: "Caelen Vance",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      role: "Creative Director"
    },
    content: `
      <h2>The Rise of Generative Video Production</h2>
      <p>Not long ago, running a high-end product commercial campaign meant allocating budgets ranging from $30,000 to over $100,000. Renting studio space, coordinating camera equipment, lighting crews, actors, and post-production editing consumed massive amounts of cash and weeks of scheduling. Today, the landscape is shifting dramatically.</p>
      
      <p>Generative AI tools and diffusion systems have matured from simple graphic novel simulators into high-fidelity video rendering engines. By combining 3D product renders with diffusion models like Stable Diffusion, Flux, and Runway Gen-3, creative directors can generate studio-grade commercial scenes in hours instead of weeks.</p>
      
      <blockquote>"Generative AI isn't replacing the creative spark; it is giving that spark an infinite execution buffer."</blockquote>

      <h2>Slashing Costs while Maximizing Output</h2>
      <p>The core benefit of integrating generative processes into your marketing production is scalability. In traditional media buying, you test two or three video creatives because producing more is cost-prohibitive. With AI workflows, you can spin up 50 different variations of a video, each catering to a specific audience niche, voice actor preference, or background theme.</p>
      
      <p>By testing more variants, marketing algorithms find the perfect match faster, driving average Click-Through-Rates (CTRs) up by 3x and lowering client-acquisition costs by up to 40%.</p>

      <h2>How to Implement AI Ads for Your Brand</h2>
      <p>To successfully integrate AI creatives, follow these steps:</p>
      <ul>
        <li><strong>Establish the Core Geometry:</strong> Ensure your product's actual logo, shapes, and branding are mapped cleanly via 3D assets rather than relying entirely on AI text-to-image prompts.</li>
        <li><strong>Blend with Human Talent:</strong> Use real customer videos (UGC) for reviews, and blend them with AI background simulations to retain authenticity.</li>
        <li><strong>Keep Iterating:</strong> Test new concepts daily. Generative AI allows you to instantly adapt to social media trends before they lose viral steam.</li>
      </ul>
    `
  },
  {
    slug: "designing-websites-that-win-design-awards",
    title: "Designing Websites That Win Design Awards",
    date: "May 15, 2026",
    category: "Website Design",
    excerpt: "An inside look at the styling elements, smooth scrolling, and micro-interactions that elevate standard layouts to Awwwards levels.",
    readTime: "7 min read",
    author: {
      name: "Eliana Thorne",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      role: "Lead Interactive Designer"
    },
    content: `
      <h2>Beyond Templates: The Immersive Web</h2>
      <p>A web page should be more than a static digital brochure. It should be a digital gallery that visitors feel compelled to play with. Awwwards-winning websites prioritize user experience through visual discovery. They use motion, 3D typography, and custom micro-interactions to build emotional connections.</p>
      
      <h2>Crucial Pillars of Premium Web Experiences</h2>
      <p>To create a truly immersive digital experience, focus on these three core items:</p>
      
      <h3>1. Smooth Inertial Scroll</h3>
      <p>Standard browser scrolling is abrupt. Premium sites use smooth scroll wrappers (like Lenis or GSAP ScrollSmoother) that add a fluid, weight-based friction to scroll speeds. This allows animations to sync perfectly with user scrolling without looking jittery.</p>

      <h3>2. Interactive Mouse Physics</h3>
      <p>Whether it's a floating 3D particle storm reacting to cursor movement, or buttons that magnetically shift towards the user's cursor, mouse-reactive components keep the visitor engaged. They turn reading text into active interaction.</p>

      <h3>3. Glassmorphic Hierarchy</h3>
      <p>Layering elements using thin white borders, dark semi-transparent backdrops, and heavy backdrop blur filters gives websites depth. The UI feels like physical translucent panels floating above dynamic lighting orbits.</p>
      
      <h2>Engineering for Ultra-Fast Speeds</h2>
      <p>While graphics and physics are crucial, a page that takes 5 seconds to load is a failure. Always optimize assets:</p>
      <ul>
        <li>Compress 3D files using Draco compression.</li>
        <li>Use canvas particles for large background arrays, saving expensive WebGL setups only for active focal heroes.</li>
        <li>Leverage Next.js static asset optimizations and edge delivery platforms.</li>
      </ul>
    `
  },
  {
    slug: "mastering-modern-ugc-advertising-in-the-ai-era",
    title: "Mastering Modern UGC Advertising in the AI Era",
    date: "April 20, 2026",
    category: "AI Advertising",
    excerpt: "Discover how synthetic avatars and voice generation are transforming UGC pipelines, saving hours of creator management.",
    readTime: "6 min read",
    author: {
      name: "Caelen Vance",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      role: "Creative Director"
    },
    content: `
      <h2>The Shift to Synthetic Creators</h2>
      <p>User-Generated Content (UGC) is the lifeblood of TikTok and Instagram marketing. However, managing human creators—dealing with late submissions, script rewrites, lighting discrepancies, and licensing contracts—is a significant operations bottleneck.</p>
      
      <p>Enter the era of synthetic creators. Combining custom AI avatars with advanced voice synthesis yields UGC clips that look, sound, and feel incredibly real. These digital creators don't get tired, can speak in 30 different languages, and deliver scripts instantly.</p>
      
      <h2>Best Practices for AI-Powered UGC</h2>
      <p>To ensure your synthetic creator ads resonate with customers:</p>
      <ul>
        <li><strong>Maintain Imperfection:</strong> Don't make the avatar look overly polished. Standard vertical format videos, casual backgrounds, and slight camera shakes make the content feel like an organic upload.</li>
        <li><strong>Focus on the Hook:</strong> The first 3 seconds of a short-form ad dictate its success. Script high-energy, visual-first hooks.</li>
        <li><strong>Inject Real Proof:</strong> Overlay product screencasts, positive customer review cards, and real packaging unboxing to anchor the synthetic narrator in physical reality.</li>
      </ul>
    `
  }
];
