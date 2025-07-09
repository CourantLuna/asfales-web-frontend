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
import { RouteUtils } from "@/constants/routes";

export default function BreadcrumbNav() {
  const pathname = usePathname();

  const paths = pathname.split("/").filter(Boolean);

  // Si estamos en la raíz, no renderices el breadcrumb
  if (paths.length === 0) return null;

  const breadcrumbItems = paths.map((path, idx) => {
    const href = `/${paths.slice(0, idx + 1).join("/")}`;
    const title = RouteUtils.getBreadcrumbTitle(path);
    
    return {
      name: title,
      href,
    };
  });

  return (
    <Breadcrumb className="hidden lg:block">
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
                  {item.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}