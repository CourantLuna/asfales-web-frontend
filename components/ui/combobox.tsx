import * as React from "react";
import { Command, CommandGroup, CommandItem, CommandInput } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

export type Option = {
  label: string;
  value: string;
  /** Opción de icono ReactNode, p.ej. <Image src="…" /> o cualquier SVG/emoji */
  icon?: React.ReactNode;
};

export interface ComboboxProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Combobox({
  options = [],
  value,
  onChange,
  placeholder,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const current = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-full justify-between h-12">
          <div className="flex items-center gap-2">
            {current?.icon && (
              <span className="flex-shrink-0">{current.icon}</span>
            )}
            <span className={current?.icon ? "" : "pl-0"}>
              {current?.label || placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar opción..." />
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    value === option.value ? "opacity-100" : "opacity-0"
                  }`}
                />
                {option.icon && (
                  <span className="mr-2 flex-shrink-0">{option.icon}</span>
                )}
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
