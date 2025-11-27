"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CompareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompareDialog({ open, onOpenChange }: CompareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Comparación</DialogTitle>
        </DialogHeader>

        {/* Aquí puedes agregar tablas, cards, comparaciones, etc */}
        <div className="py-4 text-sm text-gray-600">
          Aquí irá la comparación...
        </div>
      </DialogContent>
    </Dialog>
  );
}
