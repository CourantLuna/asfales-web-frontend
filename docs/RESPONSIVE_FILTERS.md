# SearchWithFilters - Responsive Filter System

## Overview
The SearchWithFilters component now includes a fully responsive filter system that adapts to different screen sizes:
- **Desktop (lg+)**: Traditional sidebar layout with filters on the left
- **Mobile/Tablet (md and below)**: Filters accessible through a Sheet (drawer) component

## Key Features

### 🎯 Responsive Design
- **Desktop**: Filters displayed in a fixed sidebar (240px width)
- **Mobile/Tablet**: Filters hidden behind a "Filtros" button that opens a Sheet from the left
- **Auto-adapts**: Uses Tailwind's `lg:` breakpoint for seamless transitions

### 📱 Mobile-First Filter Experience
- **Filter Button**: Shows "Filtros" with a filter icon and active filter count badge
- **Sheet Component**: Full-width on mobile, 320px on tablet (sm:w-80)
- **Sticky Header**: Sheet title and description remain visible during scroll
- **Action Buttons**: "Limpiar" (clear) and "Aplicar filtros" (apply) buttons at bottom
- **Scrollable Content**: Filters area scrolls independently with proper max-height

### 🎨 Enhanced UI/UX
- **Filter Count Badge**: Shows number of active filters on mobile button
- **Smooth Animations**: Sheet slides in from left with smooth transitions
- **Proper Spacing**: Optimized padding and margins for touch interactions
- **Accessible**: Full keyboard navigation and screen reader support

## Implementation Details

### Sheet Configuration
```tsx
<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
  <SheetTrigger asChild>
    <Button variant="outline" className="w-full md:w-auto">
      <Filter className="w-4 h-4 mr-2" />
      Filtros
      {activeChips.length > 0 && (
        <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
          {activeChips.length}
        </span>
      )}
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-full sm:w-80 p-0">
    {/* Content */}
  </SheetContent>
</Sheet>
```

### Responsive Layout
```tsx
{/* Desktop Filters */}
<div className="hidden lg:block w-full lg:w-60 flex-shrink-0 mt-1">
  <FiltersContent />
</div>

{/* Mobile Filter Button */}
<div className="lg:hidden mb-4">
  <Sheet>
    {/* Sheet implementation */}
  </Sheet>
</div>
```

## Usage

The component usage remains the same - the responsive behavior is automatic:

```tsx
<SearchWithFilters
  rows={data}
  filters={filtersConfig}
  filterOptions={filterOptions}
  sortOptions={sortOptions}
  enableCompareMode={true}
  renderResults={renderResults}
  // ... other props
/>
```

## Breakpoints

- **lg+ (1024px+)**: Desktop mode with sidebar
- **md and below (< 1024px)**: Mobile mode with Sheet
- **sm (640px+)**: Sheet width becomes 320px instead of full width

## Components Used

- **shadcn/ui Sheet**: For mobile filter drawer
- **Lucide React Icons**: Filter and X icons
- **Tailwind CSS**: Responsive utilities and styling
- **Custom Components**: Reused existing filter components

## Benefits

1. **Better Mobile Experience**: Filters don't take up valuable screen space
2. **Consistent Desktop Experience**: Maintains familiar sidebar layout
3. **Improved Accessibility**: Proper focus management and keyboard navigation
4. **Modern UX Pattern**: Follows mobile-first design principles
5. **Seamless Integration**: Works with existing filter logic and state management

## Technical Implementation

### State Management
- Added `isSheetOpen` state to control Sheet visibility
- Reused existing `filterStates` and `activeChips` for consistency
- No breaking changes to existing filter logic

### Component Structure
- Created `FiltersContent` component for reusability
- Same filter content rendered in both sidebar and Sheet
- Proper state synchronization between desktop and mobile

### Performance
- No additional re-renders or state duplications
- Efficient use of React hooks and memoization
- Maintains existing optimization patterns

## Future Enhancements

- Add filter presets/favorites
- Implement filter history
- Add more Sheet positions (right, bottom)
- Include filter search functionality
- Add filter export/import capabilities
