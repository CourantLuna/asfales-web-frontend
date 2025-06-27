"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface DialogAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost" | "link";
}

export interface GenericDialogProps {

  trigger: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: DialogAction[];
  widthClass?: string; // e.g. "sm:max-w-md"
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function GenericDialog({
  trigger,
  icon,
  title,
  description,
  children,
  actions = [],
  widthClass = "sm:max-w-lg",
  open,
  onOpenChange,
}: GenericDialogProps) {
  return (
         <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={widthClass}>
        <DialogHeader>
          <div className="flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            <DialogTitle>{title}</DialogTitle>
          </div>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="py-2">{children}</div>
        {actions.length > 0 && (
          <DialogFooter>
            {actions.map(({ label, onClick, variant }, idx) => (
              <Button
                key={idx}
                variant={variant || "default"}
                onClick={onClick}
              >
                {label}
              </Button>
            ))}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
