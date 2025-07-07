import { 
 Waves,
  Coffee,
  UtensilsCrossed,
  Sun,
  Home,
  BedDouble,
  Sofa,
  Bath,
  Wine,
  ChefHat,
  Dumbbell,
  Tv,
  MapPin,
  Eye,
  Building2,
  Armchair,
  DoorOpen,
  Moon,
  ExternalLink,
  Activity,
  Star,
  Mountain,
  Trees,
  TreePine,
  Sparkles,
  Flower,
  Key,
  Calendar,
  Users,
  Lock,
  Bell,
  Gift,
  HeartHandshake,
  Award,
  Medal,
  Trophy,
  Utensils,
  Check,
  X,
  User,
  LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ReactNode } from "react";


export interface Action {
  label: string;
  variant?: "default" | "secondary" | "outline";
  onClick?: () => void;
}

export type FieldType =
  | "text"
  | "images"
  | "badge"
  | "number"
  | "time"
  | "benefits"
  | "actions"
  | "price"
  | "space"
  | "icon"    // <---
  | "alert"   // <---


export interface ColField {
  field?: string;
  fields?: ColField[];
  key: string;
  type: FieldType;
  className?: string;
  spaceSize?: number;
   icon?: ReactNode;   // <-- Añadido
  label?: string;     // Opcional para texto al lado del icono
   // Nuevas propiedades para iconos
  iconClassName?: string;  // Clases CSS específicas para el icono
  iconSize?: number;       // Tamaño del icono
}

export interface RowData {
  [key: string]: any;
}

type RenderFieldsProps = {
  fields: ColField[];
  rowData: RowData;
  align?: "start" | "center" | "end";
 yAlign?: "start" | "center" | "end"; // <--- vertical alignment

  className?: string;
};

export function RenderFields({ fields, rowData, align = "start", yAlign = "start", className = "" }: RenderFieldsProps) {
  // Traducción de align a Tailwind:
  const alignClass =
    align === "center"
      ? "items-center"
      : align === "end"
      ? "items-end"
      : "items-start";

      // dentro de RenderFields o el wrapper de columna:
const yAlignClass =
  yAlign === "center"
    ? "justify-center"
    : yAlign === "end"
    ? "justify-end"
    : "justify-start";


  return (
    <div
      className={`flex flex-col w-full h-full ${alignClass} ${yAlignClass} ${className}`}
    >
      {fields.map((f) => {
        const value = f.field ? rowData[f.field] : undefined;

        // Si el campo requiere valor y no existe, NO lo renderices
        // Solo deja pasar si es un tipo que no depende de value:
        const alwaysRenderTypes = ["space", "actions",];
        const isValueEmpty =
          f.field &&
          (value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
            
          );

        if (!alwaysRenderTypes.includes(f.type) && isValueEmpty) {
          return null;
        }

        if (f.fields && f.fields.length > 0) {
          return (
            <div key={f.key} className="flex flex-row items-stretch gap-2">
              {renderSingleField(f, value)}
              <div className="flex flex-col justify-center">
                <RenderFields
                  fields={f.fields}
                  rowData={rowData}
                  align={align}
                />
              </div>
            </div>
          );
        }

        return renderSingleField(f, value);
      })}
    </div>
  );
}

// Mapeo de nombres de string a componentes de iconos
export const iconMap: { [key: string]: LucideIcon } = {
  // Agua, piscinas, mar
  "waves": Waves,
  "pool": Waves,
  "outdoor pool": Waves,
  "rooftop pool": Waves,
  "hot tub": Bath,
  "outdoor spa tub": Bath,
  "indoor spa tub": Bath,
  "private spa tub": Bath,
  "gazebo": Flower,

  // Comida y bebida
  "restaurant": UtensilsCrossed,
  "breakfast included": Coffee,
  "breakfast meal": Coffee,
  "bar (on property)": Wine,
  "breakfast area": Coffee,
  "coffee shop": Coffee,
  "outdoor dining": UtensilsCrossed,
  "kitchen": ChefHat,

  // Habitaciones y áreas comunes
  "room": BedDouble,
  "living area": Sofa,
  "terrace/patio": Sun,
  "sundeck": Sun,
  "lobby": Home,
  "reception": DoorOpen,
  "front of property": Building2,
  "front of property - evening/night": Moon,
  "interior": Armchair,
  "exterior": Building2,

  // Vistas y entorno
  "city view": Eye,
  "view from property": Eye,
  "street view": MapPin,
  "property grounds": Trees,

  // Entretenimiento y fitness
  "fitness studio": Dumbbell,
  "television": Tv,
  "activity": Activity,

  // Cosas extra/valor
  "things to do": Star,
  "gift": Gift,
  "award": Award,
  "medal": Medal,
  "trophy": Trophy,
  "hearthandshake": HeartHandshake,

  // Otros
  "open in a new tab": ExternalLink,
  "key": Key,
  "lock": Lock,
  "users": Users,
  "calendar": Calendar,
  "bell": Bell,
  "sparkles": Sparkles, // default/amenity premium
};

// Helper: renderiza un solo campo (la lógica de tu switch de antes)
function renderSingleField(f: ColField, value: any) {
  switch (f.type) {
   case "icon":
  // Si value es un string, buscar el icono correspondiente
  if (typeof value === "string") {
    const IconComponent = iconMap[value.toLowerCase()];
    if (IconComponent) {
      return (
        <span key={f.key} className={`flex items-center ${f.className || ""}`}>
          <IconComponent 
            className={`w-4 h-4 ${f.iconClassName || ""}`} 
            size={f.iconSize || 16}
          />
          {value && <span className="ml-1">{value}</span>}
        </span>
      );
    }
    // Si no se encuentra el icono, mostrar mensaje de error en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Icon "${value}" not found in iconMap`);
    }
  }
  // Si value es un componente React (comportamiento anterior)
  return (
    <span key={f.key} className={f.className}>
      {value}
      {f.label && <span className="ml-1">{f.label}</span>}
    </span>
  );
  


    case "text":
      return (
        <span key={f.key} className={f.className}>
          {value}
        </span>
      );
    case "space":
      return (
        <div
          key={f.key}
          className={`h-${f.spaceSize ?? 4} w-full`}
          aria-hidden="true"
        />
      );
    case "number":
      return (
        <span key={f.key} className={f.className}>
          {typeof value === "number" ? value : ""}
        </span>
      );
    case "badge":
      return value ? (
        <Badge key={f.key} className={f.className}>
          {value}
        </Badge>
      ) : null;
    case "time":
      return (
        <span key={f.key} className={f.className}>
          {value ? format(parseISO(value), "dd MMM yyyy, HH:mm") : ""}
        </span>
      );
    case "benefits":
      return (
        <div
          key={f.key}
          className="flex flex-col justify-center items-start gap-1"
        >
          {(Array.isArray(value) ? value : []).map((b: { label: string; included: boolean }) => (
            <div key={b.label} className="flex items-center gap-1">
              {b.included ? (
                <Check className="text-green-600 w-4 h-4" />
              ) : (
                <X className="text-red-500 w-4 h-4" />
              )}
              <span className={b.included ? "text-green-700" : "text-red-700"}>
                {b.label}
              </span>
            </div>
          ))}
        </div>
      );
    case "price":
  return value && value.value != null ? (
    <span key={f.key} className={f.className}>
      {value.currency ? `${value.currency} ` : ""}
      {value.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  ) : null;

    case "actions":
      return (
        <div key={f.key} className="flex gap-2">
          {(Array.isArray(value) ? value : []).map((action: Action, idx: number) => (
            <Button
              key={action.label + idx}
              variant={action.variant ?? "default"}
              onClick={action.onClick}
              size="sm"
            >
              {action.label}
            </Button>
          ))}
        </div>
      );
    case "images":
      return value && Array.isArray(value) && value.length > 0 ? (
        <div key={f.key} className="flex gap-1">
          {value.map((img: string, idx: number) => (
            <div key={img + idx} className="relative w-14 h-14 rounded overflow-hidden border">
              <Image
                src={img}
                alt={`img-${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null;
    default:
      return null;
  }
}

export function MultiColumnFields({
  columns,
  rowData,
  gap = 0, // gap-x-8 por defecto
  aligns = [],
  yAligns = [],
  className = "",
  width = "w-full",
  singleColumn = false, // Nueva propiedad para fusionar en una sola columna
  columnWidths = [], // Nueva propiedad para anchos personalizados

}: {
  columns: ColField[][];
  rowData: RowData;
  gap?: number;
  aligns?: ("start" | "center" | "end")[];
  yAligns?: ("start" | "center" | "end")[]; // <--- nuevo!
  className?: string;
  width?: string;
  singleColumn?: boolean; // Nueva propiedad
    columnWidths?: number[] // Nueva propiedad para anchos personalizados 

}) {
  const gapClass = gap ? `gap-${gap}` : "";

  // Si singleColumn es true, fusionar todas las columnas en una sola
if (singleColumn) {
  return (
    <div className={`flex flex-col ${width} h-full ${className} gap-3 `}>
      {columns.map((fields, idx) => (
        <div key={idx} className="w-full">
          <RenderFields 
            fields={fields} 
            rowData={rowData} 
            align={aligns[idx] || "start"} 
            yAlign={yAligns[idx] || "start"} 
            className={`w-full ${gapClass}`}
          />
        </div>
      ))}
    </div>
  );
}
  // Validar que columnWidths sume 100% si se proporciona
  const hasCustomWidths = columnWidths.length > 0;
  const totalWidth = hasCustomWidths ? columnWidths.reduce((sum, width) => sum + width, 0) : 0;
  
  // Advertencia en desarrollo si no suma 100%
  if (hasCustomWidths && totalWidth !== 100) {
    console.warn(`MultiColumnFields: columnWidths suma ${totalWidth}%, se recomienda que sume 100%`);
  }

  // Función para convertir porcentaje a clase de Tailwind
  const getWidthClass = (percentage: number): string => {
    // Mapeo de porcentajes comunes a clases de Tailwind
    const widthMap: { [key: number]: string } = {
      10: "w-1/10",
      20: "w-1/5",
      25: "w-1/4", 
      30: "w-[30%]",
      33: "w-1/3",
      40: "w-2/5",
      50: "w-1/2",
      60: "w-3/5",
      66: "w-2/3",
      70: "w-[70%]",
      75: "w-3/4",
      80: "w-4/5",
      90: "w-[90%]",
      100: "w-full"
    };

    // Buscar el porcentaje exacto
    if (widthMap[percentage]) {
      return widthMap[percentage];
    }

    // Si no existe, usar estilo inline
    return `w-[${percentage}%]`;
  };

  // Comportamiento normal con múltiples columnas
  return (
    <div className={`flex flex-row ${width} h-full ${gapClass} ${className} `}>
    {columns.map((fields, idx) => {
        // Determinar el ancho de la columna
        let columnWidthClass = "flex-1"; // Por defecto, distribución equitativa
        
        if (hasCustomWidths && columnWidths[idx] !== undefined) {
          // Usar ancho personalizado en porcentaje + flex-none para evitar interferencia
          columnWidthClass = `${getWidthClass(columnWidths[idx])} flex-none`;
        }
        
        return (
          <div key={idx} className={(width !== "w-full") ? width : columnWidthClass}>
            <RenderFields 
              fields={fields} 
              rowData={rowData} 
              align={aligns[idx]} 
              yAlign={yAligns[idx]} 
            />
          </div>
        );
      })}
    </div>
  );
}
