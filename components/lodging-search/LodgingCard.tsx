import { useState } from "react";
import CustomCard from "../shared/CustomCard";
import { OverlayCarrusel, OverlayValue } from "../shared/ImageCarouselv2";
import { ColField, MultiColumnFields, RowData } from "../shared/RenderFields";
import { toast } from "sonner";
import { CheckCircle, XCircle, Plus, Minus } from "lucide-react";
import { useIsMobile } from "../ui/use-mobile";
import { Button } from "../ui/button";
import { tr } from "date-fns/locale";

// 1. Define un array de rows

const column1: ColField[] = [
  {
    key: "feature1",
    type: "icon",
    label: "feature1",
    className: "text-base text-gray-700 flex items-center",
    fields: [
        {key: "feature2",
      type: "icon",
      label: "waves",
      className: "text-base text-gray-700 flex items-center mb-3"},
    ]
  },
  { field: "descMain", type: "text", key: "descMain", className: "font-bold text-sm" },
  { field: "descSub", type: "text", key: "descSub", className: "text-sm text-gray-500 mb-3" },
  { field: "refundable", type: "text", key: "refundable", className: "text-green-700 font-semibold" },
  { field: "reserveNow", type: "text", key: "reserveNow", className: "text-green-600" },
  // Rating bloque (puedes hacer grupo anidado si quieres, aquí se puede dejar como badge+fields)
  {
    field: "rating",
    type: "badge",
    key: "rating",
    className: "bg-green-600 text-white text-base rounded-lg font-semibold px-2 h-8 flex items-center self-center",
    fields: [
      { field: "ratingLabel", type: "text", key: "ratingLabel", className: "font-semibold text-lg text-gray-900 ml-1" },
      { field: "ratingCount", type: "text", key: "ratingCount", className: "text-xs text-gray-500 ml-1" }
    ]
  }
];

const column2: ColField[] = [
  { field: "badge2ndColumn", type: "text", key: "badge2ndColumn", className: "text-sm bg-green-500 text-white font-semibold rounded-lg px-2 py-1" },
  {
    field: "nightlyPrice",
    type: "price",
    key: "nightlyPrice",
    className: "text-sm text-gray-500 underline underline-offset-2 text-right",
    // puedes agregar más props para variantes si lo necesitas
  },
  {
    field: "beforePrice",
    type: "price",
    key: "beforePrice",
    className: "underline line-through decoration-red-600 decoration-2 underline-offset-2",
    fields: [
      {
    field: "afterPrice",
    type: "price",
    key: "afterPrice",
    className: "text-2xl font-bold text-right text-gray-900",
  }
    ]
  },
  
];

const overlaysFormat: OverlayCarrusel[] = [
  { type: "badge", bgcolor: "bg-gray-100", field: "badge1", align: "top-left", textColor: "text-black" },
  { type: "favorite", bgcolor: "bg-white", align: "top-right", actionFavorite: (idx) => alert("Favorito en " + idx) },
  // { type: "badge", bgcolor: "bg-secondary", align: "bottom-right", field: "badge2" },
];

interface LodgingCardListProps {
  rows: RowData[];
  columns?: ColField[][];
  overlays?: OverlayCarrusel[];
  overlayFieldMap?: (row: RowData) => OverlayValue; // Para pasar overlayValues dinámicos
  cardWidth?: string;
  cardHeight?: string;
  carouselWidth?: string;
  orientationCard?: "horizontal" | "vertical";
  onCardClick?: (idx: number, row: RowData) => void;
  showCompareCheckbox?: boolean; // Nueva prop para controlar visibilidad de checkboxes
  // Nuevas props para paginación
  initialVisibleCards?: number; // Número inicial de cards visibles
  cardsPerStep?: number; // Número de cards que se muestran por cada "Mostrar más"
  showMoreLabel?: string; // Texto personalizable del botón
  showLessLabel?: string; // Texto para colapsar (opcional)
  enableShowLess?: boolean; // Si permitir colapsar
  // ...agrega más si necesitas
}

export default function LodgingCardList({
  rows,
  columns = [column1, column2],
  overlays = overlaysFormat,
  overlayFieldMap = row => ({
    badge1: row.badge1,
    isFavorite: row.isFavorite,
    badge2: row.badge2
  }),
  cardWidth = "w-full",
  cardHeight,
  carouselWidth = "w-1/3",
  onCardClick,
  showCompareCheckbox = false, // Por defecto false
  // Valores por defecto para paginación
  initialVisibleCards = 6,
  cardsPerStep = 10,
  showMoreLabel = "Mostrar más",
  showLessLabel = "Mostrar menos",
  enableShowLess = true, // Por defecto true
}: LodgingCardListProps) {

  // Estado de checks (índice => boolean)
  const [compareChecked, setCompareChecked] = useState<{[idx: number]: boolean}>({});
  
  // Estado para controlar cuántas cards mostrar
  const [visibleCards, setVisibleCards] = useState(initialVisibleCards);
  
  const isMobile = useIsMobile();

  // Handler para cada card
  const handleCompareChecked = (idx: number, checked: boolean) => {
    setCompareChecked(prev => ({ ...prev, [idx]: checked }));
    toast(checked ? "Añadido a comparar" : "Removido de comparar", {
      description: rows[idx]?.title,
      duration: 1800,
      icon: (
        <span className="flex items-center justify-center">
          {checked
            ? <CheckCircle className="text-green-500 w-6 h-6" />
            : <XCircle className="text-red-500 w-6 h-6" />}
        </span>
      ),
      style: {
        backgroundColor: checked ? "#D1FADF" : "#FEE2E2",
        color: "#232323",
        fontWeight: 500,
        gap: "20px",
        width: "300px",
      },
    });
  };

  // Handlers para mostrar más/menos
  const handleShowMore = () => {
    setVisibleCards(prev => Math.min(prev + cardsPerStep, rows.length));
  };

  const handleShowLess = () => {
    setVisibleCards(initialVisibleCards);
  };

  // Calcular cards visibles
  const visibleRows = rows.slice(0, visibleCards);
  const hasMoreCards = visibleCards < rows.length;
  const canShowLess = enableShowLess && visibleCards > initialVisibleCards;

  // Calcular cuántas cards más se pueden mostrar
  const remainingCards = rows.length - visibleCards;
  const nextStepCards = Math.min(cardsPerStep, remainingCards);

  return (
    <div className="space-y-4">
      {/* Lista de cards */}
      <div className="space-y-4">
        {visibleRows.map((rowData, idx) => (
          <CustomCard
            key={rowData.title + idx}
            orientationCard={isMobile ? "vertical" : "horizontal"}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            carouselWidth={carouselWidth}
            images={rowData.images}
            title={rowData.title}
            description={rowData.subtitle}
            overlayCarrusel={overlays}
            overlayValues={overlayFieldMap(rowData)}
            onClick={() => onCardClick?.(idx, rowData)}
            // --- Control del compare checkbox ---
            showCompareCheckbox={showCompareCheckbox}
            compareChecked={!!compareChecked[idx]}
            onCompareCheckedChange={checked => handleCompareChecked(idx, checked)}
            // -------------------------------------
            content={
              <MultiColumnFields
                columns={columns}
                rowData={rowData}
                singleColumn={isMobile}
                gap={0}
                aligns={["start", "end"]}
                yAligns={["start", "end"]}
              />
            }
          />
        ))}
      </div>

      {/* Información de resultados y botones */}
      {(hasMoreCards || canShowLess) && (
        <div className="flex flex-col items-center space-y-3 py-6 md:w-auto w-full">
          {/* Contador de resultados */}
          <div className="text-sm text-gray-600 text-center">
            Mostrando {visibleCards} de {rows.length} alojamientos
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {hasMoreCards && (
              <Button
                onClick={handleShowMore}
                variant="outline"
                className="w-full md:w-80 flex items-center space-x-2 px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>
                  {showMoreLabel} ({nextStepCards} más)
                </span>
              </Button>
            )}

            {canShowLess && (
              <Button
                onClick={handleShowLess}
                variant="ghost"
                className="w-full md:w-80 text-gray-600 hover:text-gray-800 flex items-center space-x-2 px-6 py-2 border-2"
              >
                <Minus className="h-4 w-4" />
                  <span>
                    {showLessLabel}
                  </span>
                </Button>
            )}
          </div>

          {/* Progreso visual opcional */}
          {rows.length > initialVisibleCards && (
            <div className="w-full max-w-xs">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(visibleCards / rows.length) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">
                {Math.round((visibleCards / rows.length) * 100)}% cargado
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mensaje cuando no hay más cards */}
      {!hasMoreCards && rows.length > initialVisibleCards && (
        <div className="text-center py-4">
          <p className="text-gray-600 text-sm">
            ✨ Has visto todos los alojamientos disponibles
          </p>
        </div>
      )}
    </div>
  );
}