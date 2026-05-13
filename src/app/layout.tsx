import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Lumina Notes | Premium Digital Notebook",
  description: "The ultimate digital notebook for students and professionals. Handwritten notes, PDF annotations, and AI-powered productivity.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lumina Notes",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
        <Sidebar />
        <main className="flex-1 h-screen overflow-auto relative">
          {children}
        </main>
      </body>
    </html>
  );
}

