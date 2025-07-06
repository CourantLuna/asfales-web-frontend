# StandardSearchField - Clear Selection Button

## Overview

The `StandardSearchField` component now includes a clear selection button ("X") that appears when a value is selected. This feature improves user experience by providing a quick way to clear the current selection without opening the search dropdown.

## Features

### Clear Selection Button
- **Visibility**: The "X" button appears only when there's a selected value
- **Placement**: Positioned on the right side of the field
- **Accessibility**: Includes proper ARIA labels and keyboard navigation
- **Variants**: Works with both 'default' and 'compact' variants

### Visual Design
- **Icon**: Uses the Lucide React `X` icon
- **Styling**: Ghost button variant with hover effects
- **Size**: Compact 8x8 button with 4x4 icon
- **Color**: Muted foreground with hover state

## Usage

```tsx
import { StandardSearchField } from '@/components/shared/StandardSearchField';

function MyComponent() {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <StandardSearchField
      label="Select a city"
      placeholder="Choose a city"
      value={selectedValue}
      onValueChange={setSelectedValue}
      options={cityOptions}
    />
  );
}
```

## Implementation Details

### Default Variant
- Clear button appears to the right of the selected text
- Uses flexbox layout with `flex-1` on the text span
- Clear button is `flex-shrink-0` to maintain size

### Compact Variant
- Clear button integrated into the two-column layout
- Positioned after the label/value column
- Maintains the 16-unit height design

### Event Handling
- `handleClearSelection`: Clears both controlled value and internal state
- Prevents event propagation to avoid triggering the main button click
- Calls `onValueChange("")` to notify parent component

## Accessibility

- **ARIA Label**: "Limpiar selección" (Clear selection)
- **Keyboard Navigation**: Can be focused and activated with Enter/Space
- **Screen Reader**: Announces the button purpose clearly
- **Focus Management**: Doesn't interfere with main field focus

## Testing

Use the example component to test the functionality:

```tsx
// components/examples/StandardSearchFieldExample.tsx
import { StandardSearchFieldExample } from '@/components/examples/StandardSearchFieldExample';
```

## Code Changes

### Modified Files
- `components/shared/StandardSearchField.tsx`: Added clear selection button to both variants

### New Files
- `components/examples/StandardSearchFieldExample.tsx`: Example component for testing
- `docs/STANDARD_SEARCH_FIELD_CLEAR_BUTTON.md`: This documentation

## Future Enhancements

1. **Animation**: Add smooth transitions when button appears/disappears
2. **Confirmation**: Optional confirmation dialog for important selections
3. **Custom Icons**: Allow custom clear button icons
4. **Keyboard Shortcuts**: Add keyboard shortcuts (e.g., Escape to clear)

## Related Components

- `SearchWithFilters`: Uses StandardSearchField and benefits from clear functionality
- `SearchFieldsWithSwap`: Contains multiple StandardSearchField instances
- `TravelOptionsTabs`: Uses StandardSearchField for search inputs
