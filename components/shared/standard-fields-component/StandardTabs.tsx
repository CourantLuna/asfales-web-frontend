"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { StandardToggleGroup } from "@/components/shared/standard-fields-component/StandardToggleGroup";

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  value: string;
  /**
   * Display label for the tab
   */
  label: string;
  /**
   * Optional icon element to display with the label
   */
  icon?: React.ReactNode;
  /**
   * Content to display when this tab is active
   */
  content: React.ReactNode;
  /**
   * Whether this tab is disabled
   */
  disabled?: boolean;
}

export interface StandardTabsProps {
  /**
   * Array of tab items
   */
  items: TabItem[];
  /**
   * Currently active tab value
   */
  activeTab: string;
  /**
   * Callback when active tab changes
   */
  onTabChange: (value: string) => void;
  /**
   * Container className for the entire tabs component
   */
  containerClassName?: string;
  /**
   * ClassName for the tabs list (desktop only)
   */
  tabsListClassName?: string;
  /**
   * ClassName for individual tab triggers
   */
  tabTriggerClassName?: string;
  /**
   * ClassName for tab content
   */
  tabContentClassName?: string;
  /**
   * Placeholder text for mobile select
   */
  mobilePlaceholder?: string;
  /**
   * Custom tab trigger className (overrides default styling)
   */
  customTabClassName?: string;
  /**
   * Whether to center the tabs list
   */
  centerTabs?: boolean;
  /**
   * Whether to use select dropdown in mobile instead of tabs (default: true)
   */
  useMobileSelect?: boolean;
  /**
   * Si es true, usa StandardToggleGroup en vez de TabsTrigger para desktop
   */
  useToggleGroupTabs?: boolean;
}

const StandardTabs = React.forwardRef<HTMLDivElement, StandardTabsProps>(
  (
    {
      items,
      activeTab,
      onTabChange,
      containerClassName,
      tabsListClassName,
      tabTriggerClassName,
      tabContentClassName,
      mobilePlaceholder = "Selecciona una opción",
      customTabClassName,
      centerTabs = true,
      useMobileSelect = true,
      useToggleGroupTabs = false,
    },
    ref
  ) => {
    // Default tab trigger styling (same as TravelOptionsTabs)
    const defaultTabClassName = ` ${centerTabs? "flex-1" : "flex-1 md:flex-none"} 
            justify-center border-b-2 bg-transparent
             data-[state=active]:border-primary 
             data-[state=active]:text-primary
             text-muted-foreground font-medium px-4 py-2 transition-colors`;

    const finalTabClassName = customTabClassName || defaultTabClassName;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          containerClassName
        )}
      >
        <Tabs
          value={activeTab}
          onValueChange={onTabChange}
          className={cn(
            "w-full items-center flex flex-col !bg-transparent",
            centerTabs && "items-center"
          )}
        >
          {/* Mobile Select Selector */}
          {useMobileSelect && (
            <div className="block w-full md:hidden mb-4">
              <Select
                value={activeTab}
                onValueChange={onTabChange}
              >
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder={mobilePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      disabled={item.disabled}
                    >
                      <div className="flex items-center">
                        {item.icon && (
                          <span className="mr-2 flex items-center">
                            {item.icon}
                          </span>
                        )}
                        {item.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Desktop Tabs List o ToggleGroup */}
          <div className={cn(
            useMobileSelect ? "hidden md:flex" : "flex",
            "w-full bg-transparent",
            centerTabs ? "justify-center" : "md:justify-start justify-center",
            tabsListClassName
          )}>
            {useToggleGroupTabs ? (
              <StandardToggleGroup
                type="single"
                enforceSingleSelection={true}
                options={items.map(item => ({
                  value: item.value,
                  label: item.label,
                  icon: item.icon,
                  disabled: item.disabled,
                }))}
                value={activeTab}
                onValueChange={val => typeof val === 'string' && onTabChange(val)}
                containerClassName={cn("w-full flex mb-2", centerTabs ? "justify-center" : "justify-start")}
              />
            ) : (
              <TabsList 
                className={cn(
                  useMobileSelect ? "hidden md:flex" : "flex",
                  " w-full  mb-6 py-4 bg-transparent",
                  centerTabs ? "justify-center" : "md:justify-start justify-center",
                  tabsListClassName
                )}
              >
                {items.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    className={cn(
                      finalTabClassName,
                      tabTriggerClassName
                    )}
                  >
                    {item.icon && (
                      <span className="mr-2 flex items-center">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            )}
          </div>

          {/* Tab Content - Using hide/show instead of conditional rendering */}
          <div className="relative w-full">
            {items.map((item) => (
              <div
                key={item.value}
                className={cn(
                  "mt-0 focus-visible:outline-none focus-visible:ring-0",
                  activeTab === item.value ? "block" : "hidden",
                  tabContentClassName
                )}
              >
                {item.content}
              </div>
            ))}
          </div>
        </Tabs>
      </div>
    );
  }
);

StandardTabs.displayName = "StandardTabs";

export { StandardTabs };
