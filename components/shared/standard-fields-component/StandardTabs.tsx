"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Combobox, Option } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

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
   * Whether to show the mobile combobox selector
   */
  showMobileSelector?: boolean;
  /**
   * Placeholder text for mobile combobox
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
      showMobileSelector = true,
      mobilePlaceholder = "Selecciona una opción",
      customTabClassName,
      centerTabs = true,
    },
    ref
  ) => {
    // Default tab trigger styling (same as TravelOptionsTabs)
    const defaultTabClassName = `flex-1 justify-center border-b-2 border-transparent bg-transparent
             data-[state=active]:border-primary 
             data-[state=active]:text-primary 
             text-muted-foreground font-medium px-4 py-2 transition-colors`;

    const finalTabClassName = customTabClassName || defaultTabClassName;

    // Convert items to combobox options for mobile
    const comboboxOptions = items.map(item => ({
      label: item.label,
      value: item.value,
      icon: item.icon,
      disabled: item.disabled,
    }));

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
          {/* Mobile Combobox Selector */}
          {showMobileSelector && (
            <div className="block w-full md:hidden mb-4">
              <Combobox
                options={comboboxOptions}
                value={activeTab}
                onChange={onTabChange}
                placeholder={mobilePlaceholder}
              />
            </div>
          )}

          {/* Desktop Tabs List */}
          <TabsList 
            className={cn(
              "hidden md:flex w-full mb-6 py-4 bg-transparent border-b-2",
              centerTabs ? "justify-center" : "justify-start",
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

          {/* Tab Content */}
          <div className="relative w-full">
            {items.map((item) => (
              <TabsContent
                key={item.value}
                value={item.value}
                className={cn(
                  "mt-0 focus-visible:outline-none focus-visible:ring-0",
                  tabContentClassName
                )}
              >
                {item.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    );
  }
);

StandardTabs.displayName = "StandardTabs";

export { StandardTabs };
