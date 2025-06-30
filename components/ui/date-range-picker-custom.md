# DateRangePickerCustom Component

Advanced date picker component for the Asfales travel platform with support for both single trigger (range selection) and dual trigger (separate ida/vuelta buttons) modes, plus flexible dates functionality.

## Features

- **Single Trigger Mode**: One button that opens a date range picker
- **Dual Trigger Mode**: Two separate buttons for departure and return dates
- **Flexible Dates Tab**: Alternative to exact dates with duration and month selection
- **Spanish Localization**: All labels, months, and UI text in Spanish
- **Responsive Design**: Optimized for both desktop (280px) and mobile (100% width)
- **Configurable**: Show/hide flexible tab, set default active tab, customize labels

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label for the date picker |
| `value` | `{ from?: Date; to?: Date }` | - | Current selected date range |
| `onChange` | `(range: { from?: Date; to?: Date }) => void` | - | Change handler for date range |
| `placeholder` | `string` | `"Seleccionar fechas"` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the picker is disabled |
| `className` | `string` | - | Custom CSS class |
| `showFlexibleDates` | `boolean` | `true` | Whether to show flexible dates tab |
| `dualTrigger` | `boolean` | `false` | Use dual triggers (ida/vuelta buttons) |
| `defaultActiveTab` | `'calendar' \| 'flexible'` | `'calendar'` | Default active tab |
| `dualTriggerLabels` | `{ from: string; to: string }` | `{ from: "Fecha de ida", to: "Fecha de vuelta" }` | Labels for dual trigger mode |

## Usage Examples

### Basic Range Picker
```tsx
<DateRangePickerCustom
  label="Fechas de viaje"
  value={range}
  onChange={setRange}
/>
```

### Dual Trigger Mode (Transport)
```tsx
<DateRangePickerCustom
  label="Fechas de viaje"
  value={{ from: fechaIda, to: fechaVuelta }}
  onChange={(range) => {
    setFechaIda(range.from);
    setFechaVuelta(range.to);
  }}
  dualTrigger={true}
  showFlexibleDates={false}
  dualTriggerLabels={{
    from: "Fecha de ida",
    to: "Fecha de vuelta"
  }}
/>
```

### Lodging with Flexible Dates
```tsx
<DateRangePickerCustom
  label="Fechas de estadía"
  value={range}
  onChange={setRange}
  showFlexibleDates={true}
  defaultActiveTab="flexible"
/>
```

### Experiences/Itineraries
```tsx
<DateRangePickerCustom
  label="Fechas"
  value={range}
  onChange={setRange}
  showFlexibleDates={false}
/>
```

## Integration in TravelOptionsTabs

The component is already integrated into the `TravelOptionsTabs` component with different configurations:

- **Transport**: Dual trigger mode, no flexible dates
- **Lodging**: Single trigger, flexible dates enabled, defaults to flexible tab
- **Experiences/Itineraries**: Single trigger, no flexible dates

## Calendar Features

- **Dual Month View**: Shows current and next month (desktop only)
- **Spanish Localization**: All month names and day labels in Spanish
- **Date Range Selection**: Visual indicators for selected range
- **Past Date Prevention**: Disables past dates
- **Flexible Date Options**: ±1, ±2, ±3, ±7 days flexibility

## Flexible Dates Features

- **Duration Selection**: 1 night, 2-3 nights, 4-5 nights, 6-7 nights
- **Weekend Requirements**: Optional checkbox for weekend inclusion
- **Month Selection**: Multiple month selection with visual indicators
- **Responsive Grid**: 2 columns on mobile, 3 on desktop

## Styling

The component uses Tailwind CSS classes and follows the design system:
- Standard component width: `w-full md:w-[280px]`
- Consistent height for buttons: `h-12`
- Primary color scheme with proper contrast
- Hover states and transitions
- Mobile-first responsive design

## Dependencies

- `date-fns` with Spanish locale (`es`)
- `lucide-react` for icons
- `@radix-ui` components (Button, Popover, Tabs, etc.)
- Tailwind CSS for styling
