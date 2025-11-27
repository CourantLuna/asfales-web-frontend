"use client";
import { useRouter, usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  SlidersHorizontal,
  CalendarCheck,
  Bell,
  User,
  Home,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TopBarTabs() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();

  const TABS = [
    {
      label: "Inicio",
      icon: Home,
      href: "/",
      match: ["/"],
    },
    {
      label: "Buscar",
      icon: Search,
      href: "/search",
      match: ["/search"],
    },
    {
      label: "Itinerarios",
      icon: CalendarCheck,
      href: "/itineraries",
      match: ["/itineraries", "/itineraries/[id]", "/itineraries/[id]/edit"],
    },
    {
      label: "Notificaciones",
      icon: Bell,
      href: "/notifications",
      match: ["/notifications", "/chats", "/alerts"],
      showBadge: true,
      badgeCount: 3, // Ejemplo de contador
    },
    {
      label: "Perfil",
      icon: User,
      href: "/profile",
      match: ["/profile", "/settings", "/support", "/help"],
    },
  ];

//   if (!isMobile) return null;

  const currentTab =
    TABS.find((tab) => tab.match.some((p) => pathname === p || pathname.startsWith(p + "/")))?.href || "/";

  const handleTabChange = (value: string) => {
    router.push(value);
  };

  return (
    <nav className=" lg:hidden w-full fixed top-0 left-0 right-0 z-50 bg-primary shadow-sm border-b border-primary">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full h-16 bg-primary p-0 rounded-none border-0 grid grid-cols-5 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary/20">
          {TABS.map(({ label, icon: Icon, href, showBadge, badgeCount }) => (
            <TabsTrigger
              key={label}
              value={href}
              className={cn(
                // Base styles - siempre fondo primary transparente
                "flex flex-col items-center justify-center gap-1 h-full rounded-none border-0 bg-transparent",
                " hover:text-slate-300 transition-colors duration-200 text-gray-400",
                // Estado activo - fondo sigue siendo transparente, solo cambia borde y fuente
                "data-[state=active]:bg-transparent data-[state=active]:text-secondary data-[state=active]:shadow-none data-[state=active]:font-bold",
                // Borde inferior - transparente por defecto, secondary cuando activo
                "relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-transparent after:transition-all after:duration-200",
                "data-[state=active]:after:bg-secondary data-[state=active]:after:h-1",
                // Focus styles
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2"
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors duration-200",
                    "data-[state=active]:text-secondary",
                  )}
                  aria-hidden="true"
                />
                {showBadge && badgeCount && badgeCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] font-medium min-w-4"
                  >
                    {badgeCount > 99 ? '99+' : badgeCount}
                  </Badge>
                )}
                {showBadge && (!badgeCount || badgeCount === 0) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </div>
              <span className={cn(
                "text-[0.6rem] font-medium transition-colors duration-200",
                "data-[state=active]:text-secondary data-[state=active]:font-bold"
              )}>
                {label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}
