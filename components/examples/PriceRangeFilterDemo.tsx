"use client";

import React, { useState } from "react";
import { PriceRangeFilter } from "../shared/standard-fields-component/PriceRangeFilter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/**
 * Demo component que muestra cómo usar PriceRangeFilter con onOutputStringChange
 * en ambos modos: 'range' y 'single'
 */
export default function PriceRangeFilterDemo() {
  // Estados para modo range
  const [rangeValue, setRangeValue] = useState<[number, number]>([100, 500]);
  const [rangeOutputString, setRangeOutputString] = useState<string>("");

  // Estados para modo single
  const [singleValue, setSingleValue] = useState<[number, number]>([300, 300]);
  const [singleOutputString, setSingleOutputString] = useState<string>("");

  // Estados para ejemplos con unidades
  const [durationValue, setDurationValue] = useState<[number, number]>([2, 12]);
  const [durationOutputString, setDurationOutputString] = useState<string>("");

  const [layoverValue, setLayoverValue] = useState<[number, number]>([4, 4]);
  const [layoverOutputString, setLayoverOutputString] = useState<string>("");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">PriceRangeFilter Demo</h1>
        <p className="text-muted-foreground">
          Demostración del componente PriceRangeFilter con onOutputStringChange en diferentes modos
        </p>
      </div>

      {/* Ejemplo 1: Modo Range con currency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Modo Range - Precio
            <Badge variant="secondary">mode="range"</Badge>
          </CardTitle>
          <CardDescription>
            Filtro de rango dual para seleccionar precio mínimo y máximo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PriceRangeFilter
            min={0}
            max={1000}
            value={rangeValue}
            onChange={setRangeValue}
            onOutputStringChange={(outputString) => {
              console.log("Range Output String:", outputString);
              setRangeOutputString(outputString);
            }}
            mode="range"
            currency="$"
            label="Rango de Precio"
            step={10}
          />
          
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium mb-1">Valores actuales:</p>
            <p className="text-sm text-muted-foreground">
              Mínimo: ${rangeValue[0]} | Máximo: ${rangeValue[1]}
            </p>
            <p className="text-sm font-medium mt-2 mb-1">Output String:</p>
            <p className="text-sm text-muted-foreground">
              {rangeOutputString || "Sin filtro aplicado"}
            </p>
          </div>

          <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded">
            <strong>Código:</strong>
            <pre className="mt-1 whitespace-pre-wrap">
{`<PriceRangeFilter
  min={0}
  max={1000}
  value={rangeValue}
  onChange={setRangeValue}
  onOutputStringChange={(outputString) => {
    setRangeOutputString(outputString);
  }}
  mode="range"
  currency="$"
  label="Rango de Precio"
  step={10}
/>`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Ejemplo 2: Modo Single con currency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Modo Single - Precio Máximo
            <Badge variant="secondary">mode="single"</Badge>
          </CardTitle>
          <CardDescription>
            Filtro de valor único para seleccionar precio máximo ("menor a X")
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PriceRangeFilter
            min={0}
            max={1000}
            value={singleValue}
            onChange={setSingleValue}
            onOutputStringChange={(outputString) => {
              console.log("Single Output String:", outputString);
              setSingleOutputString(outputString);
            }}
            mode="single"
            currency="$"
            label="Precio Máximo"
            step={25}
          />
          
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium mb-1">Valor actual:</p>
            <p className="text-sm text-muted-foreground">
              Máximo: ${singleValue[0]}
            </p>
            <p className="text-sm font-medium mt-2 mb-1">Output String:</p>
            <p className="text-sm text-muted-foreground">
              {singleOutputString || "Sin filtro aplicado"}
            </p>
          </div>

          <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded">
            <strong>Código:</strong>
            <pre className="mt-1 whitespace-pre-wrap">
{`<PriceRangeFilter
  min={0}
  max={1000}
  value={singleValue}
  onChange={setSingleValue}
  onOutputStringChange={(outputString) => {
    setSingleOutputString(outputString);
  }}
  mode="single"
  currency="$"
  label="Precio Máximo"
  step={25}
/>`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Ejemplo 3: Modo Range con unitSuffix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Modo Range - Duración de Vuelo
            <Badge variant="secondary">unitSuffix="h"</Badge>
          </CardTitle>
          <CardDescription>
            Filtro de rango para duración con sufijo de unidad (horas)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PriceRangeFilter
            min={1}
            max={24}
            value={durationValue}
            onChange={setDurationValue}
            onOutputStringChange={(outputString) => {
              console.log("Duration Output String:", outputString);
              setDurationOutputString(outputString);
            }}
            mode="range"
            unitSuffix="h"
            label="Duración de Vuelo"
            step={1}
            showInputs={true}
          />
          
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium mb-1">Valores actuales:</p>
            <p className="text-sm text-muted-foreground">
              Mínimo: {durationValue[0]}h | Máximo: {durationValue[1]}h
            </p>
            <p className="text-sm font-medium mt-2 mb-1">Output String:</p>
            <p className="text-sm text-muted-foreground">
              {durationOutputString || "Sin filtro aplicado"}
            </p>
          </div>

          <div className="text-xs text-muted-foreground bg-green-50 p-3 rounded">
            <strong>Código:</strong>
            <pre className="mt-1 whitespace-pre-wrap">
{`<PriceRangeFilter
  min={1}
  max={24}
  value={durationValue}
  onChange={setDurationValue}
  onOutputStringChange={(outputString) => {
    setDurationOutputString(outputString);
  }}
  mode="range"
  unitSuffix="h"
  label="Duración de Vuelo"
  step={1}
/>`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Ejemplo 4: Modo Single con unitSuffix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Modo Single - Tiempo de Escala Máximo
            <Badge variant="secondary">mode="single" + unitSuffix="h"</Badge>
          </CardTitle>
          <CardDescription>
            Filtro de valor único para tiempo máximo de escala
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PriceRangeFilter
            min={0}
            max={12}
            value={layoverValue}
            onChange={setLayoverValue}
            onOutputStringChange={(outputString) => {
              console.log("Layover Output String:", outputString);
              setLayoverOutputString(outputString);
            }}
            mode="single"
            unitSuffix="h"
            label="Tiempo de Escala Máximo"
            step={1}
            showInputs={false}
          />
          
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium mb-1">Valor actual:</p>
            <p className="text-sm text-muted-foreground">
              Máximo: {layoverValue[0]}h
            </p>
            <p className="text-sm font-medium mt-2 mb-1">Output String:</p>
            <p className="text-sm text-muted-foreground">
              {layoverOutputString || "Sin filtro aplicado"}
            </p>
          </div>

          <div className="text-xs text-muted-foreground bg-green-50 p-3 rounded">
            <strong>Código:</strong>
            <pre className="mt-1 whitespace-pre-wrap">
{`<PriceRangeFilter
  min={0}
  max={12}
  value={layoverValue}
  onChange={setLayoverValue}
  onOutputStringChange={(outputString) => {
    setLayoverOutputString(outputString);
  }}
  mode="single"
  unitSuffix="h"
  label="Tiempo de Escala Máximo"
  step={1}
  showInputs={false}
/>`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de funcionalidad */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle>📋 Resumen de Funcionalidad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium mb-2">onOutputStringChange</h4>
            <p className="text-sm text-muted-foreground">
              Esta función callback se ejecuta cada vez que cambian los valores del rango y 
              proporciona un string formateado listo para mostrar en chips de filtro.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Lógica del Output String:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Valores por defecto:</strong> String vacío (sin chip)</li>
              <li>• <strong>Modo single:</strong> "menor a X" cuando valor != máximo</li>
              <li>• <strong>Modo range:</strong> "mayor a X", "menor a Y", o "X a Y" según corresponda</li>
              <li>• <strong>Formato automático:</strong> currency ($100) o unitSuffix (2h) según configuración</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Uso en SearchWithFilters:</h4>
            <p className="text-sm text-muted-foreground">
              El output string se usa automáticamente para generar chips de filtro activos
              que se pueden mostrar y quitar individualmente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
