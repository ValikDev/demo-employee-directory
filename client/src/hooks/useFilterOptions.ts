import { useEffect, useState } from 'react';
import type { FilterOptions } from '../types.js';

const EMPTY: FilterOptions = { roles: [], countries: [], departments: [] };

export function useFilterOptions() {
  const [options, setOptions] = useState<FilterOptions>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/filters')
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then(setOptions)
      .catch(() => setError('Failed to load filters'))
      .finally(() => setLoading(false));
  }, []);

  return { options, loading, error };
}
