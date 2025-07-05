"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface CompareSwitchControlProps {
  /**
   * Current state of the switch
   */
  checked: boolean;
  /**
   * Callback when switch state changes
   */
  onCheckedChange: (checked: boolean) => void;
  /**
   * Title when switch is OFF (false)
   */
  titleOff?: string;
  /**
   * Subtitle when switch is OFF (false)
   */
  subtitleOff?: string;
  /**
   * Title when switch is ON (true)
   */
  titleOn?: string;
  /**
   * Subtitle when switch is ON (true)
   */
  subtitleOn?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Disable the switch
   */
  disabled?: boolean;
}

export default function CompareSwitchControl({
  checked = false,
  onCheckedChange,
  titleOff = "Compare properties",
  subtitleOff = "Get a side-by-side view of up to 5 properties",
  titleOn = "Comparing properties",
  subtitleOn = "Select properties to compare side by side",
  className,
  disabled = false,
}: CompareSwitchControlProps) {
  const currentTitle = checked ? titleOn : titleOff;
  const currentSubtitle = checked ? subtitleOn : subtitleOff;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 bg-card border border-border rounded-lg shadow-sm",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-foreground">
          {currentTitle}
        </h3>
        <p className="text-xs text-muted-foreground">
          {currentSubtitle}
        </p>
      </div>
      <Switch
        checked={!!checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-label={checked ? titleOn : titleOff}
      />
    </div>
  );
}
