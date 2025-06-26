"use client";

import * as React from "react";
import Link from "next/link";
import {
  Plane,
  Hotel,
  CalendarCheck,
  MapPinned,
  Ship,
  TrafficCone,
  type LucideIcon,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navItems: {
  title: string;
  icon?: LucideIcon;
  content: React.ReactNode;
}[] = [
  {
    title: "Transporte",
    icon: Plane,
    content: (
      <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        <li className="row-span-3">
          <NavigationMenuLink asChild>
            <a
              className="flex h-full w-full flex-col justify-end rounded-md bg-cover bg-center bg-no-repeat p-6 no-underline outline-none select-none focus:shadow-md"
              style={{
                backgroundImage:
                  "url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/air-travel-cover-VaUGERk5JbA9E7iFArNHmXYHfbebXD.png')",
              }}
              href="#"
            >
              <div className="mt-4 mb-2 text-lg font-bold text-foreground">
                Viaja por aire, mar o tierra.
              </div>
              <p className="text-sm text-muted-foreground leading-tight">
                Compara opciones y elige la mejor forma de llegar a tu destino.
              </p>
            </a>
          </NavigationMenuLink>
        </li>
        <ListItem href="/transporte/vuelos" title="Vuelos y Aerolíneas" icon={Plane}>
          Rutas rápidas y directas para llegar lejos, al mejor precio.
        </ListItem>
        <ListItem href="/transporte/cruceros" title="Cruceros y Ferris" icon={Ship}>
          Conectividad marítima para explorar destinos por agua.
        </ListItem>
        <ListItem href="/transporte/autobuses" title="Autobuses y Minibuses" icon={TrafficCone}>
          Conexiones flexibles y accesibles para moverte por tierra.
        </ListItem>
      </ul>
    ),
  },
  {
    title: "Alojamientos",
    icon: Hotel,
    content: (
      <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
        <ListItem href="#" title="Hoteles">
          Descubre alojamientos recomendados en cada destino.
        </ListItem>
        <ListItem href="#" title="Hostales y apartamentos">
          Alternativas económicas y con encanto local.
        </ListItem>
        <ListItem href="#" title="Resorts y todo incluido">
          Escápate con estilo a destinos paradisíacos.
        </ListItem>
        <ListItem href="#" title="Filtros inteligentes">
          Elige según tu estilo de viaje y necesidades.
        </ListItem>
      </ul>
    ),
  },
  {
    title: "Itinerarios",
    icon: CalendarCheck,
    content: (
      <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
        <ListItem href="#" title="Itinerarios sugeridos">
          Planes de viaje prediseñados por expertos.
        </ListItem>
        <ListItem href="#" title="Crea tu itinerario">
          Personaliza días, destinos y tiempos a tu gusto.
        </ListItem>
        <ListItem href="#" title="Ahorra tiempo">
          Planificación visual y recomendaciones automáticas.
        </ListItem>
      </ul>
    ),
  },
  {
    title: "Experiencias",
    icon: MapPinned,
    content: (
      <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
        <ListItem href="#" title="Tours y actividades">
          Vive aventuras locales con confianza.
        </ListItem>
        <ListItem href="#" title="Gastronomía">
          Reservas en restaurantes y experiencias culinarias.
        </ListItem>
        <ListItem href="#" title="Eventos">
          Encuentra conciertos, festivales y más durante tu viaje.
        </ListItem>
        <ListItem href="#" title="Cultura y naturaleza">
          Museos, parques y más según tu estilo.
        </ListItem>
      </ul>
    ),
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className="pointer-events-auto">
      <NavigationMenuList className="gap-3">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger className="group/nav flex items-center gap-1 rounded-md px-3 py-2 border border-transparent bg-transparent transition-colors hover:border-[#FFA500] hover:bg-muted/20 focus:bg-white focus:text-foreground focus:border-white data-[state=open]:bg-white data-[state=open]:text-foreground data-[state=open]:border-white">
              {item.icon && (
                <item.icon className="h-4 w-4 transition-colors group-hover/nav:text-secondary data-[state=open]:text-secondary transition-transform duration-300 group-data-[state=open]:-rotate-45" />
              )}
              <span>{item.title}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-background p-4 rounded-lg">
              {item.content}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  title: string;
  href: string;
  icon?: LucideIcon;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="flex items-start gap-3 rounded-md p-3 hover:bg-muted transition-colors"
        >
          {Icon && <Icon className="w-5 h-5 text-primary mt-1" />}
          <div className="space-y-1">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="text-sm text-muted-foreground">{children}</p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
