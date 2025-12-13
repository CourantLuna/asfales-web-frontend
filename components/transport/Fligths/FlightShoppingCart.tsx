'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { 
  Plane, 
  Briefcase, 
  CreditCard,
  Calendar,
  Wifi,
  AlertCircle,
  Users,
  ChevronRight,
  Check,
  Armchair
} from 'lucide-react';
import { TransportTrip } from '../types/transport.types'; 
// Asumimos que el SeatMap está en componentes compartidos
import SeatMap, { Seat, SeatMapConfig } from '@/components/shared/SeatMap'; 

// --- MOCK DATA GENERATOR PARA ASIENTOS ---
const generateMockSeats = (rows = 12): Seat[] => {
  const seats: Seat[] = [];
  const columns = ['A', 'B', 'C', 'D'];
  
  for (let i = 1; i <= rows; i++) {
    columns.forEach(col => {
      // Aleatoriedad simple para simular ocupados
      const isOccupied = Math.random() < 0.2; 
      // Filas 1-3 son Premium ($50), Resto Economy ($0)
      const isPremium = i <= 3;
      
      seats.push({
        id: `${i}${col}`,
        row: i,
        column: col,
        status: isOccupied ? 'occupied' : 'available',
        class: isPremium ? 'premium' : 'economy',
        price: isPremium ? 50 : 0
      });
    });
  }
  return seats;
};

const SEAT_CONFIG: SeatMapConfig = {
  type: 'airplane',
  rows: 12,
  columnsPerRow: 4,
  orientation: 'horizontal', 
  seatLayout: { left: 2, right: 2 }
};

// --- COMPONENTE COMPACTO DEL DIALOGO ---
interface SeatSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (seats: Seat[]) => void;
  flightTitle: string;
  maxSeats: number;
  currentSelection: Seat[];
}

const SeatSelectionDialog: React.FC<SeatSelectionDialogProps> = ({ 
  isOpen, onClose, onConfirm, flightTitle, maxSeats, currentSelection 
}) => {
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  // Mock data una sola vez
  const [allSeats] = useState(() => generateMockSeats());

  useEffect(() => {
    if (isOpen) {
      setTempSelected(currentSelection.map(s => s.id));
    }
  }, [isOpen, currentSelection]);

  const handleSelect = (seatId: string) => {
    if (tempSelected.length < maxSeats) setTempSelected([...tempSelected, seatId]);
  };

  const handleDeselect = (seatId: string) => {
    setTempSelected(tempSelected.filter(id => id !== seatId));
  };

  const handleConfirmInternal = () => {
    // Recuperar objetos completos con precio
    const selectedSeatObjects = allSeats.filter(s => tempSelected.includes(s.id));
    onConfirm(selectedSeatObjects);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] md:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Selecciona tus asientos</DialogTitle>
          <DialogDescription>
            {flightTitle} • Pasajeros: {maxSeats}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
          <SeatMap 
            config={SEAT_CONFIG}
            seats={allSeats}
            selectedSeats={tempSelected}
            onSeatSelect={handleSelect}
            onSeatDeselect={handleDeselect}
            maxSelections={maxSeats}
            showLegend={true}
            showSelectedSeats={false}
          />
        </div>

        <DialogFooter className="flex gap-2 sm:justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            {tempSelected.length} de {maxSeats} seleccionados
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleConfirmInternal}>
              Confirmar Selección
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// --- COMPONENTE PRINCIPAL ---

interface SelectedFlight {
  stepId: string;
  flight: TransportTrip; 
}

// Helpers
const formatTime = (isoString: string) => {
  if (!isoString) return '--:--';
  return new Date(isoString).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};
const formatDate = (isoString: string) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' });
};
const formatDuration = (minutes?: number) => {
  if (!minutes) return '--';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export default function FlightShoppingCart() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('return') || '/transports/flights';
  const selectedFlightsParam = searchParams.get('flights');
  
  const adultsCount = parseInt(searchParams.get('adults') || '1', 10);
  const childrenCount = parseInt(searchParams.get('children') || '0', 10);
  const totalPassengers = adultsCount + childrenCount;

  const [selectedFlights, setSelectedFlights] = useState<SelectedFlight[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estado: Map<FlightId, Array<SeatObjects>>
  const [seatSelections, setSeatSelections] = useState<Record<string, Seat[]>>({});
  const [activeModalFlightId, setActiveModalFlightId] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    if (selectedFlightsParam) {
      try {
        const parsed = JSON.parse(selectedFlightsParam);
        if (Array.isArray(parsed) && parsed.length > 0) setSelectedFlights(parsed);
      } catch (error) {
        console.error('❌ Error parsing flights:', error);
      }
    }
    setLoading(false);
  }, [selectedFlightsParam]);

  const handleConfirmSeats = (flightId: string, seats: Seat[]) => {
    setSeatSelections(prev => ({ ...prev, [flightId]: seats }));
  };

  // Cálculo Total
  const grandTotal = selectedFlights.reduce((acc, sf) => {
    const flightPrice = sf.flight?.prices?.[0]?.price || 0;
    const baseFareTotal = flightPrice * totalPassengers;
    const flightSeats = seatSelections[sf.flight.id] || [];
    const seatsCost = flightSeats.reduce((sum, s) => sum + (s.price || 0), 0);
    return acc + baseFareTotal + seatsCost;
  }, 0);

  const currency = selectedFlights[0]?.flight?.prices?.[0]?.currency || 'USD';

  if (!isClient) return null;
  if (!loading && selectedFlights.length === 0) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">No se encontraron los vuelos</h2>
            <Button onClick={() => window.location.href = returnUrl}>Volver a buscar</Button>
        </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <Button variant="outline" onClick={() => window.location.href = returnUrl} className="mb-4">
          ← Volver a resultados
        </Button>
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2">Revisa los detalles de tu viaje</h1>
          <div className="flex items-center gap-2 text-gray-600">
             <Users className="w-4 h-4" />
             <span>{adultsCount} Adulto{adultsCount !== 1 ? 's' : ''}{childrenCount > 0 && `, ${childrenCount} Niño${childrenCount !== 1 ? 's' : ''}`}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LADO IZQUIERDO */}
        <div className="lg:col-span-2 space-y-6">
          {selectedFlights.map((item, index) => {
            const { flight } = item;
            if (!flight || !flight.operator) return null;

            const priceInfo = flight.prices?.[0];
            const currentSeats = seatSelections[flight.id] || [];
            const flightRouteTitle = `${flight.origin.stop.city} a ${flight.destination.stop.city}`;

            return (
              <React.Fragment key={`${flight.id}-${index}`}>
                <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gray-50 border-b py-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Badge className="w-6 h-6 rounded-full flex items-center justify-center p-0">{index + 1}</Badge>
                        <span className="text-xs font-normal text-gray-500 ml-2">{formatDate(flight.origin.dateTime)}</span>
                      </CardTitle>
                      
                      <Button 
                        variant={currentSeats.length > 0 ? "secondary" : "outline"}
                        size="sm"
                        className={`h-8 gap-2 ${currentSeats.length > 0 ? "text-blue-700 bg-blue-50 border-blue-200" : ""}`}
                        onClick={() => setActiveModalFlightId(flight.id)}
                      >
                        <Armchair className="w-4 h-4" />
                        {currentSeats.length > 0 
                          ? `${currentSeats.length} Asientos` 
                          : "Seleccionar Asientos"}
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Header Aerolínea */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 border rounded-lg flex items-center justify-center bg-white p-1 overflow-hidden">
                            <img src={flight.operator.logoUrl} alt={flight.operator.name} className="w-full h-full object-contain"/>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{flight.operator.name}</h3>
                            <p className="text-sm text-gray-500">{flight.routeId || 'Vuelo comercial'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Tarifa base</p>
                          <p className="text-lg font-bold text-gray-900">${priceInfo?.price || 0}</p>
                          <Badge variant="secondary" className="mt-1 font-normal text-xs">{priceInfo?.class || 'Económica'}</Badge>
                        </div>
                      </div>

                      {/* Ruta */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="text-center min-w-[80px]">
                            <p className="text-xl font-bold text-gray-900">{formatTime(flight.origin.dateTime)}</p>
                            <p className="text-lg font-medium text-gray-700">{flight.origin?.stop.stopCode}</p>
                          </div>
                          <div className="flex-1 mx-4 flex flex-col items-center">
                            <p className="text-xs text-gray-500 mb-1">{formatDuration(flight.durationMinutes)}</p>
                            <div className="relative w-full flex items-center">
                              <div className="h-[2px] bg-gray-300 w-full rounded-full"></div>
                              <Plane className="absolute left-1/2 -translate-x-1/2 text-blue-500 bg-gray-50 px-1 w-6 h-6" />
                            </div>
                            <p className="text-xs text-blue-600 mt-1 font-medium">{flight.isDirect ? 'Directo' : `${flight.stops?.length || 0} Escalas`}</p>
                          </div>
                          <div className="text-center min-w-[80px]">
                            <p className="text-xl font-bold text-gray-900">{formatTime(flight.destination.dateTime)}</p>
                            <p className="text-lg font-medium text-gray-700">{flight.destination?.stop.stopCode}</p>
                          </div>
                        </div>
                      </div>

                      {/* Amenities + Badge de Asientos */}
                      <div className="flex flex-wrap gap-2">
                         <Badge variant="outline" className="gap-1 font-normal text-gray-500"><Briefcase className="w-3 h-3"/> Equipaje</Badge>
                         {currentSeats.length > 0 && (
                            <div className="flex gap-2">
                              {currentSeats.map(seat => (
                                <Badge key={seat.id} variant="secondary" className="gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                                  <Armchair className="w-3 h-3"/> 
                                  {seat.id} 
                                  {(seat.price || 0) > 0 && <span className="ml-1 text-[10px] opacity-80">+${seat.price}</span>}
                                </Badge>
                              ))}
                            </div>
                         )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <SeatSelectionDialog 
                  isOpen={activeModalFlightId === flight.id}
                  onClose={() => setActiveModalFlightId(null)}
                  onConfirm={(seats) => handleConfirmSeats(flight.id, seats)}
                  flightTitle={flightRouteTitle}
                  maxSeats={totalPassengers}
                  currentSelection={currentSeats}
                />
              </React.Fragment>
            );
          })}
        </div>

        {/* LADO DERECHO (Resumen) */}
        <div className="space-y-6">
          <Card className="sticky top-6 border-blue-200 shadow-md">
            <CardHeader className="bg-blue-50/50 pb-4 border-b">
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5"/> Resumen de Pago
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              
              {selectedFlights.map((item, idx) => {
                const basePrice = item.flight?.prices?.[0]?.price || 0;
                
                // --- LÓGICA DE COSTOS DE ASIENTO ---
                const seats = seatSelections[item.flight.id] || [];
                
                // Distribuimos los asientos seleccionados entre Adultos y Niños
                // Lógica simple: Los primeros N asientos son para adultos, los siguientes para niños.
                const adultSeats = seats.slice(0, adultsCount);
                const childSeats = seats.slice(adultsCount, adultsCount + childrenCount);

                const adultsSeatCost = adultSeats.reduce((sum, s) => sum + (s.price || 0), 0);
                const childrenSeatCost = childSeats.reduce((sum, s) => sum + (s.price || 0), 0);

                const adultsTotal = (basePrice * adultsCount) + adultsSeatCost;
                const childrenTotal = (basePrice * childrenCount) + childrenSeatCost;
                
                const flightTotal = adultsTotal + childrenTotal;

                // Función auxiliar para renderizar el badge de precio de asiento
                const renderSeatPriceBadge = (cost: number, count: number, totalExpected: number) => {
                   if (count === 0 && totalExpected > 0) return <span className="text-xs text-gray-400">Aleatorio</span>; // No ha seleccionado
                   if (cost === 0) return <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px] h-5 px-1.5 border-green-200">Gratis</Badge>;
                   return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px] h-5 px-1.5 border-blue-200">+${cost}</Badge>;
                };

                return (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-semibold text-sm text-gray-800">
                        <Badge variant="outline" className="text-xs bg-white">{idx + 1}</Badge>
                        {item.flight.origin.stop.stopCode} <ChevronRight className="w-3 h-3"/> {item.flight.destination.stop.stopCode}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 text-sm">
                      <div className="grid grid-cols-4 mb-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                        <span className="col-span-1">Pasajero</span>
                        <span className="text-center">Asiento</span>
                        <span className="text-center">Cant.</span>
                        <span className="text-right">Subtotal</span>
                      </div>

                      {/* FILA ADULTOS */}
                      <div className="grid grid-cols-4 py-2 border-b border-gray-100 last:border-0 items-center">
                        <span className="text-gray-700 font-medium">Adulto</span>
                        <div className="flex justify-center">
                           {renderSeatPriceBadge(adultsSeatCost, adultSeats.length, adultsCount)}
                        </div>
                        <span className="text-center text-gray-500">x{adultsCount}</span>
                        <span className="text-right font-medium text-gray-900">${adultsTotal}</span>
                      </div>

                      {/* FILA NIÑOS */}
                      {childrenCount > 0 && (
                        <div className="grid grid-cols-4 py-2 border-b border-gray-100 last:border-0 items-center">
                          <span className="text-gray-700 font-medium">Niño</span>
                          <div className="flex justify-center">
                             {renderSeatPriceBadge(childrenSeatCost, childSeats.length, childrenCount)}
                          </div>
                          <span className="text-center text-gray-500">x{childrenCount}</span>
                          <span className="text-right font-medium text-gray-900">${childrenTotal}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-500 font-medium">Total Vuelo {idx + 1}</span>
                        <span className="font-bold text-gray-800">${flightTotal}</span>
                      </div>
                    </div>
                    
                    {idx < selectedFlights.length - 1 && <Separator className="my-4 border-dashed" />}
                  </div>
                );
              })}

              <div className="bg-blue-50/30 rounded-xl p-4 border border-blue-100 mt-4">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-xl text-blue-900">Total a Pagar</span>
                  <div className="text-right">
                      <span className="font-bold text-3xl block leading-none text-blue-700">${grandTotal}</span>
                      <span className="text-xs text-gray-500 uppercase font-medium tracking-wide">{currency}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full h-12 text-lg font-semibold shadow-lg shadow-blue-200" size="lg" onClick={() => alert("Procesando pago...")}>
                <CreditCard className="h-5 w-5 mr-2" /> Pagar Ahora
              </Button>
              <div className="text-center mt-2">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1"><Check className="w-3 h-3"/> Transacción 100% segura</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}