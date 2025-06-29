import type React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { AppNavbar } from "@/components/shared/AppNavbar";
import Footer from "@/components/shared/Footer";
import ChatWidget from "@/components/shared/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export default function JustAppbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className + " flex flex-col min-h-screen h-screen w-full"}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AppNavbar />
        {children}
      </ThemeProvider>
      <Footer />
      <ChatWidget />
    </div>
  );
}
