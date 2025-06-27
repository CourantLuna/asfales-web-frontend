"use client"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/useAuth";

import { NavigationMenuDemo } from "./NavigationMenu";

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
import { Badge } from "@/components/ui/badge"


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
  Circle,
  MessageCircleQuestion,
  HelpCircle,
  Info,
  List,
  Heart,
  ChevronRight,
  Gift,
  Ship,
  Bus,
} from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { Separator } from "../ui/separator";
import { ro } from "date-fns/locale";
import { SettingsDialog } from "./SettingsDialog";

export function AppNavbar() {
  const { user, logout } = useAuth();
  const router = useRouter()
    const pathname = usePathname();


const handleLogout = () => {
    logout(); // limpia localStorage y setUser(null)

    // Reconstruye la URL manteniendo la ruta actual y añadiendo ?logout=1
    const url = `?logout=1`;

    // Cambia la URL sin recargar la app entera
    router.push(url);

    // // (Opcional) Refresca datos de Server Components si los usas
    // router.refresh();
  };
  

 const scrollToTop = (duration = 1000) => {
 if (typeof window === "undefined") return;

 const currentY = window.scrollY;
 // Si ya estás muy arriba, redirige a /
 if (currentY < 200) {
   router.push("/");
   return;
 }

 const start = currentY;
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
      <div className="fixed left-0 right-0 top-0 z-20 px-4 md:px-8 pr-[18px] pointer-events-none">
        {/* SVG background */}
        <div className="absolute z-[-1] top-0 right-0 left-0 h-[90px] md:h-[120px]">
          <svg
            width="w-full"
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
        <div className="flex items-center justify-between pt-6 pl-4 md:pl-12 md:mt-5">
          {/* Logo + menú móvil */}
          <div className="flex items-center gap-6 pr-5 md:ml-5">
            <Button
              variant="ghost"
              size="icon"
              className="p-0 rounded-full w-full pointer-events-auto"
              onClick={() => scrollToTop(400)}
            >
              <Image
                src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/20-vRibJMLzjhkcZHiTmRHZbI477Lks4r.png"
                alt="Logo Asfales"
                width={40}
                height={40}
              />
            </Button>

            {/* Mobile menu */}
            <div className="lg:hidden pointer-events-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Menu className="h-8 w-8" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle className="text-left text-lg">
                      Explorar
                    </SheetTitle>
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
          <div className="flex items-center gap-4 pr-4 md:pr-5 lg:pr-16 2xl:pr-24 z-10 pointer-events-auto">
            {/* <Button
              size="icon"
              variant="outline"
              className="rounded-full hidden xl:inline-flex border-0 shadow-sm transition-colors hover:bg-secondary cursor-pointer"
            >
              <Globe className="h-5 w-5" />
            </Button> */}
            <SettingsDialog />
            <Button
              size="icon"
              variant="outline"
              className="rounded-full hidden lg:inline-flex border-0 shadow-sm transition-colors hover:bg-secondary cursor-pointer"
              onClick={() => router.push("inbox/notifications")}
            >
              <Bell className="h-5 w-5 " />
            </Button>
            <Button
              variant="outline"
              className=" rounded-lg text-sm font-medium hidden xl:inline-flex border-0 shadow-sm transition-colors hover:bg-secondary cursor-pointer"
            >
              Soporte
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user ? (
                  <div
                    className="flex items-center gap-2 rounded-lg p-1 shadow-sm bg-secondary transition-colors hover:bg-muted cursor-pointer"
                    role="button"
                    tabIndex={0}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || ""} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden md:inline text-white mr-1">
                      {getFirstName(user.name)}
                    </span>
                  </div>
                ) : (
                  // Este botón solo aparece cuando se abre el dropdown, y no ocupa espacio cuando está cerrado.
                  <div
                    className="xl:hidden rounded-full p-[10px] bg-white shadow-sm border-0 transition-colors hover:bg-secondary cursor-pointer"
                    role="button"
                    tabIndex={0}
                  >
                    <User className="w-5 h-5" />
                  </div>
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-[375px] mt-8 md:mt-8 lg:mt-12  "
              >
                               {user && (
                  <div>
                    {/* Header usuario */}
                    <div className="pt-3 pb-4 space-y-2 inline-flex w-full justify-between px-2">
                      <div className="flex flex-col items-start space-y-1">
                        <div className="text-sm font-semibold">
                          ¡Hola, {getFirstName(user.name)}!
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </div>
                      </div>
                      <Badge variant="secondary">Miembro Blue</Badge>
                    </div>
                    {/* Rewards & promo */}
                    <DropdownMenuItem className="flex flex-col items-start gap-1 w-full mb-2">
                      <div className="text-sm font-semibold">$0.00</div>
                      <div className="text-xs font-medium w-full text-muted-foreground inline-flex justify-between">
                        <p>Valor de los puntos acumulados</p>
                        <Info className="mr-2 h-4 w-4" />
                      </div>


                      <div className="w-full flex justify-between items-center mt-4">
                        <span className="text-xs text-primary hover:underline">
                          Ver actividad de recompensas
                        </span>
                        <ChevronRight className="mr-2 h- w-4 inline-flex items-center" />
                      </div>
                    </DropdownMenuItem>
                    <Separator className="my-2 px-4" />
                  </div>
                )}


                {!user && (
                  <>
                    <div className="flex items-center gap-4 rounded-xl border border-muted bg-muted/50 p-4">
                      <div className="flex h-full w-full items-center justify-center">
                        <Gift className="w-10 h-10 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Viajar cuesta{" "}
                        <span className="font-bold text-primary">
                          10 % menos
                        </span>{" "}
                        con <span className="font-semibold">GoFar</span>. Inicia
                        sesión y activa tus beneficios.
                      </div>
                    </div>
                    <div className=" w-full px-4 mb-2">
                      <Button
                        className="rounded-lg w-full"
                        onClick={() => router.push("/login")}
                       
                      >
                        Iniciar sesión
                      </Button>
                    </div>
                    <div className=" w-full px-4 mb-2">
                      <Button
                        className="rounded-lg w-full"
                        variant={"link"}
                        onClick={() => console.log("Informate aqui")}
                      >
                        Más infromación sobre Asfales Rewards
                        <ChevronRight className="mr-2 h-4 w-4 inline-flex items-center" />
                      </Button>
                    </div>
                  </>
                )}


                <DropdownMenuItem className="flex lg:hidden"
                onClick={() => router.push("inbox/notifications")}>
                  <Bell className="mr-2 h-4 w-4" />
                  Notificaciones
                  
                </DropdownMenuItem>


                <Separator className="flex lg:hidden my-2 px-4" />


                <DropdownMenuItem className="flex xl:hidden">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Soporte
                </DropdownMenuItem>


                <DropdownMenuItem className="flex xl:hidden">
                  <Globe className="mr-2 h-4 w-4" />
                  Region
                </DropdownMenuItem>


                {user && (
                  <div>
                    <Separator className=" flex xl:hidden my-2 px-4" />


                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </DropdownMenuItem>


                    <DropdownMenuItem>
                      <div className="w-full flex  justify-between items-center">
                        <div className="w-full inline-flex items-center gap-2">
                          <Heart className="mr-2 h-4 w-4" />
                          Mi lista de deseos
                        </div>


                        <ChevronRight className="mr-2 h- w-4 inline-flex items-center" />
                      </div>
                    </DropdownMenuItem>


                    <Separator className="my-2 px-4" />


                    <DropdownMenuItem onClick={handleLogout}>
                      Cerrar sesión
                    </DropdownMenuItem>
                  </div>
                )}
              </DropdownMenuContent>

              {/* Este botón aparece en lg+ cuando el usuario no ha iniciado sesión */}
              {!user && (
                <div className="hidden lg:block">
                  <Button
                    variant="secondary"
                    className="rounded-lg text-sm font-medium hover:underline hover:bg-muted/50 text-foreground"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Iniciar sesión
                  </Button>
                </div>
              )}
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Navigation inferior en desktop */}

      <div className="absolute top-12 left-[140px] z-50 hidden lg:flex w-[90%] justify-start px-4 md:px-8 pointer-events-none">
        <NavigationMenuDemo></NavigationMenuDemo>
      </div>

      {/* <div className="absolute top-12 left-[140px] z-50 hidden lg:flex w-[90%] justify-start px-4 md:px-8 pointer-events-none">
      <NavigationMenu className="relative pointer-events-auto">
        <NavigationMenuList className="flex gap-5 xl:gap-12">
          {menuItems.map(({ label, icon: Icon }) => (
            <NavigationMenuItem key={label}>
              <NavigationMenuTrigger className="group flex items-center gap-1 rounded-md px-3 py-2 border border-transparent bg-transparent transition-colors hover:border-[#FFA500] hover:bg-muted/20 focus:bg-white focus:text-foreground focus:border-white data-[state=open]:bg-white data-[state=open]:text-foreground data-[state=open]:border-white">
                <Icon className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:-rotate-45" />
                <span className="text-sm">{label}</span>
              </NavigationMenuTrigger>

              <NavigationMenuContent className="bg-white border shadow-md rounded-md p-4 mt-2">
                <div className="text-sm text-muted-foreground">
                  Aquí iría el submenú de <strong>{label}</strong>.
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div> */}
    </header>
  );
}

export default AppNavbar;