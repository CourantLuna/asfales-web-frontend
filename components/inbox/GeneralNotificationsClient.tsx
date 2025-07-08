// components/GeneralNotificationsClient.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShowIfUnauth } from "@/components/ShowIfUnauth";
import { ShowIfAuth } from "@/components/ShowIfAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Datos de ejemplo
const mockNotifications = [
  { id: "1", title: "Cambio de tarifa en vuelo ABC123", date: "2025-06-20" },
  { id: "2", title: "Nuevo alojamiento disponible en París", date: "2025-06-22" },
];

export default function NotificationsClient() {
  return (
    <div >
      <ShowIfUnauth>
        <div className="w-full flex-1 flex flex-col h-full text-center items-center mt-20">
          <Image
            src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/NotificationNoAuthIcon-UwuOMtm7SHX3ClXBxLTIu9fw7SV5oM.svg"
            alt="Lock Icon"
            width={150}
            height={150}
            className="opacity-80"
          />
          <h3 className="text-xl font-semibold text-foreground">
            Mantente al tanto de tus notificaciones
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm text-center">
            Aquí recibirás alertas sobre tus viajes y tu cuenta. Inicia sesión para no perderte nada.
          </p>
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

      <ShowIfAuth>
        {mockNotifications.length === 0 ? (
          <div className="flex flex-col items-center py-20 space-y-4">
            <Bell className="w-12 h-12 text-primary opacity-80" />
            <h3 className="text-xl font-semibold text-foreground">
              No tienes notificaciones
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Cuando ocurran actualizaciones importantes, aquí las verás.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockNotifications.map((notif) => (
              <Card key={notif.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{notif.title}</span>
                    <span className="text-xs text-muted-foreground">{notif.date}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <Link href={`/notifications/${notif.id}`} className="text-primary hover:underline">
                      Ver detalles
                    </Link>
                  </p>
                </CardContent>
              </Card>
            ))}
            <Separator className="my-4" />
            <div className="text-right">
              <Button variant="outline" asChild>
                <Link href="/notifications">Ver todas</Link>
              </Button>
            </div>
          </div>
        )}
      </ShowIfAuth>
    </div>
  );
}
