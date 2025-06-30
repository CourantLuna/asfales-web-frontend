import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { ScrollbarControl } from "../components/shared/ClientScrollHandler"
import { Toaster } from "@/components/ui/sonner"; // exportado por shadcn


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Asfales",
  description: "A modern Next.js starter with theme support",
  generator: "v0.dev"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
                  <Toaster  position="bottom-center"  richColors />

          <ScrollbarControl /> 
          {children}
               
        </ThemeProvider>
      </body>
    </html>
  )
}
