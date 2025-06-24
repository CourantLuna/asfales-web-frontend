"use client";
import { useEffect, useState } from "react";
import ReportGenerator from "@/components/reports/ReportGenerator";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Plane, Hotel, Mountain, Route } from "lucide-react";

import { ComparisonTable, ComparisonRow } from "@/components/ComparisonTable";
import { Combobox } from "../ui/combobox";

import CustomTable, { Action, Column, RowData } from "@/components/CustomTable";

const transportColumns: Column[] = [
  { field: 'provider', header: 'Proveedor', type: 'text' },
  { field: 'images', header: '', type: 'images' },
  { field: 'route', header: 'Ruta', type: 'text' },
  {
    header: "Calificación",
    type: "text",
structure: "ratingScore-ratingLabel/reviews-{{opiniones}}",
    fields: [
      { field: "ratingScore", type: "badge", className: "bg-green-600 text-white text-xs font-semibold" },
      { field: "ratingLabel", type: "text", className: "text-sm font-medium text-gray-800" },
      { field: "reviews", type: "number", className: "text-xs text-muted-foreground" },
    ],
  },
  { field: 'price', header: 'Precio', type: 'text', className: 'bg-muted/50 text-primary font-bold' },
  { field: 'departAt', header: 'Hora Salida', type: 'time' },
  { field: 'arriveAt', header: 'Hora Llegada', type: 'time' },
  { field: 'benefits', header: 'Beneficios', type: 'benefits' },

];
const transportActions: Action[] = [
  { label: "Ver detalles", variant: "secondary" },
  { label: "Reservar" },
];
const transportData = [
  {
    provider: "Iberia",
    route: "Vuelo directo SDQ → MAD",
    price: "$580 USD",
    departAt: "2025-07-10T15:00:00-04:00",
    arriveAt: "2025-07-11T05:30:00+01:00",
    ratingLabel: "Excelente",
    ratingScore: 9.2,
    reviews: 1001,
    benefits: [
      { label: "Equipaje incluido", included: true },
      { label: "Reembolsable", included: true },
      { label: "WiFi a bordo", included: false },
      { label: "Asiento reclinable", included: true },
      { label: "Comida incluida", included: true },
    ],
    images: [["/flights/iberia-1.jpg", "/flights/iberia-2.jpg", "/flights/iberia-3.jpg"]],
  },
  {
    provider: "Air Europa",
    route: "1 escala vía MIA",
    price: "$430 USD",
    departAt: "2025-07-10T17:00:00-04:00",
    arriveAt: "2025-07-11T09:50:00+01:00",
    ratingLabel: "Muy Bueno",
    ratingScore: 8.4,
    reviews: 879,
    benefits: [
      { label: "Equipaje incluido", included: true },
      { label: "Reembolsable", included: true },
      { label: "WiFi a bordo", included: true },
      { label: "Asiento reclinable", included: true },
      { label: "Comida incluida", included: true },
    ],
    images: [["/flights/aireuropa-1.jpg"]],
  },
  {
    provider: "Expreso Bávaro",
    route: "Bus SDQ → Punta Cana",
    price: "$15 USD",
    departAt: "2025-07-10T08:00:00-04:00",
    arriveAt: "2025-07-10T10:30:00-04:00",
    ratingLabel: "Bueno",
    ratingScore: 7.8,
    reviews: 412,
    benefits: [
      { label: "Equipaje incluido", included: false },
      { label: "Reembolsable", included: false },
      { label: "WiFi a bordo", included: true },
      { label: "Asiento reclinable", included: true },
      { label: "Comida incluida", included: false },
    ],
    images: [["/flights/bavaro-1.jpg"]],
  },
];

const lodgingColumns: Column[] = [
  { field: "provider", header: "Alojamiento", type: "text" },
  { field: "images", header: "", type: "images", aspectRatio: "4:3" },
  { field: "location", header: "Ubicación", type: "text" },
  {
    header: "Calificación",
    type: "text",
    structure: "ratingScore-ratingLabel/reviews-{{opiniones}}",
    fields: [
      {
        field: "ratingScore",
        type: "badge",
        className: "bg-green-600 text-white text-xs font-semibold",
      },
      {
        field: "ratingLabel",
        type: "text",
        className: "text-sm font-medium text-gray-800",
      },
      {
        field: "reviews",
        type: "number",
        className: "text-xs text-muted-foreground",
      },
    ],
  },
  { field: "price", header: "Precio por noche", type: "text" },
  { field: "roomType", header: "Tamaño / Tipo", type: "text" },
  { field: "capacity", header: "Capacidad", type: "text" },
  { field: "checkInOut", header: "Check-in / Check-out", type: "text" },
  { field: "benefits", header: "Servicios", type: "benefits" },
];
const lodgingData: RowData[] = [
  {
    provider: "Hotel Riu Plaza",
    location: "Plaza de España",
    price: "$145 USD",
    ratingScore: 9.0,
    ratingLabel: "Excelente",
    reviews: 2311,
    roomType: "Habitación 24m²",
    capacity: "2 personas",
    checkInOut: "15:00 / 11:00",
    benefits: [
      { label: "WiFi gratis", included: true },
      { label: "Desayuno incluido", included: true },
      { label: "Aire acondicionado", included: true },
      { label: "Piscina", included: true },
      { label: "Mascotas permitidas", included: false },
      { label: "Cocina privada", included: false },
    ],
    images: [["/hotels/riu-1.jpg", "/hotels/riu-2.jpg", "/hotels/riu-3.jpg"]],
  },
  {
    provider: "ME Reina Victoria",
    location: "Plaza Santa Ana",
    price: "$189 USD",
    ratingScore: 8.7,
    ratingLabel: "Muy bueno",
    reviews: 1842,
    roomType: "Suite 40m²",
    capacity: "3 personas",
    checkInOut: "14:00 / 12:00",
    benefits: [
      { label: "WiFi gratis", included: true },
      { label: "Desayuno incluido", included: false },
      { label: "Aire acondicionado", included: true },
      { label: "Piscina", included: false },
      { label: "Mascotas permitidas", included: true },
      { label: "Cocina privada", included: false },
    ],
    images: [["/hotels/me-1.jpg", "/hotels/me-2.jpg", "/hotels/me-3.jpg"]],
  },
  {
    provider: "Madrid Centro Apt.",
    location: "Calle Gran Vía",
    price: "$99 USD",
    ratingScore: 8.4,
    ratingLabel: "Bueno",
    reviews: 1105,
    roomType: "Apartamento 55m²",
    capacity: "4 personas",
    checkInOut: "16:00 / 10:30",
    benefits: [
      { label: "WiFi gratis", included: true },
      { label: "Desayuno incluido", included: false },
      { label: "Aire acondicionado", included: true },
      { label: "Piscina", included: false },
      { label: "Mascotas permitidas", included: false },
      { label: "Cocina privada", included: true },
    ],
    images: [["/hotels/apart-1.jpg", "/hotels/apart-2.jpg"]],
  },
];
const lodgingActions: Action[] = [
  { label: "Ver detalles", variant: "secondary" },
  { label: "Reservar" },
];

const experiencesColumns: Column[] = [
  { field: "provider", header: "Experiencia", type: "text" },
  { field: "images", header: "", type: "images", aspectRatio: "16:9" },
  { field: "meetingPoint", header: "Punto de encuentro", type: "text" },
  {
    header: "Calificación",
    type: "text",
    structure: "ratingScore-ratingLabel/reviews-{{opiniones}}",
    fields: [
      {
        field: "ratingScore",
        type: "badge",
        className: "bg-green-600 text-white text-xs font-semibold",
      },
      {
        field: "ratingLabel",
        type: "text",
        className: "text-sm font-medium text-gray-800",
      },
      {
        field: "reviews",
        type: "number",
        className: "text-xs text-muted-foreground",
      },
    ],
  },
  { field: "duration", header: "Duración", type: "text" },
  { field: "availability", header: "Disponibilidad", type: "text" },
  { field: "price", header: "Precio", type: "text" },
  { field: "groupSize", header: "Tamaño del grupo", type: "text" },
  { field: "minAge", header: "Edad mínima", type: "text" },
  { field: "languages", header: "Idiomas disponibles", type: "text" },
  { field: "benefits", header: "Incluye", type: "benefits" },
];
const experiencesData: RowData[] = [
  {
    provider: "Palacio Real Tour",
    meetingPoint: "Puerta del Sol",
    duration: "2 horas",
    availability: "Lunes a Sábado",
    price: "$35 USD",
    groupSize: "Máx. 20 personas",
    minAge: "Todas las edades",
    languages: "Español, Inglés",
    ratingScore: 9.1,
    ratingLabel: "Excelente",
    reviews: 1012,
    benefits: [
      { label: "Entrada incluida", included: true },
      { label: "Guía profesional", included: true },
      { label: "Transporte", included: false },
      { label: "Accesible", included: true },
      { label: "Bebida gratuita", included: false },
    ],
    images: [["/experiences/palacio-1.jpg", "/experiences/palacio-2.jpg"]],
  },
  {
    provider: "Flamenco Show",
    meetingPoint: "Teatro Tablao - Calle Morería",
    duration: "1h 15min",
    availability: "Todos los días",
    price: "$49 USD",
    groupSize: "Aforo limitado",
    minAge: "+12 años",
    languages: "Solo Español",
    ratingScore: 8.8,
    ratingLabel: "Muy bueno",
    reviews: 837,
    benefits: [
      { label: "Entrada incluida", included: true },
      { label: "Guía profesional", included: false },
      { label: "Transporte", included: false },
      { label: "Accesible", included: false },
      { label: "Bebida gratuita", included: true },
    ],
    images: [["/experiences/flamenco-1.jpg", "/experiences/flamenco-2.jpg"]],
  },
  {
    provider: "Museo Prado + Paseo",
    meetingPoint: "Calle Felipe IV (entrada principal)",
    duration: "3 horas",
    availability: "Martes a Domingo",
    price: "$42 USD",
    groupSize: "Tour semi-privado",
    minAge: "+6 años",
    languages: "Español, Inglés, Francés",
    ratingScore: 9.0,
    ratingLabel: "Excelente",
    reviews: 645,
    benefits: [
      { label: "Entrada incluida", included: true },
      { label: "Guía profesional", included: true },
      { label: "Transporte", included: false },
      { label: "Accesible", included: true },
      { label: "Bebida gratuita", included: false },
    ],
    images: [["/experiences/prado-1.jpg", "/experiences/prado-2.jpg"]],
  },
];
const experiencesActions: Action[] = [
  { label: "Ver detalles", variant: "secondary" },
  { label: "Reservar" },
];

const itinerariesColumns: Column[] = [
  { field: "provider", header: "Plan", type: "text" },
  { field: "images", header: "", type: "images", aspectRatio: "4:3" },
  { field: "transport", header: "Transporte incluido", type: "text" },
  { field: "lodging", header: "Alojamiento", type: "text" },
  { field: "experiences", header: "Experiencias destacadas", type: "text" },
  { field: "duration", header: "Duración", type: "text" },
  { field: "price", header: "Precio total", type: "text" },
  {
    header: "Calificación paquete",
    type: "text",
    structure: "ratingScore-ratingLabel/reviews-{{reseñas}}",
    fields: [
      {
        field: "ratingScore",
        type: "badge",
        className: "bg-green-600 text-white text-xs font-semibold",
      },
      {
        field: "ratingLabel",
        type: "text",
        className: "text-sm font-medium text-gray-800",
      },
      {
        field: "reviews",
        type: "number",
        className: "text-xs text-muted-foreground",
      },
    ],
  },
];
const itinerariesData: RowData[] = [
  {
    provider: "Madrid Esencial (3 días)",
    transport: "Vuelo SDQ → MAD + traslados",
    lodging: "Hotel 3★ en Sol",
    experiences: "Palacio Real, tour tapas, Reina Sofía",
    duration: "3 días / 2 noches",
    price: "$780 USD",
    ratingScore: 9.4,
    ratingLabel: "Excelente",
    reviews: 127,
    images: [["/itinerarios/madrid1-1.jpg", "/itinerarios/madrid1-2.jpg"]],
  },
  {
    provider: "Madrid + Toledo (4 días)",
    transport: "Vuelo + traslado + excursión a Toledo",
    lodging: "Hotel 4★ en Gran Vía",
    experiences: "Museo del Prado, Toledo express",
    duration: "4 días / 3 noches",
    price: "$950 USD",
    ratingScore: 8.6,
    ratingLabel: "Muy bueno",
    reviews: 98,
    images: [["/itinerarios/madrid2-1.jpg", "/itinerarios/madrid2-2.jpg"]],
  },
  {
    provider: "Madrid Cultural Exprés (2 días)",
    transport: "Vuelo sin traslados",
    lodging: "Hostal boutique en Lavapiés",
    experiences: "Flamenco, paseo histórico nocturno",
    duration: "2 días / 1 noche",
    price: "$490 USD",
    ratingScore: 8.9,
    ratingLabel: "Bueno",
    reviews: 75,
    images: [["/itinerarios/madrid3-1.jpg", "/itinerarios/madrid3-2.jpg"]],
  },
];
const itinerariesActions: Action[] = [
  { label: "Ver detalles", variant: "secondary" },
  { label: "Unirse" },
];



export default function ComparisonDemo() {
  const [tab, setTab] = useState("transporte");
  const tabOptions = [
    { label: "Cómo llegar", value: "transporte", icon: Plane },
    { label: "Dónde dormir", value: "alojamientos", icon: Hotel },
    { label: "Qué hacer", value: "itinerarios", icon: Mountain },
    { label: "Planes completos", value: "experiencias", icon: Route },
  ];

  const classNameTabs = `flex-1 justify-center border-b-2 border-transparent" 
             data-[state=active]:border-primary 
             data-[state=active]:text-foreground 
             text-muted-foreground font-medium px-4 py-2 transition-colors`;
  return (
    <div>
    <section className="py-8 px-4 md:px-8 bg-white w-full max-w-screen-xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800">
          Comparando opciones de SDQ → Madrid
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
          Compara precios, duración, beneficios y toma decisiones inteligentes
        </p>
      </div>

      <Tabs
        defaultValue="transporte"
        value={tab}
        onValueChange={setTab}
        className="w-full flex flex-col items-center px-4"
      >
        {/* Combobox solo en móviles */}
        <div className="block w-[240px] md:hidden">
          <Combobox
            options={tabOptions}
            value={tab}
            onChange={setTab}
            placeholder="Selecciona una categoría"
          />
        </div>

        <TabsList className="hidden md:flex w-full justify-center mb-6 py-4">
          <TabsTrigger value="transporte" className={classNameTabs}>
            <Plane className="mr-2 w-4 h-4" /> Cómo llegar
          </TabsTrigger>
          <TabsTrigger value="alojamientos" className={classNameTabs}>
            <Hotel className="mr-2 w-4 h-4" /> Dónde dormir
          </TabsTrigger>
          <TabsTrigger value="experiencias" className={classNameTabs}>
            <Mountain className="mr-2 w-4 h-4" /> Qué hacer
          </TabsTrigger>
          <TabsTrigger value="itinerarios" className={classNameTabs}>
            <Route className="mr-2 w-4 h-4" /> Planes completos
          </TabsTrigger>
        </TabsList>

        {/* Transporte */}
        <TabsContent value="transporte">
          <div className="w-full">
            <div className="flex justify-between items-center mb-1 ">
              <ReportGenerator
                title="Informe Comparativo - Transporte"
                subtitle="Categoría: Transporte"
                origin="SDQ"
                destination="Madrid"
                headers={[
                  "Proveedor",
                  "Ruta",
                  "Precio",
                  "Duración",
                  "Calificación",
                ]}
                rows={[
                  [
                    "Iberia",
                    "Vuelo directo SDQ → MAD",
                    "$580 USD",
                    "8h 30min",
                    "9.2 (Excelente)",
                  ],
                  [
                    "Air Europa",
                    "1 escala vía MIA",
                    "$430 USD",
                    "12h 50min",
                    "8.4 (Muy Bueno)",
                  ],
                  [
                    "Expreso Bávaro",
                    "Bus SDQ → Punta Cana",
                    "$15 USD",
                    "2h 30min",
                    "7.8 (Bueno)",
                  ],
                ]}
              />
            </div>

            {/* Este wrapper es lo que se exportará como PDF */}
            <div className="rounded-xl py-4  overflow-x-auto bg-white">
              <CustomTable columns={transportColumns} data={transportData} actions={transportActions} rowHeader={0} tableOrientation="vertical" />

            </div>
          </div>
        </TabsContent>

        {/* Alojamiento */}
        <TabsContent value="alojamientos">
          <div className="rounded-xl py-4 overflow-x-auto">
            <CustomTable columns={lodgingColumns} data={lodgingData} actions={lodgingActions} rowHeader={0} tableOrientation="vertical" />
          </div>
        </TabsContent>

        {/* Experiencias */}
        <TabsContent value="experiencias">
          <div className="rounded-xl py-4 overflow-x-auto">
          <CustomTable columns={experiencesColumns} data={experiencesData} actions={experiencesActions} rowHeader={0} tableOrientation="vertical" />
          </div>
        </TabsContent>

        {/* Itinerarios */}
        <TabsContent value="itinerarios">
          <div className="rounded-xl py-4 overflow-x-auto"> 
            <CustomTable columns={itinerariesColumns} data={itinerariesData} actions={itinerariesActions} rowHeader={0} tableOrientation="vertical" />
          </div>
        </TabsContent>
      </Tabs>
    </section>
    
</div>
    
  );
}


