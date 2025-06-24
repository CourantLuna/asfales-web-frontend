"use client";
import { useEffect, useState } from "react";
import ReportGenerator from "@/components/reports/ReportGenerator";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Plane, Hotel, Mountain, Route } from "lucide-react";

import { ComparisonTable, ComparisonRow } from "@/components/ComparisonTable";
import { Combobox } from "../ui/combobox";

import CustomTable, { Action, Column } from "@/components/CustomTable";

const columns: Column[] = [
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
];

const actions: Action[] = [
  { label: "Ver detalles", variant: "secondary" },
  { label: "Reservar" },
];

const data = [
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


const transporteHeaders = ["Iberia", "Air Europa", "Expreso Bávaro"];
const transporteOptions: ComparisonRow[] = [
  {
    rowType: "imagenes",
    values: [
      ["/flights/iberia-1.jpg", "/flights/iberia-2.jpg"],
      ["/flights/aireuropa-1.jpg", "/flights/aireuropa-2.jpg"],
      ["/flights/bavaro-1.jpg", "/flights/bavaro-2.jpg"],
    ],
    aspectRatio: "4:3",
  },
  {
    label: "Ruta",
    rowType: "text",
    values: [
      "Vuelo directo SDQ → MAD",
      "1 escala vía MIA",
      "Bus SDQ → Punta Cana",
    ],
  },
  {
    label: "Calificación",
    rowType: "calificacion",
    values: [
      { score: 9.2, label: "Excelente", reviews: "1,001 opiniones" },
      { score: 8.4, label: "Muy Bueno", reviews: "879 opiniones" },
      { score: 7.8, label: "Bueno", reviews: "412 opiniones" },
    ],
  },
  {
    label: "Precio",
    rowType: "default",
    values: ["$580 USD", "$430 USD", "$15 USD"],
    className: "bg-muted/50 text-primary font-bold",
  },
  {
    label: "Duración",
    rowType: "default",
    values: ["8h 30min", "12h 50min", "2h 30min"],
  },
  {
    label: "Beneficios",
    rowType: "beneficios",
    values: [
      {
        "Equipaje incluido": true,
        Reembolsable: true,
        "WiFi a bordo": false,
        "Asiento reclinable": true,
        "Comida incluida": true,
      },
      {
        "Equipaje incluido": true,
        Reembolsable: true,
        "WiFi a bordo": true,
        "Asiento reclinable": false,
        "Comida incluida": true,
      },
      {
        "Equipaje incluido": false,
        Reembolsable: false,
        "WiFi a bordo": true,
        "Asiento reclinable": true,
        "Comida incluida": false,
      },
    ],
  },
  {
    label: "",
    rowType: "acciones",
    values: [
      [
        {
          label: "Ver detalles",
          onClick: () => console.log("Ver detalles"),
          variant: "secondary",
        },
      ],
      [
        {
          label: "Ver detalles",
          onClick: () => console.log("Ver detalles"),
          variant: "secondary",
        },
      ],
      [
        {
          label: "Ver detalles",
          onClick: () => console.log("Ver detalles"),
          variant: "secondary",
        },
      ],
    ],
  },
];
const alojamientoHeaders = [
  "Hotel Riu Plaza",
  "ME Reina Victoria",
  "Madrid Centro Apt.",
];
const alojamientoData: ComparisonRow[] = [
  {
    rowType: "imagenes",
    aspectRatio: "4:3",
    values: [
      ["/hotels/riu-1.jpg", "/hotels/riu-2.jpg", "/hotels/riu-3.jpg"],
      ["/hotels/me-1.jpg", "/hotels/me-2.jpg", "/hotels/me-3.jpg"],
      ["/hotels/apart-1.jpg", "/hotels/apart-2.jpg"],
    ],
  },
  {
    label: "Nombre",
    rowType: "text",
    values: [
      "Hotel Riu Plaza España",
      "ME Madrid Reina Victoria",
      "Apartamentos Madrid Centro",
    ],
  },
  {
    label: "Ubicación",
    rowType: "text",
    values: ["Plaza de España", "Plaza Santa Ana", "Calle Gran Vía"],
  },
  {
    label: "Calificación",
    rowType: "calificacion",
    values: [
      { score: 9.0, label: "Excelente", reviews: "2,311 opiniones" },
      { score: 8.7, label: "Muy bueno", reviews: "1,842 opiniones" },
      { score: 8.4, label: "Bueno", reviews: "1,105 opiniones" },
    ],
  },
  {
    label: "Precio por noche",
    rowType: "default",
    values: ["$145 USD", "$189 USD", "$99 USD"],
  },
  {
    label: "Tamaño / Tipo",
    rowType: "default",
    values: ["Habitación 24m²", "Suite 40m²", "Apartamento 55m²"],
  },
  {
    label: "Capacidad",
    rowType: "default",
    values: ["2 personas", "3 personas", "4 personas"],
  },
  {
    label: "Check-in / Check-out",
    rowType: "text",
    values: ["15:00 / 11:00", "14:00 / 12:00", "16:00 / 10:30"],
  },
  {
    label: "Servicios",
    rowType: "beneficios",
    values: [
      {
        "WiFi gratis": true,
        "Desayuno incluido": true,
        "Aire acondicionado": true,
        Piscina: true,
        "Mascotas permitidas": false,
        "Cocina privada": false,
      },
      {
        "WiFi gratis": true,
        "Desayuno incluido": false,
        "Aire acondicionado": true,
        Piscina: false,
        "Mascotas permitidas": true,
        "Cocina privada": false,
      },
      {
        "WiFi gratis": true,
        "Desayuno incluido": false,
        "Aire acondicionado": true,
        Piscina: false,
        "Mascotas permitidas": false,
        "Cocina privada": true,
      },
    ],
  },
  {
    label: "",
    rowType: "acciones",
    values: [
      [{ label: "Ver detalles", variant: "secondary" }, { label: "Reservar" }],
      [{ label: "Ver detalles", variant: "secondary" }, { label: "Reservar" }],
      [{ label: "Ver detalles", variant: "secondary" }],
    ],
  },
];
const experienciasHeaders = [
  "Palacio Real Tour",
  "Flamenco Show",
  "Museo Prado + Paseo",
];
const experienciasData: ComparisonRow[] = [
  {
    label: "Fotos",
    rowType: "imagenes",
    aspectRatio: "16:9",
    values: [
      ["/experiences/palacio-1.jpg", "/experiences/palacio-2.jpg"],
      ["/experiences/flamenco-1.jpg", "/experiences/flamenco-2.jpg"],
      ["/experiences/prado-1.jpg", "/experiences/prado-2.jpg"],
    ],
  },
  {
    label: "Nombre",
    rowType: "text",
    values: [
      "Tour guiado al Palacio Real",
      "Espectáculo flamenco con cena",
      "Museo del Prado + paseo guiado",
    ],
  },
  {
    label: "Punto de encuentro",
    rowType: "text",
    values: [
      "Puerta del Sol",
      "Teatro Tablao - Calle Morería",
      "Calle Felipe IV (entrada principal)",
    ],
  },
  {
    label: "Calificación",
    rowType: "calificacion",
    values: [
      { score: 9.1, label: "Excelente", reviews: "1,012 opiniones" },
      { score: 8.8, label: "Muy bueno", reviews: "837 opiniones" },
      { score: 9.0, label: "Excelente", reviews: "645 opiniones" },
    ],
  },
  {
    label: "Duración",
    rowType: "default",
    values: ["2 horas", "1h 15min", "3 horas"],
  },
  {
    label: "Disponibilidad",
    rowType: "text",
    values: ["Lunes a Sábado", "Todos los días", "Martes a Domingo"],
  },
  {
    label: "Precio",
    rowType: "default",
    values: ["$35 USD", "$49 USD", "$42 USD"],
  },
  {
    label: "Tamaño del grupo",
    rowType: "text",
    values: ["Máx. 20 personas", "Aforo limitado", "Tour semi-privado"],
  },
  {
    label: "Edad mínima",
    rowType: "text",
    values: ["Todas las edades", "+12 años", "+6 años"],
  },
  {
    label: "Idiomas disponibles",
    rowType: "text",
    values: ["Español, Inglés", "Solo Español", "Español, Inglés, Francés"],
  },
  {
    label: "Incluye",
    rowType: "beneficios",
    values: [
      {
        "Entrada incluida": true,
        "Guía profesional": true,
        Transporte: false,
        Accesible: true,
        "Bebida gratuita": false,
      },
      {
        "Entrada incluida": true,
        "Guía profesional": false,
        Transporte: false,
        Accesible: false,
        "Bebida gratuita": true,
      },
      {
        "Entrada incluida": true,
        "Guía profesional": true,
        Transporte: false,
        Accesible: true,
        "Bebida gratuita": false,
      },
    ],
  },

  {
    label: "",
    rowType: "acciones",
    values: [
      [{ label: "Ver detalles", variant: "secondary" }, { label: "Reservar" }],
      [{ label: "Ver detalles", variant: "secondary" }, { label: "Reservar" }],
      [{ label: "Ver detalles", variant: "secondary" }],
    ],
  },
];
const itinerariosHeaders = [
  "Madrid Esencial (3 días)",
  "Madrid + Toledo (4 días)",
  "Madrid Cultural Exprés (2 días)",
];
const itinerariosData: ComparisonRow[] = [
  {
    rowType: "imagenes",
    aspectRatio: "4:3",
    values: [
      ["/itinerarios/madrid1-1.jpg", "/itinerarios/madrid1-2.jpg"],
      ["/itinerarios/madrid2-1.jpg", "/itinerarios/madrid2-2.jpg"],
      ["/itinerarios/madrid3-1.jpg", "/itinerarios/madrid3-2.jpg"],
    ],
  },
  {
    label: "Transporte incluido",
    rowType: "text",
    values: [
      "Vuelo SDQ → MAD + traslados",
      "Vuelo + traslado + excursión a Toledo",
      "Vuelo sin traslados",
    ],
  },
  {
    label: "Alojamiento",
    rowType: "text",
    values: [
      "Hotel 3★ en Sol",
      "Hotel 4★ en Gran Vía",
      "Hostal boutique en Lavapiés",
    ],
  },
  {
    label: "Experiencias destacadas",
    rowType: "text",
    values: [
      "Palacio Real, tour tapas, Reina Sofía",
      "Museo del Prado, Toledo express",
      "Flamenco, paseo histórico nocturno",
    ],
  },
  {
    label: "Duración",
    rowType: "default",
    values: ["3 días / 2 noches", "4 días / 3 noches", "2 días / 1 noche"],
  },
  {
    label: "Precio total",
    rowType: "default",
    values: ["$780 USD", "$950 USD", "$490 USD"],
  },
  //   {
  //     label: "¿Colaborativo?",
  //     rowType: "default",
  //     values: ["Sí (editable)", "No (visual)", "Sí (editable)"],
  //   },
  {
    label: "Calificación paquete",
    rowType: "calificacion",
    values: [
      { score: 9.4, label: "Excelente", reviews: "127 reseñas" },
      { score: 8.6, label: "Muy bueno", reviews: "98 reseñas" },
      { score: 8.9, label: "Bueno", reviews: "75 reseñas" },
    ],
  },
  {
    label: "",
    rowType: "acciones",
    values: [
      [{ label: "Ver detalles", variant: "secondary" }, { label: "Unirse" }],
      [{ label: "Ver detalles", variant: "secondary" }],
      [{ label: "Ver detalles", variant: "secondary" }, { label: "Unirse" }],
    ],
  },
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
              <ComparisonTable
                headers={transporteHeaders}
                rows={transporteOptions}
              />
            </div>
          </div>
        </TabsContent>

        {/* Alojamiento */}
        <TabsContent value="alojamientos">
          <div className="rounded-xl py-4 overflow-x-auto">
            <ComparisonTable
              headers={alojamientoHeaders}
              rows={alojamientoData}
            />
          </div>
        </TabsContent>

        {/* Experiencias */}
        <TabsContent value="experiencias">
          <div className="rounded-xl py-4 overflow-x-auto">
            <ComparisonTable
              headers={experienciasHeaders}
              rows={experienciasData}
            />
          </div>
        </TabsContent>

        {/* Itinerarios */}
        <TabsContent value="itinerarios">
          <div className="rounded-xl py-4 overflow-x-auto">
            <ComparisonTable
              headers={itinerariosHeaders}
              rows={itinerariosData}
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Comparación de transporte</h2>
      <CustomTable columns={columns} data={data} actions={actions} rowHeader={0} />
    </section>
</div>
    
  );
}


