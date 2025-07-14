"use client";

import React, { useState, useEffect } from "react";
import {
  StandardSearchDataSource,
  StandardSearchField,
} from "../shared/standard-fields-component/StandardSearchField";
import { DateRangePickerCustom } from "../ui/date-range-picker-custom";
import {
  GuestSelector,
  Room,
} from "../shared/standard-fields-component/GuestSelector";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Building2, Clock, MapPin, Plane, Search } from "lucide-react";
import { getLodgingDataSources, defaultGuestRooms, defaultDateRange } from '@/lib/data/mock-datavf';
import path from "path";

interface ILodgingLayoutProps {
  searchDataSources?: StandardSearchDataSource[];
  lodgingType?: string;
  /**
   * Si es true, muestra el botón de buscar. Por defecto: true
   */
  showSearchButton?: boolean;
  basePathUrl?: string; // Ruta base opcional para la navegación
}

export default function LodgingSearchBar({
  searchDataSources = getLodgingDataSources(),
  lodgingType, // Por defecto, tipo de alojamiento
  showSearchButton = true,
  basePathUrl,
}: ILodgingLayoutProps) {
  // Hook para navegación
  const router = useRouter();
  const searchParams = useSearchParams();
   

  // Estados locales para manejar valores
  const [goingTo, setGoingTo] = useState<string>("");
  const [TravelingFrom, setTravelingFrom] = useState<string>("");

  const [guestRooms, setGuestRooms] = useState<Room[]>(defaultGuestRooms);
  const [range, setRange] = useState<DateRange | undefined>(defaultDateRange);
  const [flexibleInfo, setFlexibleInfo] = useState<{
    isFlexible?: boolean;
    flexibleDuration?: string;
    flexibleMonths?: string[];
  }>({});

  // Efecto para cargar parámetros de la URL al inicializar el componente
  useEffect(() => {
    if (searchParams.size === 0) return; // No hay parámetros que cargar

    console.log('🔄 Loading URL parameters:', Object.fromEntries(searchParams.entries()));

    // Cargar datos de búsqueda
    const toParam = searchParams.get('to') || '';
    const fromParam = searchParams.get('from') || '';
    const departureDateParam = searchParams.get('departureDate') || '';
    const returnDateParam = searchParams.get('returnDate') || '';
    const adultsParam = searchParams.get('adults') || '2';
    const childrenParam = searchParams.get('children') || '0';
    const roomsParam = searchParams.get('rooms') || '1';

    if (toParam) {
      setGoingTo(toParam);
    }
    if (fromParam) {
      setTravelingFrom(fromParam);
    }

    // Cargar fechas si están disponibles
    if (departureDateParam || returnDateParam) {
      const departureDate = departureDateParam ? new Date(departureDateParam + 'T12:00:00') : undefined;
      const returnDate = returnDateParam ? new Date(returnDateParam + 'T12:00:00') : undefined;
      
      setRange({
        from: departureDate,
        to: returnDate
      });
    }

    // Cargar información de huéspedes
    const totalAdults = parseInt(adultsParam) || 2;
    const totalChildren = parseInt(childrenParam) || 0;
    const totalRooms = parseInt(roomsParam) || 1;

    // Crear estructura de habitaciones básica
    const newRooms: Room[] = [];
    for (let i = 0; i < totalRooms; i++) {
      const adultsPerRoom = Math.floor(totalAdults / totalRooms) + (i < totalAdults % totalRooms ? 1 : 0);
      const childrenPerRoom = Math.floor(totalChildren / totalRooms) + (i < totalChildren % totalRooms ? 1 : 0);
      
      newRooms.push({
        id: `room-${i + 1}`,
        adults: Math.max(1, adultsPerRoom),
        children: Array(childrenPerRoom).fill(null).map((_, childIndex) => ({
          id: `room-${i + 1}-child-${childIndex + 1}`,
          age: 8
        }))
      });
    }

    if (newRooms.length > 0) {
      setGuestRooms(newRooms);
    }

    console.log('✅ URL parameters loaded successfully');
  }, [searchParams]);


  const handleGoingToChange = (value: string) => {
    console.log("🔍 handleGoingToChange called with value:", value);
    setGoingTo(value);
  };


  const handleRangeChange = (newRange: {
    from?: Date;
    to?: Date;
    isFlexible?: boolean;
    flexibleDuration?: string;
    flexibleMonths?: string[];
  }) => {
    // Actualizar el rango de fechas
    if (newRange.from && newRange.to) {
      setRange({ from: newRange.from, to: newRange.to });
    } else if (newRange.from) {
      setRange({ from: newRange.from, to: undefined });
    } else {
      setRange(undefined);
    }

    // Actualizar información de fechas flexibles
    setFlexibleInfo({
      isFlexible: newRange.isFlexible,
      flexibleDuration: newRange.flexibleDuration,
      flexibleMonths: newRange.flexibleMonths,
    });
  };




  function handleBuscar() {
    console.log("🚀 handleBuscar called with values:", {
      goingTo,
      TravelingFrom,
    });

    // Construir los parámetros de la URL de forma segura
    const params = new URLSearchParams();
    params.append("lodgingType", lodgingType || "hotels-and-resorts");

    // Agregar parámetros solo si tienen valor
    if (goingTo) {
      params.append("to", goingTo);
    }
    if (TravelingFrom) {
      params.append("from", TravelingFrom);
    }

    // Fechas en formato más amigable (YYYY-MM-DD)
    if (range?.from) {
      params.append("departureDate", range.from.toISOString().split("T")[0]);
    }
    if (range?.to) {
      params.append("returnDate", range.to.toISOString().split("T")[0]);
    }

    // Agregar parámetros de fechas flexibles si aplica
    if (flexibleInfo.isFlexible) {
      params.append("isFlexible", "true");
      if (flexibleInfo.flexibleDuration) {
        params.append("flexibleDuration", flexibleInfo.flexibleDuration);
      }
      if (
        flexibleInfo.flexibleMonths &&
        flexibleInfo.flexibleMonths?.length > 0
      ) {
        params.append("flexibleMonths", flexibleInfo.flexibleMonths.join(","));
      }
    }

    // Simplificar la información de habitaciones
    if (guestRooms?.length > 0) {
      const totalAdults = guestRooms.reduce(
        (sum, room) => sum + room.adults,
        0
      );
      const totalChildren = guestRooms.reduce(
        (sum, room) => sum + (room.children?.length || 0),
        0
      );

      params.append("adults", totalAdults.toString());
      params.append("children", totalChildren.toString());
      params.append("rooms", guestRooms?.length.toString());
    }

    // Navegar con la URL construida
    const finalUrl = basePathUrl ? `${basePathUrl}?${params.toString()}`: `/lodgings/${lodgingType}?${params.toString()}`;
    console.log("🌐 Final URL:", finalUrl);
    router.replace(finalUrl);
  }
  return (
    <div>
      {/* Fechas y Huéspedes */}
      <div className="flex flex-wrap gap-4 items-end">
        {/* Campo Destino */}
        <StandardSearchField
          containerClassName="w-full md:w-[280px]"
          label={"Destino"}
          placeholder={"¿Hacia donde?"}
          value={goingTo}
          onValueChange={handleGoingToChange}
          dataSources={searchDataSources}
          onSelect={(option, sourceType) => {
            // StandardSearchField ya maneja el value correctamente via onValueChange
            // Solo necesitamos lógica adicional opcional aquí
            console.log(`🎯 onSelect called:`, {
              label: option.label,
              value: option.value,
              description: option.description,
              sourceType,
            });
          }}
          showClearButton={true}
          minSearchLength={0}
          disabled={false}
        />

        <DateRangePickerCustom
          label="Fechas"
          value={range}
          onChange={handleRangeChange}
          showFlexibleDates={true}
          defaultActiveTab="flexible"
        />
        <GuestSelector
          label="Huéspedes"
          initialRooms={guestRooms}
          onRoomsChange={setGuestRooms}
          maxAdultsPerRoom={4}
          maxChildrenPerRoom={2}
        />
        {showSearchButton && (
          <div className="flex items-end w-full lg:w-auto lg:ml-auto mt-4 lg:self-end">
            <Button
              className={
                "bg-primary w-full md:w-[280px] h-[48px] px-4 gap-2 text-base md:text-sm"
              }
              variant="default"
              onClick={handleBuscar}
              disabled={!goingTo || !guestRooms || guestRooms.length === 0  }
            >
              <Search className="mr-2 h-4 w-4" />
              {"Buscar"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
