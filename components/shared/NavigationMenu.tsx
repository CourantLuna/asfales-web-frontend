"use client";

import * as React from "react";
import Link from "next/link";
import {
  Plane,
  Hotel,
  CalendarCheck,
  MapPinned,
  Ship,
  TrafficCone, Home, Building,
  type LucideIcon,
  Slash,
  SquareSlash,
  Bus,
  BusFront,
  Map,
  FilePlus,
  Users,
  Mic,
  Utensils,
  Music,
  Landmark,
  Footprints,
  Tent,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { fi } from "date-fns/locale";

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
              className="group relative flex h-full w-full flex-col justify-end rounded-md bg-cover bg-center bg-no-repeat p-6 no-underline outline-none select-none focus:shadow-md overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Firefly_automovil%20frente%20a%20crucero%20en%20el%20mar%20y%20en%20el%20cielo%20un%20avion%20que%20cruza%20a%20lo%20lejos%2C%20luj%20576259-TOGTWkdKXwNdIgETamioPWA1gia6dj.jpg')",
              }}
              href="#"
            >
              {/* Capa de desenfoque y opacidad */}
              <span className="absolute inset-0 bg-white/80 z-0" />

              {/* Contenido por encima del desenfoque */}
              {/* <div className="relative w-6 h-6 w-full">
  <SquareSlash className="w-6 h-6"></SquareSlash>
</div> */}
              {/* Contenido por encima del desenfoque */}
              <div className="relative z-10 mt-4 mb-2 text-lg font-bold text-foreground">
                Viaja por aire, mar o tierra.
              </div>
              <p className="relative z-10 text-sm text-muted-foreground leading-tight">
                Compara opciones y elige la mejor forma de llegar a tu destino.
              </p>
            </a>
          </NavigationMenuLink>
        </li>
        <ListItem
          href="/transporte/vuelos"
          title="Vuelos y Aerolíneas"
          icon={Plane}
        >
          Rutas rápidas y directas para llegar lejos, al mejor precio.
        </ListItem>
        <ListItem
          href="/transporte/cruceros"
          title="Cruceros y Ferris"
          icon={Ship}
        >
          Conectividad marítima para explorar destinos por agua.
        </ListItem>
        <ListItem
          href="/transporte/autobuses"
          title="Autobuses y Minibuses"
          icon={BusFront}
        >
          Conexiones flexibles y accesibles para moverte por tierra.
        </ListItem>
      </ul>
    ),
  },
  {
    title: "Alojamientos",
    icon: Hotel,
    content: (
  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
    <li className="row-span-3">
      <NavigationMenuLink asChild>
        <a
          className="group relative flex h-full w-full flex-col justify-end rounded-md bg-cover bg-center bg-no-repeat p-6 no-underline outline-none select-none focus:shadow-md overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1678913308053-316cee77afe9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
          href="#"
        >
          <span className="absolute inset-0 bg-white/80 z-0" />
          <div className="relative z-10 mt-4 mb-2 text-lg font-bold text-foreground">
            Encuentra tu lugar ideal
          </div>
          <p className="relative z-10 text-sm text-muted-foreground leading-tight">
            Hospédate como quieras: desde hoteles lujosos hasta casas locales con encanto.
          </p>
        </a>
      </NavigationMenuLink>
    </li>
    <ListItem
      href="/alojamientos/hoteles"
      title="Hoteles y Resorts"
      icon={Hotel}
    >
      Comodidad y servicios premium.
    </ListItem>
    <ListItem
      href="/alojamientos/hostales"
      title="Hostales y Casas de Huéspedes"
      icon={Home}
    >
      Económico, local y acogedor.
    </ListItem>
    <ListItem
      href="/alojamientos/apartamentos"
      title="Apartamentos y Estadías Largas"
      icon={Building}
    >
      Privacidad y espacio a tu ritmo.
    </ListItem>
  </ul>
),
  },
  {
    title: "Itinerarios",
    icon: CalendarCheck,
    content: (
  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
    <li className="row-span-3">
      <NavigationMenuLink asChild>
        <a
          className="group relative flex h-full w-full flex-col justify-end rounded-md bg-cover bg-center bg-no-repeat p-6 no-underline outline-none select-none focus:shadow-md overflow-hidden"
          style={{
            backgroundImage:
              "url('https://blog.centraldereservas.com/wp-content/uploads/2017/06/post2.jpg')",
          }}
          href="#"
        >
          <span className="absolute inset-0 bg-white/80 z-0" />
          <div className="relative z-10 mt-4 mb-2 text-lg font-bold text-foreground">
            Organiza tu viaje perfecto
          </div>
          <p className="relative z-10 text-sm text-muted-foreground leading-tight">
            Crea, guarda y comparte planes de viaje completos con transporte,
            alojamiento y experiencias.
          </p>
        </a>
      </NavigationMenuLink>
    </li>
    <ListItem
      href="/itinerarios/predisenados"
      title="Viajes prediseñados y paquetes"
      icon={Map}
    >
      Itinerarios listos para disfrutar.
    </ListItem>
    <ListItem
      href="/itinerarios/personales"
      title="Mis itinerarios"
      icon={FilePlus}
    >
      Crea y gestiona los tuyos, personales o compartidos.
    </ListItem>
    <ListItem
      href="/itinerarios/colaborativos"
      title="Itinerarios colaborativos"
      icon={Users}
    >
      Donde te dejas guiar por otros.
    </ListItem>
  </ul>
),

  },
  {
    title: "Experiencias",
    icon: MapPinned,
    content: (
  <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
    {/* Banner superior como cabecera horizontal */}
    <li className="col-span-2">
      <NavigationMenuLink asChild>
        <a className="relative flex items-center w-full rounded-md overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-4"
        style={{
            backgroundImage:
              "url('https://concepto.de/wp-content/uploads/2013/03/turismo-peru-1536x768.jpg')",
          }}
         href=""
        >
          
          <span className="absolute inset-0 bg-white/80 z-0" />
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-foreground">
  Abre las puertas a nuevas experiencias
</h3>
<p className="text-sm text-muted-foreground">
  Elige, combina y reserva actividades únicas para hacer de cada viaje una historia inolvidable.
</p>

          </div>
        </a>
      </NavigationMenuLink>
    </li>

    {/* Opciones de experiencias */}
    <ListItem
      href="/experiencias/camping"
      title="Camping y estadías al aire libre"
      icon={Tent}
    >
      Dormir bajo las estrellas.
    </ListItem>
    <ListItem
      href="/experiencias/senderismo"
      title="Rutas de senderismo y trekking"
      icon={Footprints}
    >
      Rutas a pie por la naturaleza.
    </ListItem>
    <ListItem
      href="/experiencias/cultura"
      title="Visitas y actividades culturales"
      icon={Landmark}
    >
      Vive lo local y tradicional.
    </ListItem>
    <ListItem
      href="/experiencias/conciertos"
      title="Conciertos y festivales"
      icon={Music}
    >
      Música en vivo de todo tipo.
    </ListItem>
    <ListItem
      href="/experiencias/gastronomia"
      title="Experiencias gastronómicas"
      icon={Utensils}
    >
      Sabores típicos e inmersivos.
    </ListItem>
    <ListItem
      href="/experiencias/comedia"
      title="Eventos y comedia"
      icon={Mic}
    >
      Ríe con shows únicos.
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
          {Icon && <Icon className="w-10 text-foreground max-w-[32px]" />}
          <div className="space-y-1">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="text-sm text-muted-foreground">{children}</p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
