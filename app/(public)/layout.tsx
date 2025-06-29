"use client";

import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "next-themes"
import { AppNavbar } from "@/components/shared/AppNavbar"
import Footer from "@/components/shared/Footer"
import ChatWidget from "@/components/shared/ChatWidget"
import LandingSkeleton from "@/components/landing/LandingSkeleton"
import BreadcrumbNav from "@/components/shared/BreadcrumbNav"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/global-transport-search");
    router.prefetch("/global-lodging-search");
    router.prefetch("/global-experiences-search");
    router.prefetch("/global-itineraries-search");
  }, [router]);

  
  return (
    <html lang="en" suppressHydrationWarning>
<body className={inter.className + " flex flex-col min-h-screen h-full w-full"}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AppNavbar />
          <LandingSkeleton >
     <div className="w-full max-w-7xl mx-auto">
      <div className="w-full pb-3">      <BreadcrumbNav /></div>
        {children}
      </div>
     
    </LandingSkeleton>      
        </ThemeProvider>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
