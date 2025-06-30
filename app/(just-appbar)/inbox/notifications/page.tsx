"use client";
export const dynamic = "force-dynamic";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShowIfUnauth } from "@/components/ShowIfUnauth";
import { ShowIfAuth } from "@/components/ShowIfAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function NotificationsPage() {
    // Datos de ejemplo
const mockNotifications = [
  { id: "1", title: "Cambio de tarifa en vuelo ABC123", date: "2025-06-20" },
  { id: "2", title: "Nuevo alojamiento disponible en París", date: "2025-06-22" },
];
  return (
 <div>
      <ShowIfUnauth>
     <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
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
      <Link href="/login">
        <Button className="px-6 py-2">Iniciar sesión</Button>
      </Link>
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
                  <Link href={`/inbox/notifications/${notif.id}`} className="text-primary hover:underline">
                    Ver detalles
                  </Link>
                </p>
              </CardContent>
            </Card>
          ))}
          <Separator className="my-4" />
          <div className="text-right">
            <Button variant="outline" asChild>
              <Link href="/inbox/notifications">Ver todas</Link>
            </Button>
          </div>
        </div>
      )}
    </ShowIfAuth>
 </div>
  );
}
