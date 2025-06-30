"use client";
import { Lodging } from "@/types/lodging.types";
import { RowData } from "../shared/RenderFields";
import LodgingCardList from "./LodgingCard";
import { fetchLodgings } from "@/services/lodging.service";
import { useEffect, useRef, useState } from "react";
import EventDrivenProgress, {
  EventDrivenProgressRef,
} from "@/components/shared/EventDrivenProgress";
import React from "react";
import CustomSelect, { CustomSelectOption } from "../shared/CustomSelect";
import CompareSwitchControl from "../shared/CompareSwitchControl";
import { Info } from "lucide-react";



// Ejemplo de opciones:
const sortOptions: CustomSelectOption[] = [
  { key: "recomendado", label: "Recomendado" },
  { key: "precio_menor", label: "Precio: menor a mayor" },
  { key: "precio_mayor", label: "Precio: mayor a menor" },
  { key: "mejor_valorado", label: "Mejor valorados" },
  {
    key: "mayor_descuento",
    label: "Mayor descuento",
    action: () => alert("¡Seleccionaste mayor descuento!"),
  },
];

export default function LodgingSearch() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const progressRef = useRef<EventDrivenProgressRef>(null);

  const [sort, setSort] = React.useState("recomendado");
  const [compareMode, setCompareMode] = React.useState(false);

  // Dispara la barra de progreso siempre que loading sea distinto de false (true o undefined)
  useEffect(() => {
    if (loading !== false) {
      // Espera un tick para asegurar que el ref esté listo
      setTimeout(() => {
        progressRef.current?.start();
      }, 0);
    } else {
      progressRef.current?.finish();
    }
  }, [loading]);

  // Solo para DEMO: simula una carga lenta
  useEffect(() => {
    setLoading(true);
    fetchLodgings()
      .then((apiData) => setRows(apiData.map(mapLodgingToRowData)))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <EventDrivenProgress ref={progressRef} className="w-full my-4 px-0 md:px-0" />;
return (
    <div className="flex flex-col gap-6 justify-content-between">
      {/* Compare Switch Control */}
      <CompareSwitchControl
        checked={compareMode}
        onCheckedChange={setCompareMode}
        titleOff="Comparar propiedades"
        subtitleOff="Obtén una vista lado a lado de hasta 5 propiedades"
        titleOn="Comparando propiedades"
        subtitleOn="Selecciona propiedades para comparar lado a lado"
      />

      {/* Barra de control superior */}
      <div className="flex w-full items-end justify-between gap-4 border-b border-muted pb-2">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs text-muted-foreground font-medium">
            {rows.length ? `${rows.length}+ alojamientos` : "Alojamientos encontrados"}
          </span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-sm underline underline-offset-2 cursor-pointer hover:text-primary transition-colors">
              ¿Cómo funciona nuestro orden?
            </span>
            <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground mb-0.5">Ordenar por</span>
          <CustomSelect
            options={sortOptions}
            selectedKey={sort}
            onChange={setSort}
          />
        </div>
      </div>

      {/* Cards */}
      <LodgingCardList
        onCardClick={(idx, row) =>
          alert(`¡Click en card #${idx}: ${row.title}!`)
        }
        rows={rows}
        showCompareCheckbox={compareMode}
      />
    </div>
  );
}

export function mapLodgingToRowData(lodging: Lodging): RowData {
  return {
    // Mapear lo que necesita tu UI
    title: lodging.hotelName,
    images: [
      lodging.hotelImage1,
      lodging.hotelImage2,
      lodging.hotelImage3,
      lodging.hotelImage4,
    ].filter(Boolean), // solo las que existen
    feature1: lodging.feature1,
    feature2: lodging.feature1,
    descMain: lodging.descMain,
    descSub: lodging.descSub,
    refundable: lodging.refundable,
    reserveNow: lodging.reserveNow,
    beforePrice: { currency: "USD", value: lodging.beforePrice },
    afterPrice: { currency: "USD", value: lodging.priceTotal },
    nightlyPrice: { currency: "USD", value: lodging.nightlyPrice },
    badge1: lodging.badge1,
    badge2: lodging.availableBadge,
    badge2ndColumn: lodging.availableBadge,
    isFavorite: false, // puedes setear desde API si tienes el campo
    rating: lodging.rating, // si tu API tiene campo rating
    ratingLabel: lodging.ratingLabel, // idem
    ratingCount: lodging.ratingCount, // idem
    // ...otros campos que uses en tu sistema
  };
}
