'use client';

import React, { useState } from 'react';
import { StandardSearchDataSource, StandardSearchField } from '../shared/StandardSearchField';
import { DateRangePickerCustom } from '../ui/date-range-picker-custom';
import { GuestSelector, Room } from '../shared/GuestSelector';
import { DateRange } from 'react-day-picker';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Building2, Clock, MapPin, Plane, Search } from 'lucide-react';


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
          searchId: "med1", 
          period: "3 de julio–6 de julio"
        },
        { 
          destination: "Miami (MIA - Aeropuerto Internacional...)", 
          searchId: "mia1", 
          period: "1 de julio–30 de agosto • 60 noches • 2..."
        },
        { 
          destination: "San Juan de la Maguana", 
          searchId: "sj1", 
          period: "2 de junio–3 de junio • 1 noche • 2..."
        },
      ]
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
        { name: "Madrid (MAD - Aeropuerto Barajas)", code: "mad", city: "Capital de España" },
        { name: "Barcelona (BCN - Aeropuerto El Prat)", code: "bcn", city: "Ciudad mediterránea" },
        { name: "París (CDG - Charles de Gaulle)", code: "par", city: "Ciudad de la luz" },
        { name: "Londres (LHR - Heathrow)", code: "lon", city: "Capital británica" },
      ]
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
        { cityName: "Roma, Italia", cityCode: "rom", description: "Ciudad eterna" },
        { cityName: "Nueva York, EE.UU.", cityCode: "nyc", description: "La gran manzana" },
        { cityName: "Tokyo, Japón", cityCode: "tyo", description: "Metrópolis moderna" },
        { cityName: "Buenos Aires, Argentina", cityCode: "bue", description: "París de Sudamérica" },
      ]
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
        { hotelName: "Hotel Ritz Madrid", hotelId: "ritz-mad", location: "Lujo en el centro de Madrid" },
        { hotelName: "Hotel Majestic Barcelona", hotelId: "maj-bcn", location: "Elegancia en Passeig de Gràcia" },
      ]
    }
  ]

interface ILodgingLayoutProps {
    goingTo?: string;
    setGoingTo?: (value: string) => void,
    searchDataSources?: StandardSearchDataSource[];
    travelingFrom?: string;
    setTravelingFrom?: (value: string) => void;
}

export default function LodgingSearchBar(
  {
    goingTo,
   setGoingTo, 
   searchDataSources = searchLodgingDataSources, 
   travelingFrom, 
   setTravelingFrom}
   : ILodgingLayoutProps
  ) {

   // Hook para navegación
   const router = useRouter();

   // Estados locales para manejar valores si no vienen como props
   const [localGoingTo, setLocalGoingTo] = useState<string>("");
   const [localTravelingFrom, setLocalTravelingFrom] = useState<string>("nyc");

   const [guestRooms, setGuestRooms] = useState<Room[]>([{
    id: "room-1",
    adults: 2,
    children: []
  }])
  const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date()
    })

    // Funciones para manejar los valores - usar props si están disponibles, sino usar estado local
    const currentGoingTo = goingTo !== undefined ? goingTo : localGoingTo;
    const currentTravelingFrom = travelingFrom !== undefined ? travelingFrom : localTravelingFrom;
    
    const handleGoingToChange = (value: string) => {
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

    // Handler para convertir tipos de fecha
  const handleRangeChange = (newRange: { from?: Date; to?: Date }) => {
    if (newRange.from && newRange.to) {
      setRange({ from: newRange.from, to: newRange.to });
    } else if (newRange.from) {
      setRange({ from: newRange.from, to: undefined });
    } else {
      setRange(undefined);
    }
  }

    function handleBuscar() {
    
    // const y = window.scrollY || window.pageYOffset;
    // alert(`Scroll Y actual: ${y}`);
    
    // Construir los parámetros de la URL de forma segura
    const params = new URLSearchParams();
    
    // Agregar parámetros solo si tienen valor
    if (currentGoingTo) {
      params.append('goingTo', currentGoingTo);
    }
    if (currentTravelingFrom) {
      params.append('travelingFrom', currentTravelingFrom);
    }
    
    // Fechas en formato más amigable (YYYY-MM-DD)
    if (range?.from) {
      params.append('from', range.from.toISOString().split('T')[0]);
    }
    if (range?.to) {
      params.append('to', range.to.toISOString().split('T')[0]);
    }
    
    // Simplificar la información de habitaciones
    if (guestRooms.length > 0) {
      const totalAdults = guestRooms.reduce((sum, room) => sum + room.adults, 0);
      const totalChildren = guestRooms.reduce((sum, room) => sum + room.children.length, 0);
      
      params.append('adults', totalAdults.toString());
      params.append('children', totalChildren.toString());
      params.append('rooms', guestRooms.length.toString());
    }
    
    // Navegar con la URL construida
    router.push(`lodgings/hotels-and-resorts?${params.toString()}`);
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
            // Actualizar el valor del destino con el label de la opción seleccionada
            handleGoingToChange(option.label);
            
            // Opcional: Lógica adicional basada en el tipo de fuente
            console.log(`Seleccionado: ${option.label} (${sourceType})`, {
              value: option.value,
              description: option.description,
              sourceType
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
        />
 <div className="flex items-end w-full lg:w-auto lg:ml-auto mt-4 lg:self-end">
                    <Button
                      className={
                        "bg-primary w-full md:w-[280px] h-[48px] px-4 gap-2 text-base md:text-sm"}
                      variant="default"
                      onClick={handleBuscar}
                      disabled={!currentGoingTo || !currentTravelingFrom}
                    >
                      
                        <Search className="mr-2 h-4 w-4" />
                     
                      {"Buscar"}
                    </Button>
                  </div>
       
      </div>
      
       </div>
   );
}