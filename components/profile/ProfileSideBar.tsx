"use client";

import { Button } from "@/components/ui/button";
import { 
  ChevronRight,
  User,
  Bell,
  CreditCard,
  Gift,
  Star,
  Shield,
  MessageCircle,
  DollarSign,
  Medal,
  LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { useAuth } from "@/lib/hooks/useAuth";
import { ShowIfAuth } from "../ShowIfAuth";
import { set } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileSideBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Detectar si estamos en una página de sección específica
  const isInSpecificSection = pathname?.includes('/profile/') && pathname !== '/profile';

const handleLogout = () => {
    logout(); // limpia sessionStorage y setUser(null)
  };

    const { user, logout, token } = useAuth();

     useEffect(() => {
  // Solo ejecuta logout si hay usuario, pero su token es falso o vacío
  if (user && !token) {
    logout();
    setActiveSection(null); // Limpia la sección activa al hacer logout
  }
  // Si user ya es null, no vuelve a entrar aquí
}, [user, logout]);


  const getFirstName = (name: string) => name?.split(" ")[0] ?? "";
  const getEmail = (email: string) => email?.split(" ")[0] ?? "";

    const [activeSection, setActiveSection] = useState<string | null>("");

    useEffect(() => {
  // Función para detectar el tamaño de pantalla
  const checkScreenSize = () => {
    const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
    
    if (pathname === '/profile') {
      if (isLargeScreen && user) {
        // En pantallas grandes, activar profile-info por defecto
        setActiveSection('profile-info');
        handleSectionChange('profile-info');
      } else {
        // En pantallas pequeñas, no activar ninguna sección
        setActiveSection(null);
      }
    } else if (pathname?.includes('/profile/') && user) {
      // Extraer la sección de la URL
      const sectionId = pathname.split('/profile/')[1];
      setActiveSection(sectionId);
      handleSectionChange(sectionId);
    }
  };

  // Ejecutar al cargar y al cambiar la ruta
  checkScreenSize();

  // Agregar listener para cambios de tamaño de pantalla
  window.addEventListener('resize', checkScreenSize);

  // Limpiar listener al desmontar
  return () => window.removeEventListener('resize', checkScreenSize);
}, [pathname]);


  const handleSectionChange = (sectionId: string) => {
      router.push(`/profile/${sectionId}`);
    // En desktop, cambiar contenido en la misma página
    setActiveSection(sectionId);
   
  };

  
  const sidebarItems = [
    {
      id: "profile-info",
      icon: User,
      title: "Perfil",
      subtitle: "Proporciona tus datos personales y detalles de viaje"
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Comunicaciones",
      subtitle: "Controla qué notificaciones recibes"
    },
    {
      id: "payments",
      icon: CreditCard,
      title: "Métodos de pago",
      subtitle: "Ve métodos de pago guardados"
    },
    {
      id: "coupons",
      icon: Gift,
      title: "Cupones",
      subtitle: "Ve tus cupones disponibles"
    },
    {
      id: "credits",
      icon: DollarSign,
      title: "Créditos",
      subtitle: "Ve tus créditos de aerolínea activos"
    },
    {
      id: "reviews",
      icon: Star,
      title: "Reseñas",
      subtitle: "Lee reseñas que has escrito"
    },
    {
      id: "security",
      icon: Shield,
      title: "Seguridad y configuración",
      subtitle: "Actualiza tu email o contraseña"
    },
    {
      id: "help",
      icon: MessageCircle,
      title: "Ayuda y comentarios",
      subtitle: "Obtén soporte al cliente"
    }
  ];

   return (
       <ShowIfAuth>
          {/* Sidebar - Oculto en mobile cuando está en una sección específica */}
          <div className={`w-full lg:w-80 ${
            isInSpecificSection ? 'hidden lg:block' : 'block'
          }`}>
            {/* Header */}
            <div className="pb-4 p-1">
              <div className="flex items-center space-x-3">
                 { user? (
                  <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || ""} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                 ):(
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">HG</span>
                </div>
                 )
                 }
                
                <div>
                  <h1 className="font-semibold text-2xl  text-primary">Hola, {getFirstName(user?.name ?? "usuario")}</h1>
                  <p className="text-sm text-gray-500">{getEmail(user?.email ?? "usuario@gmail.com")}</p>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-gray-200 w-full">
                <div className="flex items-center justify-center mb-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">Blue</span>
                </div>
                <div className="flex items-center justify-center mb-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-900">GoFarPass™</span>
                    <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">?</span>
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3 text-center">$0.00</div>
                <div className="flex items-center justify-center">
                  <button className="flex items-center justify-between w-full text-sm text-gray-700 hover:text-gray-900">
                    <Medal className="w-4 h-4 mr-2" />
                    <span>Ver actividad de recompensas</span>
                    <ChevronRight className={`w-4 h-4`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-1">
              <div className="space-y-4">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id 
                        ? "bg-blue-50 border border-blue-200 text-blue-600" 
                        : "hover:bg-gray-50 text-gray-700 border border-gray-200"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${
                      activeSection === item.id ? "text-blue-600" : "text-gray-400"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        activeSection === item.id ? "text-blue-600" : "text-gray-900"
                      }`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.subtitle}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${
                      activeSection === item.id ? "text-blue-600" : "text-gray-400"
                    }`} />
                  </button>
                ))}
              </div>

              {/* Sign Out Button */}
              <div className="mt-8 pt-6 border-t">
                <Button variant="ghost" className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>
       </ShowIfAuth>
   );
}