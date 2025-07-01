"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Settings, 
  Scale, 
  HelpCircle, 
  ChevronRight,
  User,
  Shield,
  CreditCard,
  Bell,
  Globe,
  LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const menuItems = [
    {
      icon: Settings,
      title: "Configuración",
      subtitle: "Preferencias de cuenta y notificaciones",
      href: "/profile/settings"
    },
    {
      icon: CreditCard,
      title: "Métodos de pago",
      subtitle: "Gestiona tus tarjetas y métodos de pago",
      href: "/profile/payment-methods"
    },
    {
      icon: Bell,
      title: "Notificaciones",
      subtitle: "Configura cómo recibir actualizaciones",
      href: "/profile/notifications"
    },
    {
      icon: Shield,
      title: "Privacidad y seguridad",
      subtitle: "Controla tu información personal",
      href: "/profile/privacy"
    },
    {
      icon: Scale,
      title: "Información legal",
      subtitle: "Términos, políticas y condiciones",
      href: "/profile/legal"
    },
    {
      icon: HelpCircle,
      title: "Ayuda y comentarios",
      subtitle: "Soporte técnico y sugerencias",
      href: "/profile/help"
    }
  ];

  const handleMenuItemClick = (href: string) => {
    router.push(href);
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoutClick = () => {
    // Aquí iría la lógica de logout
    console.log("Logout clicked");
  };

  return (
    <div className="top-12 bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-8">Mi Cuenta</h1>
          
          {/* Login Button */}
          <Button 
            onClick={handleLoginClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-full text-lg"
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
            className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer"
          >
            <CardContent className="flex items-center p-4">
              <div className="flex items-center flex-1">
                <item.icon className="w-6 h-6 text-white mr-4" />
                <div className="flex-1">
                  <h3 className="text-white font-medium text-base">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Partner Logos */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex justify-center items-center space-x-8 opacity-60">
          {/* Placeholder for partner logos - using text for now */}
          <div className="text-slate-600 font-bold text-lg">Booking</div>
          <div className="text-slate-600 font-bold text-lg">Airbnb</div>
          <div className="text-slate-600 font-bold text-lg">Hotels</div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto px-4 py-8 text-center text-slate-500">
        <div className="space-y-2">
          <p className="text-sm">
            Versión: Asfales 2025.1.0 Build 1001
          </p>
          <p className="text-xs">
            © Copyright 2024-2025 Asfales Group
          </p>
          <p className="text-xs">
            Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Logout Button (if logged in) */}
      <div className="max-w-md mx-auto px-4 pb-8">
        <Button 
          onClick={handleLogoutClick}
          variant="outline" 
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
