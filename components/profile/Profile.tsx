"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Settings, 
  Scale, 
  HelpCircle, 
  ChevronRight,
 
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShowIfUnauth } from "../ShowIfUnauth";
import Link from "next/link";
import Image from "next/image";
import {  useEffect } from "react";

import { useAuth } from "@/lib/hooks/useAuth";

export default function Profile() {
  const router = useRouter();

    const { user, logout } = useAuth();

     useEffect(() => {
  // Solo ejecuta logout si hay usuario, pero su token es falso o vacío
  if (user && !user.token) {
    logout();
  }
  // Si user ya es null, no vuelve a entrar aquí
}, [user, logout]);


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

    
    </>
  );
}
