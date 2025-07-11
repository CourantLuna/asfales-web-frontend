"use client";

import React from "react";
import { StandardSearchDataSource, StandardSearchField } from "./standard-fields-component/StandardSearchField";
import { Separator } from "@/components/ui/separator";
import { CheckboxFilter, CheckboxOption } from "./standard-fields-component/CheckboxFilter";
import { StandardRadioGroup } from "./standard-fields-component/StandardRadioGroup";
import { PriceRangeFilter } from "./standard-fields-component/PriceRangeFilter";
import { StandardToggleGroup } from "./standard-fields-component/StandardToggleGroup";

// Tipos para cada filtro
export interface BaseFilter {
  id: string;
  type: 'search' | 'separator' | 'checkbox' | 'radio' | 'range' | 'toggle' | 'custom';
}

export interface CustomFilterConfig extends BaseFilter {
  type: 'custom';
  content: React.ReactNode;
  containerClassName?: string;
}

export interface SearchFilter extends BaseFilter {
  type: 'search';
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  dataSources?: StandardSearchDataSource[];
  onSelect?: (option: any, sourceType: string) => void;
  showClearButton?: boolean;
  minSearchLength?: number;
  disabled?: boolean;
  emptyMessage?: string;
  searchPlaceholder?: string;
}

export interface SeparatorFilter extends BaseFilter {
  type: 'separator';
  className?: string;
}

export interface CheckboxFilterConfig extends BaseFilter {
  type: 'checkbox';
  label: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  onOutputStringChange?: (outputString: string) => void;
  onIndividualChipsChange?: (chips: Array<{id: string, label: string, onRemove: () => void}>) => void;
  showCounts?: boolean;
  maxSelections?: number;
  initialVisibleCount?: number;
  showMoreText?: string;
  showLessText?: string;
}

export interface RadioFilterConfig extends BaseFilter {
  type: 'radio';
  label: string;
  options: Array<{
    value: string;
    label: string;
    count?: number;
  }>;
  value: string;
  onValueChange: (value: string) => void;
  variant?: 'vertical' | 'horizontal';
  helperText?: string;
}

export interface RangeFilterConfig extends BaseFilter {
  type: 'range';
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (newRange: [number, number]) => void;
  onOutputStringChange?: (outputString: string) => void;
  currency?: string;
  unitSuffix?: string; // Para unidades como "h", "min", etc.
  mode?: 'range' | 'single'; // Modo del control
  step?: number;
}

export interface ToggleFilterConfig extends BaseFilter {
  type: 'toggle';
  label: string;
  options: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
    count?: number;
    disabled?: boolean;
  }>;
  value: string[];
  onValueChange: (value: string | string[]) => void;
  type_toggle?: 'single' | 'multiple';
  variant?: 'vertical' | 'horizontal';
  wrap?: boolean;
  gridCols?: "auto" | 1 | 2 | 3 | 4 | 5 | 6;
  containerClassName?: string;
  labelClassName?: string;
  toggleGroupClassName?: string;
  toggleItemClassName?: string;
  // ✨ NUEVAS PROPS para compatibilidad con CheckboxFilter
  onOutputStringChange?: (outputString: string) => void;
  onIndividualChipsChange?: (chips: Array<{id: string, label: string, onRemove: () => void}>) => void;
  maxSelections?: number;
}

export type FilterConfig = 
  | SearchFilter 
  | SeparatorFilter 
  | CheckboxFilterConfig 
  | RadioFilterConfig 
  | RangeFilterConfig 
  | ToggleFilterConfig
  | CustomFilterConfig;

export interface ResultFiltersProps {
  filters: FilterConfig[];
  className?: string;
}

export default function ResultFilters({ filters, className = "" }: ResultFiltersProps) {
  const renderFilter = (filter: FilterConfig) => {
    switch (filter.type) {
      case 'search':
        return (
          <StandardSearchField
            key={filter.id}
            label={filter.label}
            placeholder={filter.placeholder}
            value={filter.value}
            onValueChange={filter.onValueChange}
            dataSources={filter.dataSources || []}
            onSelect={filter.onSelect}
            showClearButton={filter.showClearButton}
            minSearchLength={filter.minSearchLength}
            disabled={filter.disabled}
            emptyMessage={filter.emptyMessage}
            searchPlaceholder={filter.searchPlaceholder}
          />
        );

      case 'separator':
        return (
          <Separator 
            key={filter.id}
            className={`my-4 ${filter.className || ''}`}
          />
        );

      case 'checkbox':
        return (
          <CheckboxFilter
            key={filter.id}
            label={filter.label}
            options={filter.options}
            selectedValues={filter.selectedValues}
            onChange={filter.onChange}
            onOutputStringChange={filter.onOutputStringChange}
            onIndividualChipsChange={filter.onIndividualChipsChange}
            showCounts={filter.showCounts}
            maxSelections={filter.maxSelections}
            initialVisibleCount={filter.initialVisibleCount}
            showMoreText={filter.showMoreText}
            showLessText={filter.showLessText}
          />
        );

      case 'radio':
        return (
          <StandardRadioGroup
            key={filter.id}
            label={filter.label}
            options={filter.options}
            value={filter.value}
            onValueChange={filter.onValueChange}
            variant={filter.variant}
            helperText={filter.helperText}
          />
        );

      case 'range':
        return (
          <PriceRangeFilter
            key={filter.id}
            min={filter.min}
            max={filter.max}
            value={filter.value}
            onChange={filter.onChange}
            onOutputStringChange={filter.onOutputStringChange}
            label={filter.label}
            currency={filter.currency}
            unitSuffix={filter.unitSuffix}
            mode={filter.mode}
            step={filter.step}
          />
        );

      case 'toggle':
        return (
          <StandardToggleGroup
            key={filter.id}
            label={filter.label}
            options={filter.options}
            value={filter.value}
            onValueChange={filter.onValueChange}
            type={filter.type_toggle}
            variant={filter.variant}
            wrap={filter.wrap}
            gridCols={filter.gridCols || "auto"}
            containerClassName={filter.containerClassName}
            labelClassName={filter.labelClassName}
            toggleGroupClassName={filter.toggleGroupClassName}
            toggleItemClassName={filter.toggleItemClassName}
            // ✨ NUEVAS PROPS
      onOutputStringChange={filter.onOutputStringChange}
      onIndividualChipsChange={filter.onIndividualChipsChange}
      maxSelections={filter.maxSelections}
          />
        );


        case 'custom':
        return (
          <div 
            key={filter.id}
            className={filter.containerClassName || ''}
          >
            {filter.content}
          </div>
        );

      default:
        console.warn(`Unknown filter type: ${(filter as any).type}`);
        return null;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {filters.map(filter => renderFilter(filter))}
    </div>
  );
}
