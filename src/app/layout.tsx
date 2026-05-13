import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { FloatingToolbar } from "@/components/layout/FloatingToolbar";
import { TemplateModal } from "@/components/layout/TemplateModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "WellNotes | Premium Digital Notebook",
  description: "The ultimate digital notebook for students and professionals.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WellNotes",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="flex min-h-screen bg-white dark:bg-black">
        <Sidebar />
        <main className="flex-1 h-screen overflow-auto relative bg-[#ffffff] dark:bg-[#000000]">
          <FloatingToolbar />
          {children}
          <TemplateModal />
        </main>
      </body>
    </html>
  );
}


