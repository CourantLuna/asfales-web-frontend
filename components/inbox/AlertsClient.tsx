// components/AlertsClient.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {  Edit2 } from "lucide-react";
import Link from "next/link";
import { ShowIfUnauth } from "@/components/ShowIfUnauth";
import { ShowIfAuth } from "@/components/ShowIfAuth";
import Image from "next/image";

const mockAlerts = [
  { id: "1", name: "Subida de precio en vuelos", enabled: true },
  { id: "2", name: "Disponibilidad en hotel X", enabled: false },
];

export default function AlertsClient() {
  return (
    <div>
      <ShowIfAuth>
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          {mockAlerts.length === 0 ? (
            <div className="flex flex-col items-center py-20 space-y-4">
              <p className="text-sm text-muted-foreground">
                Aún no tienes alertas configuradas.
              </p>
              <Link href="/alerts/new">
                <Button>Crear mi primera alerta</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockAlerts.map((alert) => (
                <Card key={alert.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{alert.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                      >
                        <Link href={`/alerts/${alert.id}/edit`}>
                          <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </Link>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {alert.enabled ? "Activada" : "Desactivada"}
                    </p>
                  </CardContent>
                </Card>
              ))}

              <Separator />

              <div className="text-right">
                <Link href="/alerts/new">
                  <Button variant="outline">Crear nueva alerta</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </ShowIfAuth>

      <ShowIfUnauth>
        <div className="w-full flex-1 flex flex-col h-full text-center items-center mt-20">
          <Image
            src="https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/AlertsNoAuthIcon-vVX6vXUoLuaODu6m3e8sDcW2j6ts49.svg"
            alt="Lock Icon"
            width={150}
            height={150}
            className="opacity-80"
          />
          <h3 className="text-xl font-semibold text-foreground">
            Inicia sesión para gestionar tus alertas
          </h3>
          <p className="text-sm text-muted-foreground max-w-md text-center">
            Aquí podrás crear y administrar tus alertas personalizadas de precios y disponibilidad.
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
    </div>
  );
}
