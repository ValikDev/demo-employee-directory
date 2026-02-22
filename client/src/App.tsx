import { useCallback, useEffect, useState } from 'react';
import { EmployeeTable } from './components/EmployeeTable.js';
import { Filters } from './components/Filters.js';
import type { ActiveFilters, Employee } from './types.js';

const EMPTY_FILTERS: ActiveFilters = { roles: [], countries: [], departments: [] };

function buildQuery(filters: ActiveFilters): string {
  const params = new URLSearchParams();

  if (filters.roles.length) {
    params.set('roles', filters.roles.join(','));
  }

  if (filters.countries.length) {
    params.set('countries', filters.countries.join(','));
  }

  if (filters.departments.length) {
    params.set('departments', filters.departments.join(','));
  }

  const query = params.toString();

  return query ? `?${query}` : '';
}

export function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(EMPTY_FILTERS);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = useCallback(async (filters: ActiveFilters) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/v1/employees${buildQuery(filters)}`);

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data: Employee[] = await res.json();

      setEmployees(data);
    } catch {
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchEmployees(activeFilters);
  }, [activeFilters, fetchEmployees]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Employee Directory</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <Filters
          active={activeFilters}
          onChange={setActiveFilters}
        />

        <main className="flex-1">
          {loading
            ? <p className="text-gray-500 text-sm p-4">Loading...</p>
            : <EmployeeTable employees={employees} />
          }
        </main>
      </div>
    </div>
  );
}
