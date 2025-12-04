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

    const { user, logout, token } = useAuth();

     useEffect(() => {
  // Solo ejecuta logout si hay usuario, pero su token es falso o vacío
  if (user && !token) {
    logout();
  }
  // Si user ya es null, no vuelve a entrar aquí
}, [user, logout]);



  return (
          <div className="w-full flex-1 flex flex-col h-full justify-content-center">
                <ShowIfUnauth>

    {/* Unauth Profile */}
    
 <div className="items-center justify-center flex-1 flex flex-col space-y-4 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Image
            src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/profile-unauth-FErUU7QQAv7opa1vJJdUuoLaNuqfP3.png"
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


    </ShowIfUnauth>

    
    </div>
  );
}
