"use client";

interface ReportGeneratorProps {
  title: string;
  subtitle?: string;
  origin?: string;
  destination?: string;
  headers: string[];
  rows: (string | number)[][]; // plain rows only
}

export default function ReportGenerator({
  title,
  subtitle,
  origin,
  destination,
  headers,
  rows,
}: ReportGeneratorProps) {
  const handleOpenWindow = () => {
    const reportWindow = window.open("", "_blank");
    if (!reportWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title} - ASFΛLES</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            padding: 40px;
            color: #1F2937;
            background: #FAFAFA;
          }
          .header {
            display: flex;
            align-items: center;
            border-bottom: 2px solid #E5E7EB;
            padding-bottom: 10px;
            margin-bottom: 30px;
          }
          .header img {
            height: 36px;
            margin-right: 12px;
          }
          .header h1 {
            font-size: 24px;
            margin: 0;
            color: #0057A3;
          }
          .meta {
            margin-bottom: 20px;
          }
          .meta p {
            margin: 4px 0;
            font-size: 14px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th {
            background: #F3F4F6;
            padding: 10px;
            border: 1px solid #D1D5DB;
            text-align: left;
          }
          td {
            padding: 10px;
            border: 1px solid #E5E7EB;
            background: #ffffff;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="https://asfales.app/logo.svg" alt="ASFΛLES logo" />
          <h1>${title}</h1>
        </div>

        <div class="meta">
          ${subtitle ? `<p><strong>${subtitle}</strong></p>` : ""}
          ${origin && destination ? `<p><strong>Origen - Destino:</strong> ${origin} → ${destination}</p>` : ""}
          <p><strong>Fecha de generación:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <table>
          <thead>
            <tr>
              ${headers.map((h) => `<th>${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows.map((r) => `
              <tr>
                ${r.map((cell) => `<td>${cell}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </body>
      </html>
    `;

    reportWindow.document.write(html);
    reportWindow.document.close();
  };

  return (
    <button onClick={handleOpenWindow} className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
      Generar informe
    </button>
  );
}
