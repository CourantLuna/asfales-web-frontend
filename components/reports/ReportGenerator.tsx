"use client";

import { CustomTableProps } from "@/components/shared/CustomTable";
import CustomTable from "@/components/shared/CustomTable";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useEffect } from "react";

export interface HeaderField {
  label: string;
  value: string;
}

export interface ReportGeneratorProps extends CustomTableProps {
  title: string;
  subtitle?: string;
  headerFields?: HeaderField[];
  openInNewTab?: boolean; // <--- nueva prop
}

export default function ReportGenerator({
  title,
  subtitle,
  headerFields = [],
  columns,
  data,
  actions,
  rowHeader = 0,
  tableOrientation = "vertical",
  openInNewTab = false,
}: ReportGeneratorProps) {
  // Si es para abrir en nueva pestaña, solo renderiza el botón
  if (openInNewTab) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="flex gap-2 items-center"
        onClick={() => {
          const popup = window.open("", "_blank");
          if (!popup) return;

          const content = `
            <html>
              <head>
                <title>${title}</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="/styles.css" />
              </head>
              <body style="padding: 32px; font-family: sans-serif">
                <div id="report-root"></div>
                <script type="module">
                  import React from 'https://esm.sh/react';
                  import { createRoot } from 'https://esm.sh/react-dom/client';
                  import Report from 'data:text/javascript;charset=utf-8,${encodeURIComponent(generateReactReportString({
                    title,
                    subtitle,
                    headerFields,
                    columns,
                    data,
                    actions,
                    rowHeader,
                    tableOrientation,
                  }))}';
                  const root = createRoot(document.getElementById("report-root"));
                  root.render(React.createElement(Report.default));
                </script>
              </body>
            </html>
          `;

          popup.document.open();
          popup.document.write(content);
          popup.document.close();
        }}
      >
        <FileText className="w-4 h-4" />
        Generar Reporte
      </Button>
    );
  }

  // Render inline por defecto
  return (
    <section className="w-full bg-white p-6 rounded-xl border space-y-6">
      {/* Título */}
      <div className="text-center space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground text-sm md:text-base">{subtitle}</p>
        )}
      </div>

      {/* Header info fields */}
      {headerFields.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 px-2 md:px-8">
          {headerFields.map((item, idx) => (
            <div key={idx} className="flex justify-between gap-2 border-b pb-1">
              <span className="font-medium text-muted-foreground">{item.label}</span>
              <span className="text-right">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tabla comparativa */}
      <CustomTable
        columns={columns}
        data={data}
        actions={actions}
        rowHeader={rowHeader}
        tableOrientation={tableOrientation}
      />
    </section>
  );
}

// Utilidad interna que genera un módulo React export default con ReportGenerator embebido
function generateReactReportString(props: ReportGeneratorProps): string {
  const json = JSON.stringify(props).replace(/</g, "\\u003c"); // evita <script injection
  return `
    import React from 'https://esm.sh/react';
    import CustomTable from '${window.location.origin}/components/CustomTable.js';
    export default function Report() {
      const props = ${json};
      return (
        React.createElement("div", {className: "space-y-6"}, [
          React.createElement("h1", {className: "text-xl font-bold"}, props.title),
          props.subtitle ? React.createElement("p", null, props.subtitle) : null,
          React.createElement(CustomTable, props)
        ])
      );
    }
  `;
}
