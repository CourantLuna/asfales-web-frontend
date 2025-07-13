"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { AppNavbar } from "@/components/shared/AppNavbar";
import Footer from "@/components/shared/Footer";
import ChatWidget from "@/components/shared/ChatWidget";
import LandingSkeleton from "@/components/landing/LandingSkeleton";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { TopBarTabs } from "@/components/shared/TopBarTabs";
import FooterMobile from "@/components/shared/FooterMobile";
import { ScrollToTopFAB } from "@/components/shared/ScrollToTopFAB";

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/global-transport-search");
    router.prefetch("/global-lodging-search");
    router.prefetch("/global-experiences-search");
    router.prefetch("/global-itineraries-search");
  }, [router]);

  return (
    <div className={inter.className + " flex flex-col min-h-screen w-full"}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AppNavbar />
        <TopBarTabs />
        
        <LandingSkeleton>
          <main className="flex-1 w-full max-w-7xl px-5 md:px-10 xl:px-0 mx-auto min-h-screen">
            <BreadcrumbNav />
            {children}
          </main>
        </LandingSkeleton>
        
        <Footer />
        <ChatWidget />
        <ScrollToTopFAB threshold={2500} scrollToPosition={1000} duration={1200} />
      </ThemeProvider>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}
