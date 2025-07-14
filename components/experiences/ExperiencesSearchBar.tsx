'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  basePathUrl?: string
}

export default function ExperiencesSearchBar({ showSearchButton = true, basePathUrl }: IExperiencesSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [range, setRange] = useState<DateRange | undefined>(defaultDateRange);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(defaultSelectedExperiences);
  const [goingTo, setGoingTo] = useState("");

  // Obtener fuentes de datos para experiencias
  const searchDataSources = getExperiencesDataSources();

  // Efecto para cargar parámetros de la URL al inicializar el componente
  useEffect(() => {
    if (searchParams.size === 0) return; // No hay parámetros que cargar

    console.log('🎭 Loading experiences URL parameters:', Object.fromEntries(searchParams.entries()));

    // Cargar destino
    const destinationParam = searchParams.get('to');
    if (destinationParam) {
      console.log('🎯 Loading destination:', { destinationParam });
      setGoingTo(destinationParam);
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

    // Cargar tipos de experiencias seleccionadas
    const experiencesParam = searchParams.get('experiences');
    if (experiencesParam) {
      try {
        const parsedExperiences = JSON.parse(experiencesParam);
        console.log('🎪 Loading selected experiences:', { parsedExperiences });
        setSelectedExperiences(parsedExperiences);
      } catch (error) {
        console.error('❌ Error parsing experiences from URL:', error);
        // Si hay error en el parsing, usar como string separado por comas
        const experiencesArray = experiencesParam.split(',').filter(Boolean);
        setSelectedExperiences(experiencesArray);
      }
    }

    console.log('✅ Experiences URL parameters loaded successfully');
  }, [searchParams]);

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
    console.log("🎭 Buscar experiencias con:", {
      range,
      selectedExperiences,
      goingTo,
    });

    // Construir los parámetros de la URL de forma segura
    const params = new URLSearchParams();

    // Agregar destino solo si tiene valor
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

    // Agregar experiencias seleccionadas
    if (selectedExperiences.length > 0) {
      params.append("experiences", JSON.stringify(selectedExperiences));
    }
    // Agregar parámetro para mostrar resultados
    params.append("showresults", "true");


    // Navegar con la URL construida
    const finalUrl = basePathUrl  ? `${basePathUrl}?${params.toString()}` : `/experiences/?${params.toString()}`;
    console.log("🌐 Final experiences URL:", finalUrl);
    router.push(finalUrl);
  };

  return (
    
    <div className="flex flex-wrap gap-4 items-end w-full max-w-7xl mx-auto">
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