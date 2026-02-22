import type { ActiveFilters, FilterOption, FilterOptions } from '../types.js';

type FilterGroupProps = {
  label: string;
  options: FilterOption[];
  selected: number[];
  onChange: (ids: number[]) => void;
};

function FilterGroup({ label, options, selected, onChange }: FilterGroupProps) {
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

type FiltersProps = {
  options: FilterOptions;
  active: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
};

export function Filters({ options, active, onChange }: FiltersProps) {
  return (
    <aside className="flex flex-col gap-6 p-5 bg-white rounded-lg border border-gray-200 min-w-56">
      <FilterGroup
        label="Country"
        options={options.countries}
        selected={active.countries}
        onChange={(countries) => onChange({ ...active, countries })}
      />
      <FilterGroup
        label="Department"
        options={options.departments}
        selected={active.departments}
        onChange={(departments) => onChange({ ...active, departments })}
      />
      <FilterGroup
        label="Role"
        options={options.roles}
        selected={active.roles}
        onChange={(roles) => onChange({ ...active, roles })}
      />
    </aside>
  );
}
