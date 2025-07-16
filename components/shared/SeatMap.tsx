'use client';

import React, { Suspense, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, Info } from 'lucide-react';

// Tipos para el mapa de asientos
export type SeatStatus = 'available' | 'occupied' | 'selected' | 'disabled';

export interface Seat {
  id: string;
  row: number;
  column: string;
  status: SeatStatus;
  class?: 'economy' | 'premium' | 'business' | 'first';
  price?: number;
  features?: string[];
}

export interface SeatMapConfig {
  type: 'bus' | 'airplane' | 'train';
  rows: number;
  columnsPerRow: number;
  orientation?: 'vertical' | 'horizontal'; // Nueva opción de orientación
  aislePositions?: number[]; // Posiciones donde hay pasillos (índices de columnas)
  seatLayout: {
    left: number; // Número de asientos a la izquierda del pasillo
    right: number; // Número de asientos a la derecha del pasillo
    aisles?: number[]; // Posiciones de pasillos adicionales
  };
  classLayout?: {
    [key: string]: {
      startRow: number;
      endRow: number;
      class: 'economy' | 'premium' | 'business' | 'first';
    };
  };
}

export interface SeatMapProps {
  config: SeatMapConfig;
  seats: Seat[];
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
  onSeatDeselect: (seatId: string) => void;
  maxSelections?: number;
  showLegend?: boolean;
  showClassInfo?: boolean;
  className?: string;
  showSelectedSeats?: boolean;
}

// Componente individual de asiento
interface SeatComponentProps {
  seat: Seat;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  showTooltip?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

const SeatComponent: React.FC<SeatComponentProps> = ({
  seat,
  isSelected,
  onClick,
  disabled = false,
  showTooltip = true,
  orientation = 'vertical'
}) => {
  const getSeatColor = () => {
    if (disabled || seat.status === 'disabled') {
      return 'opacity-30 cursor-not-allowed';
    }
    
    if (isSelected || seat.status === 'selected') {
      return 'text-primary fill-primary/40 stroke-primary';
    }
    
    switch (seat.status) {
      case 'available':
        return 'text-gray-400/10 strolke-gray-600 hover:text-primary/50 hover:stroke-primary/80 cursor-pointer';
      case 'occupied':
        return 'text-gray-600/40 fill-gray-300 stroke-gray-400 cursor-not-allowed';
      default:
        return 'text-gray-600/10 fill-white stroke-gray-400';
    }
  };

  const getClassColor = () => {
    switch (seat.class) {
      case 'first':
        return 'border-purple-300 bg-purple-50';
      case 'business':
        return 'border-blue-300 bg-blue-50';
      case 'premium':
        return 'border-green-300 bg-green-50';
      case 'economy':
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getStatusText = () => {
    switch (seat.status) {
      case 'available':
        return 'Disponible';
      case 'occupied':
        return 'Ocupado';
      case 'selected':
        return 'Seleccionado';
      case 'disabled':
        return 'No disponible';
      default:
        return seat.status;
    }
  };

  const getClassText = () => {
    switch (seat.class) {
      case 'first':
        return 'Primera Clase';
      case 'business':
        return 'Clase Ejecutiva';
      case 'premium':
        return 'Clase Premium';
      case 'economy':
        return 'Clase Económica';
      default:
        return 'Estándar';
    }
  };

  const canClick = !disabled && seat.status !== 'occupied' && seat.status !== 'disabled';

  const tooltipContent = (
    <div className="space-y-1">
      <div className="font-semibold">Asiento {seat.row}{seat.column}</div>
      <div className="text-muted-foreground">{getStatusText()}</div>
      {seat.class && (
        <div className="text-muted-foreground">{getClassText()}</div>
      )}
      {seat.price && (
        <div className="text-green-600 font-medium">
          ${seat.price.toLocaleString()}
        </div>
      )}
      {seat.features && seat.features.length > 0 && (
        <div className="text-muted-foreground text-xs">
          {seat.features.join(', ')}
        </div>
      )}
    </div>
  );

  const seatButton = (
    <button
      onClick={canClick ? onClick : undefined}
      disabled={!canClick}
      className={`
        relative w-8 h-8 transition-all duration-200 
        ${getSeatColor()}
        ${canClick ? 'transform hover:scale-110' : ''}
      `}
      title={`Asiento ${seat.row}${seat.column} - ${seat.status} ${seat.class ? `(${seat.class})` : ''}`}
    >
      {/* SVG del asiento */}
      <svg
        scale={1.55}
        
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        className={`w-full h-full  ${orientation === 'horizontal' ? 'transform rotate-90' : ''}`}
      >
        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
        <path d="M3 11v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9" />
        <path d="M5 11h14" />
        <path d="M7 7h10" />
      </svg>
      
      {/* Número del asiento */}
      <span className={`
        absolute inset-0 flex items-center justify-center text-xs font-bold hover:text-white
        ${isSelected || seat.status === 'selected' ? 'text-white text-shadow-2xl shadow-sky-300' : 'text-gray-700'}
      `}>
        {seat.row}{seat.column}
      </span>
      
      {/* Indicador de clase */}
      {seat.class && seat.class !== 'economy' && (
        <div className={`
          absolute -top-1 -right-1 w-3 h-3 rounded-full border 
          ${getClassColor()}
        `} />
      )}
    </button>
  );

  if (!showTooltip) {
    return <div className="relative">{seatButton}</div>;
  }

  return (
    <div className="relative">
      <Tooltip>
        <TooltipTrigger asChild>
          {seatButton}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

// Componente principal del mapa de asientos
export default function SeatMap({
  config,
  seats,
  selectedSeats,
  onSeatSelect,
  onSeatDeselect,
  maxSelections = 1,
  showLegend = true,
  showClassInfo = true,
  className = '',
  showSelectedSeats = true
}: SeatMapProps) {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);
  const orientation = config.orientation || 'vertical';

  // Generar la nomenclatura de columnas (A, B, C, D, etc.)
  const generateColumnLabels = (count: number): string[] => {
    const labels = [];
    for (let i = 0; i < count; i++) {
      labels.push(String.fromCharCode(65 + i)); // A, B, C, D...
    }
    return labels;
  };

  // Obtener asiento por posición
  const getSeatByPosition = (row: number, column: string): Seat | undefined => {
    return seats.find(seat => seat.row === row && seat.column === column);
  };

  // Manejar clic en asiento
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied' || seat.status === 'disabled') return;

    const isCurrentlySelected = selectedSeats.includes(seat.id);
    
    if (isCurrentlySelected) {
      onSeatDeselect(seat.id);
    } else {
      if (selectedSeats.length < maxSelections) {
        onSeatSelect(seat.id);
      }
    }
  };

  // Renderizar fila de asientos para orientación vertical
  const renderSeatRowVertical = (rowNumber: number) => {
    const columnLabels = generateColumnLabels(config.columnsPerRow);
    const { left, right } = config.seatLayout;
    
    return (
      <div key={rowNumber} className="flex items-center justify-center gap-1">
        {/* Número de fila */}
        <div className="w-8 text-center text-sm font-medium text-gray-500">
          {rowNumber}
        </div>
        
        {/* Asientos del lado izquierdo */}
        <div className="flex gap-1">
          {columnLabels.slice(0, left).map((column) => {
            const seat = getSeatByPosition(rowNumber, column);
            if (!seat) return <div key={column} className="w-8 h-8" />;
            
            return (
              <SeatComponent
                key={seat.id}
                seat={seat}
                isSelected={selectedSeats.includes(seat.id)}
                onClick={() => handleSeatClick(seat)}
                disabled={maxSelections > 0 && selectedSeats.length >= maxSelections && !selectedSeats.includes(seat.id)}
                orientation={orientation}
              />
            );
          })}
        </div>
        
        {/* Pasillo */}
        <div className="w-6" />
        
        {/* Asientos del lado derecho */}
        <div className="flex gap-1">
          {columnLabels.slice(left, left + right).map((column) => {
            const seat = getSeatByPosition(rowNumber, column);
            if (!seat) return <div key={column} className="w-8 h-8" />;
            
            return (
              <SeatComponent
                key={seat.id}
                seat={seat}
                isSelected={selectedSeats.includes(seat.id)}
                onClick={() => handleSeatClick(seat)}
                disabled={maxSelections > 0 && selectedSeats.length >= maxSelections && !selectedSeats.includes(seat.id)}
                orientation={orientation}
              />
            );
          })}
        </div>
        
        {/* Número de fila (derecha) */}
        <div className="w-8 text-center text-sm font-medium text-gray-500">
          {rowNumber}
        </div>
      </div>
    );
  };

  // Renderizar indicador de dirección
  const renderDirectionIndicator = () => {
    if (config.type !== 'airplane') return null;
    
    if (orientation === 'horizontal') {
      return (
        <div className="flex justify-start mb-4 ml-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-0 h-0 border-t-4 border-b-4 border-r-8 border-t-transparent border-b-transparent border-r-gray-400" />
            <span>Frente del avión</span>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-400" />
          <span>Frente del avión</span>
        </div>
      </div>
    );
  };

  // Renderizar fila de asientos para orientación horizontal (transpuesta)
  const renderSeatRowHorizontal = (rowNumber: number) => {
    const columnLabels = generateColumnLabels(config.columnsPerRow);
    const { left, right } = config.seatLayout;
    
    return (
      <div key={rowNumber} className="flex flex-col items-center gap-1">
        {/* Número de fila (arriba) */}
        <div className="h-6 text-center text-sm font-medium text-gray-500">
          {rowNumber}
        </div>
        
        {/* Asientos del lado izquierdo (ahora arriba) */}
        <div className="flex flex-col gap-1">
          {columnLabels.slice(0, left).map((column) => {
            const seat = getSeatByPosition(rowNumber, column);
            if (!seat) return <div key={column} className="w-8 h-8" />;
            
            return (
              <SeatComponent
                key={seat.id}
                seat={seat}
                isSelected={selectedSeats.includes(seat.id)}
                onClick={() => handleSeatClick(seat)}
                disabled={maxSelections > 0 && selectedSeats.length >= maxSelections && !selectedSeats.includes(seat.id)}
                orientation={orientation}
              />
            );
          })}
        </div>
        
        {/* Pasillo (ahora vertical entre arriba y abajo) */}
        <div className="h-4" />
        
        {/* Asientos del lado derecho (ahora abajo) */}
        <div className="flex flex-col gap-1">
          {columnLabels.slice(left, left + right).map((column) => {
            const seat = getSeatByPosition(rowNumber, column);
            if (!seat) return <div key={column} className="w-8 h-8" />;
            
            return (
              <SeatComponent
                key={seat.id}
                seat={seat}
                isSelected={selectedSeats.includes(seat.id)}
                onClick={() => handleSeatClick(seat)}
                disabled={maxSelections > 0 && selectedSeats.length >= maxSelections && !selectedSeats.includes(seat.id)}
                orientation={orientation}
              />
            );
          })}
        </div>
        
        {/* Número de fila (abajo) */}
        <div className="h-6 text-center text-sm font-medium text-gray-500">
          {rowNumber}
        </div>
      </div>
    );
  };

  // Renderizar el mapa según la orientación
  const renderSeatMap = () => {
    if (orientation === 'horizontal') {
      const columnLabels = generateColumnLabels(config.columnsPerRow);
      const { left, right } = config.seatLayout;
      
      return (
        <div className="flex flex-col items-center gap-2">
          
          
          {/* Mapa de asientos transpuesto */}
          <div className="flex gap-2 items-center">
            {/* Etiquetas de columnas (A, B, C, D) lado izquierdo */}
            <div className="flex flex-col gap-1 justify-center">
              {columnLabels.slice(0, left).map((columnLabel) => (
                <div key={columnLabel} className="w-6 h-[38px] flex items-center justify-center text-sm font-medium text-gray-500">
                  {columnLabel}
                </div>
              ))}
              <div className="h-4" /> {/* Espacio del pasillo */}
              {columnLabels.slice(left, left + right).map((columnLabel) => (
                <div key={columnLabel} className="w-6 h-10 flex items-center justify-center text-sm font-medium text-gray-500">
                  {columnLabel}
                </div>
              ))}
            </div>
            
            {/* Asientos organizados horizontalmente */}
            <div className="flex gap-2">
              {Array.from({ length: config.rows }, (_, index) => index + 1).map(renderSeatRowHorizontal)}
            </div>
            
            {/* Etiquetas de columnas (A, B, C, D) lado derecho */}
            <div className="flex flex-col gap-1 justify-center">
              {columnLabels.slice(0, left).map((columnLabel) => (
                <div key={columnLabel} className="w-6 h-[38px] flex items-center justify-center text-sm font-medium text-gray-500">
                  {columnLabel}
                </div>
              ))}
              <div className="h-4" /> {/* Espacio del pasillo */}
              {columnLabels.slice(left, left + right).map((columnLabel) => (
                <div key={columnLabel} className="w-6 h-10 flex items-center justify-center text-sm font-medium text-gray-500">
                  {columnLabel}
                </div>
              ))}
            </div>
          </div>
         
        </div>
      );
    } else {
      // Orientación vertical (original)
      return (
        <div className="space-y-2">
          {Array.from({ length: config.rows }, (_, index) => index + 1).map(renderSeatRowVertical)}
        </div>
      );
    }
  };

  // Renderizar leyenda
  const renderLegend = () => {
    if (!showLegend) return null;
    
    return (
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-gray-400 bg-white rounded" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 border-2 border-gray-400 rounded" />
          <span>Ocupado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary/40 border-2 border-primary/80 rounded" />
          <span>Seleccionado</span>
        </div>
      </div>
    );
  };

  // Renderizar información de clases
  const renderClassInfo = () => {
    if (!showClassInfo || !config.classLayout) return null;
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {Object.entries(config.classLayout).map(([name, info]) => (
          <div key={name} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full border ${
              info.class === 'first' ? 'bg-purple-200 border-purple-400' :
              info.class === 'business' ? 'bg-blue-200 border-blue-400' :
              info.class === 'premium' ? 'bg-green-200 border-green-400' :
              'bg-gray-200 border-gray-400'
            }`} />
            <span className="capitalize">{name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <Suspense fallback={<div className="h-20 animate-pulse rounded-lg" />}>
        <Card className={`w-full overflow-visible bg-transparent border-none ${className}`}>
          <CardHeader>
            {/* <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Mapa de Asientos
              {config.type === 'airplane' && '✈️'}
              {config.type === 'bus' && '🚌'}
              {config.type === 'train' && '🚂'}
            </CardTitle> */}
            {maxSelections > 1 && (
              <p className="text-sm text-gray-600">
                Selecciona hasta {maxSelections} asientos ({selectedSeats.length} seleccionados)
              </p>
            )}
            {maxSelections === 1 && (
              <p className="text-sm text-gray-600">
                Selecciona un asiento para continuar
              </p>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6 overflow-visible relative border-none">
            {/* Indicador de dirección */}
            {renderDirectionIndicator()}
            
            {/* Información de clases */}
            {renderClassInfo()}
            
            {/* Mapa de asientos */}
            <div className={`p-4 rounded-lg ${orientation === 'horizontal' ? 'overflow-x-auto' : ''} relative overflow-visible`}>
              {renderSeatMap()}
            </div>
            
            {/* Leyenda */}
            {renderLegend()}
            
            {/* Información adicional */}
            {showSelectedSeats && selectedSeats.length > 0 && (
             
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Asientos seleccionados:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(seatId => {
                    const seat = seats.find(s => s.id === seatId);
                    return seat ? (
                      <Badge key={seatId} variant="outline" className="bg-white">
                        {seat.row}{seat.column}
                        {seat.class && ` (${seat.class})`}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
         
            )}
          </CardContent>
        </Card>
      </Suspense>
    </TooltipProvider>
  );
}
