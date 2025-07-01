"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { CalendarPlus, PlusCircle, Users, CheckCircle } from "lucide-react";

export default function ItineraryPlanSection() {
  return (
    <section className=" py-12">
      <div className="max-w-7xl mx-auto px-8 lg:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800 text-start">
          Planifica tu itinerario paso a paso
        </h2>
        <p className="text-muted-foreground mt-2 text-start mb-10">
          Sigue esta guía rápida para crear y gestionar tu itinerario de viaje.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, icon: CalendarPlus, title: "Crea tu itinerario", desc: "Define fechas, destinos y nombre de tu plan." },
            { step: 2, icon: PlusCircle, title: "Agrega segmentos", desc: "Incorpora transporte, alojamientos y actividades." },
            { step: 3, icon: Users, title: "Invita a tu grupo", desc: "Comparte tu itinerario con amigos o familiares." },
            { step: 4, icon: CheckCircle, title: "Publica y reserva", desc: "Finaliza y convierte tu plan en reservas reales en un clic." }
          ].map(({ step, icon: Icon, title, desc }) => (
            <Card key={step} className="relative flex flex-col items-center p-6 pt-12 hover:shadow-lg transition">
              {/* Número como overlay */}
              <div className="absolute top-4 left-4 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
                <span className="font-semibold text-sm">{step}</span>
              </div>
              {/* Icono, título y descripción */}
              <Icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
              <p className="text-center text-sm text-muted-foreground">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
