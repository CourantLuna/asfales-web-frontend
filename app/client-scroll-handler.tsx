"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function ScrollbarControl() {
  const pathname = usePathname()

  useEffect(() => {
    const html = document.documentElement

    // Rutas donde NO quieres aplicar scrollbar-gutter: stable
    const disableGutterRoutes = ["/login", "/register"]

    if (disableGutterRoutes.includes(pathname)) {
      html.classList.add("disable-scrollbar-gutter")
    } else {
      html.classList.remove("disable-scrollbar-gutter")
    }
  }, [pathname])

  return null
}
