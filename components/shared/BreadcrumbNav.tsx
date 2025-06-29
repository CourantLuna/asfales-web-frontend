"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbNav() {
  const pathname = usePathname();

  const paths = pathname.split("/").filter(Boolean);

  // Mapa de nombres custom
  const routeNames: Record<string, string> = {
    "global-lodging-search": "Opciones de Alojamiento",
    "global-transport-search": "Opciones de Transporte",
    "global-experiences-search": "Experiencias y Actividades",
    "global-itineraries-search": "Itinerarios y Paquetes",
    // ...
  };

   // Si estamos en la raíz, no renderices el breadcrumb
  if (paths.length === 0) return null;


  const breadcrumbItems = paths.map((path, idx) => {
    const href = `/${paths.slice(0, idx + 1).join("/")}`;
    const key = decodeURIComponent(path).toLowerCase();
    return {
      name: routeNames[key] || decodeURIComponent(path),
      href,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.map((item, idx) => (
          <div key={item.href} className="flex items-center gap-2">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.href}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

