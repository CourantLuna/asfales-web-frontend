import { useImperativeHandle, useState } from "react";
import CustomCard from "../shared/CustomCard";
import { OverlayCarrusel, OverlayValue } from "../shared/ImageCarouselv2";
import { ColField, MultiColumnFields, RenderFields, RowData } from "../shared/RenderFields";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { useIsMobile } from "../ui/use-mobile";
import PaginationCard from "../shared/PaginationCard";
import { usePagination } from "../../hooks/usePagination";
import { useCompare } from "@/hooks/use-compare";
import { CompareSheet } from "../comparator/CompareSheet";
import { ro } from "date-fns/locale";
import { get } from 'http';

const column1row1: ColField[] = [
  {
    field: "feature1",
    type: "icon",
    key: "featureone",
    className: "inline-flex items-center py-1 rounded pr-4",
    iconClassName: "mr-1",
    iconSize: 16,
  
  },

];

const column2row1: ColField[] = [
  {
      field: "feature2",
      type: "icon",
      key: "featuretwo",
      className: "inline-flex items-center py-1 rounded",
      iconClassName: "mr-1",
      iconSize: 16,
    },
  
];

const row2: ColField[] = [
  { field: "descMain", type: "text", key: "descMain", className: "font-bold text-sm items-end mt-3", },
  { field: "descSub", type: "text", key: "descSub", className: "text-sm text-gray-500 mb-3" },
];

const column1row3: ColField[] = [
  
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

const column2row3: ColField[] = [
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
  // Props para comparación externa
  onCompareChange?: (hotelTitle: string, checked: boolean) => void; // Callback para notificar cambios
  maxCompareItems?: number; // Máximo número de items a comparar
  ref?: any;
}

export default function LodgingCardList({
  rows,
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
  // Props para comparación externa
  onCompareChange,
  maxCompareItems = 3,
  ref,
}: LodgingCardListProps) {


  useImperativeHandle(ref, () => ({
  reset: () =>onCancelCompare(),
}));

  
  // Hook de paginación
  const {
    visibleItems: visibleCards,
    showMore: handleShowMore,
    showLess: handleShowLess,
    reset: resetPagination
  } = usePagination({
    initialVisibleItems: initialVisibleCards,
    itemsPerStep: cardsPerStep,
    totalItems: rows?.length || 0
  });
  
  const isMobile = useIsMobile();
   const compare = useCompare({ max: 4, keyName: "title", rowName: "item" });

   const onCancelCompare = () => {
    compare.reset();
    resetPagination(); // Resetea la paginación al cerrar la comparación
  }
  // Calcular cards visibles
  const visibleRows = rows.slice(0, visibleCards);


const handleCompareChecked = (idx: number, checked: boolean) => {
  const hotel = rows[idx];
  const hotelTitle = hotel?.title;

  if (!hotelTitle) return;

  if (checked) {
    if (compare.selected.length >= compare.getMax()) {
      toast("Máximo alcanzado", {
        description: `Solo puedes comparar hasta ${compare.getMax()} elementos`,
        duration: 2000,
        icon: <XCircle className="text-red-500 w-6 h-6" />,
        style: {
          backgroundColor: "#FEE2E2",
          color: "#232323",
          fontWeight: 500,
        },
      });
      return;
    }

    compare.add(hotel);
  } else {
    compare.remove(hotel.title);
  }

  // Estado externo opcional
  if (onCompareChange) {
    onCompareChange(hotelTitle, checked);
  } else {
  }
};

  return (
    <div className="space-y-4">
      {/* Bottom Sheet */}Añadido a compara
   {compare.selected.length > 0 && (
  <CompareSheet
    items={compare.selected}
    max={compare.getMax()}
    itemName="Alojamientos"
    keyName={compare.keyName}
    isOpen={compare.isOpen}
    onToggle={compare.toggle}
    onRemove={compare.remove}
    onCancel={compare.reset}
    onCompare={(comparelist) => console.log("Comparando", comparelist)}
    imageSelector={(row) => row.logo?.[0]}
  />
)}

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
            description={rowData.location}
            overlayCarrusel={overlays}
            overlayValues={overlayFieldMap(rowData)}
            onClick={() => onCardClick?.(idx, rowData)}
            // --- Control del compare checkbox ---
            showCompareCheckbox={showCompareCheckbox}
            compareChecked={compare.selected.some(i => i[compare.keyName] === rowData.title)}
            onCompareCheckedChange={checked => handleCompareChecked(idx, checked)}
            // -------------------------------------
            content={
              <>
              
              <MultiColumnFields
                columns={[column1row1, column2row1]}
                rowData={rowData}
                singleColumn={false}
                gap={0}
                aligns={["start", "start"]}
                yAligns={["end", "end"]} 
                width="w-auto"
                />
                
              <RenderFields fields={row2} rowData={rowData} />
              
              <MultiColumnFields
                columns={[column1row3, column2row3]}
                columnWidths={[40, 60]} // 40%, 60%,
                rowData={rowData}
                singleColumn={isMobile}
                gap={0}
                aligns={["start", "end"]}
                yAligns={["end", "end"]} />
                
                </>
            }
          />
        ))}
      </div>

      {/* Componente de paginación reutilizable */}
      <PaginationCard
        totalItems={rows?.length || 0}
        visibleItems={visibleCards}
        initialVisibleItems={initialVisibleCards}
        itemsPerStep={cardsPerStep}
        onShowMore={handleShowMore}
        onShowLess={enableShowLess ? handleShowLess : () => {}}
        itemLabel="alojamientos"
        showMoreText={showMoreLabel}
        showLessText={showLessLabel}
        allItemsMessage="✨ Has visto todos los alojamientos disponibles"
        className=""
        showProgressBar={true}
        progressColor="bg-primary"
      />
    </div>
  );
}