'use client';

import React, { useState } from 'react';
import { DateRange } from "react-day-picker";
import { DateRangePickerCustom } from "@/components/ui/date-range-picker-custom";
import { QuickFilter, FilterOption } from "@/components/ui/quick-filter";
import { StandardSearchField, StandardSearchDataSource } from "@/components/shared/standard-fields-component/StandardSearchField";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  experiencesOptions,
  getExperiencesDataSources,
  defaultDateRange,
  defaultSelectedExperiences 
} from '@/lib/data/mock-datavf';

interface IExperiencesSearchBarProps {
  /**
   * Si es true, muestra el botón de buscar. Por defecto: true
   */
  showSearchButton?: boolean;
}

export default function ExperiencesSearchBar({ showSearchButton = true }: IExperiencesSearchBarProps) {
  const [range, setRange] = useState<DateRange | undefined>(defaultDateRange);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(defaultSelectedExperiences);
  const [goingTo, setGoingTo] = useState("");

  // Obtener fuentes de datos para experiencias
  const searchDataSources = getExperiencesDataSources();

  const handleRangeChange = (newRange: { from?: Date; to?: Date }) => {
    if (newRange.from && newRange.to) {
      setRange({ from: newRange.from, to: newRange.to });
    } else if (newRange.from) {
      setRange({ from: newRange.from, to: undefined });
    } else {
      setRange(undefined);
    }
  };

  const handleGoingToChange = (value: string) => {
    setGoingTo(value);
  };

  // Para el botón de búsqueda
  const handleBuscar = () => {
    console.log("🔎 Buscar experiencias con:", {
      range,
      selectedExperiences,
      goingTo,
    });
    // Aquí puedes agregar la lógica de navegación o búsqueda real
  };

  return (
    <div className="flex flex-wrap gap-4 items-end w-full">
      {/* Fechas */}
      <DateRangePickerCustom
        label="Fechas"
        value={range}
        onChange={handleRangeChange}
        showFlexibleDates={false}
      />

      {/* Filtro de experiencia */}
      <QuickFilter
        label="Tipo de Experiencia"
        selected={selectedExperiences}

        setSelected={setSelectedExperiences}
        options={experiencesOptions}
      />

      {/* Campo Destino */}
      <StandardSearchField
        containerClassName="w-full md:w-[280px]"
        label={"Destino"}
        placeholder={"¿Hacia donde?"}
        value={goingTo}
        onValueChange={handleGoingToChange}
        dataSources={searchDataSources}
        onSelect={(option, sourceType) => {
          // StandardSearchField ya maneja el valor correctamente via onValueChange
          // El value se almacena, el label se muestra
          console.log("🎯 ExperiencesSearchBar - Destino seleccionado:", {
            label: option.label,
            value: option.value,
            sourceType
          });
        }}
        showClearButton={true}
        minSearchLength={0}
        disabled={false}
      />

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