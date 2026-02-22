import type { ActiveFilters } from './types.js';

export function buildQuery(filters: ActiveFilters): string {
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
