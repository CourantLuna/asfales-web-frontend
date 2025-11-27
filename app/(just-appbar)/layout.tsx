import type React from "react";
// import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { AppNavbar } from "@/components/shared/layoutComponets/AppNavbar";
import Footer from "@/components/shared/Footer";
import { TopBarTabs } from "@/components/shared/layoutComponets/TopBarTabs";
import Profile from "@/components/profile/Profile";
import ProfileSideBar from "@/components/profile/ProfileSideBar";
import FooterMobile from "@/components/shared/FooterMobile";
import MobileHeader from "@/components/mobile/MobileHeader";
// import { ScrollToTopFAB } from "@/components/shared/ScrollToTopFAB";

// const inter = Inter({ subsets: ["latin"] });

export default function JustAppbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={ " flex flex-col min-h-screen w-full"}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AppNavbar showShawdowBox={true} />
        <TopBarTabs />
        <MobileHeader />

        <main className="flex-1 w-full pt-[70px] lg:pt-[120px] flex flex-col bg-gray-50  w-full">

          {children}

        </main>
        <Footer />
        {/* <ScrollToTopFAB /> */}
      </ThemeProvider>
    </div>
  );
}
