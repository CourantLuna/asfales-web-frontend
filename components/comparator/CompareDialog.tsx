"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomTable, { Column, RowData } from "@/components/shared/CustomTable";
import ReportGenerator from "@/components/reports/ReportGenerator";
import { useMemo } from "react";

// Helper para obtener el valor anidado (ej: operator.logoUrl)
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : null, obj);
};

interface CompareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: any[]; 
  columns: Column[];
}

export function CompareDialog({ open, onOpenChange, items, columns }: CompareDialogProps) {
  
  // Usamos useMemo para hacer este proceso solo cuando cambien items o columns
  const { processedData, processedColumns } = useMemo(() => {
    // 1. Normalizar items (extraer de .item si existe) y clonar para poder modificar
    //    Usamos spread {...obj} para crear una copia superficial de cada fila
    const dataCopy: RowData[] = items.map((wrapper) => ({ ...(wrapper.item || wrapper) }));
    
    // 2. Clonar columnas
    const columnsCopy: Column[] = columns.map(c => ({ ...c }));

    // 3. Proceso de "Aplanamiento" (Flattening)
    columnsCopy.forEach(col => {
      // Si el campo tiene un punto (ej: "operator.logoUrl")
      if (col.field && col.field.includes('.')) {
        
        // Creamos el nuevo nombre sin puntos (ej: "operatorlogoUrl")
        const newFieldName = col.field.replace(/\./g, '');

        // Recorremos toda la data para inyectar este nuevo valor en el primer nivel
        dataCopy.forEach(row => {
          // Obtenemos el valor profundo
          const value = getNestedValue(row, col.field!);
          // Lo asignamos a la propiedad plana
          row[newFieldName] = value;
        });

        // 4. Actualizamos la columna para que apunte al nuevo campo plano
        col.field = newFieldName;
      }
      
      // Opcional: Si usas 'fields' (array) para columnas compuestas, 
      // podrías aplicar una lógica similar aquí dentro de col.fields.map...
    });

    return { processedData: dataCopy, processedColumns: columnsCopy };

  }, [items, columns]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-5xl h-auto flex flex-col overflow-hidden">
        
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-2 space-y-0">
          <DialogTitle className="text-xl">Comparación de Opciones</DialogTitle>
          
          {processedData.length > 0 && (
            <div className="mr-6">
              <ReportGenerator
                title="Informe de Comparación"
                subtitle={`Comparando ${processedData.length} opciones`}
                // Pasamos las columnas y data YA procesadas
                columns={processedColumns} 
                data={processedData}
                tableOrientation="vertical"
                openInNewTab={true}
              />
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-auto p-4">
          {processedData.length > 0 ? (
            <CustomTable 
              // Pasamos las columnas y data YA procesadas
              columns={processedColumns} 
              data={processedData} 
              tableOrientation="vertical" 
              rowHeader={0} 
            />
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No hay elementos para comparar.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}