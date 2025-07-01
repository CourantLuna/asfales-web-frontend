import type React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { AppNavbar } from "@/components/shared/AppNavbar";
import Footer from "@/components/shared/Footer";
import { TopBarTabs } from "@/components/shared/TopBarTabs";

const inter = Inter({ subsets: ["latin"] });

export default function JustAppbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className + " flex flex-col min-h-screen h-screen w-full"}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AppNavbar />
        <TopBarTabs />
        {children}
      </ThemeProvider>
      <Footer />
    </div>
  );
}
