"use client"

export default function SearchResultsPanel({ origin, destination }: { origin: string; destination: string }) {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-7xl px-4 shadow-lg border rounded-xl bg-white">
        <h3 className="text-lg font-semibold mb-2">Resultados de búsqueda</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Origen:</strong> {origin}</p>
          <p><strong>Destino:</strong> {destination}</p>
        </div>
        {/* Aquí podrías renderizar <TravelOptionsTabs /> o contenido dinámico */}
      </div>
    </div>
  )
}
