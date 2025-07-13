"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { Building2, Clock, MapPin, Plane, Search } from "lucide-react";
import { getLodgingDataSources, defaultGuestRooms, defaultDateRange } from '@/lib/data/mock-datavf';

interface ILodgingLayoutProps {
  goingTo?: string;
  setGoingTo?: (value: string) => void;
  searchDataSources?: StandardSearchDataSource[];
  travelingFrom?: string;
  setTravelingFrom?: (value: string) => void;
  lodgingType?: string;
  /**
   * Si es true, muestra el botón de buscar. Por defecto: true
   */
  showSearchButton?: boolean;
}

export default function LodgingSearchBar({
  goingTo,
  setGoingTo,
  searchDataSources = getLodgingDataSources(),
  travelingFrom,
  setTravelingFrom,
  lodgingType, // Por defecto, tipo de alojamiento
  showSearchButton = true,
}: ILodgingLayoutProps) {
  // Hook para navegación
  const router = useRouter();

  // Estados locales para manejar valores si no vienen como props
  const [localGoingTo, setLocalGoingTo] = useState<string>("MAD");
  const [localTravelingFrom, setLocalTravelingFrom] = useState<string>("NYC");

  const [guestRooms, setGuestRooms] = useState<Room[]>(defaultGuestRooms);
  const [range, setRange] = useState<DateRange | undefined>(defaultDateRange);
  const [flexibleInfo, setFlexibleInfo] = useState<{
    isFlexible?: boolean;
    flexibleDuration?: string;
    flexibleMonths?: string[];
  }>({});

  // Funciones para manejar los valores - usar props si están disponibles, sino usar estado local
  const currentGoingTo = goingTo !== undefined ? goingTo : localGoingTo;
  const currentTravelingFrom =
    travelingFrom !== undefined ? travelingFrom : localTravelingFrom;

  const handleGoingToChange = (value: string) => {
    console.log("🔍 handleGoingToChange called with value:", value);
    if (setGoingTo) {
      setGoingTo(value);
    } else {
      setLocalGoingTo(value);
    }
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
      currentGoingTo,
      currentTravelingFrom,
      goingTo,
      travelingFrom,
    });

    // Construir los parámetros de la URL de forma segura
    const params = new URLSearchParams();

    // Agregar parámetros solo si tienen valor
    if (currentGoingTo) {
      params.append("goingTo", currentGoingTo);
    }
    if (currentTravelingFrom) {
      params.append("travelingFrom", currentTravelingFrom);
    }

    // Fechas en formato más amigable (YYYY-MM-DD)
    if (range?.from) {
      params.append("from", range.from.toISOString().split("T")[0]);
    }
    if (range?.to) {
      params.append("to", range.to.toISOString().split("T")[0]);
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
    const finalUrl = `/lodgings/${lodgingType}?${params.toString()}`;
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
          value={currentGoingTo}
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
              disabled={!currentGoingTo || !currentTravelingFrom}
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
