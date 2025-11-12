import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aditya Sankranthi - Full Stack Engineer | React, Next.js, Node.js",
  description: "Full Stack Engineer specializing in scalable web applications, cloud infrastructure, and AI integration. Available for hire. View my experience, projects, and let's work together.",
  keywords: "Full Stack Developer, React, Next.js, Node.js, Software Engineer, Freelance, Hire Developer",
  authors: [{ name: "Aditya Sankranthi" }],
  openGraph: {
    title: "Aditya Sankranthi - Full Stack Engineer",
    description: "Full Stack Engineer specializing in scalable web applications and AI integration.",
    url: "https://aditya-portfolio.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aditya Sankranthi Portfolio",
      },
    ],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
