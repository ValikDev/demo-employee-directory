import { useEffect, useState } from 'react';
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

function FilterGroupSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
      <div className="flex flex-col gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 w-28 bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  );
}

const EMPTY_OPTIONS: FilterOptions = { roles: [], countries: [], departments: [] };

type FiltersProps = {
  active: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
};

export function Filters({ active, onChange }: FiltersProps) {
  const [options, setOptions] = useState<FilterOptions>(EMPTY_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/filters')
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);

        return res.json();
      })
      .then(setOptions)
      .catch(() => setError('Failed to load filters'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className="flex flex-col gap-6 p-5 bg-white rounded-lg border border-gray-200 min-w-56">
      {loading ? (
        <>
          <FilterGroupSkeleton />
          <FilterGroupSkeleton />
          <FilterGroupSkeleton />
        </>
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : (
        <>
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
        </>
      )}
    </aside>
  );
}
