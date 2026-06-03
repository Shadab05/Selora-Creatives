import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Creative Services | Selora Creatives",
  description: "Branding, UI/UX Design, Development, Motion Graphics, and AI Production services designed for hyper-growth.",
  openGraph: {
    title: "Our Creative Services | Selora Creatives",
    description: "Branding, UI/UX Design, Development, Motion Graphics, and AI Production services designed for hyper-growth.",
    url: "https://www.seloracreatives.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
