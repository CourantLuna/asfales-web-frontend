// components/ChatsClient.tsx
"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShowIfAuth } from "@/components/ShowIfAuth";
import { ShowIfUnauth } from "@/components/ShowIfUnauth";
import Image from "next/image";

// Datos de ejemplo
const mockChats = [
  { id: "1", with: "Hotel Central", lastMessage: "¡Su reserva está confirmada!", date: "2025-06-25" },
  { id: "2", with: "Guía Tour París", lastMessage: "Le paso el itinerario", date: "2025-06-26" },
];

export default function ChatsClient() {
  return (
    <div>
      <ShowIfAuth>
        {mockChats.length === 0 ? (
          <div className="flex flex-col items-center">
            <MessageCircle className="w-12 h-12 text-primary opacity-80" />
            <h3 className="text-xl font-semibold text-foreground">
              No tienes mensajes
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Aquí aparecerán tus conversaciones con proveedores y guías.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockChats.map((chat) => (
              <Card key={chat.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Conversación con {chat.with}</span>
                    <span className="text-xs text-muted-foreground">{chat.date}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                  <div className="mt-2 text-right">
                    <Button variant="link" asChild>
                      <Link href={`/chats/${chat.id}`} className="text-primary hover:underline">
                        Abrir chat
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Separator className="my-4" />
            <div className="text-right">
              <Button variant="outline" asChild>
                <Link href="/chats">Ver todos los mensajes</Link>
              </Button>
            </div>
          </div>
        )}
      </ShowIfAuth>
      <ShowIfUnauth>
        <div className="w-full flex-1 flex flex-col h-full text-center items-center mt-20">
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
