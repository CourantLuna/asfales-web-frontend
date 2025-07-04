"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { ROUTE_CONFIG, RouteUtils, RouteInfo } from "@/constants/routes";

export function useMobileNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  // Obtener información completa de la ruta
  const getRouteInfo = (): RouteInfo => {
    const depth = RouteUtils.getPathDepth(pathname);
    const parentPath = RouteUtils.getParentPath(pathname);
    const segments = RouteUtils.getRouteSegments(pathname);
    
    // Buscar título exacto en la configuración
    const exactTitle = RouteUtils.getRouteTitle(pathname);
    
    // Si no existe título exacto, generar uno dinámico
    const title = exactTitle === 'Página' ? 
      RouteUtils.generateDynamicTitle(pathname.split('/').pop() || '') : 
      exactTitle;

    return {
      title,
      parentPath,
      showBackButton: depth > 1,
      depth,
      segments
    };
  };

  // Funciones de navegación
  const goBack = () => {
    const { parentPath, depth } = getRouteInfo();
    
    if (depth <= 1 || parentPath === '/') {
      router.back();
    } else {
      router.push(parentPath);
    }
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const goToRoot = () => {
    router.push('/');
  };

  const goToParent = () => {
    const { parentPath } = getRouteInfo();
    router.push(parentPath);
  };

  return {
    routeInfo: getRouteInfo(),
    goBack,
    navigateTo,
    goToRoot,
    goToParent,
    pathname,
    routeConfig: ROUTE_CONFIG
  };
}