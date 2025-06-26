"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageSquare, MoreVertical, Minus, Laptop } from "lucide-react"

export default function SupportChat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* FAB Botón flotante */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full shadow-md px-4 py-2 flex items-center gap-2 text-primary border border-primary"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="font-medium">Ayuda</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[370px] sm:w-[400px] p-0 flex flex-col h-screen"
        >
          {/* Banner superior */}
          <div className="flex justify-between items-center px-4">
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <Minus className="w-5 h-5 text-muted-foreground" />
            </Button>
            {/* <div className="font-semibold text-sm text-center">
              Virtual Agent
            </div> */}
            {/* <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </Button> */}
          </div>

          {/* Encabezado con logo */}
          <div className="flex justify-center items-center pb-2  border-b">
            <div className="flex flex-col items-center ">
              <div className="bg-white p-0 rounded-full shadow-sm">
                <Laptop className="w-10 h-10" />
                  
              </div>
              <h3 className="text-sm font-semibold">Virtual Agent</h3>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            <div className="text-xs text-muted-foreground text-center border-b pb-2">
              Hoy
            </div>

            <div className="flex flex-col space-y-2">
              <div className="bg-muted p-3 rounded-lg text-sm w-fit">
                Hi, I’m your Virtual Agent. 👋 I’m here to help with your travel plans.
              </div>
              <div className="bg-muted p-3 rounded-lg text-sm w-fit">
                Just to let you know, I sometimes use AI to answer your questions. Also, this conversation may be recorded to help improve your experience.
              </div>
              <div className="bg-muted p-3 rounded-lg text-sm w-fit">
                To get started, type a question, or choose an option below.
              </div>
              <span className="text-[10px] text-muted-foreground">3:08 AM</span>
            </div>
          </div>

          {/* Respuestas rápidas */}
          <div className="flex flex-wrap gap-2 px-4 py-2 border-t">
            {[
              "Ver estado de cancelación",
              "Cambiar reserva",
              "Estado de reembolso",
              "Usar crédito de vuelo",
              "Administrar recompensas",
            ].map((label) => (
              <Button
                key={label}
                variant="outline"
                className="text-xs px-3 py-1"
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Footer de input */}
          <div className="px-4 py-3 border-t flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <span className="text-xl">＋</span>
            </Button>
            <Input
              type="text"
              placeholder="Escribe un mensaje"
              className="flex-1 text-sm"
            />
            <Button size="icon" className="bg-primary text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
