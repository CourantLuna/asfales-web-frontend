import React from "react";
import { StandardRadioGroup } from "./StandardRadioGroup";
import { Star, Heart, Bookmark, Share, ThumbsUp, Bed, Users, MapPin } from "lucide-react";

// Test component to demonstrate the StandardRadioGroup
export const StandardRadioGroupExamples = () => {
  const [roomType, setRoomType] = React.useState<string>("");
  const [sortOption, setSortOption] = React.useState<string>("price");
  const [amenityCategory, setAmenityCategory] = React.useState<string>("");

  // Room type options
  const roomTypeOptions = [
    { 
      label: "Individual", 
      value: "single", 
      icon: <Bed className="w-4 h-4" />,
      count: 23 
    },
    { 
      label: "Doble", 
      value: "double", 
      icon: <Users className="w-4 h-4" />,
      count: 45 
    },
    { 
      label: "Suite", 
      value: "suite", 
      icon: <Star className="w-4 h-4" />,
      count: 12 
    },
    { 
      label: "Familiar", 
      value: "family", 
      icon: <Heart className="w-4 h-4" />,
      count: 18,
      disabled: true 
    },
  ];

  // Sort options
  const sortOptions = [
    { label: "Precio: menor a mayor", value: "price" },
    { label: "Mejor valorados", value: "rating" },
    { label: "Más popular", value: "popular" },
    { label: "Más recientes", value: "newest" },
  ];

  // Amenity category options with icons
  const amenityCategoryOptions = [
    { 
      label: "WiFi", 
      value: "wifi", 
      icon: <Share className="w-4 h-4" />,
      count: 198 
    },
    { 
      label: "Piscina", 
      value: "pool", 
      icon: <Heart className="w-4 h-4" />,
      count: 67 
    },
    { 
      label: "Gimnasio", 
      value: "gym", 
      icon: <ThumbsUp className="w-4 h-4" />,
      count: 43 
    },
    { 
      label: "Parking", 
      value: "parking", 
      icon: <MapPin className="w-4 h-4" />,
      count: 156 
    },
    { 
      label: "Desayuno", 
      value: "breakfast", 
      icon: <Star className="w-4 h-4" />,
      count: 89 
    },
  ];

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">StandardRadioGroup Examples</h2>
        <p className="text-sm text-muted-foreground">
          Diferentes configuraciones del componente StandardRadioGroup.
        </p>
      </div>

      {/* Horizontal layout */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">1. Layout Horizontal (por defecto)</h3>
        <StandardRadioGroup
          label="Tipo de Habitación"
          options={roomTypeOptions}
          value={roomType}
          onValueChange={setRoomType}
          variant="horizontal"
          helperText="Selecciona el tipo de habitación que prefieres"
        />
      </div>

      {/* Vertical layout */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">2. Layout Vertical</h3>
        <StandardRadioGroup
          label="Ordenar por"
          options={sortOptions}
          value={sortOption}
          onValueChange={setSortOption}
          variant="vertical"
          helperText="Elige cómo quieres ordenar los resultados"
        />
      </div>

      {/* Grid/Wrap layout */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">3. Layout Grid (2 columnas)</h3>
        <StandardRadioGroup
          label="Categoría de Amenidades"
          options={amenityCategoryOptions}
          value={amenityCategory}
          onValueChange={setAmenityCategory}
          wrap={true}
          gridCols={2}
          helperText="Selecciona una categoría de amenidades"
        />
      </div>

      {/* Grid with 3 columns */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">4. Layout Grid (3 columnas)</h3>
        <StandardRadioGroup
          label="Amenidades Principales"
          options={amenityCategoryOptions}
          value={amenityCategory}
          onValueChange={setAmenityCategory}
          wrap={true}
          gridCols={3}
          containerClassName="max-w-lg"
        />
      </div>

      {/* Required with error */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">5. Campo Requerido con Error</h3>
        <StandardRadioGroup
          label="Tipo de Habitación"
          options={roomTypeOptions}
          value=""
          onValueChange={() => {}}
          required={true}
          error="Por favor selecciona un tipo de habitación"
        />
      </div>

      {/* Disabled */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">6. Estado Deshabilitado</h3>
        <StandardRadioGroup
          label="Opciones Deshabilitadas"
          options={sortOptions}
          value="price"
          onValueChange={() => {}}
          disabled={true}
          helperText="Este campo está deshabilitado"
        />
      </div>

      {/* Debug info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg space-y-2">
        <h3 className="font-medium">Valores Seleccionados:</h3>
        <p className="text-sm">Tipo de Habitación: {roomType || "Ninguno"}</p>
        <p className="text-sm">Ordenar por: {sortOption}</p>
        <p className="text-sm">Categoría de Amenidades: {amenityCategory || "Ninguna"}</p>
      </div>
    </div>
  );
};

export default StandardRadioGroupExamples;
