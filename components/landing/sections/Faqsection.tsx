"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import React from "react";

export default function FAQSection() {
  return (
    <section className="w-full px-6 py-8 text-start">
     <div className="max-w-7xl mx-auto">
         <h2 className="text-3xl font-bold tracking-tight text-gray-800 text-start">Preguntas Frecuentes</h2>
      <p className="text-muted-foreground mt-2 text-start mb-10">
        Aquí encontrarás respuestas a las dudas más comunes sobre cómo usar Asfales y aprovechar al máximo todas sus funcionalidades.
      </p>

      <Accordion type="single" collapsible className="space-y-4 text-start">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">¿Qué es Asfales y cómo funciona?</AccordionTrigger>
          <AccordionContent className="text-left">
            Asfales es una plataforma inteligente de viajes que te permite buscar, comparar y reservar transporte, alojamientos, itinerarios y actividades. Utiliza filtros personalizados y predicciones de precios para ayudarte a planificar la mejor experiencia.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">¿Cómo busco y comparo opciones de viaje?</AccordionTrigger>
          <AccordionContent className="text-left">
            Ve a la sección "Explorar", selecciona tu categoría (transporte, alojamientos, actividades o itinerarios) e ingresa tus criterios de búsqueda. Luego usa la opción "Comparar" para ver diferentes propuestas y generar un informe detallado.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">¿Cómo creo, edito y comparto un itinerario?</AccordionTrigger>
          <AccordionContent className="text-left">
            En la sección de "Itinerarios" haz clic en "Crear nuevo itinerario". Agrega segmentos manualmente o desde resultados de búsqueda, luego edita o reordena las etapas. Finalmente, usa "Compartir itinerario" para invitar colaboradores o generar un enlace público.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left">¿Cómo funcionan las alertas y notificaciones?</AccordionTrigger>
          <AccordionContent className="text-left">
            Activa las alertas personalizadas en "Servicios {">"} Activar alertas" para recibir avisos de cambios de tarifas o disponibilidad. También recibirás invitaciones a itinerarios compartidos y recomendaciones automáticas basadas en tus preferencias.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-left">¿Qué métodos de pago aceptan?</AccordionTrigger>
          <AccordionContent className="text-left">
            Asfales acepta tarjetas de crédito y débito principales (Visa, MasterCard, American Express) y pago con saldo GoFar-Cash acumulado al reservar. Próximamente implementaremos otras formas de pago locales.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-left">¿Cómo puedo contactar al soporte?</AccordionTrigger>
          <AccordionContent className="text-left">
            Dirígete a la sección "Ayuda" y selecciona "Centro de ayuda" o "Iniciar chat en vivo". Nuestro equipo de soporte está disponible 24/7 para resolver cualquier duda.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
     </div>
    </section>
  );
}
