"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomTable, { Column, RowData } from "@/components/shared/CustomTable";
// 1. Importa tu generador de reportes
import ReportGenerator from "@/components/reports/ReportGenerator";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";
// Opcional: Si prefieres un botón simple de imprimir pantalla
// import { Button } from "@/components/ui/button";
// import { Printer } from "lucide-react";

interface CompareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: any[]; 
  columns: Column[];
}

export function CompareDialog({ open, onOpenChange, items, columns }: CompareDialogProps) {
  
  const rawData: RowData[] = items.map((wrapper) => wrapper.item || wrapper);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-5xl h-auto flex flex-col overflow-hidden">
        
        {/* 2. Header con Flexbox para alinear Título y Botón */}
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-2 space-y-0">
          <DialogTitle className="text-xl">Comparación de Opciones</DialogTitle>
          
          {/* 3. Botón de Informe */}
          {rawData.length > 0 && (
            <div className="mr-6"> {/* Margen para no chocar con la X de cerrar */}
              <ReportGenerator
                title="Informe de Comparación"
                subtitle={`Comparando ${rawData.length} opciones de ${(columns[0].header)}`}
                columns={columns}
                data={rawData}
                tableOrientation="vertical" // Importante para que el PDF salga igual que la vista
                openInNewTab={true}
                // Puedes pasar un prop para que se vea como botón pequeño o icono si tu ReportGenerator lo soporta
              />

              {/* <Button 
  variant="outline" 
  size="sm" 
  className="mr-8 gap-2"
  onClick={() => window.print()}
>
  <Printer className="w-4 h-4" />
  Imprimir
</Button> */}
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-auto p-4">
          {rawData.length > 0 ? (
            <CustomTable 
              columns={columns} 
              data={rawData} 
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