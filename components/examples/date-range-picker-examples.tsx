/**
 * DateRangePickerCustom Component Usage Examples
 * 
 * This file contains examples of how to use the DateRangePickerCustom component
 * with different configurations.
 */

import React, { useState } from 'react';
import { DateRangePickerCustom } from './date-range-picker-custom';

// Example 1: Basic range picker
export function BasicRangePickerExample() {
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});

  return (
    <DateRangePickerCustom
      label="Fechas de viaje"
      value={range}
      onChange={setRange}
      placeholder="Seleccionar fechas"
    />
  );
}

// Example 2: Range picker with flexible dates
export function FlexibleRangePickerExample() {
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});

  return (
    <DateRangePickerCustom
      label="Fechas de estadía"
      value={range}
      onChange={setRange}
      showFlexibleDates={true}
      defaultActiveTab="flexible"
    />
  );
}

// Example 3: Dual trigger for transport (separate ida/vuelta buttons)
// Note: This mode prevents selecting return date before departure date
export function DualTriggerExample() {
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});

  return (
    <div className="space-y-4">
      <DateRangePickerCustom
        label="Fechas de viaje"
        value={range}
        onChange={setRange}
        dualTrigger={true}
        showFlexibleDates={false}
        dualTriggerLabels={{
          from: "Fecha de ida",
          to: "Fecha de vuelta"
        }}
        hasReturnDate={true}
      />
      {/* Display selected dates for debugging */}
      <div className="text-sm text-muted-foreground">
        {range.from && <div>Ida: {range.from.toLocaleDateString('es-ES')}</div>}
        {range.to && <div>Vuelta: {range.to.toLocaleDateString('es-ES')}</div>}
        {range.from && range.to && range.from > range.to && (
          <div className="text-red-500">⚠️ Error: Fecha de ida no puede ser posterior a la fecha de vuelta</div>
        )}
      </div>
    </div>
  );
}

// Example 5: oneway trip (only departure date)
export function OneWayTripExample() {
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});

  return (
    <div className="space-y-4">
      <DateRangePickerCustom
        label="Fecha de viaje"
        value={range}
        onChange={setRange}
        dualTrigger={true}
        showFlexibleDates={false}
        dualTriggerLabels={{
          from: "Fecha de salida",
          to: "Fecha de regreso"
        }}
        hasReturnDate={false}
      />
      {/* Display selected date for debugging */}
      <div className="text-sm text-muted-foreground">
        {range.from && <div>Salida: {range.from.toLocaleDateString('es-ES')}</div>}
        {!range.from && <div>Selecciona una fecha de salida</div>}
      </div>
    </div>
  );
}

// Example 4: Lodging with flexible dates as default
export function LodgingExample() {
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});

  return (
    <DateRangePickerCustom
      label="Fechas de alojamiento"
      value={range}
      onChange={setRange}
      showFlexibleDates={true}
      defaultActiveTab="flexible"
    />
  );
}
