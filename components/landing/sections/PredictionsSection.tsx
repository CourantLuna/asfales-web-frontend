"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Datos ejemplo para el gráfico
const sampleData = [
  { month: "Ene", price: 120 },
  { month: "Feb", price: 115 },
  { month: "Mar", price: 130 },
  { month: "Abr", price: 125 },
  { month: "May", price: 140 },
  { month: "Jun", price: 135 },
  { month: "Jul", price: 150 },
  { month: "Ago", price: 145 },
  { month: "Sep", price: 155 },
  { month: "Oct", price: 160 },
  { month: "Nov", price: 150 },
  { month: "Dic", price: 170 },
];

export default function PredictionsSection() {
  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Predicciones y tendencias del mercado
        </h2>
        <Separator className="mx-auto my-4 w-24" />
        <p className="text-muted-foreground mb-8">
          Nuestro algoritmo predictivo analiza datos históricos de precios, demanda y factores estacionales para ayudarte a encontrar el mejor momento para reservar tu viaje.
        </p>

        <Card className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Button
          variant="secondary"
          size="lg"
          className="mt-8"
          onClick={() => console.log("CTA Predicciones clic")}
        >
          Conoce el mejor momento para viajar
        </Button>
      </div>
    </section>
  );
}
