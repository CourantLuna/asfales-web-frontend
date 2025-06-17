"use client"


import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Globe,
  Bell,
  User,
  Plane,
  Hotel,
  CalendarCheck,
  MapPinned,
  Menu,
  X
} from "lucide-react"
import Image from "next/image"


export function AppNavbar() {
const scrollToTop = (duration = 1000) => {
  const start = window.scrollY
  const startTime = performance.now()

  const animate = (time: number) => {
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, start * (1 - progress))
    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}


 
  return (
 <header className="relative w-full z-50">
  {/* Grupo A: Fijo arriba con sticky */}
  <div className="fixed left-0 right-0 z-20 px-4 md:px-8">
    {/* Fondo SVG con forma personalizada */}
  <div className="absolute z-[-1] top-0 right-0 left-0 h-[90px] md:h-[110px]
">
    <svg
      width="1366"
      height="106"
      viewBox="0 0 1366 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <path
        d="M1366 106H951.252C943.568 103.897 936.915 98.7827 932.941 91.627L903.542 38.6797C898.252 29.1525 888.211 23.2432 877.313 23.2432H77.9092C76.004 23.2432 74.141 23.4224 72.335 23.7617H1.94727C1.28082 23.7617 0.629964 23.6947 0 23.5703V0.19043C0.629906 0.0660951 1.28088 2.10486e-08 1.94727 0H1366V106Z"
        fill="#0057A3"
      />
    </svg>
  </div>




  <div className="flex items-center justify-between pt-8 pl-8 md:pl-12 md:mt-5">
   
    {/* IZQUIERDA: Logo + NavigationMenu */}
    <div className="flex items-center gap-6 pr-5 md:ml-5">
      {/* Logo */}
<Button
  variant="ghost"
  size="icon"
  className="p-0 rounded-full"
  onClick={() => scrollToTop(300)} // 300ms
>
  <Image src="/logo.svg" alt="Logo Asfales" width={40} height={40} />
</Button>



      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu className="h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-left text-lg">Explorar</SheetTitle>
             
            </SheetHeader>
            <nav className="mt-6 space-y-4">
              {[
                { label: "Transporte", icon: Plane },
                { label: "Alojamientos", icon: Hotel },
                { label: "Itinerarios", icon: CalendarCheck },
                { label: "Experiencias", icon: MapPinned },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-base cursor-pointer hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>




    {/* DERECHA: idioma, notificaciones, perfil */}
    <div className="flex items-center gap-5 pr-8 z-10">
      <Button
      size="icon"
      variant="secondary"
  className="rounded-full hidden lg:inline-flex"
      >
        <Globe className="h-5 w-5" />
      </Button>
      <Button
      size="icon"
      variant="secondary"
  className="rounded-full hidden lg:inline-flex"
      >
        <Bell className="h-5 w-5 " />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar.jpg" />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:inline text-white">Heydi</span>
        </DropdownMenuTrigger>
       <DropdownMenuContent align="end" className="border border-red-500">
  {/* Mobile only: Idioma */}
  <DropdownMenuItem className="flex lg:hidden">
    <Globe className="mr-2 h-4 w-4" />
    Idioma
  </DropdownMenuItem>

  {/* Mobile only: Notificaciones */}
  <DropdownMenuItem className="flex lg:hidden">
    <Bell className="mr-2 h-4 w-4" />
    Notificaciones
  </DropdownMenuItem>

  {/* Perfil */}
  <DropdownMenuItem>
    <User className="mr-2 h-4 w-4" />
    Perfil
  </DropdownMenuItem>

  {/* Cerrar sesión */}
  <DropdownMenuItem>
    Cerrar sesión
  </DropdownMenuItem>
</DropdownMenuContent>

      </DropdownMenu>
    </div>
  </div>


  </div>


  {/* Grupo B: Navigation (se ve al cargar pero desaparece con scroll) */}
  <div className="absolute top-14 left-[140px] z-50 hidden lg:flex justify-start px-4 w-[90%] md:px-8 pointer-events-none">
  <NavigationMenu className="relative pointer-events-auto">


      <NavigationMenuList className="flex gap-5 xl:gap-12">
        {[
          { label: "Transporte", icon: Plane },
          { label: "Alojamientos", icon: Hotel },
          { label: "Itinerarios", icon: CalendarCheck },
          { label: "Experiencias", icon: MapPinned },
        ].map(({ label, icon: Icon }) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuTrigger
              className="flex items-center gap-1 px-2 py-1 border border-transparent bg-transparent hover:border-orange-500 focus:bg-white focus:text-foreground focus:border-white data-[state=open]:bg-white data-[state=open]:text-foreground data-[state=open:border-white transition-all"
            >
              <Icon className="h-4 w-4 transition-colors hover:text-orange-500 data-[state=open]:text-foreground" />
              <span className="transition-colors hover:text-orange-500 data-[state=open]:text-foreground">
                {label}
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-none shadow-none border-none">
              <div className="p-4 text-sm">Submenú de {label}</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</header>




  )
}
