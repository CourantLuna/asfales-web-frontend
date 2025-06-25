"use client"
import { useRouter } from "next/navigation"


import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Bell,
  User,
  Plane,
  Hotel,
  CalendarCheck,
  MapPinned,
  Menu,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect } from "react";

export function AppNavbar() {
  const { user, logout } = useAuth();
  const router = useRouter()

  const scrollToTop = (duration = 1000) => {
    const start = window.scrollY;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - progress));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  // Validación del token al montar (por seguridad futura)
  useEffect(() => {
    if (user && !user.token) logout();
  }, [user, logout]);

  const getFirstName = (name: string) => name?.split(" ")[0] ?? "";

  return (
    <header className="relative w-full z-30">
      {/* Sticky nav */}
      <div className="fixed left-0 right-0 top-0 z-20 px-4 md:px-8">
        {/* SVG background */}
        <div className="absolute z-[-1] top-0 right-0 left-0 h-[90px] md:h-[120px]">
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
              d="M1366 98.1416H944.737C937.226 96.1686 930.661 91.3237 926.584 84.4805L897.799 36.165C892.388 27.0835 882.598 21.5195 872.026 21.5195H856V21.5H0V0.200195C0.64623 0.0690155 1.31506 1.39473e-08 2 0H1366V98.1416Z"
              fill="#0057A3"
            />
          </svg>
        </div>

        {/* Contenido principal del navbar */}
        <div className="flex items-center justify-between pt-8 pl-4 md:pl-12 md:mt-5">
          {/* Logo + menú móvil */}
          <div className="flex items-center gap-6 pr-5 md:ml-5">
            <Button
              variant="ghost"
              size="icon"
              className="p-0 rounded-full"
              onClick={() => scrollToTop(300)}
            >
              <Image
                src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/20-vRibJMLzjhkcZHiTmRHZbI477Lks4r.png"
                alt="Logo Asfales"
                width={40}
                height={40}
              />
            </Button>

            {/* Mobile menu */}
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

          {/* Perfil, idioma, notificaciones */}
          <div className="flex items-center gap-5 pr-3 md:pr-[50px] z-10">
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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || ""} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:inline text-white">
                    {getFirstName(user.name)}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex lg:hidden">
                    <Globe className="mr-2 h-4 w-4" />
                    Idioma
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex lg:hidden">
                    <Bell className="mr-2 h-4 w-4" />
                    Notificaciones
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Cerrar sesión</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
  <div>
    <div className="hidden lg:block">
    <Button
    variant="secondary"
    className="rounded-lg text-sm font-medium"
    onClick={() => window.location.href = "/login"}
  >
    Iniciar sesión
  </Button>
  </div>

  <div className="lg:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full">
          <User className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[75vw] mt-4 md:mt-8 mr-2">
        <div className="px-3 py-2 text-lg font-bold text-center">
          Accede y desbloquea los Beneficios de ser MIEMBRO
        </div>
        <div className=" w-full px-4 mb-2">
          <Button className="rounded-lg w-full"  onClick={() => router.push("/login")}>
                Iniciar sesión
        </Button>
        </div>
        <div className=" w-full px-4 mb-2">
          <Button className="rounded-lg w-full" variant={"outline"}  onClick={() => console.log("Informate aqui")}>
                Informate aquí
        </Button>
        </div>
        
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  </div>
)}
          </div>
        </div>
      </div>

      {/* Navigation inferior en desktop */}
      <div className="absolute top-14 left-[140px] z-50 hidden lg:flex justify-start px-4 w-[90%] md:px-8 pointer-events-none">
        <NavigationMenu className="relative pointer-events-auto">
          <NavigationMenuList className="flex gap-5 xl:gap-12 ">
            {[
              { label: "Transporte", icon: Plane },
              { label: "Alojamientos", icon: Hotel },
              { label: "Itinerarios", icon: CalendarCheck },
              { label: "Experiencias", icon: MapPinned },
            ].map(({ label, icon: Icon }) => (
              <NavigationMenuItem key={label}>
                <NavigationMenuTrigger className="flex items-center gap-1 px-2 py-1 border border-transparent bg-transparent hover:border-[#FFA500] focus:bg-white focus:text-foreground focus:border-white data-[state=open]:bg-white data-[state=open]:text-foreground data-[state=open:border-white transition-all">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{label}</span>
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
  );
}

export default AppNavbar;