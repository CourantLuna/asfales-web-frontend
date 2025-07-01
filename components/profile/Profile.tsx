"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Settings, 
  Scale, 
  HelpCircle, 
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
import { useRouter, useSearchParams } from "next/navigation";
import { ShowIfUnauth } from "../ShowIfUnauth";
import { ShowIfAuth } from "../ShowIfAuth";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Importar componentes de contenido
import ProfileInfo from "./ProfileInfo";
import NotificationsConfig from "./NotificationsConfig";
import PaymentMethods from "./PaymentMethods";
import Coupons from "./Coupons";
import Credits from "./Credits";
import Reviews from "./Reviews";
import SecuritySettings from "./SecuritySettings";
import HelpFeedback from "./HelpFeedback";
import { useAuth } from "@/lib/hooks/useAuth";


export default function Profile() {
  const router = useRouter();

const handleLogout = () => {
    logout(); // limpia localStorage y setUser(null)

    // Reconstruye la URL manteniendo la ruta actual y añadiendo ?logout=1
    const url = `?logout=1`;

    // Cambia la URL sin recargar la app entera
    router.push(url);
  };

    const { user, logout } = useAuth();

     useEffect(() => {
  // Solo ejecuta logout si hay usuario, pero su token es falso o vacío
  if (user && !user.token) {
    logout();
  }
  // Si user ya es null, no vuelve a entrar aquí
}, [user, logout]);

  const getFirstName = (name: string) => name?.split(" ")[0] ?? "";
  const getEmail = (email: string) => email?.split(" ")[0] ?? "";

  
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState("profile");

  // Leer la sección activa desde URL params
  useEffect(() => {
    const section = searchParams.get("section") || "profile";
    setActiveSection(section);
  }, [searchParams]);

  

  const sidebarItems = [
    {
      id: "profile",
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

  const menuItems = [
    {
      icon: Settings,
      title: "Configuración",
      href: "/profile/settings"
    },
    {
      icon: Scale,
      title: "Información legal",
      href: "/profile/legal"
    },
    {
      icon: HelpCircle,
      title: "Ayuda y comentarios",
      href: "/profile/help"
    }
  ];

  const handleSectionChange = (sectionId: string) => {
    // En pantallas menores a lg, navegar a página separada
    if (window.innerWidth < 1024) { // lg breakpoint es 1024px
      router.push(`/profile/${sectionId}`);
      return;
    }
    
    // En desktop, cambiar contenido en la misma página
    setActiveSection(sectionId);
    // Opcional: actualizar URL
    const newUrl = `${window.location.pathname}?section=${sectionId}`;
    window.history.pushState(null, "", newUrl);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileInfo />;
      case "notifications":
        return <NotificationsConfig />;
      case "payments":
        return <PaymentMethods />;
      case "coupons":
        return <Coupons />;
      case "credits":
        return <Credits />;
      case "reviews":
        return <Reviews />;
      case "security":
        return <SecuritySettings />;
      case "help":
        return <HelpFeedback />;
      default:
        return <ProfileInfo />;
    }
  };

  const handleMenuItemClick = (href: string) => {
    router.push(href);
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
          <>
                <ShowIfUnauth>
    
    {/* Mobile Unauth Profile */}
    <div className="md:hidden bg-gray-100">
      {/* Header */}
      <div className=" px-4 py-8">
        <div className="max-w-md mx-auto text-center">          
          {/* Login Button */}
          <Button 
            onClick={handleLoginClick}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-full text-lg"
            size="lg"
          >
            Iniciar sesión
          </Button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-3">
        {menuItems.map((item, index) => (
          <Card 
            key={index} 
            onClick={() => handleMenuItemClick(item.href)}
            className="bg-white border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
          >
            <CardContent className="flex items-center p-4">
              <div className="flex items-center flex-1">
                <item.icon className="w-6 h-6 text-gray-700 mr-4" />
                <div className="flex-1">
                  <h3 className="text-gray-900 font-medium text-base">
                    {item.title}
                  </h3>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Partner Logos */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex justify-center items-center space-x-8 opacity-60">
          <div className="text-gray-500 font-bold text-lg">Asfales</div>
          <div className="text-gray-500 font-bold text-lg">Hotels.com</div>
          <div className="text-gray-500 font-bold text-lg">Vrbo</div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto px-4 py-8 text-center text-gray-500">
        <div className="space-y-2">
          <p className="text-sm">
            Versión: Asfales 2025.25.912 Build 4562
          </p>
          <p className="text-xs">
            © Copyright 2012–2025 Asfales Group
          </p>
          <p className="text-xs">
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>

    {/* Desktop Unauth Profile */}
    <div className="hidden md:block ">
 <div className="flex flex-col items-center justify-center mt-[190px]  space-y-4 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Image
            src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/ChatsNoAuthIcon-MOcuXqMiznUOYyhUhXIzNq2JDIvhg9.svg"
            alt="Lock Icon"
            width={150}
            height={150}
            className="opacity-80"
          />
          <h3 className="text-xl font-semibold text-foreground">
            Inicia sesión para revisar tus mensajes
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm text-center">
            Aquí verás los mensajes enviados o recibidos de hoteles y actividades.
          </p>
          </div>
         <div className="flex flex-col items-center space-y-2 mt-5">
           <Link href="/login">
            <Button className="px-6 py-2 h-12 w-[280px]">Iniciar sesión</Button>
          </Link>
          <Link href="/register">
            <Button variant={"link"} className="px-6 py-2 h-12 w-[280px]">Crear cuenta</Button>
          </Link>
         </div>
        </div>        
    </div>

    </ShowIfUnauth>

    <ShowIfAuth>
      <div className="md:hidden mb-1 border-b   w-full">
              <h1 className="text-xl text-center font-semibold m-4 text-secondary ">Perfil</h1>
      </div>
      <div className="w-full pt-1 pb-2 px-4 md:p-6">

        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Sidebar */}
          <div className="w-full md:w-80 bg-white">
            {/* Header */}
            <div className="pb-4 p-1">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">HG</span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Hola, {getFirstName(user?.name ?? "usuario")}</h2>
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
                  <button className="flex items-center text-sm text-gray-700 hover:text-gray-900">
                    <Medal className="w-4 h-4 mr-2" />
                    <span>Ver actividad de recompensas</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-1 md:p-4">
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
                    <ChevronRight className={`w-4 h-4 md:hidden ${
                      activeSection === item.id ? "text-blue-600" : "text-gray-400"
                    }`} />
                  </button>
                ))}
              </div>

              {/* Sign Out Button */}
              <div className="mt-8 pt-6 border-t">
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content - Solo en desktop (lg+) */}
          <div className="flex-1 p-4 md:p-8 hidden lg:block">
            {renderContent()}
          </div>
        </div>
      </div>
    </ShowIfAuth>
    </>
  );
}
