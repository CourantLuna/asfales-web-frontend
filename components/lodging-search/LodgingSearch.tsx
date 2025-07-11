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
import { PriceRangeFilter } from "../shared/PriceRangeFilter";
import { Info } from "lucide-react";
import { FilterChips, FilterChip } from "../shared/FilterChips";
import { CheckboxFilter, CheckboxOption } from "../shared/CheckboxFilter";
import { Separator } from "@radix-ui/react-separator";



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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [priceFilterString, setPriceFilterString] = useState<string>("");

  // Estados para filtros de checkbox
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [amenitiesOutputString, setAmenitiesOutputString] = useState<string>("");
  const [amenitiesChips, setAmenitiesChips] = useState<Array<{id: string, label: string, onRemove: () => void}>>([]);

  // Memoizar las opciones para evitar recreaciones
  const amenitiesOptions: CheckboxOption[] = React.useMemo(() => [
    { value: "wifi", label: "WiFi gratuito", count: 145 },
    { value: "parking", label: "Estacionamiento", count: 98 },
    { value: "pool", label: "Piscina", count: 67 },
    { value: "gym", label: "Gimnasio", count: 43 },
    { value: "spa", label: "Spa", count: 28 },
    { value: "restaurant", label: "Restaurante", count: 112 },
    { value: "breakfast", label: "Desayuno incluido", count: 89 },
    { value: "pets", label: "Se admiten mascotas", count: 34 },
    { value: "concierge", label: "Servicio de conserjería", count: 56 },
    { value: "laundry", label: "Servicio de lavandería", count: 78 },
    { value: "room-service", label: "Servicio a la habitación", count: 91 },
    { value: "business", label: "Centro de negocios", count: 42 },
  ], []);

  // Memoizar callbacks para evitar recreaciones
  const handleAmenitiesChange = React.useCallback((values: string[]) => {
    setSelectedAmenities(values);
    console.log("Servicios seleccionados:", values);
  }, []);

  const handleAmenitiesOutputStringChange = React.useCallback((outputString: string) => {
    setAmenitiesOutputString(outputString);
  }, []);

  const handleAmenitiesChipsChange = React.useCallback((chips: Array<{id: string, label: string, onRemove: () => void}>) => {
    setAmenitiesChips(chips);
  }, []);

  // Función para resetear el filtro de precio
  const resetPriceFilter = React.useCallback(() => {
    setPriceRange([0, 1000]);
    console.log("Filtro de precio reseteado");
    // Aquí podrías hacer la llamada a la API para remover el filtro
  }, []);

  // Función para resetear filtros de servicios
  const resetAmenitiesFilter = React.useCallback(() => {
    setSelectedAmenities([]);
    console.log("Filtro de servicios reseteado");
  }, []);


  // Generar filtros activos para FilterChips
  const generateActiveFilters = (): FilterChip[] => {
    const filters: FilterChip[] = [];

    // Filtro de precio
    if (priceFilterString) {
      filters.push({
        id: "price",
        label: "Precio",
        value: priceFilterString,
        onRemove: resetPriceFilter,
      });
    }

    // Filtros de servicios individuales
    amenitiesChips.forEach(chip => {
      filters.push({
        id: chip.id,
        label: "", // Sin prefijo "Servicios:"
        value: chip.label,
        onRemove: chip.onRemove,
      });
    });

    // Aquí puedes agregar más filtros en el futuro
    // Ejemplo:
    // if (locationFilter) {
    //   filters.push({
    //     id: "location",
    //     label: "Ubicación",
    //     value: locationFilter,
    //     onRemove: resetLocationFilter,
    //   });
    // }

    return filters;
  };

  const clearAllFilters = React.useCallback(() => {
    resetPriceFilter();
    resetAmenitiesFilter();
    // Agregar más resets cuando tengas más filtros
  }, [resetPriceFilter, resetAmenitiesFilter]);

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


  <div className="flex flex-col lg:flex-row gap-6 mt-2">
      {/* Columna de Filtros - Lado Izquierdo */}
      <div className="w-full lg:w-80 flex-shrink-0 mt-1">
      {/* Compare Switch Control */}

            <div className="space-y-6">

      <CompareSwitchControl
        checked={compareMode}
        onCheckedChange={setCompareMode}
        titleOff="Comparar propiedades"
        subtitleOff="Obtén una vista lado a lado de hasta 5 propiedades"
        titleOn="Comparando propiedades"
        subtitleOn="Selecciona propiedades para comparar lado a lado"
      />

      <Separator className="my-4" />
               <CheckboxFilter
                label="Servicios del hotel"
                options={amenitiesOptions}
                selectedValues={selectedAmenities}
                onChange={handleAmenitiesChange}
                onOutputStringChange={handleAmenitiesOutputStringChange}
                onIndividualChipsChange={handleAmenitiesChipsChange}
                showCounts={true}
                maxSelections={8} // Máximo de 8 selecciones
                initialVisibleCount={4}
                showMoreText="Ver más servicios"
                showLessText="Ver menos"
              />

      <Separator className="my-4" />
  <PriceRangeFilter
            min={0}
            max={1000}
            value={priceRange}
            onChange={(newRange) => {
              setPriceRange(newRange);
              console.log("Filtrar por precio:", newRange);
              // Aquí podrías hacer la llamada a la API para filtrar
            }}
            onOutputStringChange={setPriceFilterString}
            label="Precio por noche"
            currency="$"
            step={10}
          />

  
      
       
      </div>
      
      </div>

      {/* Contenido Principal - Lado Derecho */}
    <div className=" min-w-0">
      {/* Filtros Activos */}
      <div>
        <FilterChips
          filters={generateActiveFilters()}
          onClearAll={clearAllFilters}
          showClearAll={true}
          clearAllText="Limpiar filtros"
        />
      </div>
      {/* Barra de control superior */}
      <div className="flex w-full items-center justify-between gap-4 border-b border-muted pb-2 mb-6">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs text-muted-foreground font-medium">
            {rows.length
              ? `${rows.length}+ alojamientos`
              : "Alojamientos encontrados"}
          </span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-sm underline underline-offset-2 cursor-pointer hover:text-primary transition-colors">
              ¿Cómo funciona nuestro orden?
            </span>
            <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground mb-0.5">
            Ordenar por
          </span>
          <CustomSelect
            options={sortOptions}
            selectedKey={sort}
            onChange={setSort}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Cards de Alojamientos */}
        <LodgingCardList
          cardHeight="min-h-[300px]"
          onCardClick={(idx, row) =>
            alert(`¡Click en card #${idx}: ${row.title}!`)
          }
          rows={rows}
          showCompareCheckbox={compareMode}
        />
      </div>
    </div>
    
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
