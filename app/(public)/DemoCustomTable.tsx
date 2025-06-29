"use client";

import { useState } from "react";
import CustomTable, { Action, Column } from "@/components/shared/CustomTable";

// DEMO DATA CORREGIDA
const alojamientos = [
  {
    name: "Hotel Estelar",
    images: [
      [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      ]
    ],
    overlays: {
      oferta: "Oferta",
      isFavorite: true,
    },
    price: "$185 / noche",
    ratingScore: 4.7,
    ratingLabel: "Excelente",
    reviews: 378,
    opinions: "¡Muchos lo recomiendan!",
    checkIn: "2025-07-01T15:00:00Z",
    benefits: [
      { label: "Wifi Gratis", included: true },
      { label: "Piscina", included: true },
      { label: "Mascotas", included: false },
    ],
  },
  {
    name: "Grand Paradiso",
    images: [
      [
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80",
      ]
    ],
    overlays: {
      oferta: "Descuento -20%",
      isFavorite: false,
    },
    price: "$220 / noche",
    ratingScore: 4.4,
    ratingLabel: "Muy bueno",
    reviews: 194,
    opinions: "Ideal para familias",
    checkIn: "2025-07-02T16:00:00Z",
    benefits: [
      { label: "Wifi Gratis", included: true },
      { label: "Piscina", included: false },
      { label: "Mascotas", included: true },
    ],
  },
];

const columns: Column[] = [
  {
    header: "Alojamiento",
    field: "name",
    type: "text",
    className: "font-bold text-lg",
  },
  {
    header: "Imágenes",
    field: "images",
    type: "images",
    className: "overflow-hidden",
    aspectRatio: "16:9",
    height: "h-[160px]",
    overlayCarrusel: [
      {
        type: "badge",
        bgcolor: "bg-green-600",
        field: "oferta", // Este campo debe existir en el objeto overlays
        align: "top-left",
      },
      {
        type: "favorite",
        bgcolor: "bg-white/70",
        align: "top-right",
        actionFavorite: (index) => {
          alert("Toggle favorito de imagen " + (index + 1));
        },
      },
    ],
    overlayValuesKey: "overlays", // Ahora es un solo objeto, no array
  },
  {
    header: "Precio",
    field: "price",
    type: "text",
    className: "font-semibold text-primary",
  },
  {
    header: "Calificación",
    fields: [
      { field: "ratingScore", type: "number", className: "text-2xl font-bold text-yellow-500" },
      { field: "ratingLabel", type: "text", className: "text-xs font-semibold text-gray-600" },
      { field: "reviews", type: "number", className: "text-xs text-gray-400" },
      { field: "opinions", type: "text", className: "text-xs italic text-gray-500" },
    ],
    structure: "ratingScore-(ratingLabel/reviews-{{opinions}})",
    type: "text",
    className: "space-y-1",
  },
  {
    header: "Check-in",
    field: "checkIn",
    type: "time",
    className: "text-xs",
  },
  {
    header: "Beneficios",
    field: "benefits",
    type: "benefits",
  },
];

const actions: Action[] = [
  {
    label: "Reservar",
    variant: "default",
    onClick: () => alert("Reservar clicado"),
  },
  {
    label: "Ver detalles",
    variant: "secondary",
    onClick: () => alert("Ver detalles clicado"),
  },
];

export default function DemoCustomTable() {
  const [rows, setRows] = useState(alojamientos);

  return (
    <div className="max-w-[1500px] mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Comparación de Alojamientos</h2>
      <CustomTable
        columns={columns}
        data={rows}
        actions={actions}
        rowHeader={0}
        tableOrientation="vertical"
        onEntrySelect={(idx) => alert("Seleccionaste la opción #" + (idx + 1))}
      />
    </div>
  );
}
