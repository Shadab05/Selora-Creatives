import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Your Project | Selora Creatives",
  description: "Get in touch with Selora Creatives. Let's collaborate to build extraordinary branding, design, and development solutions.",
  openGraph: {
    title: "Start Your Project | Selora Creatives",
    description: "Get in touch with Selora Creatives. Let's collaborate to build extraordinary branding, design, and development solutions.",
    url: "https://www.seloracreatives.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
