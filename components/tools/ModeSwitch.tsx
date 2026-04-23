type ModeSwitchProps<T extends string> = {
  label?: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

export function ModeSwitch<T extends string>({
  label,
  options,
  value,
  onChange,
}: ModeSwitchProps<T>) {
  return (
    <div className="space-y-2">
      {label ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
      ) : null}
      <div className="inline-flex flex-wrap gap-2 rounded-2xl border border-border bg-white/80 p-2">
        {options.map((option) => {
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-foreground text-white"
                  : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

