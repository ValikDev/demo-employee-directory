import type { ActiveFilters, FilterOptions } from '../../types.js';
import { FilterGroup } from './FilterGroup.js';
import { FilterGroupSkeleton } from './FilterGroupSkeleton.js';

type FiltersProps = {
  options: FilterOptions;
  active: ActiveFilters;
  loading: boolean;
  error: string | null;
  onChange: (filters: ActiveFilters) => void;
};

export function Filters({ options, active, loading, error, onChange }: FiltersProps) {
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
