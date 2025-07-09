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

// Fuentes de datos para el buscador - usar externas si están disponibles
const searchLodgingDataSources: StandardSearchDataSource[] = [
  {
    id: "recent",
    label: "Búsquedas recientes",
    icon: <Clock className="h-4 w-4" />,
    type: "recent" as const,
    nameLabelField: "destination",
    nameValueField: "searchId",
    nameDescriptionField: "period",
    options: [
      {
        destination: "Medellín (MDE - A. Internacional José...)",
        searchId: "MDE",
        period: "3 de julio–6 de julio",
      },
      {
        destination: "Miami (MIA - Aeropuerto Internacional...)",
        searchId: "MIA",
        period: "1 de julio–30 de agosto • 60 noches • 2...",
      },
      {
        destination: "San Juan de la Maguana",
        searchId: "SJM",
        period: "2 de junio–3 de junio • 1 noche • 2...",
      },
    ],
  },
  {
    id: "airports",
    label: "Aeropuertos",
    icon: <Plane className="h-4 w-4" />,
    type: "airport" as const,
    nameLabelField: "name",
    nameValueField: "code",
    nameDescriptionField: "city",
    options: [
      {
        name: "Madrid (MAD - Aeropuerto Barajas)",
        code: "MAD",
        city: "Capital de España",
      },
      {
        name: "Barcelona (BCN - Aeropuerto El Prat)",
        code: "BCN",
        city: "Ciudad mediterránea",
      },
      {
        name: "París (CDG - Charles de Gaulle)",
        code: "CDG",
        city: "Ciudad de la luz",
      },
      {
        name: "Londres (LHR - Heathrow)",
        code: "LHR",
        city: "Capital británica",
      },
    ],
  },
  {
    id: "cities",
    label: "Ciudades",
    icon: <MapPin className="h-4 w-4" />,
    type: "city" as const,
    nameLabelField: "cityName",
    nameValueField: "cityCode",
    nameDescriptionField: "description",
    options: [
      {
        cityName: "Roma, Italia",
        cityCode: "ROM",
        description: "Ciudad eterna",
      },
      {
        cityName: "Nueva York, EE.UU.",
        cityCode: "NYC",
        description: "La gran manzana",
      },
      {
        cityName: "Tokyo, Japón",
        cityCode: "TYO",
        description: "Metrópolis moderna",
      },
      {
        cityName: "Buenos Aires, Argentina",
        cityCode: "BUE",
        description: "París de Sudamérica",
      },
    ],
  },
  {
    id: "hotels",
    label: "Hoteles",
    icon: <Building2 className="h-4 w-4" />,
    type: "hotel" as const,
    nameLabelField: "hotelName",
    nameValueField: "hotelId",
    nameDescriptionField: "location",
    options: [
      {
        hotelName: "Hotel Ritz Madrid",
        hotelId: "ritz-mad",
        location: "Lujo en el centro de Madrid",
      },
      {
        hotelName: "Hotel Majestic Barcelona",
        hotelId: "maj-bcn",
        location: "Elegancia en Passeig de Gràcia",
      },
    ],
  },
];

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
  searchDataSources = searchLodgingDataSources,
  travelingFrom,
  setTravelingFrom,
  lodgingType = "hotels-and-resorts", // Por defecto, tipo de alojamiento
  showSearchButton = true,
}: ILodgingLayoutProps) {
  // Hook para navegación
  const router = useRouter();

  // Estados locales para manejar valores si no vienen como props
  const [localGoingTo, setLocalGoingTo] = useState<string>("MAD");
  const [localTravelingFrom, setLocalTravelingFrom] = useState<string>("NYC");

  const [guestRooms, setGuestRooms] = useState<Room[]>([
    {
      id: "room-1",
      adults: 2,
      children: [],
    },
  ]);
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
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

  const handleTravelingFromChange = (value: string) => {
    if (setTravelingFrom) {
      setTravelingFrom(value);
    } else {
      setLocalTravelingFrom(value);
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
        flexibleInfo.flexibleMonths.length > 0
      ) {
        params.append("flexibleMonths", flexibleInfo.flexibleMonths.join(","));
      }
    }

    // Simplificar la información de habitaciones
    if (guestRooms.length > 0) {
      const totalAdults = guestRooms.reduce(
        (sum, room) => sum + room.adults,
        0
      );
      const totalChildren = guestRooms.reduce(
        (sum, room) => sum + room.children.length,
        0
      );

      params.append("adults", totalAdults.toString());
      params.append("children", totalChildren.toString());
      params.append("rooms", guestRooms.length.toString());
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
