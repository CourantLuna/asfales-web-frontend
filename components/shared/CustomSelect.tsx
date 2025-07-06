import * as React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export interface CustomSelectOption {
  key: string;
  label: string;
  action?: () => void; // acción especial si esa opción es seleccionada (opcional)
}

export interface CustomSelectProps {
  options: CustomSelectOption[];
  selectedKey: string;
  onChange: (key: string) => void;
  placeholder?: string;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selectedKey,
  onChange,
  placeholder = "Selecciona una opción",
  className = "",
}) => {
  const handleChange = (value: string) => {
    const option = options.find(opt => opt.key === value);
    onChange(value);
    if (option?.action) option.action();
  };

  return (
        <Select value={selectedKey} onValueChange={handleChange}>
      <SelectTrigger className={`rounded-md w-full h-12 lg:w-[280px] bg-white px-3 py-2 text-left ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(opt => (
          <SelectItem key={opt.key} value={opt.key}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
