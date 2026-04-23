type UnitOption = {
  value: string;
  label: string;
};

type UnitInputProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  unit: string;
  unitOptions?: UnitOption[];
  onUnitChange?: (value: string) => void;
  placeholder?: string;
  hint?: string;
};

export function UnitInput({
  label,
  value,
  onValueChange,
  unit,
  unitOptions,
  onUnitChange,
  placeholder,
  hint,
}: UnitInputProps) {
  return (
    <label className="space-y-2 rounded-2xl border border-border bg-white/80 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr),auto]">
        <input
          type="number"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onValueChange(event.target.value)}
          className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
        />
        {unitOptions && onUnitChange ? (
          <select
            value={unit}
            onChange={(event) => onUnitChange(event.target.value)}
            className="rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
          >
            {unitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <div className="rounded-xl border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
            {unit}
          </div>
        )}
      </div>
    </label>
  );
}

