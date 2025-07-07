// components/shared/SettingsDialog.tsx
"use client";
import Image from "next/image";

import * as React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Combobox, Option } from "@/components/ui/combobox";
import { toast } from "sonner";

export interface Region {
  code: string;
  name: string;
  currency: string;
  flag: string; // URL al SVG
}

export const regions: Region[] = [
  {
    code: "US",
    name: "Estados Unidos",
    currency: "USD $",
    flag: "https://flagcdn.com/us.svg",
  },
  {
    code: "MX",
    name: "México",
    currency: "MXN $",
    flag: "https://flagcdn.com/mx.svg",
  },
  {
    code: "ES",
    name: "España",
    currency: "EUR €",
    flag: "https://flagcdn.com/es.svg",
  },
  {
    code: "JP",
    name: "Japón",
    currency: "JPY ¥",
    flag: "https://flagcdn.com/jp.svg",
  },
];

const regionOptions: Option[] = regions.map((r) => ({
  value: r.code,
  label: r.name,
  icon: (
    <Image
  src={`${r.flag}`}
  alt={r.name}
  width={20}
  height={18}
  className=""
/>

  ),
}));

const languages = [
  { code: "en", name: "Inglés" },
  { code: "es", name: "Español" },
  { code: "ja", name: "Japonés" },
  { code: "fr", name: "Francés" },
];

interface SettingsDialogProps {
  /** Si lo pasas, se usará como trigger; si no, se renderiza el botón Globe por defecto */
  trigger?: React.ReactNode;
  /** Control externo del estado abierto */
  open?: boolean;
  /** Callback para cambios de apertura */
  onOpenChange?: (open: boolean) => void;
}

export function SettingsDialog({
  trigger,
  open: openProp,
  onOpenChange: onOpenChangeProp,
}: SettingsDialogProps) {
  const [openState, setOpenState] = React.useState(false);
  const open = openProp ?? openState;
  const setOpen = onOpenChangeProp ?? setOpenState;

  // Guardamos sólo los códigos
  const [regionCode, setRegionCode] = React.useState(regions[0].code);
  const [languageCode, setLanguageCode] = React.useState(languages[0].code);

  // Derivamos objetos completos
  const region = regions.find((r) => r.code === regionCode)!;
  const language = languages.find((l) => l.code === languageCode)!;
  const currency = region.currency;

  const handleSave = () => {
    toast.success(`Guardado: Región ${region.name}, Idioma ${language.name}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            size="icon"
            variant="outline"
            className="rounded-full hidden xl:inline-flex border-0 shadow-sm transition-colors hover:bg-secondary cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Globe className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configuración de pantalla</DialogTitle>
          <DialogDescription>
            Ajusta tu región, idioma y divisa.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-1">Región</label>
            <Combobox
              options={regionOptions}
              value={regionCode}
              placeholder="Selecciona región"
              onChange={setRegionCode}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Idioma</label>
            <Combobox
              options={languages.map((l) => ({ label: l.name, value: l.code }))}
              value={languageCode}
              placeholder="Selecciona idioma"
              onChange={setLanguageCode}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">
              Divisa
            </label>
            <div className="rounded-md border px-3 py-2 bg-muted">
              {currency}
            </div>
          </div>
        </div>

        <DialogFooter className="space-x-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
