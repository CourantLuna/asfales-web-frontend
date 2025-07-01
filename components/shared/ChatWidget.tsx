"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MessageSquare, MoreVertical, Minus, Plus, Send, Laptop, MessagesSquare } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"


export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<string[]>([
    "Hola, soy tu asistente virtual 👋",
    "¿En qué puedo ayudarte hoy?",
  ])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, input])
    setInput("")
  }

    const isMobile = useIsMobile();


  return (
    <>
      {/* FAB Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg text-primary hover:text-white hover:bg-primary"
        variant="outline"
        size = {isMobile ? "icon" : "default"}
      >
        <MessagesSquare className="w-8 h-8" />
       { isMobile ? null :  
       isOpen ? (
          <span>Te estoy ayudando</span>
        ) : (
          <span>Te ayudo</span>
        )}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/10"
        />
      )}

      {/* Chat Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "fixed bottom-20 right-6 w-[360px] max-h-[600px] bg-white border rounded-xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 z-50",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Banner */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <Minus className="w-4 h-4" />
          </Button>
          <div className="flex justify-center items-center pb-2">
            <div className="flex flex-col items-center ">
              <Laptop className="w-10 h-10" />
              <h3 className="text-sm font-semibold">Asistente virtual</h3>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 text-sm text-muted-foreground">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="bg-muted rounded-lg px-3 py-2 max-w-[85%]"
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Quick replies */}
        <div className="flex flex-wrap gap-2 px-3 py-2 border-t bg-white">
          {["Ver reservas", "Cambiar vuelo", "Cancelar viaje"].map((text, i) => (
            <button
              key={i}
              onClick={() => setMessages([...messages, text])}
              className="text-xs bg-muted hover:bg-muted/80 px-3 py-1 rounded-full"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2 border-t">
          <Button size="icon" variant="ghost">
            <Plus className="w-4 h-4" />
          </Button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe un mensaje..."
            className="flex-1 text-sm px-3 py-2 bg-background rounded-md border"
          />
          <Button size="icon" variant="ghost" onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
