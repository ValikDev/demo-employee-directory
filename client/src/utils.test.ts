import { describe, expect, it } from 'vitest';
import { buildQuery } from './utils.js';

const EMPTY = { roles: [], countries: [], departments: [] };

describe('buildQuery', () => {
  it('returns empty string when all filters are empty', () => {
    expect(buildQuery(EMPTY)).toBe('');
  });

  it('builds query for a single filter category', () => {
    expect(buildQuery({ ...EMPTY, roles: [1] })).toBe('?roles=1');
  });

  it('joins multiple IDs with commas', () => {
    expect(buildQuery({ ...EMPTY, countries: [3, 7, 12] })).toBe('?countries=3%2C7%2C12');
  });

  it('combines all filter categories', () => {
    const result = buildQuery({ roles: [1], countries: [2], departments: [3] });
    const params = new URLSearchParams(result);

    expect(params.get('roles')).toBe('1');
    expect(params.get('countries')).toBe('2');
    expect(params.get('departments')).toBe('3');
  });

  it('omits categories that have no selections', () => {
    const result = buildQuery({ roles: [], countries: [5], departments: [] });
    const params = new URLSearchParams(result);

    expect(params.has('roles')).toBe(false);
    expect(params.get('countries')).toBe('5');
    expect(params.has('departments')).toBe(false);
  });
});
