import { useState } from "react";
import CustomCard from "../shared/CustomCard";
import { OverlayCarrusel, OverlayValue } from "../shared/ImageCarouselv2";
import { ColField, MultiColumnFields, RowData } from "../shared/RenderFields";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

// 1. Define un array de rows


const column1: ColField[] = [

  {
    key: "pool",
    type: "icon",
    label: "Pool",
    className: "text-base text-gray-700 flex items-center gap-1 mt-2"
  },
  { field: "descMain", type: "text", key: "descMain", className: "font-bold text-sm mt-2" },
  { field: "descSub", type: "text", key: "descSub", className: "text-sm text-gray-500" },
  { field: "refundable", type: "text", key: "refundable", className: "text-green-700 font-semibold mt-3" },
  { field: "reserveNow", type: "text", key: "reserveNow", className: "text-green-600" },
  // Rating bloque (puedes hacer grupo anidado si quieres, aquí se puede dejar como badge+fields)
  {
    field: "rating",
    type: "badge",
    key: "rating",
    className: "bg-green-600 text-white text-base rounded-lg font-semibold px-2 h-7 flex items-center mt-3",
    fields: [
      { field: "ratingLabel", type: "text", key: "ratingLabel", className: "font-semibold text-lg text-gray-900 ml-2" },
      { field: "ratingCount", type: "text", key: "ratingCount", className: "text-xs text-gray-500 ml-2" }
    ]
  }
];

const column2: ColField[] = [
  { field: "alert", type: "alert", key: "alert" },
  {
    field: "nightlyPrice",
    type: "price",
    key: "nightlyPrice",
    className: "text-sm text-gray-500 line-through text-right",
    // puedes agregar más props para variantes si lo necesitas
  },
  {
    field: "beforePrice",
    type: "price",
    key: "beforePrice",
    className: "text-sm text-gray-400 line-through text-right",
  },
  {
    field: "afterPrice",
    type: "price",
    key: "afterPrice",
    className: "text-2xl font-bold text-right text-gray-900",
  }
];

const overlaysFormat: OverlayCarrusel[] = [
  { type: "badge", bgcolor: "bg-green-100", field: "price", align: "top-left", textColor: "text-black" },
  { type: "favorite", bgcolor: "bg-white", align: "top-right", actionFavorite: (idx) => alert("Favorito en " + idx) },
  { type: "badge", bgcolor: "bg-secondary", align: "bottom-right", field: "oferta" },
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
  // ...agrega más si necesitas
}


export default function LodgingCardList({
  rows,
  columns = [column1, column2],
  overlays = overlaysFormat,
  overlayFieldMap = row => ({
    price: row.price,
    isFavorite: row.isFavorite,
    oferta: row.oferta
  }),
  cardWidth = "w-full",
  cardHeight,
  carouselWidth = "w-1/3",
  orientationCard = "horizontal",
  onCardClick,
}: LodgingCardListProps) {

    // Estado de checks (índice => boolean)
  const [compareChecked, setCompareChecked] = useState<{[idx: number]: boolean}>({});

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
    
  return (
    <>
      {rows.map((rowData, idx) => (
        <CustomCard
          key={rowData.title + idx}
          orientationCard={orientationCard}
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
          compareChecked={!!compareChecked[idx]}
          onCompareCheckedChange={checked => handleCompareChecked(idx, checked)}
          // -------------------------------------
          content={
            <MultiColumnFields
              columns={columns}
              rowData={rowData}
              gap={0}
              aligns={["start", "end"]}
              yAligns={["start", "end"]}
            />
          }
        />
      ))}
    </>
  );
}
