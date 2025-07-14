'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Plane, Ship, Bus } from 'lucide-react';
import { DateRange } from "react-day-picker";
import { DateRangePickerCustom } from "@/components/ui/date-range-picker-custom";
import { GuestSelector, Room } from "@/components/shared/standard-fields-component/GuestSelector";
import { QuickFilter, FilterOption } from "@/components/ui/quick-filter";
import { SearchFieldsWithSwap } from "@/components/shared/SearchFieldsWithSwap";
import { StandardSearchDataSource } from "@/components/shared/standard-fields-component/StandardSearchField";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  searchDataSources,
  lodgingOptions,
  experiencesOptions,
  transportTypes,
  defaultGuestRooms,
  defaultDateRange
} from '@/lib/data/mock-datavf';
import { ItinerarySharedCard } from './ItinerarySharedCard';
import { ItinerariesPrivateCard } from './ItinerariesPrivateCard';
import { ItinerariesResultsTemplate } from './ItinerariesResultsTemplate';

interface IitinerariesSearchBarProps {
  /**
   * Si es true, muestra el botón de buscar. Por defecto: true
   */
  showSearchButton?: boolean;
    basePathUrl?: string; // Ruta base opcional para la navegación

}

export default function ItinerariesSearchBar({ showSearchButton = true, basePathUrl }: IitinerariesSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [travelingFrom, setTravelingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [range, setRange] = useState<DateRange | undefined>(defaultDateRange);
  const [guestRooms, setGuestRooms] = useState<Room[]>(defaultGuestRooms);
  const [selectedLodgingTypes, setSelectedLodgingTypes] = useState<string[]>([]);
  const [selectedTransportTypes, setSelectedTransportTypes] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  useEffect(() => {
    // Forzar scroll al top cuando se monta el componente
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Efecto para cargar parámetros de la URL al inicializar el componente
  useEffect(() => {
    if (searchParams.size === 0) return; // No hay parámetros que cargar

    console.log('🗺️ Loading itineraries URL parameters:', Object.fromEntries(searchParams.entries()));

    // Cargar origen y destino
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    if (fromParam) {
      console.log('🎯 Loading origin:', { fromParam });
      setTravelingFrom(fromParam);
    }
    if (toParam) {
      console.log('🎯 Loading destination:', { toParam });
      setGoingTo(toParam);
    }

    // Cargar fechas
    const fromDateParam = searchParams.get('departureDate');
    const toDateParam = searchParams.get('returnDate');

    if (fromDateParam || toDateParam) {
      console.log('📅 Loading date range:', { fromDateParam, toDateParam });
      setRange({
        from: fromDateParam ? new Date(fromDateParam + 'T12:00:00') : undefined,
        to: toDateParam ? new Date(toDateParam + 'T12:00:00') : undefined,
      });
    }

    // Cargar huéspedes y habitaciones
    const roomsParam = searchParams.get('rooms');
    if (roomsParam) {
      try {
        const parsedRooms = JSON.parse(roomsParam);
        console.log('🏨 Loading guest rooms:', { parsedRooms });
        setGuestRooms(parsedRooms);
      } catch (error) {
        console.error('❌ Error parsing rooms from URL:', error);
      }
    }

    // Cargar tipos de alojamiento seleccionados
    const lodgingParam = searchParams.get('lodging');
    if (lodgingParam) {
      try {
        const parsedLodging = JSON.parse(lodgingParam);
        console.log('🏠 Loading lodging types:', { parsedLodging });
        setSelectedLodgingTypes(parsedLodging);
      } catch (error) {
        console.error('❌ Error parsing lodging from URL:', error);
        // Si hay error en el parsing, usar como string separado por comas
        const lodgingArray = lodgingParam.split(',').filter(Boolean);
        setSelectedLodgingTypes(lodgingArray);
      }
    }

    // Cargar tipos de transporte seleccionados
    const transportParam = searchParams.get('transport');
    if (transportParam) {
      try {
        const parsedTransport = JSON.parse(transportParam);
        console.log('🚗 Loading transport types:', { parsedTransport });
        setSelectedTransportTypes(parsedTransport);
      } catch (error) {
        console.error('❌ Error parsing transport from URL:', error);
        const transportArray = transportParam.split(',').filter(Boolean);
        setSelectedTransportTypes(transportArray);
      }
    }

    // Cargar experiencias seleccionadas
    const experiencesParam = searchParams.get('experiences');
    if (experiencesParam) {
      try {
        const parsedExperiences = JSON.parse(experiencesParam);
        console.log('🎪 Loading experiences:', { parsedExperiences });
        setSelectedExperiences(parsedExperiences);
      } catch (error) {
        console.error('❌ Error parsing experiences from URL:', error);
        const experiencesArray = experiencesParam.split(',').filter(Boolean);
        setSelectedExperiences(experiencesArray);
      }
    }

    console.log('✅ Itineraries URL parameters loaded successfully');
  }, [searchParams]);

  const handleTravelingFromChange = (value: string) => setTravelingFrom(value);
  const handleGoingToChange = (value: string) => setGoingTo(value);
  const handleSwapLocations = () => {
    setTravelingFrom(goingTo);
    setGoingTo(travelingFrom);
  };
  const handleRangeChange = (newRange: { from?: Date; to?: Date }) => {
    if (newRange.from && newRange.to) {
      setRange({ from: newRange.from, to: newRange.to });
    } else if (newRange.from) {
      setRange({ from: newRange.from, to: undefined });
    } else {
      setRange(undefined);
    }
  };

  // Lógica del botón de búsqueda
  const handleBuscar = () => {
    console.log("�️ Buscar itinerarios con:", {
      travelingFrom,
      goingTo,
      range,
      guestRooms,
      selectedLodgingTypes,
      selectedTransportTypes,
      selectedExperiences,
    });

    // Construir los parámetros de la URL de forma segura
    const params = new URLSearchParams();

    // Agregar origen y destino solo si tienen valor
    if (travelingFrom) {
      params.append("from", travelingFrom);
    }
    if (goingTo) {
      params.append("to", goingTo);
    }

    // Agregar fechas
    if (range?.from) {
      params.append("departureDate", range.from.toISOString().split("T")[0]);
    }
    if (range?.to) {
      params.append("returnDate", range.to.toISOString().split("T")[0]);
    }

    // Agregar habitaciones y huéspedes
    if (guestRooms.length > 0) {
      params.append("rooms", JSON.stringify(guestRooms));
    }

    // Agregar tipos de alojamiento seleccionados
    if (selectedLodgingTypes.length > 0) {
      params.append("lodging", JSON.stringify(selectedLodgingTypes));
    }

    // Agregar tipos de transporte seleccionados
    if (selectedTransportTypes.length > 0) {
      params.append("transport", JSON.stringify(selectedTransportTypes));
    }

    // Agregar experiencias seleccionadas
    if (selectedExperiences.length > 0) {
      params.append("experiences", JSON.stringify(selectedExperiences));
    }

    // Agregar parámetro para mostrar resultados
    params.append("showresults", "true");


    // Navegar con la URL construida
    const finalUrl = basePathUrl ? `${basePathUrl}?${params.toString()}` : `/itineraries?${params.toString()}`;

    console.log("🌐 Final itineraries URL:", finalUrl);
    router.replace(finalUrl);
  };

  return (
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg" />}>
    <div className="flex flex-wrap gap-4 items-end w-full mx-auto max-w-7xl">
      {/* Search Fields - Origin to Destination */}
      <SearchFieldsWithSwap
        containerClassName="md:-mr-4"
        originLabel="Origen"
        originPlaceholder="Voy desde..."
        originValue={travelingFrom}
        onOriginValueChange={handleTravelingFromChange}
        destinationLabel="Destino"
        destinationPlaceholder="Voy hacia..."
        destinationValue={goingTo }
        onDestinationValueChange={handleGoingToChange}
        dataSources={searchDataSources}
        onOriginSelect={(option, sourceType) => {
          console.log("🎯 ItinerariesSearchBar - Origen seleccionado:", {
            label: option.label,
            value: option.value,
            sourceType
          });
        }}
        onDestinationSelect={(option, sourceType) => {
          console.log("🎯 ItinerariesSearchBar - Destino seleccionado:", {
            label: option.label,
            value: option.value,
            sourceType
          });
        }}
        customSwapHandler={handleSwapLocations}
        showSearchButton={false}
        showClearButton={true}
        minSearchLength={0}
      />
      <DateRangePickerCustom
        label="Fechas"
        value={range}
        onChange={handleRangeChange}
        showFlexibleDates={true}
      />
      <GuestSelector
        label="Personas"
        initialRooms={guestRooms}
        onRoomsChange={setGuestRooms}
      />
      {/* Filtros rápidos */}
      <div className="flex flex-wrap gap-4 w-full items-end">
        <QuickFilter
          label="Tipo de Alojamiento"
          options={lodgingOptions}
          selected={selectedLodgingTypes}
          setSelected={setSelectedLodgingTypes}
        />
        <QuickFilter
          label="Tipo de Transporte"
          options={[
            { label: "Aéreo", value: "air", icon: Plane },
            { label: "Marítimo", value: "sea", icon: Ship },
            { label: "Terrestre", value: "land", icon: Bus },
          ]}
          selected={selectedTransportTypes}
          setSelected={setSelectedTransportTypes}
        />
        <QuickFilter
          label="Tipo de Experiencia"
          options={experiencesOptions}
          selected={selectedExperiences}
          setSelected={setSelectedExperiences}
        />

        {/* Botón de búsqueda */}
      {showSearchButton && (
        <div className="flex items-center w-full lg:w-auto lg:ml-auto mt-4 lg:self-end">
          <Button
            className={
              "bg-primary w-full md:w-[280px] h-[48px] px-4 gap-2 text-base md:text-sm"
            }
            variant="default"
            onClick={handleBuscar}
            disabled={!goingTo}
          >
            <Search className="mr-2 h-4 w-4" />
            {"Buscar"}
          </Button>
        </div>
      )}
      </div>

{/* Resultados de itinerarios
      <ItinerariesResultsTemplate
        origin={travelingFrom}
        destination={goingTo}
        startDate={range?.from}
        endDate={range?.to}
        className="w-full"
      /> */}




    </div>
    </Suspense>
  );
}