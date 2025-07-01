import type React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { AppNavbar } from "@/components/shared/AppNavbar";
import Footer from "@/components/shared/Footer";
import { TopBarTabs } from "@/components/shared/TopBarTabs";
// import { ScrollToTopFAB } from "@/components/shared/ScrollToTopFAB";

const inter = Inter({ subsets: ["latin"] });

export default function JustAppbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className + " flex flex-col min-h-screen w-full"}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AppNavbar />
        <TopBarTabs />
        <main className="flex-1 w-full pt-[64px]">
          {children}
        </main>
        <Footer />
        {/* <ScrollToTopFAB /> */}
      </ThemeProvider>
    </div>
  );
}
