"use client";

import { useState } from "react";

export function useCompare({
  max,
  keyName,
  rowName,
}: {
  max: number;
  keyName: string;
  rowName: string;
}) {
  const [selected, setSelected] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getMax = () => max;
  const toggle = () => setIsOpen((prev) => !prev);

  const add = (row: any) => {
    const keyValue = row[keyName];

    if (selected.length >= max) return false;

    const exists = selected.some((i) => i[keyName] === keyValue);
    if (exists) return false;

    setSelected((prev) => [...prev, { [keyName]: keyValue, [rowName]: row }]);

    setIsOpen(true);
    return true;
  };

  const remove = (key: any) => {
    setSelected((prev) => prev.filter((i) => i[keyName] !== key));
  };

  const reset = () => {
    setSelected([]);
    setIsOpen(false);
  };

  return {
    selected,
    isOpen,
    add,
    remove,
    toggle,
    reset,
    getMax,

    // 👉 Estos eran los que faltaban
    keyName,
    rowName,
  };
}
