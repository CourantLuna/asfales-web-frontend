/**
 * PassengerSelector Component Usage Examples
 * 
 * This file contains examples of how to use the PassengerSelector component
 * for different transport booking scenarios.
 */

import React, { useState } from 'react';
import { PassengerSelector, PassengerGroup } from '../shared/standard-fields-component/PassengerSelector';

// Example 1: Basic passenger selector
export function BasicPassengerExample() {
  const [passengers, setPassengers] = useState<PassengerGroup>({
    adults: 1,
    children: [],
    infantsOnLap: [],
    infantsInSeat: [],
  });

  return (
    <div className="space-y-4">
      <PassengerSelector
        label="Seleccionar pasajeros"
        initialPassengers={passengers}
        onPassengersChange={setPassengers}
      />
      
      {/* Display current selection for debugging */}
      <div className="text-sm text-muted-foreground space-y-1">
        <div>Adultos: {passengers?.adults}</div>
        <div>Niños: {passengers?.children.length}</div>
        <div>Bebés en regazo: {passengers?.infantsOnLap.length}</div>
        <div>Bebés con asiento: {passengers?.infantsInSeat.length}</div>
      </div>
    </div>
  );
}

// Example 2: Transport booking with validation
export function TransportPassengerExample() {
  const [passengers, setPassengers] = useState<PassengerGroup>({
    adults: 2,
    children: [],
    infantsOnLap: [],
    infantsInSeat: [],
  });

  // Calculate total passengers (excluding infants on lap)
  const totalPassengersWithSeats = passengers.adults + passengers.children.length + passengers.infantsInSeat.length;
  const hasError = totalPassengersWithSeats > 9; // Example airline limit

  return (
    <div className="space-y-4">
      <PassengerSelector
        label="Pasajeros"
        initialPassengers={passengers}
        onPassengersChange={setPassengers}
        error={hasError ? "Máximo 9 pasajeros por reserva" : undefined}
        helperText="Los bebés en regazo no ocupan asiento"
        maxAdults={9}
        maxChildren={6}
        maxInfantsOnLap={4}
        maxInfantsInSeat={4}
      />
      
      {/* Booking summary */}
      <div className="p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium mb-2">Resumen de pasajeros</h4>
        <div className="text-sm space-y-1">
          <div>Total de asientos necesarios: {totalPassengersWithSeats}</div>
          <div>Bebés en regazo: {passengers.infantsOnLap.length}</div>
          {passengers.children.length > 0 && (
            <div>
              Edades de niños: {passengers.children.map(child => `${child.age} años`).join(", ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Example 3: International flight with detailed passenger info
export function InternationalFlightExample() {
  const [passengers, setPassengers] = useState<PassengerGroup>({
    adults: 1,
    children: [],
    infantsOnLap: [],
    infantsInSeat: [],
  });

  return (
    <div className="space-y-4">
      <PassengerSelector
        label="Pasajeros del vuelo"
        initialPassengers={passengers}
        onPassengersChange={setPassengers}
        showPassengerDetails={true}
        helperText="Para vuelos internacionales se requieren datos adicionales de cada pasajero"
        required
      />
      
      {/* Additional notes */}
      <div className="text-xs text-muted-foreground p-3 bg-blue-50 rounded-lg">
        <strong>Importante:</strong>
        <ul className="mt-1 space-y-1 ml-4 list-disc">
          <li>Los bebés en regazo viajan gratis pero no ocupan asiento</li>
          <li>Los niños de 2-11 años califican para tarifas infantiles</li>
          <li>Los menores de edad requieren autorización parental</li>
        </ul>
      </div>
    </div>
  );
}
