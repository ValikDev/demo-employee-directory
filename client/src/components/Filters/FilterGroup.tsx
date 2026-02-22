import type { FilterOption } from '../../types.js';

type FilterGroupProps = {
  label: string;
  options: FilterOption[];
  selected: number[];
  onChange: (ids: number[]) => void;
};

export function FilterGroup({ label, options, selected, onChange }: FilterGroupProps) {
  const toggle = (id: number) => {
    const next = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id];

    onChange(next);
  };

  return (
    <fieldset>
      <legend className="font-semibold text-sm text-gray-700 mb-2">{label}</legend>
      <div className="flex flex-col gap-1">
        {options.map((opt) => (
          <label key={opt.id} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(opt.id)}
              onChange={() => toggle(opt.id)}
              className="rounded border-gray-300"
            />
            {opt.name}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
