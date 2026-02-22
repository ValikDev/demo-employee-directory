import { useCallback, useEffect, useState } from 'react';
import type { ActiveFilters, Employee } from '../types.js';
import { buildQuery } from '../utils.js';

export function useEmployees(filters: ActiveFilters) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async (f: ActiveFilters) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/v1/employees${buildQuery(f)}`);

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      setEmployees(await res.json());
    } catch {
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchEmployees(filters);
  }, [filters, fetchEmployees]);

  return { employees, loading, error };
}
