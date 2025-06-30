

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "next-themes"
import { AppNavbar } from "@/components/shared/AppNavbar"
import Footer from "@/components/shared/Footer"
import ChatWidget from "@/components/shared/ChatWidget"

const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "Asfales",
  description: "A modern Next.js starter with theme support",
    generator: 'v0.dev'
}

export default function JustAppbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
<body className={inter.className + " flex flex-col min-h-screen  h-screen w-full"}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AppNavbar />
                {children}
        </ThemeProvider>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  ); // sin navbar ni global layout
}
