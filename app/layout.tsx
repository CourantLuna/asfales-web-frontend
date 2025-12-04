import type React from "react"
import type { Metadata } from "next"
import Script from 'next/script'; // 👈 Importante

import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { ScrollbarControl } from "../components/shared/ClientScrollHandler"
import { Toaster } from "@/components/ui/sonner"; // exportado por shadcn
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalLoader from "@/components/GlobalLoader";
import GlobalFetchWrapper from "@/components/GlobalFetchWrapper";


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Asfales",
  description: "A modern Next.js starter with theme support",
  generator: "v0.dev",
  other: {
    "google-adsense-account": "ca-pub-1409189363480446",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1409189363480446" />

         {/* Google AdSense */}
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1409189363480446"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        /> */}
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
          <GlobalFetchWrapper>
            <GlobalLoader />
                  <Toaster  position="bottom-center"  richColors />

          <ScrollbarControl /> 
        <div className="min-h-screen h-screen w-full">
          {children}
        </div>
          
               </GlobalFetchWrapper>
        </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
