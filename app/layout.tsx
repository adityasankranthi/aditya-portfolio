import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aditya Sankranthi - Full Stack Engineer | React, Next.js, Node.js, DevOps",
  description: "Award-winning Full Stack Engineer with 5+ years of experience building scalable systems, microservices, and AI solutions. Specializing in React, Next.js, Node.js, Docker, and cloud infrastructure. Currently available for hire.",
  keywords: "Full Stack Developer, React, Next.js, Node.js, TypeScript, DevOps, Docker, AWS, Software Engineer, Freelance, Hire Developer, Microservices, AI Integration",
  authors: [{ name: "Aditya Sankranthi", url: "https://aditya-portfolio.com" }],
  creator: "Aditya Sankranthi",
  publisher: "Aditya Sankranthi",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Aditya Sankranthi - Full Stack Engineer & DevOps Specialist",
    description: "Full Stack Engineer building scalable systems with React, Next.js, Node.js, and cloud infrastructure. Open to opportunities.",
    url: "https://aditya-portfolio.com",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aditya Sankranthi - Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Sankranthi - Full Stack Engineer",
    description: "Award-winning Full Stack Engineer. Building scalable systems with React, Next.js, Node.js.",
    images: ["/og-image.png"],
    creator: "@adityasankranthi",
  },
  alternates: {
    canonical: "https://aditya-portfolio.com",
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
