import { useState } from 'react';
import { EmployeeTable } from './components/Employees/index.js';
import { Filters } from './components/Filters/index.js';
import { useEmployees } from './hooks/useEmployees.js';
import { useFilterOptions } from './hooks/useFilterOptions.js';
import type { ActiveFilters } from './types.js';

const EMPTY_FILTERS: ActiveFilters = { roles: [], countries: [], departments: [] };

export function App() {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(EMPTY_FILTERS);
  const filterOptions = useFilterOptions();
  const employees = useEmployees(activeFilters);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Employee Directory</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <Filters
          options={filterOptions.options}
          active={activeFilters}
          loading={filterOptions.loading}
          error={filterOptions.error}
          onChange={setActiveFilters}
        />

        <main className="flex-1">
          <EmployeeTable
            employees={employees.employees}
            loading={employees.loading}
            error={employees.error}
          />
        </main>
      </div>
    </div>
  );
}
