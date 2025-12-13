"use client";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server"; // Importante para generar el HTML
import CustomTable, { CustomTableProps } from "@/components/shared/CustomTable";
import { Button } from "@/components/ui/button";
import { FileText, Printer } from "lucide-react";

export interface HeaderField {
  label: string;
  value: string;
}

export interface ReportGeneratorProps extends CustomTableProps {
  title: string;
  subtitle?: string;
  headerFields?: HeaderField[];
  openInNewTab?: boolean;
}

// 1. Separamos el diseño del reporte en un componente puro para poder reutilizarlo
// tanto en la vista inline como en la generación del HTML para la nueva ventana.
const ReportLayout = ({
  title,
  subtitle,
  headerFields = [],
  columns,
  data,
  actions,
  rowHeader,
  tableOrientation,
}: ReportGeneratorProps) => {
  return (
    <section className="w-full bg-white p-8 rounded-xl border space-y-6 max-w-[1200px] mx-auto">
      {/* Encabezado del Reporte */}
      <div className="text-center space-y-2 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="text-gray-500 text-lg">{subtitle}</p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          Generado el: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Campos de Cabecera (Info del reporte) */}
      {headerFields.length > 0 && (
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
          {headerFields.map((item, idx) => (
            <div key={idx} className="flex flex-col border-b border-gray-200 last:border-0 pb-2">
              <span className="font-semibold text-gray-500 uppercase text-xs tracking-wider">
                {item.label}
              </span>
              <span className="text-gray-900 font-medium text-base">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* La Tabla con tus datos */}
      <div className="mt-6">
        <CustomTable
          columns={columns}
          data={data}
          // En modo reporte impreso, a veces es mejor quitar las acciones interactivas
          actions={actions} 
          rowHeader={rowHeader}
          tableOrientation={tableOrientation}
        />
      </div>
    </section>
  );
};

export default function ReportGenerator(props: ReportGeneratorProps) {
  const { openInNewTab } = props;

  const handleOpenReport = () => {
    // 1. Generamos el HTML estático usando los componentes de React reales
    const reportHtml = renderToStaticMarkup(<ReportLayout {...props} />);

    // 2. Abrimos la ventana
    const popup = window.open("", "_blank", "width=1000,height=800");
    if (!popup) {
      alert("Por favor permite las ventanas emergentes para ver el reporte.");
      return;
    }

    // 3. Escribimos el documento completo.
    // Usamos Tailwind CDN para asegurar que los estilos (p-6, text-xl, etc.) funcionen
    // en la nueva ventana sin complicaciones de configuración de CSS local.
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${props.title}</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
             /* Ajustes para impresión */
             @media print {
               body { -webkit-print-color-adjust: exact; }
               .no-print { display: none; }
             }
             body { background-color: #f3f4f6; padding: 20px; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <div class="flex justify-end mb-4 no-print container mx-auto max-w-[1200px]">
            <button 
              onclick="window.print()" 
              class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 font-medium flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Imprimir / Guardar PDF
            </button>
          </div>
          
          <div id="report-root">
            ${reportHtml}
          </div>
        </body>
      </html>
    `;

    popup.document.open();
    popup.document.write(content);
    popup.document.close();
  };

  // Renderizado del componente botón
  if (openInNewTab) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="flex gap-2 items-center bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
        onClick={handleOpenReport}
      >
        <FileText className="w-4 h-4 text-blue-600" />
        Generar Informe
      </Button>
    );
  }

  // Renderizado inline por defecto (si no se pide abrir en nueva pestaña)
  return <ReportLayout {...props} />;
}