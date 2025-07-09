'use client';

import React, { useState } from 'react';
import { Plane, Ship, Bus } from 'lucide-react';
import { DateRange } from "react-day-picker";
import { DateRangePickerCustom } from "@/components/ui/date-range-picker-custom";
import { GuestSelector, Room } from "@/components/shared/standard-fields-component/GuestSelector";
import { QuickFilter, FilterOption } from "@/components/ui/quick-filter";
import { SearchFieldsWithSwap } from "@/components/shared/SearchFieldsWithSwap";
import { StandardSearchDataSource } from "@/components/shared/standard-fields-component/StandardSearchField";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface IitinerariesSearchBarProps {
  /**
   * Si es true, muestra el botón de buscar. Por defecto: true
   */
  showSearchButton?: boolean;
}

export default function ItinerariesSearchBar({ showSearchButton = true }: IitinerariesSearchBarProps) {
  const [travelingFrom, setTravelingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [range, setRange] = useState<DateRange | undefined>({ from: new Date(), to: new Date() });
  const [guestRooms, setGuestRooms] = useState<Room[]>([{
    id: "room-1",
    adults: 2,
    children: []
  }]);
  const [selectedLodgingTypes, setSelectedLodgingTypes] = useState<string[]>([]);
  const [selectedTransportTypes, setSelectedTransportTypes] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);

  // Opciones de ejemplo
  const lodgingOptions: FilterOption[] = [
    { label: "Hoteles", value: "hotel" },
    { label: "Casas", value: "house" },
    { label: "Apartamentos", value: "apartment" },
    { label: "Casa de huéspedes", value: "guest" },
  ];
  const experiencesOptions: FilterOption[] = [
    { label: "Aventura", value: "aventura" },
    { label: "Camping", value: "camping" },
    { label: "Senderismo", value: "senderismo" },
    { label: "Cultural", value: "cultural" },
    { label: "Playa", value: "playa" },
    { label: "Gastronómica", value: "gastronomica" },
    { label: "Conciertos", value: "conciertos" },
    { label: "Eventos de Comedia", value: "comedia" },
  ];
  const searchDataSources: StandardSearchDataSource[] = [
    {
      id: "cities",
      label: "Ciudades",
      icon: null,
      type: "city",
      nameLabelField: "cityName",
      nameValueField: "cityCode",
      nameDescriptionField: "description",
      options: [
        { cityName: "Roma, Italia", cityCode: "rom", description: "Ciudad eterna" },
        { cityName: "Nueva York, EE.UU.", cityCode: "nyc", description: "La gran manzana" },
        { cityName: "Tokyo, Japón", cityCode: "tyo", description: "Metrópolis moderna" },
        { cityName: "Buenos Aires, Argentina", cityCode: "bue", description: "París de Sudamérica" },
      ]
    }
  ];

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
    console.log("🔎 Buscar itinerarios con:", {
      travelingFrom,
      goingTo,
      range,
      guestRooms,
      selectedLodgingTypes,
      selectedTransportTypes,
      selectedExperiences,
    });
    // Aquí puedes agregar la lógica de navegación o búsqueda real
  };

  return (
    <div className="flex flex-wrap gap-4 items-end w-full">
      {/* Search Fields - Origin to Destination */}
      <SearchFieldsWithSwap
        containerClassName="md:-mr-4"
        originLabel="Origen"
        originPlaceholder="Voy desde..."
        originValue={travelingFrom}
        onOriginValueChange={handleTravelingFromChange}
        destinationLabel="Destino"
        destinationPlaceholder="Voy hacia..."
        destinationValue={goingTo}
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
      <div className="flex flex-wrap gap-4 w-full">
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
      </div>

      {/* Botón de búsqueda */}
      {showSearchButton && (
        <div className="flex items-end w-full lg:w-auto lg:ml-auto mt-4 lg:self-end">
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
  );
}