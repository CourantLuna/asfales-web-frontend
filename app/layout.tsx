import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { ScrollbarControl } from "./client-scroll-handler"
import ChatWidget from "@/components/shared/ChatWidget"

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
          <ScrollbarControl /> {/* 👈 Aquí se activa/desactiva según la ruta */}
          {children}
                {/* <SupportChat /> */}
<ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
