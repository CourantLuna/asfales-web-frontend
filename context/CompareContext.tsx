"use client";
import { createContext, useContext, useState } from "react";

interface CompareProviderProps {
  children: React.ReactNode;
  max?: number;
  keyName: string;   // <- dinámico
  rowName: string;   // <- dinámico
}

const CompareContext = createContext<any>(null);

export function CompareProvider({
  children,
  max = 4,
  keyName,
  rowName,
}: CompareProviderProps) {
  const [selected, setSelected] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = (row: any) => {
    const keyValue = row[keyName];

    if (selected.length >= max) return false;

    const exists = selected.some((i) => i[keyName] === keyValue);
    if (exists) return false;

    setSelected((prev) => [...prev, { [keyName]: keyValue, [rowName]: row }]);
    setIsOpen(true);

    return true;
  };

  const remove = (key: string) => {
    setSelected((prev) => prev.filter((i) => i[keyName] !== key));
  };

  const reset = () => {
    setSelected([]);
    setIsOpen(false);
  };

  const toggle = () => setIsOpen((p) => !p);

  return (
    <CompareContext.Provider
      value={{
        selected,
        add,
        remove,
        reset,
        toggle,
        isOpen,
        max,
        getMax: () => max,
        keyName,
        rowName,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export const useCompareContext = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompareContext must be inside CompareProvider");
  return ctx;
};
