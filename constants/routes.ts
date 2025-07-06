// Configuración centralizada de rutas y títulos
export const ROUTE_CONFIG = {
  // Rutas principales
  '/': 'Inicio',
  '/search': 'Buscar',
  '/favorites': 'Favoritos',
  '/bookings': 'Reservas',
  '/notifications': 'Notificaciones',
  
  // Rutas de búsqueda global
  '/global-lodging-search': 'Opciones de Alojamiento',
  '/global-transport-search': 'Opciones de Transporte',
  '/global-experiences-search': 'Experiencias y Actividades',
  '/global-itineraries-search': 'Itinerarios y Paquetes',
  
  // Profile routes
  '/profile': 'Perfil',
  '/profile/profile-info': 'Información Personal',
  '/profile/security': 'Seguridad',
  '/profile/notifications': 'Comunicaciones',
  '/profile/payments': 'Métodos de Pago',
  '/profile/reviews': 'Reseñas',
  '/profile/help': 'Ayuda',
  '/profile/coupons': 'Cupones',
  '/profile/credits': 'Créditos',
  
  // Lodging routes
  '/lodging': 'Alojamientos',
  '/lodging/search': 'Buscar Alojamiento',
  '/lodging/filters': 'Filtros',
  '/lodging/map': 'Mapa',
  '/lodging/compare': 'Comparar',
  '/lodging/details': 'Detalles del Alojamiento',
  
  // Transport routes
  '/transport': 'Transporte',
  '/transport/search': 'Buscar Transporte',
  '/transport/filters': 'Filtros de Transporte',
  '/transport/compare': 'Comparar Opciones',
  '/transport/booking': 'Reservar Transporte',
  
  // Experiences routes
  '/experiences': 'Experiencias',
  '/experiences/search': 'Buscar Experiencias',
  '/experiences/categories': 'Categorías',
  '/experiences/details': 'Detalles de Experiencia',
  
  // Booking routes
  '/booking': 'Reserva',
  '/booking/payment': 'Pago',
  '/booking/confirmation': 'Confirmación',
  '/booking/details': 'Detalles de Reserva',
  '/booking/history': 'Historial de Reservas',
  
  // Settings routes
  '/settings': 'Configuración',
  '/settings/account': 'Cuenta',
  '/settings/privacy': 'Privacidad',
  '/settings/notifications': 'Notificaciones',
  '/settings/language': 'Idioma',
  '/settings/theme': 'Tema',
  '/settings/billing': 'Facturación',
  
  // Help routes
  '/help': 'Ayuda',
  '/help/faq': 'Preguntas Frecuentes',
  '/help/contact': 'Contacto',
  '/help/support': 'Soporte',
  '/help/terms': 'Términos y Condiciones',
  '/help/privacy': 'Política de Privacidad',
  '/help/cookies': 'Política de Cookies',
  
  // Admin routes (si tienes)
  '/admin': 'Administración',
  '/admin/users': 'Usuarios',
  '/admin/bookings': 'Reservas',
  '/admin/analytics': 'Analíticas',
  '/admin/settings': 'Configuración del Sistema',
} as const;

// Configuración específica para breadcrumbs (para casos especiales)
export const BREADCRUMB_CONFIG = {
  // Nombres específicos para breadcrumbs que pueden diferir del título del header
  'global-lodging-search': 'Opciones de Alojamiento',
  'global-transport-search': 'Opciones de Transporte',
  'global-experiences-search': 'Experiencias y Actividades',
  'global-itineraries-search': 'Itinerarios y Paquetes',
  'personal-info': 'Información Personal',
  'payment-methods': 'Métodos de Pago',
  'booking-history': 'Historial de Reservas',
  'privacy': 'Privacidad',
  'terms': 'Términos y Condiciones',
} as const;

// Utilidades para trabajar con rutas
export const RouteUtils = {
  /**
   * Obtiene el título de una ruta
   */
  getRouteTitle: (pathname: string): string => {
    return ROUTE_CONFIG[pathname as keyof typeof ROUTE_CONFIG] || 'Página';
  },

  /**
   * Obtiene el título para breadcrumb (con fallback a título normal)
   */
  getBreadcrumbTitle: (segment: string): string => {
    const key = decodeURIComponent(segment).toLowerCase();
    return BREADCRUMB_CONFIG[key as keyof typeof BREADCRUMB_CONFIG] || 
           segment.charAt(0).toUpperCase() + segment.slice(1);
  },

  /**
   * Genera un título dinámico desde un segmento de ruta
   */
  generateDynamicTitle: (segment: string): string => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  /**
   * Obtiene la ruta padre
   */
  getParentPath: (pathname: string): string => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length <= 1) return '/';
    
    const parentSegments = segments.slice(0, -1);
    return '/' + parentSegments.join('/');
  },

  /**
   * Obtiene la profundidad de la ruta
   */
  getPathDepth: (pathname: string): number => {
    if (pathname === '/') return 1;
    return pathname.split('/').filter(Boolean).length;
  },

  /**
   * Verifica si una ruta es una subsección
   */
  isSubSection: (pathname: string, basePath: string): boolean => {
    return pathname !== basePath && pathname.startsWith(basePath + '/');
  },

  /**
   * Obtiene todos los segmentos de ruta con sus URLs
   */
  getRouteSegments: (pathname: string) => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => ({
      name: segment,
      path: '/' + segments.slice(0, index + 1).join('/'),
      title: RouteUtils.getBreadcrumbTitle(segment),
    }));
  },

  // Nuevas funciones para autenticación
  /**
   * Obtiene las rutas que requieren autenticación
   */
  getProtectedRoutes: (): string[] => {
    return ['/profile', '/bookings', '/settings', '/admin'];
  },

  /**
   * Verifica si una ruta requiere autenticación
   */
  isProtectedRoute: (pathname: string): boolean => {
    const protectedRoutes = RouteUtils.getProtectedRoutes();
    return protectedRoutes.some(route => 
      pathname === route || pathname.startsWith(route + '/')
    );
  },

  /**
   * Obtiene la ruta padre para redirección de autenticación
   */
  getAuthParentRoute: (pathname: string): string => {
    const protectedRoutes = RouteUtils.getProtectedRoutes();
    
    // Verificar si la ruta actual es un child de una ruta protegida
    for (const protectedRoute of protectedRoutes) {
      if (RouteUtils.isSubSection(pathname, protectedRoute)) {
        return protectedRoute;
      }
    }
    
    // Si no es un child de una ruta protegida, redirigir al home con login
    return "/?login=1";
  },

  /**
   * Obtiene información completa de una ruta para autenticación
   */
  getRouteAuthInfo: (pathname: string) => {
    return {
      isProtected: RouteUtils.isProtectedRoute(pathname),
      parentRoute: RouteUtils.getAuthParentRoute(pathname),
      isChildRoute: RouteUtils.getProtectedRoutes().some(route => 
        RouteUtils.isSubSection(pathname, route)
      )
    };
  },
};

// Tipos TypeScript
export type RouteKey = keyof typeof ROUTE_CONFIG;
export type BreadcrumbKey = keyof typeof BREADCRUMB_CONFIG;

export interface RouteInfo {
  title: string;
  parentPath: string;
  showBackButton: boolean;
  depth: number;
  segments: Array<{
    name: string;
    path: string;
    title: string;
  }>;
}