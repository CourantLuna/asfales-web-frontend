import { useState } from "react";
import CustomCard from "../shared/CustomCard";
import { OverlayCarrusel, OverlayValue } from "../shared/ImageCarouselv2";
import { ColField, MultiColumnFields, RowData } from "../shared/RenderFields";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { useIsMobile } from "../ui/use-mobile";

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
      className: "text-base text-gray-700 flex items-center mb-2"},
    ]
  },
  { field: "descMain", type: "text", key: "descMain", className: "font-bold text-sm" },
  { field: "descSub", type: "text", key: "descSub", className: "text-sm text-gray-500" },
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
}: LodgingCardListProps) {

    // Estado de checks (índice => boolean)
  const [compareChecked, setCompareChecked] = useState<{[idx: number]: boolean}>({});

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
    
  return (
    <>
      {rows.map((rowData, idx) => (
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
